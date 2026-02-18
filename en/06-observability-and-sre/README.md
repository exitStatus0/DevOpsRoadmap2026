# Factor 6: Observability & SRE

![Observability & SRE](06-observability-and-sre.png)

> You cannot fix what you cannot see. Every team says they have monitoring until an outage happens and they realize they have dashboards without understanding. Observability is the difference between "something is broken" and "the payments service has 12% error rate on the /checkout endpoint since the last deploy." SRE is the discipline that turns that signal into reliable systems.

> **Quick start**
> - **7 days:** Deploy kube-prometheus-stack in your K8s cluster. Write 3 PromQL queries. Define one SLO for a service you run.
> - **30 days:** Add OpenTelemetry SDK to an app, send traces to Grafana Tempo, and correlate logs + traces + metrics in one Grafana dashboard.

---

## Why This Matters in 2026

The SRE job title is one of the fastest-growing in infrastructure. Companies are not just hiring DevOps engineers to deploy things — they are hiring engineers who can measure reliability and make systems provably better over time.

The numbers:
- **Site Reliability Engineer** roles consistently command 15–30% higher compensation than general DevOps roles.
- **OpenTelemetry** became the CNCF second most active project (after Kubernetes). Every vendor now supports it.
- **SLO-based alerting** replaced threshold-based alerting as the standard in mature organizations.
- **Distributed tracing** is required in any microservice architecture with more than 3 services.

If you work with Kubernetes (Factor 2) and do not know how to observe what runs on it, you are half an engineer. Observability is what makes everything else trustworthy.

> "Monitoring tells you whether the system is working. Observability tells you why it is not."

---

## What Problem It Solves in Real Teams

**Without proper observability:**

| Problem | Reality |
|---------|---------|
| Incident response | "Something is slow" — and nobody knows where |
| Root cause analysis | 2 hours of log grepping across 5 services |
| Deployment confidence | You deploy and hope nothing breaks |
| Capacity planning | Guessing based on CPU graphs |
| SLA commitments | "The system was available" — but you cannot prove it |

**With observability:**

| Problem | With observability |
|---------|-------------------|
| Incident response | Alert fires: "checkout service P99 latency > 2s, started 4 min ago" |
| Root cause analysis | Trace shows: database query on /checkout takes 1.8s due to missing index |
| Deployment confidence | SLO dashboard shows error budget is healthy before and after deploy |
| Capacity planning | Actual resource utilization per service, per namespace |
| SLA commitments | 99.95% availability measured against defined SLIs |

**Real example:** An e-commerce team had Prometheus running but no SLOs. During Black Friday, the order service degraded — but no alert fired because all pods were "running." After implementing RED method metrics and SLO-based alerting, the same degradation triggered a PagerDuty alert 8 minutes into the incident instead of 45 minutes.

---

## What to Learn (Key Skills)

### 1. The Three Pillars: Metrics, Logs, Traces

These are not interchangeable. You need all three, and you need to understand what each is good for.

```
Three pillars:
├── Metrics
│   ├── Time-series data: numbers over time
│   ├── Great for: dashboards, alerting, trending
│   ├── Not great for: understanding why something happened
│   ├── Tools: Prometheus, Grafana, VictoriaMetrics
│   └── Key concept: cardinality (label explosion kills performance)
│
├── Logs
│   ├── Unstructured or structured event records
│   ├── Great for: debugging specific events, audit trails
│   ├── Not great for: aggregation, high-cardinality queries
│   ├── Tools: Loki (recommended), ELK Stack, CloudWatch Logs
│   └── Key concept: structured logging (JSON > plain text)
│
└── Traces
    ├── Distributed request flow across services
    ├── Great for: finding where latency lives in a chain of calls
    ├── Not great for: high-level trends (use metrics for that)
    ├── Tools: Grafana Tempo, Jaeger, Zipkin
    └── Key concept: trace context propagation (W3C TraceContext)
```

**RED Method** (for services):
- **R**ate — requests per second
- **E**rrors — error rate (%)
- **D**uration — latency distribution (P50, P95, P99)

**USE Method** (for resources/infrastructure):
- **U**tilization — how busy is the resource
- **S**aturation — how much work is queued/waiting
- **E**rrors — error events

Start with RED for your services. Add USE for infrastructure. These two methods cover 80% of what you need to alert on.

### 2. OpenTelemetry — The Universal Standard

OpenTelemetry (OTel) is the CNCF standard for instrumentation. It replaces vendor-specific agents and SDKs.

```
OpenTelemetry components:
├── SDK (per language: Go, Python, Java, Node.js, .NET...)
│   ├── Traces: auto-instrumentation + manual spans
│   ├── Metrics: counters, histograms, gauges
│   └── Logs: structured log correlation with traces
│
├── Collector
│   ├── Receives telemetry from your apps
│   ├── Processes: batching, filtering, tail sampling
│   ├── Exports to: Prometheus, Tempo, Loki, Jaeger, Datadog, etc.
│   └── Runs as: sidecar, DaemonSet, or standalone service
│
└── Semantic Conventions
    ├── Standardized attribute names (http.method, db.system, etc.)
    └── Makes data interoperable across tools and vendors
```

**Why OTel matters:** Instrument once, send to any backend. Switch from Jaeger to Tempo to Datadog without touching your application code — just reconfigure the Collector.

**Key concept — tail sampling:**
Head-based sampling (sample X% of all traces) loses the interesting traces — the slow ones, the errors. Tail-based sampling keeps 100% of error traces and slow outliers, samples the happy path. The OTel Collector supports tail sampling policies.

### 3. SLIs, SLOs, and Error Budgets

This is the conceptual core of SRE. Get this right and everything else follows.

```
SLI (Service Level Indicator)
  └── A metric that measures user experience
      Examples:
      - "Fraction of HTTP requests that complete in < 500ms"
      - "Fraction of API calls that return a 2xx or 3xx"
      - "Fraction of background jobs that complete successfully"

SLO (Service Level Objective)
  └── A target for your SLI
      Examples:
      - "99.5% of requests complete in < 500ms over a 30-day window"
      - "99.9% of API calls return success over a 28-day window"

SLA (Service Level Agreement)
  └── A contract with your users/customers (legal/financial consequences)
      Your SLO should be tighter than your SLA.

Error Budget
  └── 100% - SLO target = budget for unreliability
      "99.9% SLO = 0.1% error budget = 43.8 min/month of allowed downtime"
      When error budget is healthy → deploy aggressively, innovate
      When error budget is low    → freeze deploys, focus on reliability
```

**Why error budgets matter:** They turn the "dev vs ops" tension into a shared number. Development wants to ship fast. Operations wants stability. The error budget is the neutral arbiter: as long as you have budget, you can move fast. When you burn through it, you slow down. No more arguing — the math decides.

**Tools for SLO management:** Pyrra, Sloth (generate Prometheus recording rules and alerts from SLO definitions), or Grafana's built-in SLO plugin.

### 4. Alerting and On-Call

```
Alerting principles:
├── Alert on symptoms, not causes
│   BAD: "CPU > 80%" (cause — maybe fine)
│   GOOD: "Error rate > 1% for 5 min" (symptom — users are affected)
│
├── Alert on SLO burn rate, not raw metrics
│   BAD: "Error count > 100"
│   GOOD: "Error budget burn rate > 2x for 1hr" (will exhaust budget in 15 days)
│
├── Every alert must be actionable
│   If you cannot act on it right now — it is not a page, it is a ticket
│
└── Severity tiers
    ├── P1: Immediate page. User impact. Wake people up.
    ├── P2: Notify during business hours. Degraded experience.
    └── P3: Create ticket. Low urgency. Fix during normal sprint.

Tools:
├── Alertmanager — routes Prometheus alerts to receivers
│   ├── Routing: by severity, team, service
│   ├── Grouping: deduplicate related alerts
│   ├── Silences: maintenance windows
│   └── Inhibitions: suppress child alerts when parent fires
│
└── PagerDuty / Opsgenie — on-call management
    ├── Escalation policies
    ├── On-call schedules and rotations
    └── Incident timeline and postmortem integration
```

### 5. Incident Management and Post-Mortems

```
Incident lifecycle:
├── Detection   — alert fires (or user reports)
├── Triage      — severity assessment, initial responder
├── Response    — active mitigation (rollback? restart? scale?)
├── Resolution  — service restored to SLO
└── Post-mortem — what happened and how to prevent it

Post-mortem principles:
├── Blameless: systems fail, not people
├── 5 Whys: keep asking "why" until you find the root cause
├── Action items: specific, assigned, time-bounded
└── Share: publish internally so everyone learns

Post-mortem template (minimal):
├── Summary: one sentence — what happened and impact
├── Timeline: key events with timestamps
├── Root cause: the thing that, if fixed, prevents recurrence
├── Contributing factors: what made the impact worse
├── Action items: specific changes with owners and due dates
└── Lessons learned: what worked well in the response
```

### 6. Chaos Engineering (Intro Level)

You cannot trust your reliability until you have tested it deliberately. Chaos engineering is the practice of injecting controlled failures to find weaknesses before real incidents do.

```
Chaos engineering stages:
├── Start small: kill a single pod, see if the service recovers
├── Hypothesize: "If pod X fails, service Y will reroute in < 30s"
├── Experiment: inject the failure, observe metrics
├── Verify: did the system behave as expected?
└── Automate: run chaos tests in CI or on a schedule

Tools:
├── Litmus (CNCF) — K8s-native chaos framework
│   ├── ChaosEngine: define target + experiment
│   ├── Built-in experiments: pod-delete, network-loss, CPU hog
│   └── Chaos Center: UI for scheduling and observing experiments
│
└── Manual injection (for learning)
    ├── kubectl delete pod <name>
    ├── tc qdisc (network latency injection)
    └── stress-ng (CPU/memory pressure)
```

**What NOT to do:** Do not run chaos experiments in production without a mature observability setup and a runbook. Chaos without observability is just random breaking.

---

## What to Skip / Worst ROI

### Do NOT learn first:

1. **Proprietary APM before OSS** — Datadog and New Relic are excellent tools but cost thousands per month and lock you in. Learn Prometheus + Grafana first. The concepts transfer directly, and you will have something to show in any environment.

2. **ELK Stack before Loki** — Elasticsearch is powerful but operationally expensive. Loki stores log metadata (not full-text indexes), integrates natively with Grafana, and is dramatically cheaper to run. For K8s environments, start with Loki.

3. **Deep chaos engineering before basic observability** — If you cannot observe what is happening, chaos experiments teach you nothing. Build observability first. Chaos is step two.

4. **Alerting on everything** — More alerts = alert fatigue = ignored alerts = missed incidents. Start with 3–5 meaningful SLO-based alerts. Add more only when you can act on them.

5. **Custom Prometheus exporters from day one** — Most infrastructure already has exporters (node-exporter, kube-state-metrics, etc.). Learn to use existing exporters before writing your own.

### Worst ROI:

| Action | Why Bad ROI | What To Do Instead |
|--------|-------------|-------------------|
| Perfect dashboards before alerts | Pretty dashboards do not page you at 3am | Alerts first, dashboards to support investigation |
| Logging every field at DEBUG level | Storage costs + noise | Structured JSON logs at INFO, DEBUG only in dev |
| Single Grafana dashboard for everything | Unusable in an incident | One dashboard per service, one overview dashboard |
| High-cardinality labels in Prometheus | Kills performance (millions of time series) | Use traces for high-cardinality data |

---

## How Deep to Go

### Beginner (2–3 weeks)

- [ ] Deploy kube-prometheus-stack (Prometheus + Grafana + Alertmanager) via Helm
- [ ] Write 5 basic PromQL queries: error rate, request rate, P99 latency, pod restarts, memory usage
- [ ] Create a Grafana dashboard with RED method metrics for one service
- [ ] Define one SLO for a service you run
- [ ] Set up at least one actionable alert in Alertmanager (routed to Slack)
- [ ] Deploy Loki + Promtail, query logs from Grafana

**Test:** Can you look at a Grafana dashboard and tell a non-technical person whether the service is healthy or not? If yes — move on.

### Strong (4–8 weeks) — THIS IS THE HIRING THRESHOLD:

- [ ] Add OpenTelemetry SDK to an application (any language)
- [ ] Deploy OTel Collector, configure it to receive traces and send to Grafana Tempo
- [ ] Correlate logs + traces in Grafana (jump from log line to trace)
- [ ] Implement SLO recording rules and burn-rate alerts with Pyrra or Sloth
- [ ] Set up Alertmanager routing: P1 → PagerDuty, P2/P3 → Slack
- [ ] Write a post-mortem for a real or simulated incident
- [ ] Know the difference between RED and USE methods and when to apply each
- [ ] Understand trace context propagation (W3C TraceContext header)

**Test:** Can you walk someone through an incident using metrics + logs + traces to identify root cause? That is strong level.

### Expert (3–6 months):

- [ ] Design an observability architecture for a multi-team platform (OTel Collector fleet, remote write, long-term storage)
- [ ] Implement tail sampling in the OTel Collector
- [ ] Build a multi-window, multi-burn-rate SLO alerting strategy
- [ ] Run controlled chaos experiments and verify system behavior against SLOs
- [ ] Implement distributed tracing across polyglot services (multiple languages/runtimes)
- [ ] Define and track error budgets over rolling windows with automated reports
- [ ] Tune Prometheus cardinality (identify and fix label explosion)

---

## How AI Changes This Factor

### 1. PromQL Query Generation

```
Prompt: "Write a PromQL query that calculates the 5-minute error rate for
the 'checkout' service across all pods, expressed as a percentage of total
requests. Label the result with the service name. Exclude health check
endpoints (/health, /ready)."
```

AI generates correct PromQL in seconds. You validate it against your data.

### 2. Alert Rule Generation

```
Prompt: "Write a Prometheus alerting rule for an SLO burn rate alert.
Service: payments. SLO: 99.9% success rate over 28 days.
Alert when: 1-hour burn rate > 14x OR 5-minute burn rate > 36x.
Include helpful annotations with a runbook URL placeholder."
```

### 3. Post-Mortem Drafting

```
Prompt: "Draft a blameless post-mortem based on this incident timeline:
[paste timeline]
The root cause was: [describe it]
Focus on systems failures, not individual mistakes.
Include 3–5 specific action items."
```

### 4. OTel Collector Configuration

```
Prompt: "Write an OpenTelemetry Collector configuration that:
- Receives traces via OTLP (gRPC and HTTP)
- Receives metrics via OTLP
- Applies tail sampling: keep 100% of error traces, 100% of traces > 2s,
  and 10% of normal traces
- Exports traces to Grafana Tempo
- Exports metrics to Prometheus (remote write)
- Runs as a DaemonSet in Kubernetes"
```

### 5. Incident Analysis

```
Prompt: "Here are Grafana screenshots from our incident last night.
The checkout service had elevated P99 latency from 02:15 to 03:40.
[attach screenshots]
What questions should I ask to identify root cause? What additional
metrics or traces would help narrow it down?"
```

> AI is excellent at generating observability config and queries. It cannot replace the judgment of understanding what to measure and why. Observability is a design skill, not just a configuration skill.

---

## Common Traps

### Trap 1: Dashboards Without Alerts

**What happens:** You build beautiful Grafana dashboards. An incident happens at 3am. Nobody sees the dashboard.

**Fix:** Every critical metric must have an alert. Dashboards are for investigation — alerts are for detection.

### Trap 2: Too Many Alerts, All Equal

**What happens:** 50 alerts go off every day. Engineers stop looking at them. A real P1 fires and is ignored.

**Fix:** Three tiers. P1 pages people. P2 sends Slack notification. P3 creates a ticket. Start with fewer than 10 total alerts.

### Trap 3: Alert on Causes, Not Symptoms

**What happens:** "CPU > 80%" fires. On-call engineer checks — CPU is 80% but the service is fine because it is a batch job. Alert ignored. When the service actually degrades, the alert does not fire.

**Fix:** Alert on user-visible symptoms first: error rate, latency, availability. Add cause-based alerts (CPU, memory) only as supplementary data for investigation.

### Trap 4: No Trace Context in Logs

**What happens:** You have traces. You have logs. But when you are in a trace, you cannot find the matching log lines, and vice versa.

**Fix:** Include trace_id and span_id in every log line. The OTel SDK does this automatically if you configure log correlation. In Grafana, this enables one-click jumping from trace to logs.

### Trap 5: Metric Cardinality Explosion

**What happens:** Someone adds a label like `user_id` or `request_path` to a Prometheus metric. Millions of unique time series are created. Prometheus runs out of memory and crashes.

**Fix:** Labels in Prometheus should have bounded cardinality (tens or hundreds of values, not millions). Use traces for high-cardinality data. Common cardinality bombs: user IDs, IP addresses, full URL paths, UUIDs.

### Trap 6: SLO Without Error Budget Policy

**What happens:** You define an SLO, you track it, but when the error budget is exhausted nothing changes. The SLO is decorative.

**Fix:** Define the error budget policy before you define the SLO. "If error budget drops below 50%, the on-call team reviews all pending deploys. If it drops below 10%, all non-critical deploys are frozen."

---

## Mini-Practice (5 Exercises)

### Exercise 1: Prometheus + Grafana + SLO for a Kubernetes Service

**What you build:** Full observability stack for a sample application.

**Requirements:**
- Deploy kube-prometheus-stack via Helm
- Deploy a sample application with Prometheus metrics (e.g., a Go app with prometheus/client_golang)
- Write PromQL queries for: request rate, error rate, P50/P95/P99 latency
- Create a Grafana dashboard with RED method panels
- Define an SLO (e.g., 99.5% success rate) and create an alerting rule for burn rate
- Route the alert to Slack via Alertmanager

**Deliverable:** A Grafana dashboard where you can see instantly if the service is healthy, with an alert that fires when the SLO is at risk.

### Exercise 2: OpenTelemetry End-to-End

**What you build:** Full trace pipeline from application to Grafana.

**Requirements:**
- Pick a language (Go, Python, or Node.js)
- Add OTel SDK to a simple HTTP service (auto-instrumentation is fine)
- Deploy OTel Collector as a DaemonSet or sidecar
- Configure Collector to export traces to Grafana Tempo
- Configure Loki for log collection, ensure trace_id appears in log lines
- In Grafana: set up Tempo + Loki data sources and configure derived fields (click trace_id in log → jump to trace)

**Deliverable:** You can click on a log line in Grafana and jump directly to the trace for that request.

### Exercise 3: SLO-Based Alerting with Pyrra

**What you build:** Multi-burn-rate SLO alerts replacing threshold-based alerts.

**Requirements:**
- Install Pyrra in your K8s cluster
- Define SLOs for 2 services (availability + latency)
- Verify that Pyrra generates Prometheus recording rules and alerting rules
- Trigger SLO violations (send error traffic to your service)
- Observe how burn-rate alerts fire at different windows (5m, 1h, 6h)

**Deliverable:** An Alertmanager that fires alerts based on SLO burn rate, not raw metrics.

### Exercise 4: Incident Simulation and Post-Mortem

**What you build:** Nothing — you simulate a failure and document it.

**Setup:** In your test cluster, deliberately break something: kill a dependency, introduce latency with `tc qdisc`, consume memory until OOMKilled.

**Requirements:**
- Detect the incident using your observability stack (not by looking at the service directly)
- Use metrics → traces → logs to identify root cause
- Write a full post-mortem (timeline, root cause, 3+ action items)
- Time yourself: from "alert fires" to "root cause identified" should be under 15 minutes with good observability

**Deliverable:** A blameless post-mortem document. This is portfolio material.

### Exercise 5: Chaos Engineering with Litmus

**What you build:** Controlled failure injection with verification.

**Requirements:**
- Install Litmus in your K8s cluster
- Define a ChaosEngine experiment: pod-delete for the application you instrumented
- Before the experiment: state your hypothesis ("the service will stay within SLO")
- Run the experiment, observe in Grafana what happens to your metrics
- Verify: did the system behave as hypothesized?
- Document: what broke the hypothesis (if anything) and what you would fix

**Deliverable:** A chaos experiment with a before/after SLO comparison in Grafana.

---

## Job-Ready Signals

### Required:

- [ ] Can deploy Prometheus + Grafana + Alertmanager on Kubernetes
- [ ] Can write PromQL queries for RED method metrics without looking up syntax
- [ ] Can define an SLO and explain what an error budget is to a non-technical stakeholder
- [ ] Can set up at least one actionable alert that routes to Slack or PagerDuty
- [ ] Can query logs in Grafana (Loki) and filter by service, pod, and log level

### Desired:

- [ ] Can instrument an application with OpenTelemetry SDK
- [ ] Can correlate logs + traces + metrics in a single Grafana investigation
- [ ] Can explain the difference between RED and USE methods
- [ ] Can explain tail sampling and why it is better than head-based sampling
- [ ] Can write a post-mortem with root cause and action items
- [ ] Know when to use SLO burn-rate alerts vs threshold-based alerts

### In an Interview You Can:

- [ ] Explain what an error budget is and how it changes the dev/ops dynamic
- [ ] Describe how you would set up observability for a new microservice from scratch
- [ ] Walk through a real incident investigation using metrics, logs, and traces
- [ ] Explain the difference between availability, latency, and throughput SLIs
- [ ] Describe what "blameless post-mortem" means and why it matters

> "If you can explain to an interviewer how an error budget changes team incentives — you understand SRE. Most candidates can name the tools. Very few can explain the philosophy."

---

## Links Inside the Repo

- Previous: [05 - AI & MLOps](../05-ai-and-mlops/) — AI workloads you need to observe
- Related: [02 - Containers & Kubernetes](../02-containers-and-kubernetes/) — where your services run
- Related: [03 - DevSecOps](../03-devsecops/) — security signals and audit logging
- Related: [04 - Infrastructure as Code](../04-infrastructure-as-code/) — provision your monitoring stack with Terraform
- Full path: [90 - Learning Roadmap](../90-roadmap/) — where observability fits in your learning journey
- Avoid traps: [91 - Common Mistakes](../91-mistakes/) — alert fatigue and other observability anti-patterns

**Apply this factor:** [Project A — Full-Stack DevOps Platform](../90-roadmap/#canonical-portfolio-projects) (Prometheus + Grafana + SLO alerts checklist items)
