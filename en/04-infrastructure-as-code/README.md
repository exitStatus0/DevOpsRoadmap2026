# Factor 4: Infrastructure as Code (IaC)

![Infrastructure as Code](04-iac.png)

> **Quick start**
> - **7 days:** Install Terraform → deploy a VPC + EC2 instance on AWS → set up remote state (S3 + DynamoDB). Run `terraform destroy` when done.
> - **30 days:** Complete the Beginner checklist → write a reusable module → set up CI/CD for Terraform (plan on PR, apply on merge).

---

## Why It Matters in 2026

If your infrastructure is not described in code, it does not exist. In 2026, manual server configuration is technical debt that costs companies millions.

Most organizations with mature DevOps practices use IaC, and Terraform has become the de facto standard.

Infrastructure as Code is an approach where all infrastructure is described in configuration files, stored in Git, and deployed automatically. This means:

- **Reproducibility** -- any engineer can spin up an identical environment in minutes
- **Versioning** -- git log shows who changed what in the infrastructure and when
- **Review** -- infrastructure changes go through PR review, just like code
- **Automation** -- CI/CD for infrastructure instead of manual `terraform apply`
- **Testing** -- infrastructure can be tested before deployment

In 2026, IaC is a **mandatory skill** for a DevOps engineer. Not "nice to have" -- mandatory. Without it you will not pass any serious interview.

---

## What Problem It Solves in Real Teams

"Who created this security group? When? Why?" -- if the answer is not in Git, the answer is nowhere.

| Problem | Without IaC | With IaC |
|---------|-------------|----------|
| "Snowflake servers" | Every server is unique, nobody knows the config | Identical environments from one template |
| Configuration drift | Staging differs from production | One codebase = identical infrastructure |
| Disaster recovery | "Rebuild from scratch? That will take weeks" | `terraform apply` -- and everything is up |
| Change audit | "Who opened port 22 to 0.0.0.0/0?" | `git blame` shows the author and reason |
| Scaling | Copy manual steps for a new region | Change the `region` variable and apply |
| Onboarding | New engineer spends weeks figuring things out | Code = infrastructure documentation |

**Real example:** A company with 200+ servers, all configured manually. One engineer left -- along with knowledge of half the infrastructure. Recovery after an outage took 3 days. After implementing Terraform -- full DR in 45 minutes.

---

## What You Must Learn (Core Skills)

### 1. Terraform -- The Primary Tool

Terraform by HashiCorp is the de facto standard for IaC. OpenTofu is the open-source fork. The concepts are identical.

```
Terraform skills (in priority order):
├── HCL Basics
│   ├── Resources, Data Sources
│   ├── Variables, Outputs
│   ├── Locals
│   └── Providers
├── State
│   ├── What state is and why it exists
│   ├── Remote state (S3 + DynamoDB, Terraform Cloud)
│   ├── State locking
│   ├── terraform import
│   └── terraform state mv / rm
├── Modules
│   ├── Creating your own modules
│   ├── Modules from Terraform Registry
│   ├── Module versioning
│   └── Module composition
├── Planning and Deployment
│   ├── terraform plan (ALWAYS before apply)
│   ├── terraform apply
│   ├── terraform destroy
│   └── Targeted apply (-target)
├── Workspaces
│   └── Or directories per environment (recommended)
└── Testing
    ├── terraform validate
    ├── terraform fmt
    ├── tflint
    ├── Checkov / tfsec
    └── Terratest (integration tests)
```

**Minimal Terraform Example:**

```hcl
# providers.tf
terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.region
}

# variables.tf
variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
}

# main.tf
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "${var.environment}-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["${var.region}a", "${var.region}b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = var.environment != "production"

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# outputs.tf
output "vpc_id" {
  value = module.vpc.vpc_id
}
```

### 2. State Management

```
Critical rules for working with state:
├── NEVER store state locally in production
├── ALWAYS use a remote backend with locking
├── NEVER edit state manually (without extreme necessity)
├── ALWAYS encrypt state (it contains secrets!)
├── Separate state by environments and components
└── Back up state (enable S3 bucket versioning)
```

### 3. GitOps with ArgoCD or Flux

```
GitOps principles:
├── Git as the single source of truth
├── Declarative description of desired state
├── Automatic synchronization (reconciliation)
└── Pull model (the cluster pulls changes from Git)

ArgoCD skills:
├── Installation and configuration
├── Application and ApplicationSet
├── Sync policies (auto/manual)
├── Rollback
├── Multi-cluster management
└── Secrets management (Sealed Secrets, External Secrets)
```

### 4. Testing IaC

```
Testing levels:
├── Static analysis
│   ├── terraform validate -- syntax
│   ├── terraform fmt -- formatting
│   ├── tflint -- linting
│   └── Checkov / tfsec -- security
├── Unit tests
│   ├── Terratest (Go)
│   └── pytest + terraform (Python)
├── Integration tests
│   ├── Deploy to a test environment
│   ├── Verify results
│   └── Destroy
└── Policy-as-Code
    ├── OPA / Rego
    ├── Sentinel (Terraform Enterprise)
    └── Checkov custom policies
```

---

## What Is Optional / "Worst ROI" to Learn First

### Do NOT learn first:

1. **Pulumi** -- IaC in programming languages (Python, TypeScript, Go). Good tool but niche. Terraform has a much larger ecosystem and more job postings. Learn Pulumi only if your company uses it.

2. **AWS CDK** -- Similar situation. CDK ties you to AWS. Terraform is multi-cloud. Start with Terraform.

3. **Crossplane from day one** -- Kubernetes-native IaC. Powerful concept but requires deep K8s knowledge. Terraform first, then Crossplane.

4. **Ansible for cloud provisioning** -- Ansible is for server configuration (configuration management). For creating cloud resources -- Terraform. Different tools for different tasks.

5. **Terraform Enterprise / Terraform Cloud from day one** -- Start with CLI + remote state on S3. Enterprise is for large teams.

### Worst ROI:

| Action | Why Bad ROI | What To Do Instead |
|--------|-------------|-------------------|
| Learn 3 IaC tools simultaneously | You will not learn any deeply | Terraform first, deeply |
| Write everything from scratch ignoring modules | Reinventing the wheel | terraform-aws-modules + your own wrappers |
| One giant state file | Slow plan, conflict risk | Split by components |
| Terraform workspaces for environments | Hard to scale | Directory per environment |

---

## How Deep to Go

### Beginner (2-4 weeks)

- [ ] Install Terraform, understand the init/plan/apply/destroy cycle
- [ ] Create resources in AWS: VPC, EC2, S3, Security Group
- [ ] Use variables, outputs, local values
- [ ] Set up remote state (S3 + DynamoDB)
- [ ] Understand the difference between `resource` and `data`
- [ ] Use `terraform import` for existing resources
- [ ] Understand lifecycle: `create_before_destroy`, `prevent_destroy`

**Test:** Can you deploy VPC + EC2 + RDS through Terraform and destroy everything with one command? If yes -- move on.

### Strong (6-10 weeks)

- [ ] Create and use your own modules
- [ ] Split infrastructure into components (networking, compute, database)
- [ ] Use `for_each`, `count`, `dynamic` blocks
- [ ] Set up CI/CD for Terraform (GitHub Actions: plan on PR, apply on merge)
- [ ] Use tflint, Checkov for linting and security
- [ ] Deploy an EKS cluster through Terraform
- [ ] Understand and use `terraform state mv`, `terraform state rm`
- [ ] Implement resource tagging as a standard

**Test:** Can you build full infrastructure (VPC + EKS + RDS + monitoring) with modules, remote state, and CI/CD? If yes -- you are strong.

### Expert (3-6 months)

- [ ] Design Terraform architecture for an organization (modules, remote state, workspaces)
- [ ] Write integration tests with Terratest
- [ ] Implement GitOps with ArgoCD for K8s resources
- [ ] Policy-as-Code with OPA or Sentinel
- [ ] Multi-account / multi-region strategy
- [ ] Migrate existing infrastructure to Terraform (terraform import at scale)
- [ ] Drift detection and remediation
- [ ] Custom Terraform providers (Go)

**Test:** Can you design an IaC strategy for an organization with 10+ teams and 3+ environments? If yes -- you are an expert.

---

## How AI Changes This Factor (Practical Examples)

### 1. Generating Terraform Modules

```
Prompt:
"Create a Terraform module for an EKS cluster with the following parameters:
- K8s version: 1.29
- 2 node groups: general (t3.medium, 2-5 nodes) and spot (t3.large, 0-10 nodes)
- OIDC provider for IRSA
- Addons: CoreDNS, kube-proxy, vpc-cni, ebs-csi-driver
- Encryption: envelope encryption for secrets
- Logging: api, audit, authenticator
- Variables for: cluster_name, vpc_id, subnet_ids, environment
- Tags on all resources
Use best practices: remote state, least privilege IAM."
```

### 2. HCL Code Review

```
Prompt:
"Do a code review of this Terraform code:
[paste code]
Check:
- Security: excessive privileges, open ports, unencrypted resources
- Best practices: naming conventions, tagging, modularity
- Performance: state size, dependencies
- Reliability: multi-AZ, backup, lifecycle policies
Suggest specific fixes."
```

### 3. Converting Manual Infrastructure to Code

```
Prompt:
"Here is JSON output from aws ec2 describe-instances and aws rds describe-db-instances:
[paste JSON]
Create Terraform code that describes this existing infrastructure.
Include import blocks for Terraform 1.5+."
```

### 4. Troubleshooting

```
Prompt:
"Terraform plan shows:
'Error: Error creating EKS Cluster: ResourceInUseException: Cluster already exists with name: my-cluster'
But this cluster is not in my state.
What happened and how do I fix it? Here is my config:
[paste code]"
```

### 5. Daily Workflow

| Task | Without AI | With AI |
|------|-----------|---------|
| Write a Terraform module for a new service | 2-4 hours | 20-30 minutes + review |
| Set up CI/CD for Terraform | 1-2 hours | 15-20 minutes |
| Debug state problems | 1-3 hours | 15-30 minutes |
| Write a Checkov custom policy | 30-60 minutes | 10 minutes |
| Migrate resources between state files | 1-2 hours | 20-30 minutes |

**Important:** AI generates ~80% correct Terraform code. Your job is to verify the remaining 20%, because that is where critical errors hide: incorrect IAM policies, missing encryption, public resources.

---

## Common Mistakes & Traps

### Trap 1: Improper State Management

**What it is:** Local state, no locking, one state file for all infrastructure.

**Why it hurts:**
- Local state: lost your laptop = lost your infrastructure
- No locking: two engineers run `apply` simultaneously = destroyed infrastructure
- One state file: `terraform plan` takes 15 minutes, one error breaks everything

**Fix:**
```hcl
# Remote state with locking -- from DAY ONE
backend "s3" {
  bucket         = "company-terraform-state"
  key            = "production/networking/terraform.tfstate"
  region         = "us-east-1"
  dynamodb_table = "terraform-lock"
  encrypt        = true
}
```

Separate your state:
```
infrastructure/
├── networking/      <- separate state
├── eks-cluster/     <- separate state
├── databases/       <- separate state
├── monitoring/      <- separate state
└── applications/    <- separate state
```

### Trap 2: Monolithic Configurations

**What it is:** One `main.tf` with 2000 lines containing everything: VPC, EKS, RDS, S3, IAM, CloudWatch.

**Why it hurts:** Impossible to review. Impossible to test separately. A change in networking can break the database.

**Fix:** Modules + separation by component:
```
modules/
├── networking/    <- VPC, subnets, NAT
├── eks/           <- EKS cluster, node groups
├── rds/           <- Database instances
└── monitoring/    <- CloudWatch, alerts

environments/
├── production/
│   ├── main.tf    <- uses modules
│   └── terraform.tfvars
└── staging/
    ├── main.tf    <- same modules, different variables
    └── terraform.tfvars
```

### Trap 3: No Tests

**What it is:** `terraform apply` without checks = a prayer.

**Why it hurts:** Terraform does not check business logic. Are the CIDRs correct? Are the IAM permissions sufficient? Is the database encrypted?

**Fix:**
```bash
# Minimum set of checks in CI:
terraform fmt -check
terraform validate
tflint
checkov -d .
terraform plan -out=plan.tfplan
# Review plan manually or automatically
```

### Trap 4: Ignoring terraform plan

**What it is:** `terraform apply -auto-approve` without reviewing the plan.

**Why it hurts:** Terraform can delete resources you did not expect. `destroy and recreate` for a database = data loss.

**DANGER: `-auto-approve` in production without reviewing the plan is one of the most dangerous commands in DevOps. A single misconfigured resource can trigger a cascade of destroy-and-recreate operations, leading to data loss and downtime.**

**Fix:**
- ALWAYS review `terraform plan` before apply
- In CI/CD: plan on PR (as a comment), apply on merge
- Use `prevent_destroy` for critical resources

### Trap 5: Not Using Modules

**What it is:** Copy-pasting identical code for every environment.

**Why it hurts:** A change in one place does not propagate to others. 5 environments = 5 copies that gradually diverge.

**Fix:** Modules with versioning:
```hcl
module "vpc" {
  source  = "git::https://github.com/company/terraform-modules.git//vpc?ref=v1.2.0"
  # ...
}
```

---

## Mini-Practice (5 Exercises)

### Exercise 1: Full VPC + EKS on Terraform (strong)

**Goal:** Build production-ready infrastructure.

```
Steps:
1. Create S3 + DynamoDB for remote state (can use CloudFormation bootstrap)
2. VPC module: 2 public + 2 private subnets, NAT, IGW
3. EKS module: cluster + managed node group + IRSA
4. RDS module: PostgreSQL Multi-AZ in private subnets
5. Security Groups: least privilege
6. Outputs: cluster endpoint, RDS endpoint, VPC ID
7. Variables: environment, region, instance types
8. terraform.tfvars for staging and production

Success criteria: terraform apply from scratch brings up full infrastructure in 15-20 minutes
```

### Exercise 2: Remote State and State Management (beginner -> strong)

**Goal:** Learn to work with state properly.

```
Steps:
1. Set up S3 backend with versioning and encryption
2. Set up DynamoDB for state locking
3. Split an existing state into 2 parts (terraform state mv)
4. Use terraform import for an existing resource
5. Set up a data source for reading remote state from another component
6. Simulate a state lock conflict and resolve it

Success criteria: can safely work with state in a team of 3+ engineers
```

### Exercise 3: CI/CD for Terraform (strong)

**Goal:** Automate the Terraform lifecycle.

```
Steps (GitHub Actions):
1. PR opened/updated:
   - terraform fmt -check
   - terraform validate
   - tflint
   - checkov
   - terraform plan -> comment in PR
2. PR merged to main:
   - terraform apply -auto-approve
3. Add manual approval for production
4. Set up Terraform state lock timeout
5. Add Slack notification on success/failure

Success criteria: infrastructure changes go through PR -> review -> auto-apply
```

### Exercise 4: Testing Modules with Terratest (strong -> expert)

**Goal:** Learn to test IaC.

```
Steps:
1. Create a simple Terraform module (e.g., S3 bucket with encryption)
2. Write a Terratest test in Go:
   - Deploy the module to a test account
   - Verify: bucket exists, encryption is enabled, versioning is enabled
   - Destroy resources
3. Integrate tests into CI (run on PR)
4. Add tests for the VPC module: verify number of subnets, CIDRs

Success criteria: every module has automated tests
```

### Exercise 5: GitOps with ArgoCD (strong -> expert)

**Goal:** Implement GitOps for K8s deployments.

```
Steps:
1. Install ArgoCD in a K8s cluster (via Helm)
2. Create a Git repository with K8s manifests
3. Create an ArgoCD Application for staging (auto-sync)
4. Create an ArgoCD Application for production (manual sync)
5. Set up ApplicationSet for automatic app creation
6. Test the workflow:
   - Change in Git -> auto-deploy to staging
   - Manual approve -> deploy to production
7. Test rollback through ArgoCD UI and CLI

Success criteria: all K8s changes go through Git, no manual kubectl apply
```

---

## "Signals" You Are Job-Ready (Checklist)

### Required:

- [ ] Write a Terraform configuration for VPC + compute + database
- [ ] Set up remote state with locking
- [ ] Create and use your own Terraform module
- [ ] Understand terraform plan output and explain every change
- [ ] Use variables, outputs, locals correctly
- [ ] Split infrastructure into components (not one giant file)
- [ ] Use `for_each` and `count` for dynamic resources
- [ ] Set up CI/CD for Terraform (plan on PR, apply on merge)
- [ ] Know the commands: init, plan, apply, destroy, import, state

### Desired:

- [ ] Use Terratest for testing modules
- [ ] Set up tflint and Checkov in CI
- [ ] Implement GitOps with ArgoCD or Flux
- [ ] Know the difference between Terraform and OpenTofu
- [ ] Use terraform workspaces or directory structure for environments
- [ ] Know how to work with terraform import at scale

### In an Interview You Can:

- [ ] Explain why remote state and state locking are needed
- [ ] Describe the structure of a Terraform project for an organization
- [ ] Explain the difference between `terraform plan` and `terraform apply`
- [ ] Describe how you handle drift detection
- [ ] Explain the benefits of modules and how to version them
- [ ] Describe a CI/CD pipeline for Terraform

---

## Links Inside the Repo

- Previous factor: [DevSecOps](../03-devsecops/)
- Next factor: [AI & MLOps](../05-ai-and-mlops/)
- Cloud infrastructure: [Cloud Adoption](../01-cloud-adoption/)
- IaC for K8s: [Containers & Kubernetes](../02-containers-and-kubernetes/)
- IaC security: [DevSecOps](../03-devsecops/)
- Learning roadmap: [Roadmap](../90-roadmap/)
- Mistakes to avoid: [Common Mistakes](../91-mistakes/)
- Back to [course overview](../README.md)

**Apply this factor:** [Project A — Full-Stack DevOps Platform](../90-roadmap/#canonical-portfolio-projects) · [Project B — IaC Library](../90-roadmap/#canonical-portfolio-projects)
