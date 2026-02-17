# DevOps Roadmap 2026

**A practical mini-course for engineers (and career-switchers) who want to break into DevOps, Platform Engineering, or SRE — and do it right.**

> DevOps is in a rare window of opportunity. Demand far outpaces supply. Positions stay open 3x longer than other IT roles. This won't last forever — but right now, the door is wide open.

---

[English version](en/README.md) | [Русская версия](other/README.md)

---

## Why DevOps, why now

Every company that ships software needs someone who can build, deploy, secure, and observe it reliably. That "someone" is a DevOps / Platform / SRE engineer. The problem? There aren't enough of them.

Three things are happening at once:

- **Cloud migration is accelerating.** Legacy systems are moving to AWS, Azure, and GCP faster than companies can hire people who understand cloud-native infrastructure.
- **Complexity is growing.** Kubernetes, service meshes, IaC, CI/CD, observability stacks — the toolchain keeps expanding and someone has to own it.
- **AI is raising the bar, not lowering it.** AI can generate boilerplate code, but it cannot design a resilient architecture, debug a production outage at 3 AM, or decide how to structure a deployment pipeline for 50 microservices.

This creates a gap. A massive one. And this course helps you close it.

## What this course covers: The 5 Growth Factors

We break the DevOps landscape into **5 factors** that are driving demand and shaping what you need to learn:

| # | Factor | What it means for you |
|---|--------|----------------------|
| 1 | [Cloud Adoption](en/01-cloud-adoption/) | Companies are moving to the cloud — you need to know how cloud works, not just which buttons to click |
| 2 | [Containers & Kubernetes](en/02-containers-and-kubernetes/) | Docker and K8s are table stakes — you must go beyond "hello world" deployments |
| 3 | [DevSecOps](en/03-devsecops/) | Security is shifting left — it's now part of your job, not "someone else's problem" |
| 4 | [Infrastructure as Code](en/04-infrastructure-as-code/) | Manual configuration is dead — everything is code, versioned, reviewed, tested |
| 5 | [AI & MLOps](en/05-ai-and-mlops/) | AI changes how you work AND creates new infrastructure demands (MLOps is 80% DevOps) |

Each factor includes: core skills, what to skip, how deep to go, practical AI workflows, common traps, mini-exercises, and a "job-ready" checklist.

## How AI actually changes DevOps (the practical version)

Forget the hype. Here's what AI means for DevOps in practice:

- **AI as your copilot:** GitHub Copilot, Claude, ChatGPT can write Terraform modules, Dockerfiles, CI pipelines, and Bash scripts faster than you can type them. You still need to review, understand, and debug them.
- **AI cannot replace architects:** Deciding *what* to build, *how* to structure it, and *why* one approach beats another — that's human judgment. AI accelerates the "how to code it" part, not the "what should we build" part.
- **MLOps = new DevOps demand:** Every ML model needs infrastructure to train, deploy, monitor, and retrain. That infrastructure is DevOps. This is a massive growth vector.
- **Your competitive edge:** Engineers who can use AI tools effectively while maintaining deep infrastructure knowledge will outperform both "pure manual" engineers and "AI-only" prompt engineers.

## Why hiring is hard (and why that's your opportunity)

Companies struggle to hire DevOps engineers because:

- The role requires **breadth AND depth** — Linux, networking, cloud, containers, CI/CD, IaC, security, observability. Few people have all of these.
- Most candidates learn tools in isolation ("I completed a Docker course") but can't build an **end-to-end pipeline** from scratch.
- Senior engineers are expensive and rarely on the market. Companies need mid-level engineers who can grow — that's the sweet spot for career-switchers.

## The roadmap (how to actually learn this)

Don't learn randomly. Stack your knowledge in layers:

**Phase 0 → 1: Foundations (2–4 weeks)**
Linux, networking basics, Git, Bash/Python scripting

**Phase 1 → 2: Core tools (6–10 weeks)**
Docker, CI/CD (GitHub Actions or GitLab CI), one cloud provider (start with AWS)

**Phase 2 → 3: Scale & automate (3–6 months)**
Kubernetes, Terraform, observability (Prometheus + Grafana), security basics

See the full [Learning Roadmap](en/90-roadmap/) for skill layering, depth budgets, portfolio projects, and skill-combination paths.

## How deep to go & how to combine skills

Not everything deserves equal depth. A rough guide:

| Skill | Beginner | Strong | Expert |
|-------|----------|--------|--------|
| Linux | Know basic commands | Troubleshoot production issues | Kernel tuning, custom builds |
| Networking | Understand TCP/IP, DNS, HTTP | Configure load balancers, firewalls | Design multi-region network architectures |
| Docker | Write Dockerfiles, run containers | Multi-stage builds, security scanning | Custom runtimes, BuildKit internals |
| Kubernetes | Deploy apps, use kubectl | Helm, operators, RBAC, networking | Custom controllers, scheduler tuning |
| CI/CD | Build simple pipelines | Matrix builds, caching, secrets mgmt | Design org-wide pipeline platforms |
| Terraform | Write basic modules | State management, workspaces, testing | Provider development, large-scale modules |
| Observability | Set up Prometheus + Grafana | Custom metrics, alerting, SLOs | Distributed tracing, eBPF, OpenTelemetry |

**Skill combinations that employers love:**
- Platform Engineering + Security (DevSecOps platform builder)
- SRE + Observability (reliability & incident response)
- Cloud Architecture + IaC (infrastructure designer)
- GitOps + Kubernetes (deployment automation specialist)

## Mistakes to avoid

1. **"Isolated Course Hell"** — Learning Docker, then K8s, then Terraform in separate courses without ever connecting them. Fix: build end-to-end projects.
2. **Sandbox dependency** — Only practicing in pre-configured playgrounds. Fix: build from scratch on a real cloud account.
3. **Ignoring opportunity cost** — Spending 2 years on free scattered resources instead of 6 focused months. The salary delta is your real cost.
4. **Learning in silence** — Nobody knows you exist. Fix: share projects on GitHub and LinkedIn. Recruiters search there.

See the full [Mistakes Guide](en/91-mistakes/) for more traps and how to avoid them.

## The future is bright

DevOps is not going away. It's evolving:

- **Platform Engineering** is the next evolution — building internal developer platforms that make other teams faster.
- **AI-native infrastructure** (GPU clusters, model serving, feature stores) is creating entirely new categories of DevOps work.
- **The "shift everywhere" movement** — security, testing, observability, and cost optimization are all shifting into the CI/CD pipeline. Someone has to build and maintain those pipelines. That someone is you.

The engineers who invest now will ride this wave for the next decade.

---

## Course structure

```
DevOpsRoadmap2026/
├── README.md              ← you are here
├── en/                    ← English version
│   ├── README.md
│   ├── 01-cloud-adoption/
│   ├── 02-containers-and-kubernetes/
│   ├── 03-devsecops/
│   ├── 04-infrastructure-as-code/
│   ├── 05-ai-and-mlops/
│   ├── 90-roadmap/
│   └── 91-mistakes/
└── other/                 ← Русская версия
    ├── README.md
    ├── 01-cloud-adoption/
    ├── 02-containers-and-kubernetes/
    ├── 03-devsecops/
    ├── 04-infrastructure-as-code/
    ├── 05-ai-and-mlops/
    ├── 90-roadmap/
    └── 91-mistakes/
```

**Where to start:** Pick your language → read the landing page → follow the modules in order, or jump to the factor that matters most to you.
