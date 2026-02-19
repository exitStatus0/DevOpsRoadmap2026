# Top Beginner Mistakes in DevOps

![Common Mistakes](common-mistakes-fix.png)

---

These 12 mistakes steal months of your time and motivation. I have seen every one of them dozens of times. Read them, memorize them, and do not repeat them.

10 core mistakes + 2 bonus mistakes. Each one comes with a fix.

---

## Mistake 1: Isolated Course Hell

### What it is

You take a Docker course, then a Kubernetes course, then a Terraform course, then an AWS course -- each one in isolation. Each course has its own examples, its own environments, its own abstractions. After 5 courses you know each tool **in isolation**, but you cannot connect them into a real pipeline.

### Why it hurts

DevOps is not a collection of tools. It is a **system** where Docker, K8s, Terraform, CI/CD, and cloud work together. Studying them separately is like learning to play in an orchestra by practicing each instrument in a soundproof room.

Result: you know `docker build`, you know `kubectl apply`, you know `terraform plan` -- but you cannot build a pipeline where Terraform creates EKS, CI builds a Docker image, pushes it to ECR, and ArgoCD deploys it to K8s.

### Do this instead

**Project-based approach:** After a basic introduction to a tool, immediately integrate it into a real project.

```
Correct sequence:
1. Learn Docker (2 weeks) -> containerize your application
2. Learn CI/CD (1 week) -> add a pipeline for building and pushing the image
3. Learn AWS (2 weeks) -> deploy the application to the cloud
4. Learn K8s (3 weeks) -> migrate the application to K8s
5. Learn Terraform (2 weeks) -> describe all infrastructure as code

Each step ADDS to the previous one. One project grows with you.
```

---

## Mistake 2: Sandbox Dependency

### What it is

You only learn in pre-configured environments: Katacoda (RIP), KillerCoda, A Cloud Guru labs. Everything is already set up. You click "Start Lab" and the environment is ready. You click "Check" and you get a green checkmark.

### Why it hurts

In a real job, nobody gives you a pre-configured environment. You start from scratch: creating an AWS account, configuring the network, debugging problems that are not described in any textbook. Sandbox skills do not transfer to real work.

The main problem: you never learn to **debug**. In a sandbox everything works. In reality, 40% of a DevOps engineer's time is troubleshooting.

### Do this instead

- Create your **own AWS account** (Free Tier). Do everything there.
- Install **Minikube** on your computer. Debug real problems.
- When something breaks -- **do not start over**. Debug it. That is the actual learning.
- Sandboxes are for first exposure (30 minutes). After that -- only real environments.

**Budget tip:** Set a billing alert at $5 and $10. Use `terraform destroy` after every practice session. A month of serious practice should cost $10-30 on AWS free tier.

---

## Mistake 3: Ignoring Opportunity Cost

### What it is

"I will learn for free. Free YouTube courses, free documentation, free articles. In 2 years I will be ready."

### Why it hurts

Time is a resource that costs money. 2 years of "free" learning = 2 years without a DevOps engineer's salary. At an average salary of $40,000-80,000/year, you are losing $80,000-160,000.

Free resources are often **unstructured**, **outdated**, and **incomplete**. You spend time searching for information instead of learning.

### Do this instead

- **Invest in learning wisely.** A good paid course for $200-500 that shortens your learning from 12 to 4 months is the best investment in your career.
- **Invest in infrastructure.** $20-50/month on AWS for practice is not an expense -- it is an investment.
- **Calculate ROI:** If a $300 course shortens your path to employment by 3 months, and your potential salary is $4,000/month -- ROI = $12,000 / $300 = 40x.
- Free resources are an excellent supplement. But not your only source of learning.

---

## Mistake 4: Learning in Silence

### What it is

You learn in silence. Nobody knows you are studying DevOps. No GitHub profile with projects. No LinkedIn posts. No blog. Your knowledge exists only in your head.

### Why it hurts

1. **Recruiters cannot find you** -- the LinkedIn algorithm shows active users
2. **No proof of skills** -- in an interview, words without a portfolio = zero
3. **No feedback** -- you do not know if you understand things correctly
4. **No networking** -- 60% of positions are filled through referrals

### Do this instead

**Minimum public presence (30 minutes per week):**

1. **GitHub:** Push code every week. Every project should have a README.
2. **LinkedIn:** 1 post per week. "Today I learned how to configure Network Policies in K8s. Here is what I understood..." That is it. 5 minutes.
3. **Blog (optional):** 1 article per month. "How I deployed EKS with Terraform: step by step."

```
Post formula:
"Today I [what I did].
The hardest part was [problem].
Here is what I learned: [insight].
[screenshot or link to GitHub]"
```

This is not bragging. It is **documenting your learning** -- and simultaneously building a professional brand.

---

## Mistake 5: Certification-First Mindset

### What it is

"First I will pass the AWS Solutions Architect Associate, then the CKA, then the Terraform Associate. After 3 certificates I will start looking for work."

### Why it hurts

- **A certificate without experience = a fancy piece of paper.** Employers ask more questions if they see a certificate without projects: "You know the theory, but can you actually do the work?"
- **Exam prep is not practical skills.** You learn to answer test questions, not solve real problems.
- **Time:** 2-3 months for each certification. 3 certifications = 6-9 months without real projects.

### Do this instead

```
Correct sequence:
1. Build 3-5 projects (3-4 months)
2. Get certified (now it is easier because you have practice)
3. Show in the interview: projects + certificate = combo

Recommended certifications (AFTER practice):
├── AWS Cloud Practitioner (if starting from zero)
├── AWS Solutions Architect Associate
├── CKA (Certified Kubernetes Administrator)
└── HashiCorp Terraform Associate
```

---

## Mistake 6: Tool Hopping

### What it is

One week -- Docker. Then one week -- Ansible. Then one week -- Terraform. Then "Oh, everyone is talking about Pulumi!" -- one week of Pulumi. Then back to Docker. Then "Maybe Podman?"

### Why it hurts

You know 10% of every tool and 100% of none. In an interview you will be asked: "How did you solve problem X with Terraform?" -- and you will not be able to answer deeply.

**Deep knowledge of one tool > surface knowledge of five.**

### Do this instead

```
The "3 months" rule:
1. Choose a tool (e.g., Terraform)
2. Work with it for at least 3 months
3. Build 2-3 projects
4. Then -- and only then -- look at alternatives

Recommended stack (one tool per category):
├── Containers: Docker (not Podman, not LXC)
├── Orchestration: Kubernetes (not Docker Swarm, not Nomad)
├── IaC: Terraform (not Pulumi, not CDK)
├── CI/CD: GitHub Actions (not Jenkins, not CircleCI)
├── Cloud: AWS (not GCP, not Azure -- at first)
├── Monitoring: Prometheus + Grafana (not Datadog -- at first)
└── Secrets: Vault or AWS Secrets Manager
```

---

## Mistake 7: Ignoring Fundamentals

### What it is

"Linux? Networking? That is boring. I want to go straight to Kubernetes and Terraform. That is the cool stuff."

### Why it hurts

Kubernetes is Linux containers + networking + API. Without understanding Linux and networking you will be **helpless** when debugging.

Real situations without fundamentals:
- Pod does not start -> you do not know how to read logs (`journalctl`, `kubectl logs`)
- Service is unreachable -> you do not understand DNS, routing, ports
- Disk is full -> you do not know `df`, `du`, `lsof`
- Process is eating CPU -> you do not know `top`, `strace`

### Do this instead

```
Minimum fundamentals before "trendy" tools:
├── Linux: 1 week (command line, filesystem, processes, networking)
├── Networking: 3-5 days (IP, DNS, HTTP, TCP/UDP, firewall)
├── Git: 2-3 days (branching, PRs, merge conflicts)
└── Bash: 3-5 days (scripts, automation)

Test: If you cannot explain what happens when you run
"curl -v https://api.example.com/users" -- you are not ready for K8s.
```

---

## Mistake 8: Copy-Paste DevOps

### What it is

You follow a tutorial, copy every command and every file. Everything works. You are satisfied. But if you change one parameter, everything breaks and you do not know why.

### Why it hurts

You are not learning to **think**. You are learning to **copy**. In an interview you will be asked: "Why did you choose `t3.medium` instead of `t3.small`?" or "Why is there a NAT Gateway here?" -- and you will not be able to answer.

Copy-paste creates an **illusion of knowledge**. You think you can do it, but in reality you can only repeat it.

### Do this instead

**The "three whys" rule:** For every command and every line of configuration, ask yourself:

```
1. WHAT does this do? (describe in simple words)
2. WHY is it needed? (what problem does it solve)
3. WHAT happens if I remove it? (understanding consequences)

Example:
resources:
  requests:
    cpu: 100m      # WHAT: Minimum CPU for the pod
    memory: 128Mi  # WHY: K8s uses this for scheduling
  limits:
    cpu: 500m      # WHAT: Maximum CPU
    memory: 256Mi  # WHAT WITHOUT: pod can eat all node memory -> OOMKilled
```

After every tutorial: **change 3 things** and redeploy. Broke? Excellent -- now you are truly learning.

---

## Mistake 9: Perfectionism Paralysis

### What it is

"I am not ready to send my resume yet. I still need to learn Service Mesh. And Crossplane. And eBPF. And Rust for DevOps. Then I will be ready."

### Why it hurts

You will never be "fully ready." DevOps is a field where new tools appear every month. If you wait for "perfect readiness" you will never submit your first resume.

**Fact:** Most junior DevOps engineers are hired knowing 40-60% of what is in the job description. They learn the rest on the job.

### Do this instead

**The "70% readiness" rule:** If you match 70% of the requirements in a job posting -- apply.

```
Minimum for your first position:
├── [x] Docker: write a Dockerfile, run compose
├── [x] CI/CD: build a basic pipeline
├── [x] Cloud: deploy an app on AWS
├── [x] Terraform: create basic infrastructure
├── [x] K8s: deploy an app, debug basic issues
├── [x] Git: PR workflow, merge conflicts
├── [x] Linux: basic administration
├── [ ] Service Mesh <- NOT needed for first job
├── [ ] eBPF <- NOT needed for first job
└── [ ] Multi-cluster K8s <- NOT needed for first job
```

Apply to 5-10 positions per week. Every rejection is feedback for improvement.

---

## Mistake 10: Ignoring Soft Skills

### What it is

"I am a technical specialist. I do not need soft skills. I will write Terraform and debug K8s."

### Why it hurts

A DevOps engineer works **between teams**: developers, QA, managers, security, business. If you cannot communicate, you are not a DevOps engineer -- you are a script writer.

The reality of DevOps:
- 30% of time -- technical work
- 30% of time -- communication (meetings, PR reviews, documentation)
- 20% of time -- troubleshooting (where you need to explain things to others)
- 20% of time -- planning and design (where you need to persuade)

### Do this instead

**5 soft skills for DevOps:**

```
1. Communication
   ├── Explain technical decisions to non-technical people
   ├── Write clear PR descriptions and comments
   └── Clearly formulate problems and proposals

2. Documentation
   ├── README for every project
   ├── Runbooks for typical procedures
   ├── ADR (Architecture Decision Records)
   └── Post-mortems after incidents

3. Incident Management
   ├── Stay calm under pressure
   ├── Communicate status to stakeholders
   ├── Conduct blameless post-mortems
   └── Document lessons learned

4. Collaboration
   ├── Code review: constructive feedback
   ├── Pair programming / debugging
   └── Mentoring less experienced colleagues

5. Time Management
   ├── Task prioritization
   ├── On-call without burnout
   └── Balance between urgent and important
```

---

## Mistake 11 (Bonus): All or Nothing

### What it is

"If I do not have 4 hours, there is no point in studying. I will start on the weekend." The weekend comes -- but other things come up. One week without studying. Two. A month.

### Why it hurts

**Consistency > Intensity.** 30 minutes every day = 15 hours per month = 180 hours per year. 4 hours once every 2 weeks = 8 hours per month = 96 hours per year. And you lose additional time on "warming up" after a break.

The brain absorbs information better with regular, calm learning than with rare marathons.

### Do this instead

**The "25 minutes" rule:**

```
Daily minimum:
├── 5 minutes: read one article or documentation
├── 15 minutes: practice (write a Terraform resource, debug a pod)
├── 5 minutes: write down what you learned (notes or LinkedIn post)
└── Total: 25 minutes. Even on the busiest day.

Weekly maximum (when you have time):
├── 2-3 hours on the weekend: project work
├── 30-60 minutes on weekdays: learning + practice
└── 15 minutes before bed: reading documentation
```

**Key:** 25 minutes every day beats 8 hours once every 2 weeks.

---

## Mistake 12 (Bonus): Premature Production-Scale

### What it is

You have not deployed a single application yet, but you are already designing a multi-regional architecture with Service Mesh, multi-cluster K8s, Crossplane, and custom operators.

### Why it hurts

**Premature complexity kills motivation.** You spend weeks on things that solve Facebook-scale problems, even though your project serves 10 requests per second.

Result: nothing works, you are demotivated, you think "DevOps is too hard."

### Do this instead

**The "start simple, iterate" rule:**

```
Complexity stages (each one WORKS before you move to the next):

Stage 1: It works
├── One Dockerfile
├── docker-compose up -- and everything runs
└── Goal: the application starts

Stage 2: In the cloud
├── EC2 or ECS
├── RDS
├── Running in one region
└── Goal: accessible from the internet

Stage 3: Automated
├── CI/CD pipeline
├── Terraform for infrastructure
├── Basic monitoring
└── Goal: changes deploy automatically

Stage 4: Production-ready
├── K8s with Helm
├── Auto-scaling
├── Full monitoring
├── Security baseline
└── Goal: can handle load

Stage 5: Scale (ONLY if actually needed)
├── Multi-region
├── Service Mesh
├── Advanced observability
└── Goal: handles Netflix-scale (you do not need this)
```

**80% of DevOps teams never reach Stage 5.** Stages 1-4 are what you need for 99% of job postings.

---

## Consolidated Checklist: Am I Making These Mistakes?

Go through this list once a month:

### Learning
- [ ] My tools work **together** in one project, not in isolation
- [ ] I practice in my **own** environment (AWS account, Minikube), not just in sandboxes
- [ ] I invest in learning (time, money), understanding ROI
- [ ] I learn **consistently** (a little every day), not in marathons

### Public Presence
- [ ] My projects are on **GitHub** with descriptions
- [ ] I write at least 1 **post per week** on LinkedIn
- [ ] I have at least 2-3 **portfolio projects** that I can show

### Approach
- [ ] I understand the **"why"** for every tool, not just the "how"
- [ ] I focus on **one tool** per category, not hopping between them
- [ ] I have **solid fundamentals** (Linux, networking, Git) before "trendy" tools
- [ ] My certifications are backed by **real projects**

### Readiness
- [ ] I apply for positions at **70% match**, not waiting for 100%
- [ ] I develop **soft skills** alongside technical ones
- [ ] I start **simple** and iterate, not designing production-scale from day one

---

**How many items did you check?**

- 12-14: You are on the right path. Keep going.
- 8-11: There is room for improvement. Pay attention to the unchecked items.
- 4-7: You are making several serious mistakes. Re-read the relevant sections.
- 0-3: Stop and re-read this document from the beginning. Seriously.

---

## Links Inside the Repo

- The learning roadmap: [90 - Learning Roadmap](../90-roadmap/)
- Factor 1: [Cloud Adoption](../01-cloud-adoption/)
- Factor 2: [Containers & Kubernetes](../02-containers-and-kubernetes/)
- Factor 3: [DevSecOps](../03-devsecops/)
- Factor 4: [Infrastructure as Code](../04-infrastructure-as-code/)
- Factor 5: [AI & MLOps](../05-ai-and-mlops/)
- Factor 6: [Observability & SRE](../06-observability-and-sre/)
- Back to start: [Course Overview](../README.md)
