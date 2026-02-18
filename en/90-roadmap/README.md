# The DevOps Learning Roadmap 2026

![Learning Roadmap](roadmap.png)

---

Here is the step-by-step plan: from zero to job-ready. Do not try to learn everything simultaneously. There is a sequence that works.

Phase 0 -> 1 -> 2 -> 3. From foundations to a production-ready DevOps engineer.

---

## Phase 0 -> 1: Foundations (2-4 weeks)

**Goal:** Build the foundation without which everything else will be built on sand.

### What to Learn

#### Linux (5-7 days)
```
Linux skills:
├── Command line
│   ├── Navigation: cd, ls, pwd, find, which
│   ├── Files: cp, mv, rm, mkdir, chmod, chown
│   ├── Viewing: cat, less, head, tail, grep, awk
│   ├── Processes: ps, top, htop, kill, systemctl
│   └── Pipes and redirect: |, >, >>, 2>&1
├── File system
│   ├── Structure: /, /etc, /var, /home, /tmp
│   ├── Permissions: rwx, chmod, chown
│   └── Disk: df, du, mount
├── Networking
│   ├── Diagnostics: ping, traceroute, dig, nslookup
│   ├── Connections: curl, wget, ss, netstat
│   └── Configuration: ip addr, /etc/hosts, /etc/resolv.conf
├── Services
│   ├── systemd: systemctl start/stop/enable/status
│   ├── Logs: journalctl, /var/log/
│   └── cron: crontab -e
└── SSH
    ├── ssh-keygen
    ├── ssh-copy-id
    └── ~/.ssh/config
```

#### Networking (3-5 days)
```
Networking fundamentals:
├── OSI Model (focus on L3-L7)
├── IP addressing: IPv4, CIDR, subnetting
├── DNS: A, CNAME, MX, TXT, NS, TTL
├── HTTP/HTTPS: methods, status codes, headers
├── TCP vs UDP
├── Ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 5432 (PostgreSQL)
├── Firewall: iptables basics, Security Groups (AWS)
├── NAT: what it is and why
├── Load Balancing: L4 vs L7
└── TLS/SSL: certificates, handshake (high-level)
```

#### Git (2-3 days)
```
Git skills:
├── Basics: init, clone, add, commit, push, pull
├── Branching: branch, checkout, merge
├── Collaborative: pull request, code review, merge conflicts
├── Useful: stash, rebase (basic), cherry-pick
├── .gitignore
├── Conventional commits (feat:, fix:, docs:)
└── Git workflow: trunk-based or GitFlow
```

#### Scripting: Bash + Python (3-5 days)
```
Bash:
├── Variables, conditionals (if/else), loops (for, while)
├── Functions
├── Script arguments ($1, $2, $@)
├── Exit codes
├── Working with files and text
└── Practice: script for backup, monitoring, deployment

Python (basics):
├── Syntax, data types, functions
├── File handling (open, read, write)
├── JSON/YAML parsing
├── Requests (HTTP)
├── subprocess (calling shell commands)
└── Boto3 (AWS SDK) -- for later cloud work
```

### How to Know This Phase is Complete

- [ ] Can SSH into a server and configure a basic web server (Nginx)
- [ ] Can explain what happens when you run `curl https://example.com` (DNS -> TCP -> TLS -> HTTP)
- [ ] Can create a PR, do a code review, and resolve a merge conflict
- [ ] Wrote a Bash script that automates a routine task (backup, health check)
- [ ] Can explain: what CIDR /24 is, why NAT exists, how DNS works

---

## Phase 1 -> 2: Core Tools (6-10 weeks)

**Goal:** Master the tools used in every DevOps team.

### What to Learn

#### Docker (2-3 weeks) -> [Factor 2](../02-containers-and-kubernetes/)
```
Docker plan:
Week 1:
├── Dockerfile: FROM, RUN, COPY, CMD, ENTRYPOINT
├── Multi-stage builds
├── Docker CLI: build, run, exec, logs, inspect
├── Docker Compose for local development
└── .dockerignore

Week 2:
├── Volumes and bind mounts
├── Networks (bridge, host)
├── Health checks
├── Image size optimization
├── Docker Registry (Docker Hub, ECR)
└── Security: non-root, scanning with Trivy

Week 3 (if needed):
├── Docker Compose for complex setups
├── Logging drivers
└── Resource limits
```

#### CI/CD (2-3 weeks)
```
CI/CD plan:
Week 1: Concepts
├── What is CI: build -> test -> lint -> scan
├── What is CD: deploy to staging -> testing -> production
├── Continuous Delivery vs Continuous Deployment
├── Pipeline triggers: push, PR, tag, schedule
└── Artifacts: Docker images, Helm charts

Week 2: GitHub Actions (or GitLab CI)
├── Workflow syntax: jobs, steps, actions
├── Secrets and environment variables
├── Matrix builds
├── Caching for speedup
├── Reusable workflows
└── Self-hosted runners (when needed)

Week 3: Practical pipeline
├── Build and push Docker image
├── Run tests (unit, integration)
├── Security scan (Trivy, Checkov)
├── Deploy to staging (K8s or ECS)
├── Smoke tests
└── Manual approval -> production
```

#### Cloud Provider (3-4 weeks) -> [Factor 1](../01-cloud-adoption/)
```
AWS plan (recommended):
Week 1: Basics
├── AWS Account + MFA + billing alert
├── IAM: users, groups, roles, policies
├── EC2: launch, SSH, Security Groups
├── S3: create, upload, permissions
└── VPC: subnets, route tables, IGW

Week 2: Services
├── RDS: launch PostgreSQL, connect
├── ALB: target groups, health checks
├── Route 53: hosted zone, DNS records
├── CloudWatch: metrics, logs, alarms
└── Secrets Manager

Week 3-4: Practice
├── Deploy a 3-tier architecture
├── Everything via CLI (not console!)
├── Set up monitoring and alerts
└── Document the architecture
```

### How to Know This Phase is Complete

- [ ] Containerized an application and pushed the image to a registry
- [ ] Built a CI/CD pipeline that builds, tests, and deploys
- [ ] Deployed an application in the cloud (EC2 or ECS) with ALB and RDS
- [ ] Set up monitoring (CloudWatch alerts) and logging
- [ ] Can explain: how a CI/CD pipeline works from commit to production

---

## Phase 2 -> 3: Scale & Automate (3-6 months)

**Goal:** Become a production-ready DevOps engineer. This is the level at which you get hired.

### What to Learn

#### Kubernetes (4-6 weeks) -> [Factor 2](../02-containers-and-kubernetes/)
```
K8s plan:
Weeks 1-2: Core objects
├── Pod, Deployment, Service, Ingress
├── ConfigMap, Secret
├── Namespace, RBAC
├── kubectl: get, describe, logs, exec, port-forward
└── Minikube or kind for practice

Weeks 3-4: Production skills
├── Helm charts
├── HPA, VPA
├── Network Policies
├── PersistentVolumes
├── Liveness/Readiness/Startup probes
└── Resource requests and limits

Weeks 5-6: Advanced
├── ArgoCD (GitOps)
├── Ingress controllers (NGINX)
├── cert-manager (TLS)
├── Troubleshooting patterns
└── EKS or GKE (managed K8s)
```

#### Terraform (3-4 weeks) -> [Factor 4](../04-infrastructure-as-code/)
```
Terraform plan:
Weeks 1-2: Basics
├── HCL syntax
├── Resources, Variables, Outputs
├── Providers
├── State and remote backend
├── terraform init/plan/apply/destroy
└── terraform import

Weeks 3-4: Advanced
├── Modules (creation and usage)
├── for_each, count, dynamic blocks
├── CI/CD for Terraform
├── tflint, Checkov
└── State management (mv, rm, import)
```

#### Monitoring and Observability (2-3 weeks)
```
Observability plan:
├── Three pillars: Metrics, Logs, Traces
├── Prometheus + Grafana
│   ├── Installation (Helm)
│   ├── Service monitors
│   ├── PromQL basics
│   └── Dashboards and alerts
├── ELK or Loki for logs
│   ├── Collecting logs from K8s
│   ├── Filtering and searching
│   └── Log-based alerts
├── Alertmanager
│   ├── Routing rules
│   ├── Integration with Slack/PagerDuty
│   └── Silence and inhibit
└── SLI/SLO/SLA
    ├── What they are and why
    ├── Defining SLOs for a service
    └── Error budget
```

#### Security Basics (2-3 weeks) -> [Factor 3](../03-devsecops/)
```
Security plan:
├── Secret management (Vault or cloud-native)
├── Image scanning (Trivy)
├── RBAC in K8s and cloud
├── Network Policies
├── Pre-commit hooks (gitleaks)
└── Basic security best practices
```

### How to Know This Phase is Complete

- [ ] Deployed a microservice application (3+ services) on K8s with Helm
- [ ] Built full infrastructure through Terraform (VPC + EKS + RDS)
- [ ] Set up monitoring with Prometheus + Grafana with alerts
- [ ] Implemented basic security: secrets management, image scanning, RBAC
- [ ] Built an end-to-end pipeline: code -> PR -> CI -> staging -> production
- [ ] Wrote runbooks for 3+ common incidents
- [ ] Can explain your project's architecture and every decision

---

## Skills Dependency Graph

```
Linux/Networking (foundation)
    |
    ├── Git ─────────────────────────────┐
    │                                    │
    ├── Bash/Python ────────────────┐    │
    │                               │    │
    ├── Docker ─────────────────────┤    │
    │     │                         │    │
    │     ├── Kubernetes ───────────┤    │
    │     │     │                   │    │
    │     │     ├── Helm ───────┐   │    │
    │     │     │               │   │    │
    │     │     ├── ArgoCD ────────────── CI/CD
    │     │     │               │   │    │
    │     │     └── Network ── Security  │
    │     │           Policies   │       │
    │     │                      │       │
    │     └── Image ── Trivy ────┘       │
    │           Scanning                  │
    │                                     │
    ├── Cloud (AWS) ──────────────────────┤
    │     │                               │
    │     ├── IAM ──────── Security ──────┘
    │     │
    │     ├── VPC/Networking
    │     │
    │     └── Managed Services (RDS, ECS, EKS)
    │           │
    │           └── Terraform ───── Remote State
    │                 │
    │                 ├── Modules
    │                 │
    │                 └── CI/CD for IaC
    │
    └── Monitoring
          ├── Prometheus + Grafana
          ├── Logging (Loki/ELK)
          └── Alerting
```

**Rule:** Do not move to the next level until the previous one is stable. Docker before K8s. K8s before Helm. Cloud before Terraform.

---

## Depth Budget: How Much Time to Dedicate to Each Area

Time distribution for learning by area:

| Area | % of Time | Rationale |
|------|-----------|-----------|
| Linux / Networking / Git | 10% | Foundation. Do it well once -- and it lasts a lifetime |
| Docker / Containers | 15% | Basic minimum. Used every day |
| Kubernetes | 20% | The most complex and most valuable skill |
| Cloud (AWS) | 20% | Foundation of all infrastructure |
| IaC (Terraform) | 15% | Mandatory for any serious position |
| CI/CD | 10% | Important but less complex |
| Security | 5% | Basics are mandatory, depth is for specialization |
| Monitoring / Observability | 5% | Basics are mandatory, depth comes with experience |

**Note:** This is the base distribution. If you specialize (e.g., Platform Engineering) the distribution will change.

---

## Skill Combination Paths (Specializations)

### 1. Platform Engineering + Security

```
Focus:
├── Kubernetes (deep)
├── Terraform (deep)
├── ArgoCD / Flux (GitOps)
├── OPA / Kyverno (Policy-as-Code)
├── Vault (Secret Management)
├── Network Policies + Service Mesh
└── Internal Developer Platform (Backstage)

Role: Platform Engineer / DevSecOps Engineer
Salary premium: +20-35% above base DevOps
```

### 2. SRE + Observability

```
Focus:
├── Prometheus + Grafana (deep)
├── OpenTelemetry (traces)
├── Logging (Loki / ELK)
├── SLI / SLO / Error budgets
├── Incident management (PagerDuty, Opsgenie)
├── Chaos engineering (Litmus, Chaos Monkey)
└── Post-mortems and blameless culture

Role: Site Reliability Engineer (SRE)
Salary premium: +15-30% above base DevOps
```

### 3. Cloud + IaC

```
Focus:
├── AWS (deep) + GCP or Azure (basic)
├── Terraform (deep, including modules and tests)
├── Cloud Architecture (Well-Architected Framework)
├── Cost optimization (FinOps)
├── Multi-account strategy
├── Migration (on-premise -> cloud)
└── DR and Business Continuity

Role: Cloud Engineer / Cloud Architect
Salary premium: +25-40% above base DevOps
```

### 4. GitOps + Kubernetes

```
Focus:
├── Kubernetes (deep, including operators)
├── ArgoCD / Flux (deep)
├── Helm + Kustomize
├── Progressive Delivery (Argo Rollouts, Flagger)
├── Multi-cluster management
├── Service Mesh (Istio / Linkerd)
└── K8s platform for developers

Role: Kubernetes Platform Engineer
Salary premium: +20-35% above base DevOps
```

---

## Portfolio Projects

### Project 1: "Full-Stack DevOps Platform" (4-6 weeks)

**Description:** Complete infrastructure for a microservice application.

```
Components:
├── Terraform: VPC + EKS + RDS + monitoring
├── K8s: 3 microservices (API + Worker + Frontend)
├── Helm: charts for each service
├── CI/CD: GitHub Actions -> build -> test -> scan -> deploy
├── ArgoCD: GitOps for K8s deployments
├── Monitoring: Prometheus + Grafana + Loki
├── Security: Trivy, RBAC, Network Policies, Vault
└── Documentation: Architecture Decision Records

Demonstrates: All 5 factors. This is your "flagship" project.
```

### Project 2: "IaC Library" (2-3 weeks)

**Description:** A library of Terraform modules with tests.

```
Components:
├── 5+ modules: VPC, EKS, RDS, S3, IAM
├── Each module: variables, outputs, documentation
├── Tests: Terratest for each module
├── CI: automatic testing on PR
├── Versioning: semantic versioning, changelog
└── Registry: GitHub Releases or Terraform Registry

Demonstrates: Factor 4 (IaC) deeply. Shows maturity of approach.
```

### Project 3: "Security Pipeline" (2-3 weeks)

**Description:** A full security pipeline from commit to runtime.

```
Components:
├── Pre-commit: gitleaks, hadolint
├── CI: Trivy (images), Checkov (IaC), Semgrep (SAST)
├── Signing: Cosign for images
├── Admission: Kyverno policies (no root, no latest, require limits)
├── Runtime: Falco for anomaly detection
├── Secrets: Vault + External Secrets Operator
└── Dashboard: security posture overview

Demonstrates: Factor 3 (DevSecOps) deeply. Sets you apart from other candidates.
```

### Project 4: "MLOps Pipeline" (3-4 weeks)

**Description:** A full pipeline for ML: from training to serving.

```
Components:
├── Training: containerized training on GPU
├── Tracking: MLflow for experiments
├── Registry: MLflow Model Registry
├── Serving: KServe or vLLM on K8s
├── CI/CD: train -> evaluate -> register -> deploy
├── Monitoring: model performance + infrastructure metrics
└── Auto-scaling: HPA on custom metrics

Demonstrates: Factor 5 (AI & MLOps). Shows that you are ready for an MLOps role.
```

### Project 5: "Incident Response System" (1-2 weeks)

**Description:** A system for incident management.

```
Components:
├── Alerting: Prometheus -> Alertmanager -> Slack/PagerDuty
├── Runbooks: documented procedures for common incidents
├── Dashboards: Grafana with SLI/SLO
├── Post-mortem template
├── Chaos testing: Litmus or manual fault injection
└── Documentation: SLA, escalation matrix

Demonstrates: SRE mindset. Shows maturity and operational experience.
```

---

## Public Presence Recommendations

Learning without public presence is like training without matches. Your projects must be visible.

1. **GitHub** -- all projects in public repositories with good READMEs
2. **LinkedIn** -- a post about every completed project (1-2 times per week)
3. **Blog / Dev.to** -- technical articles about what you learned (1-2 per month)
4. **YouTube / Telegram** -- video overviews or a channel with notes (optional, but powerful)

More about the mistakes of "silent learning" and others in [Common Mistakes](../91-mistakes/).

---

## Timeline Summary

```
Week 1-4:     Phase 0->1 (Foundations)
              Linux -> Networking -> Git -> Bash
              OUTPUT: Server setup script in Git repo

Week 5-14:    Phase 1->2 (Core Tools)
              Docker -> CI/CD -> Cloud (AWS)
              OUTPUT: Containerized app with CI/CD pipeline on AWS

Month 4-9:    Phase 2->3 (Scale & Automate)
              K8s -> Terraform -> Observability -> Security -> GitOps
              OUTPUT: Full platform project (Portfolio Project 1)

Month 9+:     Specialization
              Choose a path. Build portfolio. Apply for roles.
              OUTPUT: 2+ portfolio projects, active GitHub, job applications
```

---

## What to Do Right Now

1. Figure out which phase you are in (be honest)
2. Read the factor module for your current skill gaps
3. Read the [Common Mistakes](../91-mistakes/) guide so you do not waste time
4. Start the first exercise in your current phase
5. Push your work to GitHub -- public repos only

You have the map. Start walking.

---

## Links Inside the Repo

- Factor 1: [Cloud Adoption](../01-cloud-adoption/)
- Factor 2: [Containers & Kubernetes](../02-containers-and-kubernetes/)
- Factor 3: [DevSecOps](../03-devsecops/)
- Factor 4: [Infrastructure as Code](../04-infrastructure-as-code/)
- Factor 5: [AI & MLOps](../05-ai-and-mlops/)
- Common Mistakes: [91-mistakes](../91-mistakes/)
- Back to [course overview](../README.md)
