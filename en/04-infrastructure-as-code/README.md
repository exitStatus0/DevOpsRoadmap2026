# Factor 4: Infrastructure as Code

> VOICEOVER: If you are still SSHing into servers and running commands manually, you are doing archaeology, not engineering. In 2026, infrastructure is code. It is versioned, reviewed, tested, and deployed through pipelines — exactly like application code. This is not optional. It is the baseline.

---

## Why It Matters in 2026

Manual infrastructure management does not scale. It never did, but companies tolerated it when they had 5 servers. Now they have 500 containers across 3 environments with auto-scaling, and manual configuration is a liability.

**The business case is simple:**
- **Reproducibility:** Spin up an identical environment in minutes, not days
- **Auditability:** Every change is tracked in Git. You know who changed what, when, and why.
- **Speed:** A new environment goes from a 2-week ticket to a 15-minute pipeline run
- **Disaster recovery:** Your entire infrastructure is a Git repo. Lose a region, rebuild it from code.
- **Collaboration:** Infrastructure changes go through code review. No more "someone changed the firewall rule and nobody knows who"

**Market reality:**
- IaC is mentioned in 70%+ of DevOps job postings
- Terraform is the most in-demand IaC tool by a wide margin
- GitOps (ArgoCD/Flux) is becoming the default deployment model for Kubernetes
- Companies that adopted IaC report 50-75% reduction in deployment failures

> ON SCREEN: "Manual config = liability. Infrastructure as Code = engineering."

---

## What Problem It Solves in Real Teams

**Without IaC:**
- "Snowflake servers" — every machine is configured slightly differently
- "It worked in staging" — because staging and prod were set up manually by different people at different times
- Configuration drift — production slowly diverges from what you think it is
- No rollback — when a change breaks something, you scramble to remember what you changed
- Tribal knowledge — only one person knows how the infrastructure is set up, and they are on vacation

**With IaC:**
- Every environment is identical because it is generated from the same code
- Changes are reviewed in PRs before they are applied
- State is tracked — you always know what is deployed
- Rollback is a `git revert`
- New team members read the code and understand the infrastructure

---

## What You Must Learn (Core Skills)

### Terraform (Primary Tool — Learn This First)

Terraform is the industry standard for IaC. It is cloud-agnostic, has the largest community, and is the most requested skill in job postings.

**Core concepts in learning order:**
1. **Providers** — how Terraform talks to AWS, GCP, Azure, Kubernetes, etc.
2. **Resources** — the building blocks (aws_instance, aws_vpc, etc.)
3. **Variables and Outputs** — parameterization and return values
4. **State** — how Terraform tracks what it manages (this is critical)
5. **Data Sources** — reading existing infrastructure
6. **Modules** — reusable components (your own and from the registry)
7. **Workspaces or directory structure** — managing multiple environments
8. **Lifecycle rules** — controlling create/destroy behavior
9. **Import** — bringing existing resources under Terraform management
10. **Testing** — `terraform validate`, `terraform plan`, `terratest`, policy checks

**Example — a well-structured Terraform project:**
```
infrastructure/
  modules/
    vpc/
      main.tf
      variables.tf
      outputs.tf
    eks/
      main.tf
      variables.tf
      outputs.tf
    rds/
      main.tf
      variables.tf
      outputs.tf
  environments/
    dev/
      main.tf        # calls modules with dev values
      terraform.tfvars
      backend.tf     # remote state config for dev
    staging/
      main.tf
      terraform.tfvars
      backend.tf
    prod/
      main.tf
      terraform.tfvars
      backend.tf
```

### State Management (Do NOT Skip This)

State is the hardest part of Terraform and the part most people learn the hard way.

**What you must understand:**
- State file contains sensitive data — never commit it to Git
- Remote state (S3 + DynamoDB for locking) is required for team work
- State locking prevents concurrent modifications
- `terraform state mv` and `terraform state rm` for refactoring
- State file structure — so you can debug when things go wrong
- Importing existing resources into state

**Remote state setup (AWS):**
```hcl
terraform {
  backend "s3" {
    bucket         = "my-company-terraform-state"
    key            = "environments/prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

### Modules (Reusable Infrastructure)

**What you must be able to do:**
- Write modules with clear inputs (variables) and outputs
- Use modules from the Terraform Registry
- Version your modules (Git tags)
- Compose modules — a "platform" module that calls VPC + EKS + RDS modules

### Testing Infrastructure Code

**Tools and approaches:**
- `terraform validate` — syntax check
- `terraform plan` — preview changes before apply (always review this)
- **Checkov / tfsec** — static security analysis (see [Factor 3: DevSecOps](../03-devsecops/))
- **Terratest** — integration tests in Go that create real infrastructure, verify it, and destroy it
- **terraform-compliance** — BDD-style compliance testing
- **OPA / Conftest** — policy-as-code for Terraform plans

### GitOps (ArgoCD / Flux)

GitOps is the deployment model where Git is the single source of truth. Changes are made via PRs, and a controller in the cluster syncs the desired state automatically.

**Core concepts:**
- **Git as the source of truth** — the cluster state matches what is in Git, always
- **Pull-based deployment** — ArgoCD/Flux pulls from Git, not the other way
- **Drift detection** — if someone manually changes something, GitOps detects and corrects it
- **ArgoCD** — the most popular GitOps tool, with a strong UI and ApplicationSet
- **Flux** — lighter-weight, CNCF graduated, more "Kubernetes-native"

**When to use what:**
- **Terraform** — for infrastructure (VPCs, EKS clusters, RDS, IAM)
- **ArgoCD/Flux** — for application deployment to Kubernetes
- Together they cover the full stack: Terraform creates the cluster, ArgoCD deploys the apps

---

## What Is Optional / "Worst ROI" to Learn First

1. **Pulumi** — Pulumi lets you write IaC in Python/Go/TypeScript. Great tool. But the market demands Terraform by a 10:1 ratio. Learn Terraform first.

2. **AWS CDK / CDKTF** — Same story. Interesting approach (IaC in general-purpose languages), but Terraform HCL is the lingua franca. Start there.

3. **Crossplane** — Kubernetes-native IaC. Powerful concept, but niche. Learn it after you are solid in Terraform and K8s.

4. **Ansible for cloud provisioning** — Ansible is great for configuration management. It is not great for infrastructure provisioning (no state management). Use Terraform for infra, Ansible for configuration if needed.

5. **CloudFormation deep dive** — AWS-only. If you are in an AWS-only shop that mandates CloudFormation, learn it. Otherwise, Terraform is more transferable.

6. **Terragrunt from day one** — Terragrunt adds useful features on top of Terraform, but it adds complexity. Learn vanilla Terraform well first. Add Terragrunt when you need what it offers (DRY configs, dependency management across stacks).

> VOICEOVER: I see people jump to Pulumi or CDK because "I already know Python." That is fine, but employers are searching for "Terraform" on your resume. Learn what the market wants first, then explore alternatives.

---

## How Deep to Go

### Beginner (weeks 1-3):
- Can write a basic Terraform configuration (provider, resources, variables)
- Can run `terraform init`, `plan`, `apply`, and `destroy`
- Can explain what state is and why it matters
- Understands the difference between declarative and imperative IaC
- Can use Terraform to create basic AWS resources (EC2, S3, VPC)

### Strong (months 2-5) — THIS IS THE HIRING THRESHOLD:
- Can structure a multi-environment project with modules
- Can set up and manage remote state with locking
- Can write reusable modules with proper input validation
- Can import existing resources into Terraform
- Can resolve state conflicts and refactor state
- Can integrate Checkov/tfsec into CI for security scanning
- Can review a `terraform plan` output and catch potential issues
- Can set up a CI/CD pipeline that runs plan on PR and apply on merge
- Can use ArgoCD or Flux for GitOps deployment to Kubernetes
- Can explain the Terraform workflow in a team setting (branching, PRs, plan review, apply)

### Expert (6+ months):
- Can write custom Terraform providers
- Can implement policy-as-code with OPA/Sentinel
- Can design module architecture for a large organization
- Can implement multi-account, multi-region Terraform strategies
- Can write comprehensive Terratest integration tests
- Can design and implement a platform team's IaC standards
- Can optimize Terraform performance for large state files
- Can architect GitOps at scale with ApplicationSets and multi-cluster management

> ON SCREEN: "Strong = you can own a team's Terraform. Expert = you design the IaC strategy for the org."

---

## How AI Changes This Factor

AI is exceptionally good at IaC tasks because infrastructure code is highly structured and well-documented.

### 1. AI for Generating Terraform Modules
```
Prompt: "Write a Terraform module for an AWS EKS cluster with:
- Managed node group (m5.xlarge, min 2, max 10)
- Private subnets only for worker nodes
- IRSA (IAM Roles for Service Accounts) enabled
- Cluster logging enabled (api, audit, authenticator)
- Variables for cluster name, K8s version, VPC ID, subnet IDs
- Output the cluster endpoint and certificate"
```
AI generates a complete module. You review for security issues, naming conventions, and best practices.

### 2. AI for Reviewing HCL
```
Prompt: "Review this Terraform configuration for:
- Security issues (overly permissive rules, missing encryption)
- Best practice violations (hardcoded values, missing tags)
- Cost optimization opportunities
- State management concerns
[paste HCL code]"
```

### 3. AI for State Operations
```
Prompt: "I need to rename my Terraform module from 'web_server' to
'application_server'. What terraform state commands do I need to run?
List every state mv command needed for a module that contains:
aws_instance, aws_security_group, aws_eip."
```

### 4. AI for Migration from Manual to IaC
```
Prompt: "I have these manually created AWS resources:
- VPC vpc-12345 with CIDR 10.0.0.0/16
- 2 public subnets, 2 private subnets
- NAT gateway
- ALB with target group
Write the Terraform code and the import commands to bring them
under Terraform management."
```

### 5. AI for ArgoCD Configuration
```
Prompt: "Write an ArgoCD Application manifest that:
- Deploys from github.com/myorg/k8s-apps, path: apps/production
- Auto-syncs with self-heal enabled
- Prunes resources that are removed from Git
- Sends Slack notifications on sync failure
- Uses the 'production' project with restricted namespaces"
```

> VOICEOVER: AI turns Terraform from a 2-hour writing session into a 15-minute review session. You describe what you need, AI generates the code, you review it with your engineering judgment. This is the workflow of 2026.

---

## Common Mistakes & Traps

### Trap 1: Not Managing State Properly
**What happens:** You use local state. Two people run `terraform apply` at the same time. State is corrupted. Resources are orphaned. Friday night becomes an incident.
**Fix:** Set up remote state with locking on day one. S3 + DynamoDB for AWS. GCS + Cloud Storage for GCP. Never local state in a team.

### Trap 2: Monolithic Configuration
**What happens:** All infrastructure is in one giant `main.tf`. A change to a security group requires a plan that touches 200 resources. It takes 10 minutes to plan and one mistake affects everything.
**Fix:** Split by concern. Separate state files for networking, compute, databases, and monitoring. Use modules for reusable components. A change to the app's deployment should not require planning the VPC.

### Trap 3: No Testing
**What happens:** You write Terraform, run `apply`, and it works. Six months later, someone changes a variable and the whole stack breaks. Nobody caught it because there are no tests.
**Fix:** At minimum: `terraform validate` + `terraform plan` + Checkov in CI. Ideally: Terratest for critical modules. The plan output is your first test — read it carefully on every PR.

### Trap 4: Hardcoded Values Everywhere
**What happens:** Region is `us-east-1` in 47 places. AMI IDs are hardcoded. Account IDs are scattered through the code.
**Fix:** Use variables for everything that might change. Use data sources for AMI lookups. Use locals for computed values. Configuration should be in `terraform.tfvars`, not in resource blocks.

### Trap 5: Not Using Modules
**What happens:** Copy-pasted code for every environment. The dev VPC has slightly different settings than prod because someone forgot to update it after a change.
**Fix:** Write modules. Use them for every environment with different variable values. One source of truth, multiple instantiations.

### Trap 6: Ignoring Drift
**What happens:** Someone makes a "quick fix" in the AWS Console. Terraform does not know about it. The next `terraform apply` either reverts the fix or fails with a conflict.
**Fix:** Use GitOps principles. Detect drift (Terraform plan in CI on a schedule). If manual changes happen, import them into state or revert them. Make the pipeline the only way to change infrastructure.

---

## Mini-Practice (Exercises)

### Exercise 1: Build VPC + EKS with Terraform
**What you build:** A complete VPC and EKS cluster using Terraform modules.
**Skills tested:** Modules, variables, state management, AWS networking, EKS.
**Requirements:**
- Custom VPC module (public/private subnets, NAT, routing)
- EKS module (cluster, managed node group, IRSA)
- Remote state in S3 with DynamoDB locking
- Separate variable files for dev and prod
- Tags on every resource
**Deliverable:** `terraform apply` creates a working K8s cluster you can connect to with `kubectl`.

### Exercise 2: Implement Remote State with CI/CD
**What you build:** A GitHub Actions (or GitLab CI) pipeline for Terraform.
**Skills tested:** Remote state, CI/CD integration, plan review, automated apply.
**Requirements:**
- `terraform plan` runs on every PR and posts the output as a comment
- `terraform apply` runs automatically on merge to main
- Checkov runs as a quality gate (see [Factor 3](../03-devsecops/))
- State locking prevents concurrent applies
**Deliverable:** A working pipeline where infrastructure changes go through code review.

### Exercise 3: Write and Test Terraform Modules
**What you build:** A reusable Terraform module with tests.
**Skills tested:** Module design, input validation, outputs, testing.
**Requirements:**
- Write a module for a common pattern (e.g., "web application" = ALB + ECS + RDS)
- Input validation (check that CIDR blocks are valid, instance types are allowed)
- Comprehensive outputs (ARNs, endpoints, security group IDs)
- Write Terratest or terraform-compliance tests
**Deliverable:** A module that another team member could use by reading the `variables.tf` and `README.md`.

### Exercise 4: Set Up GitOps with ArgoCD
**What you build:** ArgoCD managing Kubernetes deployments from a Git repository.
**Skills tested:** ArgoCD installation, Application manifests, sync policies, RBAC.
**Requirements:**
- Install ArgoCD on a K8s cluster (from [Factor 2](../02-containers-and-kubernetes/))
- Create an Application that deploys a multi-service app from Git
- Configure auto-sync with self-heal
- Set up ArgoCD RBAC (dev team can view, platform team can sync)
- Demonstrate drift detection: manually change a deployment, watch ArgoCD revert it
**Deliverable:** A Git push triggers automatic deployment to the cluster.

### Exercise 5: Import Existing Infrastructure
**What you build:** Terraform code for manually-created resources.
**Skills tested:** `terraform import`, state management, resource mapping.
**Scenario:** Create 3-5 resources manually in AWS Console (VPC, subnet, security group, EC2, S3). Then write Terraform code and import them.
**Deliverable:** `terraform plan` shows no changes after import — proving your code matches reality.

---

## "Signals" You Are Job-Ready (Checklist)

- [ ] Can structure a Terraform project for a multi-environment deployment
- [ ] Can set up and manage remote state with locking
- [ ] Can write reusable Terraform modules with proper inputs/outputs
- [ ] Can set up a CI/CD pipeline that plans on PR and applies on merge
- [ ] Can import existing resources into Terraform management
- [ ] Can debug state issues (conflicts, drift, orphaned resources)
- [ ] Can review a `terraform plan` and identify potential problems before apply
- [ ] Can integrate security scanning (Checkov/tfsec) into the IaC pipeline
- [ ] Can explain GitOps principles and set up ArgoCD or Flux
- [ ] Can manage multiple environments without code duplication (modules + tfvars)
- [ ] Can explain the Terraform workflow in a team: branches, PRs, plan review, apply, state
- [ ] Can recover from a bad apply (rollback, state manipulation, targeted destroy)

> VOICEOVER: In an interview, the question is not "do you know Terraform." The question is "describe how your team manages infrastructure changes." If you can walk through the full workflow — from a PR with a plan output, through review, to automated apply with state locking — you are demonstrating senior-level understanding.

---

## Links Inside the Repo

- Previous: [03 - DevSecOps](../03-devsecops/) — security scanning for your IaC
- Next: [05 - AI & MLOps](../05-ai-and-mlops/) — AI for generating and reviewing IaC
- Related: [01 - Cloud Adoption](../01-cloud-adoption/) — the cloud resources Terraform manages
- Related: [02 - Containers & Kubernetes](../02-containers-and-kubernetes/) — what ArgoCD deploys to
- Full path: [90 - Learning Roadmap](../90-roadmap/) — where IaC fits in the bigger picture
- Avoid traps: [91 - Common Mistakes](../91-mistakes/) — monolithic configs and other traps
