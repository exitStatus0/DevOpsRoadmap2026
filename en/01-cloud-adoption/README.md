# Factor 1: Cloud Adoption

![Cloud Adoption](01-cloud-adoption.png)

---

## Why It Matters in 2026

94% of enterprises use cloud services. But there is a critical shortage of engineers who know how to work with them properly.

94% of companies are in the cloud. Global cloud engineer deficit: 4 million specialists.

Cloud migration is not a trend -- it is the **new normal**. In 2026 the question is no longer "should we move to the cloud" but "how effectively are we using the cloud." Companies that migrated 3-5 years ago are now optimizing costs, implementing multi-cloud strategies, and automating everything.

What this means for you:

- **Demand is growing** -- even junior positions require understanding of at least one cloud provider
- **Salaries are higher** -- cloud skills add 20-40% to the market rate
- **The entry barrier is lower than it seems** -- AWS/GCP/Azure free tiers allow you to learn for free
- **Window of opportunity** -- the talent shortage means companies are willing to train if you have the right foundation

---

## What Problem It Solves in Real Teams

Imagine: your team spends 3 days provisioning a new server. In the cloud this takes 3 minutes. But only if someone knows how to do it properly.

Without a cloud engineer, a team faces:

| Problem | Consequence | How Cloud Solves It |
|---------|-------------|---------------------|
| Weeks to provision servers | Slow time-to-market | Server in minutes via API/IaC |
| Unknown infrastructure costs | Budget overruns | Pay-as-you-go + optimization tools |
| Inability to scale | Crashes under load | Auto-scaling groups, serverless |
| One data center = one point of failure | Downtime | Multi-AZ, multi-region |
| Manual server management | Human errors, instability | Managed services, IaC |

**Real example:** A startup with 5 developers. Without a cloud engineer they ran everything on one EC2 instance, paid $800/month, and went down once a week. After proper architecture (ECS + ALB + RDS): $350/month, zero downtime, automatic scaling.

---

## What You Must Learn (Core Skills)

### Cloud-Agnostic Concepts (learn these FIRST)

These concepts work **in any cloud**. They are your foundation:

1. **Cloud service models** -- IaaS, PaaS, SaaS, FaaS: when to use which
2. **Cloud networking** -- VPC, subnets (public/private), routing, NAT, peering
3. **Identity and access** -- IAM: users, roles, policies, principle of least privilege
4. **Data storage** -- object storage (S3), block (EBS), file (EFS), databases (RDS)
5. **Compute resources** -- VMs, containers, serverless: when to choose what
6. **Monitoring and logging** -- CloudWatch / Cloud Monitoring, alerts, dashboards
7. **Cost management** -- resource tagging, budgets, Reserved/Spot instances
8. **DNS and load balancing** -- Route 53 / Cloud DNS, ALB/NLB, health checks

### AWS as Your First Cloud (recommended)

Why AWS:
- **Largest market share** (~32%) -- more job postings
- **Broadest set of services** -- covers all scenarios
- **Best documentation** and community
- **Free tier** -- 12 months of free practice

Key AWS services to learn (in priority order):

```
Level 1 (first 2 weeks):
├── EC2 -- virtual machines
├── S3 -- object storage
├── IAM -- access management
├── VPC -- networking
└── CloudWatch -- monitoring

Level 2 (weeks 3-6):
├── RDS -- managed databases
├── ECS/EKS -- container orchestration
├── ALB/NLB -- load balancers
├── Route 53 -- DNS
└── Lambda -- serverless

Level 3 (weeks 7-10):
├── CloudFormation / Terraform -- IaC
├── Systems Manager -- configuration management
├── Secrets Manager -- secret management
├── SNS/SQS -- messaging and queues
└── Cost Explorer -- cost optimization
```

### CLI and SDK -- from day one

```bash
# Install AWS CLI and learn the basic commands
aws configure
aws s3 ls
aws ec2 describe-instances --output table
aws cloudformation deploy --template-file stack.yaml --stack-name my-stack
```

**Rule:** If you did something through the console -- repeat it through CLI. If you did it through CLI -- automate it through IaC.

---

## What Is Optional / "Worst ROI" to Learn First

Knowing what NOT to learn is just as important as knowing what to learn. These things steal beginners' time.

### Do NOT learn first:

1. **All three clouds simultaneously** -- learn one deeply. AWS -> then GCP or Azure for comparison. Multi-cloud is for experienced teams, not beginners.

2. **Certifications before practice** -- AWS Solutions Architect cert without real experience = a fancy piece of paper. Build 3-5 projects first, then certify.

3. **Exotic services** -- AWS has 200+ services. You need to know ~15-20. Do not waste time on AWS Ground Station or Braket.

4. **Serverless architectures first** -- Lambda + API Gateway + DynamoDB is powerful, but requires a different mindset. Start with EC2/ECS, understand the basics, then serverless.

5. **Detailed cost optimization** -- Spot instances, Savings Plans, Reserved Instances -- these are for the stage when you already understand architecture. Do not start here.

### Worst ROI:

| Action | Why Bad ROI | What To Do Instead |
|--------|-------------|-------------------|
| Read all AWS documentation | 200+ services = infinite | Learn on demand, project by project |
| Watch a 40-hour course | Passive consumption | Hands-on lab after every 30 min of theory |
| Learn AWS CDK / Pulumi first | Requires programming language + cloud knowledge | Start with Terraform or CloudFormation |
| Prepare for SA Professional | Hard exam without experience = failure | Start with Cloud Practitioner or hands-on practice |

---

## How Deep to Go

### Beginner (2-4 weeks)

- [ ] Create an AWS account with MFA and billing alert
- [ ] Launch an EC2 instance, connect via SSH
- [ ] Create an S3 bucket, upload files via CLI
- [ ] Configure a VPC with public and private subnets
- [ ] Create an IAM user with restricted permissions
- [ ] Understand the difference between Security Group and NACL
- [ ] Be able to explain: what is a Region, AZ, Edge Location

**Test:** Can you deploy a web application on EC2 from scratch in 30 minutes? If yes -- move on.

### Strong (6-10 weeks)

- [ ] Deploy infrastructure through CLI/IaC (not through the console)
- [ ] Configure ALB + Auto Scaling Group
- [ ] Use RDS with Multi-AZ
- [ ] Set up CloudWatch alerts and dashboards
- [ ] Understand network topology: VPC peering, Transit Gateway
- [ ] Work with ECS or EKS for containers
- [ ] Configure CI/CD with CodePipeline or GitHub Actions + AWS
- [ ] Optimize costs: Right-sizing, Reserved Instances

**Test:** Can you design and implement a 3-tier architecture (ALB -> ECS -> RDS) with auto-scaling, monitoring, and IaC? If yes -- you are strong.

### Expert (3-6 months)

- [ ] Multi-account strategy (AWS Organizations, Control Tower)
- [ ] Landing Zone and Security Hub
- [ ] Complex network topologies (Transit Gateway, PrivateLink)
- [ ] Cost optimization at the organizational level
- [ ] DR (Disaster Recovery) strategies and implementation
- [ ] Well-Architected Framework -- applied in practice
- [ ] Migrating legacy applications to the cloud

**Test:** Can you conduct an architectural review of another team's project and find issues? If yes -- you are an expert.

---

## How AI Changes This Factor (Practical Examples)

AI will not replace the cloud engineer. But a cloud engineer with AI will replace the one without.

### 1. IaC Code Generation

```
Prompt:
"Create a Terraform configuration for a VPC with 2 public and 2 private subnets
in us-east-1, with NAT Gateway, Internet Gateway, and appropriate route tables.
Add tags for environment=staging."
```

AI will generate 80% of the code. Your job is to **review, understand, and adapt**.

### 2. Cost Analysis

```
Prompt:
"Here is my AWS Cost Explorer report for the month [paste data].
Find the top 5 optimization opportunities and estimate potential savings."
```

### 3. Debugging and Troubleshooting

```
Prompt:
"My EC2 instance in a private subnet cannot reach the internet.
The VPC has a NAT Gateway. Here is the route table configuration: [paste].
What is wrong?"
```

### 4. Writing IAM Policies

```
Prompt:
"Create an IAM policy that allows reading from S3 bucket 'my-app-logs',
writing to CloudWatch Logs group '/app/production',
and starting/stopping EC2 instances with tag Environment=staging.
Nothing more -- principle of least privilege."
```

### 5. Daily Workflow

| Task | Without AI | With AI |
|------|-----------|---------|
| Write a CloudFormation template | 2-3 hours | 20-30 minutes + review |
| Learn a new service | Documentation 1-2 days | Explanation in 10 minutes + practice |
| Debug a networking issue | 1-4 hours | 15-30 minutes |
| Write an IAM policy | 30-60 minutes | 5 minutes + review |

**Important:** AI accelerates but does not replace understanding. If you do not understand what AI generated, you will not be able to debug when something breaks.

---

## Common Mistakes & Traps

### Trap 1: Console Clicking

**What it is:** Creating all resources through the AWS Console instead of CLI/IaC.

**Why it hurts:** You cannot reproduce the infrastructure. The console does not scale. In interviews they ask about IaC, not clicking.

**Fix:** The rule is "console only for viewing." All creation through CLI or Terraform.

### Trap 2: Certification Mindset

**What it is:** Spending 3-6 months preparing for AWS SA Associate without having a single project.

**Why it hurts:** Certification without practice = knowledge that will be forgotten within a month. Employers test skills, not certificates.

**Fix:** Build 3 projects -> then certify (it will be much easier).

### Trap 3: Multi-Cloud from Day One

**What it is:** Trying to learn AWS, GCP, and Azure simultaneously.

**Why it hurts:** You will not learn any cloud deeply. The concepts are similar but the details differ -- it will be a mess.

**Fix:** One cloud deeply (AWS recommended) -> then compare with others.

### Trap 4: Ignoring Costs

**What it is:** Leaving resources running after learning. Not setting up billing alerts.

**Why it hurts:** A $500+ bill for a forgotten RDS instance is real. And it hurts.

**Fix:**
- Billing alert at $10 -- **first thing** after creating an account
- `aws resourcegroupstaggingapi get-resources` -- verify everything is shut down
- Terraform `destroy` after every learning session

### Trap 5: Only Managed Services

**What it is:** Using only Lambda, DynamoDB, Fargate -- without understanding what is under the hood.

**Why it hurts:** When a managed service does not fit (and it will), you will not be able to work with EC2/ECS/EKS.

**Fix:** Start with EC2 -> ECS -> then EKS/Fargate -> Lambda. Bottom up.

---

## Mini-Practice (5 Exercises)

### Exercise 1: Static Site on S3 + CloudFront (beginner)

**Goal:** Understand S3, CloudFront, Route 53, SSL.

```
Steps:
1. Create an S3 bucket for static hosting (via CLI)
2. Upload an HTML/CSS site
3. Configure a CloudFront distribution
4. Connect a custom domain through Route 53
5. Set up SSL through ACM
6. Document the architecture

Bonus: automate deployment through GitHub Actions

Success criteria: site is live with HTTPS on a custom domain
```

### Exercise 2: VPC from Scratch (beginner -> strong)

**Goal:** Deeply understand cloud networking.

```
Steps:
1. Create a VPC with CIDR 10.0.0.0/16
2. 2 public subnets (10.0.1.0/24, 10.0.2.0/24) in different AZs
3. 2 private subnets (10.0.3.0/24, 10.0.4.0/24) in different AZs
4. Internet Gateway for public subnets
5. NAT Gateway for private subnets
6. Route tables for each subnet type
7. Bastion host in a public subnet
8. Web server in a private subnet accessible through ALB
9. Entire process via AWS CLI (zero console clicks)

Bonus: repeat in Terraform (-> transition to Factor 4)

Success criteria: web server in private subnet responds via ALB
```

### Exercise 3: IAM -- Done Right from the Start (beginner)

**Goal:** Understand IAM at a level sufficient for work.

```
Steps:
1. Create IAM groups: developers, devops, readonly
2. Create IAM policies for each group (principle of least privilege)
3. Create IAM roles for EC2 (access to S3) and Lambda (access to DynamoDB)
4. Configure MFA for all users
5. Create a cross-account role
6. Test: verify that developers CANNOT delete S3 buckets

Bonus: automate through CloudFormation

Success criteria: each group has exactly the permissions they need, nothing more
```

### Exercise 4: 3-Tier Architecture (strong)

**Goal:** Build a production-ready architecture.

```
Steps:
1. ALB in public subnets
2. ECS Fargate service in private subnets (minimum 2 tasks)
3. RDS PostgreSQL Multi-AZ in private subnets
4. Auto-scaling based on CPU
5. CloudWatch dashboard with key metrics
6. CloudWatch alerts (CPU > 80%, 5xx > 10/min)
7. Secrets in AWS Secrets Manager
8. Everything through Terraform

Bonus: add CI/CD with GitHub Actions

Success criteria: terraform apply creates the full stack, app is accessible and auto-scales
```

### Exercise 5: Cost Analysis and Optimization (strong -> expert)

**Goal:** Learn to work with FinOps tools.

```
Steps:
1. Enable Cost Explorer and Cost Anomaly Detection
2. Configure resource tagging (Environment, Team, Service)
3. Create a budget with alerts
4. Analyze costs for the past month
5. Find 3 optimization opportunities
6. Calculate potential savings from Reserved Instances
7. Create a report with recommendations

Bonus: automate the report through Lambda + SNS

Success criteria: written report with specific dollar savings identified
```

---

## "Signals" You Are Job-Ready (Checklist)

You are ready to apply for junior/mid cloud positions if you can:

### Required:

- [ ] Explain the difference between IaaS, PaaS, SaaS with examples
- [ ] Create a VPC with public/private subnets via CLI
- [ ] Write an IAM policy following the principle of least privilege
- [ ] Deploy an application on EC2 or ECS
- [ ] Configure an ALB with health checks
- [ ] Work with S3 via CLI (create, copy, sync, lifecycle)
- [ ] Set up CloudWatch alerts
- [ ] Deploy infrastructure through Terraform or CloudFormation
- [ ] Explain why Security Group is stateful and NACL is stateless
- [ ] Describe when to use Lambda vs ECS vs EKS

### Desired:

- [ ] Configure Auto Scaling Group with Target Tracking
- [ ] Work with RDS (creation, backup, Multi-AZ)
- [ ] Explain the difference between NAT Gateway and NAT Instance
- [ ] Know the basics of AWS Organizations and multi-account strategy
- [ ] Configure a CI/CD pipeline with AWS services or GitHub Actions

### In an Interview You Can:

- [ ] Draw a 3-tier application architecture and explain every component
- [ ] Answer the question "How would you make this application fault-tolerant?"
- [ ] Explain a cost optimization strategy
- [ ] Describe the process of migrating an on-premise application to the cloud (high-level)

---

## Links Inside the Repo

- Next factor: [Containers & Kubernetes](../02-containers-and-kubernetes/)
- IaC for cloud: [Infrastructure as Code](../04-infrastructure-as-code/)
- Cloud security: [DevSecOps](../03-devsecops/)
- AI for cloud tasks: [AI & MLOps](../05-ai-and-mlops/)
- Learning roadmap: [Roadmap](../90-roadmap/)
- Mistakes to avoid: [Common Mistakes](../91-mistakes/)
- Back to [course overview](../README.md)
