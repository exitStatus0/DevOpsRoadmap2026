# The DevOps Learning Roadmap 2026

> VOICEOVER: This is the map. Not a list of tools. Not a collection of "learn this." A structured path with phases, timelines, dependencies, and clear checkpoints so you always know where you are and where you are going.

---

## How This Roadmap Works

The roadmap has 3 phases. Each phase builds on the previous one. Do NOT skip ahead — the skills compound, and gaps in Phase 1 will haunt you in Phase 3.

Each phase has:
- **Duration** — realistic time investment with consistent daily study (1-3 hours/day)
- **Skills** — what you learn and in what order
- **"Done" criteria** — how you know you are ready to move on
- **Output** — what you should have built by the end

> ON SCREEN: "Phase 0→1 → Phase 1→2 → Phase 2→3. No shortcuts."

---

## Phase 0→1: Foundations (2-4 weeks)

**The goal:** Build the base that everything else depends on. Without these skills, every tool you learn later will be harder than it needs to be.

### What to learn (in order):

**1. Linux (5-7 days)**
- File system navigation, permissions (`chmod`, `chown`)
- Process management (`ps`, `top`, `kill`, `systemctl`)
- Package management (`apt`, `yum`)
- Text processing (`grep`, `awk`, `sed`, `jq`)
- Shell basics: pipes, redirects, environment variables
- SSH: keys, config, tunneling
- File editing: `vim` or `nano` — you will need one

**2. Networking (3-5 days)**
- TCP/IP model: what happens when you type a URL
- DNS: how domain names resolve
- HTTP/HTTPS: methods, status codes, headers, TLS
- Ports, firewalls, NAT
- Subnets, CIDR notation, routing basics
- Tools: `ping`, `traceroute`, `curl`, `dig`, `netstat`/`ss`

**3. Git (2-3 days)**
- Commits, branches, merges, rebases
- Pull requests / merge requests workflow
- Conflict resolution
- `.gitignore`, tags, stashing
- GitHub/GitLab: forks, issues, PRs

**4. Scripting — Bash (3-5 days)**
- Variables, conditionals, loops
- Functions
- Argument parsing
- Error handling (`set -e`, `trap`)
- Writing automation scripts (backup, log rotation, health check)
- Reading and understanding other people's scripts

**Optional but helpful:** Basic Python scripting (you will use it later for automation and MLOps)

### What "Done" looks like:
- [ ] Can SSH into a remote server and troubleshoot a service that is down
- [ ] Can explain how a web request travels from browser to server and back
- [ ] Can use Git to collaborate on a project with branches and PRs
- [ ] Can write a Bash script that automates a repetitive task
- [ ] Can navigate a Linux file system, find logs, and analyze them

### Phase 0→1 Output:
**Build this:** A Bash script that sets up a fresh Linux server — installs packages, creates users, configures SSH keys, sets up firewall rules, and creates a basic Nginx website. Store it in a Git repository with a README.

---

## Phase 1→2: Core Tools (6-10 weeks)

**The goal:** Learn the 3 tools that form the core of modern DevOps work.

### What to learn (in order):

**1. Docker (2-3 weeks)** — See [Factor 2: Containers & Kubernetes](../02-containers-and-kubernetes/)
- Write Dockerfiles (multi-stage builds)
- Docker Compose for multi-service applications
- Image optimization and security
- Container networking and volumes
- Working with registries

**2. CI/CD (2-3 weeks)**
- Pick ONE platform: GitHub Actions (recommended) or GitLab CI
- Pipeline structure: stages, jobs, dependencies
- Build, test, scan, deploy stages
- Secrets in CI (not hardcoded — see [Factor 3: DevSecOps](../03-devsecops/))
- Artifact management
- Deployment strategies (rolling, blue-green concepts)

**3. Cloud Provider Basics (2-4 weeks)** — See [Factor 1: Cloud Adoption](../01-cloud-adoption/)
- AWS account setup (with billing alerts!)
- Core services: EC2, S3, VPC, IAM, RDS
- CLI-first approach
- Basic networking: VPC, subnets, security groups

### What "Done" looks like:
- [ ] Can containerize any application and explain every Dockerfile instruction
- [ ] Can set up a CI/CD pipeline that builds, tests, and deploys automatically
- [ ] Can deploy a web application on AWS using CLI
- [ ] Can set up a VPC with public and private subnets
- [ ] Can write IAM policies following least privilege

### Phase 1→2 Output:
**Build this:** A containerized web application (frontend + backend + database) with a CI/CD pipeline that:
1. Runs tests on PR
2. Builds Docker images
3. Scans images for vulnerabilities (Trivy)
4. Deploys to AWS (EC2 or ECS)
Store everything in Git. This is your first portfolio project.

---

## Phase 2→3: Scale & Automate (3-6 months)

**The goal:** Move from "I can deploy things" to "I can build and manage production infrastructure."

### What to learn (in order):

**1. Kubernetes (4-6 weeks)** — See [Factor 2: Containers & Kubernetes](../02-containers-and-kubernetes/)
- Core objects: Pods, Deployments, Services, Ingress
- ConfigMaps, Secrets, RBAC
- Helm charts
- Networking and NetworkPolicies
- Health checks, resource management
- Debugging skills

**2. Terraform (4-6 weeks)** — See [Factor 4: Infrastructure as Code](../04-infrastructure-as-code/)
- HCL basics, providers, resources
- State management (remote state, locking)
- Modules and project structure
- CI/CD for Terraform (plan on PR, apply on merge)
- Testing (validate, Checkov, Terratest)

**3. Observability (2-3 weeks)**
- Metrics: Prometheus + Grafana
- Logs: Loki or ELK stack (EFK for Kubernetes)
- Traces: Jaeger or Tempo (basic understanding)
- Alerting: alert rules, routing, on-call rotation
- The 4 golden signals: latency, traffic, errors, saturation

**4. Security Basics (2-3 weeks)** — See [Factor 3: DevSecOps](../03-devsecops/)
- Secret management (Vault or AWS Secrets Manager)
- Image scanning in CI
- RBAC for K8s and cloud
- Network policies
- IaC security scanning (Checkov)

**5. GitOps (1-2 weeks)** — See [Factor 4: Infrastructure as Code](../04-infrastructure-as-code/)
- ArgoCD or Flux installation and configuration
- Application manifests
- Sync policies and drift detection

### What "Done" looks like:
- [ ] Can deploy and manage a multi-service application on Kubernetes
- [ ] Can write Terraform for a complete infrastructure stack (VPC + EKS + RDS)
- [ ] Can set up monitoring with alerts for a production application
- [ ] Can implement security scanning and secret management in the pipeline
- [ ] Can explain and set up GitOps deployment
- [ ] Can troubleshoot a production incident using logs, metrics, and K8s tools

### Phase 2→3 Output:
**Build this:** A complete platform project:
- Terraform creates: VPC, EKS cluster, RDS, S3
- ArgoCD deploys: multi-service application from Git
- CI/CD: GitHub Actions builds, scans, and pushes images
- Monitoring: Prometheus + Grafana with dashboards and alerts
- Security: Trivy scanning, RBAC, network policies, secrets in Vault
This is your flagship portfolio project.

---

## Skills Dependency Graph

```
                     Linux + Networking + Git + Bash
                          |            |
                     +----+----+  +----+----+
                     |         |  |         |
                   Docker    CI/CD    Cloud (AWS)
                     |         |       |
                     +----+----+--+----+
                          |       |
                     Kubernetes  Terraform
                      |      |       |
            +---------+      |       +--------+
            |                |                |
     Helm + Ingress    Observability    Remote State
            |          (Prometheus/     + Modules
            |           Grafana)            |
            +--------+---+-----+-----------+
                     |         |
                  DevSecOps   GitOps
                  (Scanning,  (ArgoCD/
                   RBAC,       Flux)
                   Policies)      |
                     |            |
                     +-----+------+
                           |
                      AI / MLOps
                    (AI copilot +
                     ML pipelines)
```

**Reading the graph:**
- Learn top-to-bottom
- Skills at the same level can be learned in parallel
- Do not start a skill until its dependencies above are at "beginner" level minimum
- DevSecOps and GitOps require strong K8s + Terraform
- AI/MLOps is most powerful when you have all other skills to apply it to

---

## Depth Budget Guidance

Not every skill deserves the same amount of time. Here is how to allocate your learning budget:

| Skill Area | % of Time | Rationale |
|-----------|-----------|-----------|
| **Kubernetes** | 25% | Most in-demand, most complex, most interview questions |
| **Cloud (AWS)** | 20% | Foundation for everything, broad surface area |
| **Terraform / IaC** | 20% | Non-negotiable for any DevOps role |
| **Docker / Containers** | 10% | Essential but learnable quickly |
| **CI/CD** | 10% | High ROI, relatively straightforward |
| **Security / DevSecOps** | 8% | Differentiator, growing in importance |
| **Observability** | 5% | Critical but learn on-the-job after basics |
| **AI / MLOps** | 2% (AI copilot throughout) | AI tool usage is continuous, not a separate block |

**Important note about AI:** The 2% does not mean AI is unimportant. AI copilot usage should be integrated into every skill area from day one. The 2% refers to dedicated MLOps study time. You should be using AI tools while learning everything else.

---

## Skill Combination Paths

Once you reach Phase 2→3, you can specialize. Here are 4 high-value paths:

### Path 1: Platform Engineering + Security
**Focus:** Build internal platforms that are secure by default.
**Key skills:** Terraform modules, K8s operators, OPA/Kyverno, Vault, RBAC at scale
**Roles:** Platform Engineer, DevSecOps Engineer
**Add to Phase 2→3:** Deep Terraform module design, Crossplane, policy-as-code, supply chain security
**Salary premium:** 15-25% above general DevOps
**Links:** [Factor 3: DevSecOps](../03-devsecops/) + [Factor 4: IaC](../04-infrastructure-as-code/)

### Path 2: SRE + Observability
**Focus:** Keep production running. Manage reliability at scale.
**Key skills:** Prometheus/Grafana/Loki, SLOs/SLIs, incident management, chaos engineering, on-call processes
**Roles:** Site Reliability Engineer, Production Engineer
**Add to Phase 2→3:** SLO-based alerting, Chaos Monkey/Litmus, distributed tracing, capacity planning
**Salary premium:** 10-20% above general DevOps
**Links:** [Factor 1: Cloud](../01-cloud-adoption/) + [Factor 2: K8s](../02-containers-and-kubernetes/)

### Path 3: Cloud Architecture + IaC
**Focus:** Design and automate cloud infrastructure at organizational scale.
**Key skills:** Multi-account AWS strategies, landing zones, Terraform at scale, cost optimization, networking
**Roles:** Cloud Architect, Infrastructure Engineer
**Add to Phase 2→3:** AWS Organizations, Control Tower, Transit Gateway, advanced Terraform (custom providers, Terragrunt)
**Salary premium:** 20-30% above general DevOps
**Links:** [Factor 1: Cloud](../01-cloud-adoption/) + [Factor 4: IaC](../04-infrastructure-as-code/)

### Path 4: GitOps + Kubernetes
**Focus:** Master the Kubernetes ecosystem and GitOps-driven deployment.
**Key skills:** ArgoCD ApplicationSets, Flux, multi-cluster management, Helm, Kustomize, service mesh
**Roles:** Kubernetes Engineer, GitOps Engineer
**Add to Phase 2→3:** Multi-cluster ArgoCD, Istio/Linkerd, Karpenter, custom controllers, eBPF
**Salary premium:** 15-25% above general DevOps
**Links:** [Factor 2: K8s](../02-containers-and-kubernetes/) + [Factor 4: IaC](../04-infrastructure-as-code/)

---

## Portfolio Projects

Build at least 2 of these. They demonstrate real skills to employers.

### Project 1: "Production-Ready Platform" (Flagship — build this one)
**What:** Complete infrastructure + application deployment pipeline.
**Components:**
- Terraform: VPC + EKS + RDS + S3 (modular, multi-environment)
- ArgoCD: deploys application from Git with auto-sync
- Application: 3-service app (frontend, API, worker) on K8s with Helm
- CI/CD: GitHub Actions — build, scan, push images, update manifests
- Monitoring: Prometheus + Grafana with custom dashboards and alerts
- Security: Trivy scanning, RBAC, NetworkPolicies, Secrets Manager

**Skills demonstrated:** All 5 factors. This is a complete project.
**Time estimate:** 2-4 weeks if you have completed Phase 2→3.

### Project 2: "Self-Healing Infrastructure"
**What:** Infrastructure that detects and recovers from failures automatically.
**Components:**
- K8s cluster with HPA and cluster autoscaler
- PodDisruptionBudgets for controlled maintenance
- Liveness/readiness probes that catch real issues
- Prometheus alerting with automated runbooks
- Chaos engineering: randomly kill pods, verify recovery
- GitOps: manual changes are automatically reverted

**Skills demonstrated:** K8s deep knowledge, observability, reliability engineering.
**Time estimate:** 1-2 weeks.

### Project 3: "Secure CI/CD Pipeline"
**What:** A hardened CI/CD pipeline with security at every stage.
**Components:**
- Pre-commit: gitleaks, linting
- Build: multi-stage Docker, SBOM generation
- Scan: Trivy (images), Checkov (IaC), Snyk (dependencies)
- Sign: Cosign image signing
- Deploy: to K8s with ArgoCD, verified signatures
- Runtime: Falco monitoring

**Skills demonstrated:** DevSecOps, supply chain security, CI/CD expertise.
**Time estimate:** 1-2 weeks.

### Project 4: "MLOps Pipeline" (Advanced)
**What:** End-to-end ML model deployment and monitoring.
**Components:**
- Model: use a pre-trained HuggingFace model (do not train your own)
- Serving: BentoML or KServe on Kubernetes
- Pipeline: GitHub Actions for model CI/CD
- Monitoring: request latency, error rate, model output distribution
- A/B: traffic splitting between model versions
- GPU: scheduled on GPU nodes (or document GPU config if cost-prohibitive)

**Skills demonstrated:** MLOps, K8s advanced, AI/ML infrastructure.
**Time estimate:** 2-3 weeks.

---

## Timeline Summary

```
Week 1-4:     Phase 0→1 (Foundations)
              Linux → Networking → Git → Bash
              OUTPUT: Server setup script in Git repo

Week 5-14:    Phase 1→2 (Core Tools)
              Docker → CI/CD → Cloud (AWS)
              OUTPUT: Containerized app with CI/CD pipeline on AWS

Month 4-9:    Phase 2→3 (Scale & Automate)
              K8s → Terraform → Observability → Security → GitOps
              OUTPUT: Full platform project (Portfolio Project 1)

Month 9+:     Specialization
              Choose a path. Build portfolio. Apply for roles.
              OUTPUT: 2+ portfolio projects, active GitHub, job applications
```

> VOICEOVER: Nine months. That is the realistic timeline from zero to job-ready, studying 1-3 hours per day. Some people do it faster. Some need more time. But this is the path — and every week you invest moves you forward. Do not spend that time on the mistakes we cover in the next section.

---

## What to Do Right Now

1. Figure out which phase you are in (be honest)
2. Read the factor module for your current skill gaps
3. Read the [Common Mistakes](../91-mistakes/) guide so you do not waste time
4. Start the first exercise in your current phase
5. Push your work to GitHub — public repos only

You have the map. Start walking.
