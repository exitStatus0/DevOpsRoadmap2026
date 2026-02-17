# Factor 5: AI & MLOps

> VOICEOVER: This factor is different from the other four. AI is not just a skill you learn — it is a multiplier on everything else you do. Every Terraform module, every Dockerfile, every Kubernetes manifest, every CI pipeline — AI makes you faster at all of it. And then there is MLOps, which is 80% DevOps engineering. Let me break down both sides.

---

## Why It Matters in 2026

Two things happened simultaneously:
1. **AI tools became usable for daily DevOps work.** GitHub Copilot, Claude, ChatGPT, and domain-specific tools can generate, review, and debug infrastructure code. Engineers who use these tools are measurably faster.
2. **Every company wants to deploy ML models.** And they discovered that building a model is 10% of the work — the other 90% is infrastructure, pipelines, monitoring, and reliability. That is DevOps.

**What this means for you:**
- **AI as copilot:** You are not competing against AI. You are competing against engineers who use AI. The productivity gap is real — 2-3x for routine tasks.
- **MLOps as career path:** Companies are desperate for people who can deploy and operate ML models. They do not need more data scientists. They need DevOps engineers who understand the ML lifecycle.
- **GPU infrastructure:** As AI workloads grow, expertise in GPU scheduling, VRAM management, and inference optimization is becoming highly compensated.

> ON SCREEN: "AI is not your replacement. It is your competitive advantage — if you learn to use it."

---

## What Problem It Solves in Real Teams

### AI as Copilot — Problem Solved:
- **Slow context switching:** Looking up Terraform syntax, K8s manifest structure, Helm chart templating. AI provides instant answers in context.
- **Boilerplate fatigue:** Writing the same VPC module, Dockerfile, or CI pipeline from scratch every time. AI generates the 80% that is standard, you customize the 20% that is specific.
- **Debugging bottlenecks:** Staring at a CrashLoopBackOff or a Terraform state error for hours. AI processes the error context and suggests fixes in seconds.
- **Knowledge gaps:** You know Docker but not K8s networking. AI bridges gaps while you learn, so you are productive before you are an expert.

### MLOps — Problem Solved:
- **Model rot:** Models degrade over time as data changes. Without monitoring and retraining pipelines, predictions get worse silently.
- **Deployment chaos:** Data scientists build models in Jupyter notebooks. Someone needs to turn that into a production service. That someone is you.
- **Resource waste:** GPU instances cost $1-30/hour. Without proper scheduling and scaling, companies burn money on idle GPUs.
- **No reproducibility:** "It worked in my notebook" is the ML equivalent of "it worked on my machine." MLOps solves this with versioned data, code, and models.

---

## What You Must Learn (Core Skills)

### Part 1: AI as a Daily Tool (Start Immediately)

**Prompt engineering for infrastructure work:**
This is not about learning "AI" as a technology. It is about learning to communicate with AI tools effectively for your specific work.

**Effective prompt patterns for DevOps:**

1. **Specify the context:**
```
Bad: "Write a Terraform module for EKS"
Good: "Write a Terraform module for AWS EKS in us-east-1.
Requirements: K8s 1.29, managed node group with m5.xlarge (min 2, max 8),
private subnets only, IRSA enabled, cluster logging for api+audit.
Use variables for all configurable values. Follow Terraform best practices."
```

2. **Ask for review, not just generation:**
```
"Review this Terraform module for:
1. Security issues
2. Cost optimization opportunities
3. Missing best practices
4. Potential failure modes
[paste code]"
```

3. **Chain prompts for complex tasks:**
```
Step 1: "Design the architecture for a multi-AZ Kubernetes deployment
with auto-scaling and zero-downtime deployments."
Step 2: "Now write the Terraform for the infrastructure part."
Step 3: "Now write the Helm chart for the application deployment."
Step 4: "Now write the GitHub Actions pipeline that ties it all together."
```

4. **Use AI for learning, not just doing:**
```
"Explain what this Terraform code does, step by step.
Then explain what would happen if I changed the lifecycle block.
[paste code]"
```

**Tools to integrate into your workflow:**
- **GitHub Copilot** — code completion in your editor
- **Claude / ChatGPT** — complex reasoning, architecture review, debugging
- **Amazon Q Developer** — AWS-specific code generation and troubleshooting
- **K8sGPT** — Kubernetes-specific AI diagnostics
- **Infracost + AI** — cost analysis for Terraform changes

### Part 2: MLOps (The 80% That Is DevOps)

**The ML lifecycle from a DevOps perspective:**
```
Data Pipeline → Training → Evaluation → Packaging → Deployment → Monitoring → Retraining
     |              |           |            |            |            |            |
  (DevOps)     (Data Sci)  (Data Sci)   (DevOps)     (DevOps)     (DevOps)     (DevOps)
```

You own 5 of the 7 stages. Data scientists own the model logic. You own everything else.

**Core MLOps skills:**

1. **ML Pipeline Orchestration**
   - **Kubeflow Pipelines** — Kubernetes-native ML workflows
   - **MLflow** — experiment tracking, model registry, deployment
   - **Airflow** — general-purpose workflow orchestration (used heavily in ML)
   - **Argo Workflows** — K8s-native workflow engine (different from ArgoCD)

2. **Model Serving**
   - **TensorFlow Serving / TorchServe** — framework-specific model servers
   - **Triton Inference Server** — NVIDIA's multi-framework inference server
   - **Seldon Core / KServe** — Kubernetes-native model serving
   - **BentoML** — package models as production-ready services

3. **GPU Infrastructure**
   - Scheduling GPU workloads on Kubernetes (resource requests for `nvidia.com/gpu`)
   - NVIDIA device plugin for K8s
   - GPU node pools with auto-scaling
   - Cost optimization (spot GPU instances, time-sharing)
   - Understanding VRAM management and multi-GPU configurations

4. **Feature Stores and Data Versioning**
   - **Feast** — open-source feature store
   - **DVC** — data version control (Git for data)
   - Understanding data pipelines at a high level

5. **Model Monitoring**
   - Data drift detection
   - Model performance monitoring
   - A/B testing infrastructure for models
   - Automated retraining triggers

---

## What Is Optional / "Worst ROI" to Learn First

1. **Building ML models** — You are a DevOps engineer, not a data scientist. You need to understand the ML lifecycle and what models need. You do not need to build neural networks.

2. **Deep learning theory** — Understanding backpropagation and gradient descent is not required for deploying models. Know what a model is (input, inference, output), not how it is trained.

3. **Prompt engineering certifications** — The field is moving too fast for certifications to be meaningful. Practice daily instead.

4. **Building your own AI tools** — Use existing tools (Copilot, Claude, K8sGPT). Building custom AI tools is for AI engineering teams.

5. **Every ML framework (TensorFlow, PyTorch, JAX, etc.)** — Data scientists choose the framework. You need to know how to containerize, serve, and scale whatever they give you. You do not need to write training code in each framework.

> VOICEOVER: The biggest mistake I see is DevOps engineers trying to become data scientists. You do not need to build models. You need to deploy, scale, and monitor them. That is the skill gap companies are paying to fill.

---

## How Deep to Go

### Beginner (weeks 1-3):
- Uses AI tools daily for Terraform, Docker, K8s work
- Can write effective prompts that give useful results
- Can explain what MLOps is and why DevOps engineers are critical to it
- Understands the ML lifecycle and which parts are DevOps responsibility
- Can explain GPU vs. CPU workloads at a high level

### Strong (months 2-4) — THIS IS THE HIRING THRESHOLD:
- AI tools are integrated into every aspect of daily work (not occasional use)
- Can review AI-generated code critically (catch errors, security issues, antipatterns)
- Can set up MLflow for experiment tracking and model registry
- Can deploy a model serving endpoint on Kubernetes (KServe or Seldon Core)
- Can configure GPU workloads on K8s (resource requests, node selectors, tolerations)
- Can build a CI/CD pipeline for ML models (train, test, package, deploy)
- Can set up basic model monitoring (latency, error rates, data drift)
- Can containerize ML models with proper GPU support

### Expert (6+ months):
- Can design end-to-end MLOps platforms
- Can implement Kubeflow Pipelines for complex ML workflows
- Can optimize GPU utilization across a cluster (MIG, time-sharing, scheduling)
- Can implement A/B testing and canary deployments for models
- Can design multi-model serving with Triton
- Can set up automated retraining pipelines triggered by drift detection
- Can architect feature stores for real-time and batch serving

> ON SCREEN: "Strong = you can deploy and serve models reliably. Expert = you design the MLOps platform."

---

## How AI Changes This Factor (Meta: AI for AI/MLOps Work)

This section is recursive — using AI to build AI infrastructure.

### 1. AI for Building MLOps Pipelines
```
Prompt: "Design a Kubeflow Pipeline that:
1. Pulls training data from S3
2. Preprocesses data (normalize, split train/test)
3. Trains a model using a GPU node
4. Evaluates the model against a baseline
5. If performance improves, registers in MLflow and deploys to KServe
Write the pipeline YAML and explain each step."
```

### 2. AI for GPU Workload Configuration
```
Prompt: "Write a Kubernetes deployment for a model inference service that:
- Uses nvidia.com/gpu: 1
- Has a node selector for GPU nodes (instance-type: p3.2xlarge)
- Tolerates the GPU node taint
- Resource limits: 8Gi memory, 4 CPU, 1 GPU
- Autoscales based on GPU utilization
- Uses Triton Inference Server as the serving engine"
```

### 3. AI for Generating CI/CD for ML
```
Prompt: "Write a GitHub Actions pipeline for an ML project that:
1. On PR: run unit tests, lint code, validate model config
2. On merge to main: train model on GPU runner, evaluate, register in MLflow
3. On tag: deploy model to staging KServe endpoint, run integration tests
4. On manual approval: promote to production
Include proper caching for pip dependencies and model artifacts."
```

### 4. AI for Troubleshooting ML Infrastructure
```
Prompt: "My KServe InferenceService is stuck in 'Unknown' state.
Here is the kubectl describe output:
[paste output]
Here are the knative-serving controller logs:
[paste logs]
What is wrong?"
```

### 5. AI for Cost Optimization
```
Prompt: "I am running 5 p3.2xlarge GPU instances 24/7 for model training
that only runs 4 hours per day. Training jobs take 2-3 hours each.
What is the most cost-effective approach? Consider: spot instances,
Karpenter auto-scaling, scheduled scaling, and AWS Savings Plans."
```

---

## Common Mistakes & Traps

### Trap 1: Fearing AI Replacement
**What happens:** You avoid learning AI tools because "AI will replace DevOps engineers." Meanwhile, engineers who embrace AI become 2-3x more productive and get promoted.
**Fix:** AI replaces tasks, not engineers. The engineers who get replaced are the ones who refuse to use AI. Adopt it aggressively.

### Trap 2: Blindly Trusting AI Output
**What happens:** You copy-paste AI-generated Terraform without reviewing it. It deploys resources in the wrong region, with public access, and no encryption.
**Fix:** AI generates, you review. Every line. Every permission. Every network rule. AI is a junior engineer that works instantly — it still needs code review.

### Trap 3: Trying to Become an ML Engineer
**What happens:** You spend 6 months learning PyTorch, neural network architecture, and training techniques. You are now a mediocre data scientist and have fallen behind on DevOps skills.
**Fix:** Stay in your lane. Learn to deploy, scale, and monitor models. Let data scientists build them. The intersection — MLOps — is where you add value.

### Trap 4: Ignoring AI Tools Entirely
**What happens:** You write everything from scratch "because I know how." You spend 45 minutes writing a Terraform module that AI could have generated in 30 seconds. Your colleague who uses AI ships 3 features while you ship 1.
**Fix:** Integrate AI into your daily workflow today. Use it for code generation, debugging, documentation, architecture review. Measure the time saved.

### Trap 5: Using AI Without Understanding
**What happens:** You generate K8s manifests with AI but do not understand what a PodDisruptionBudget does. When something breaks, you cannot debug it because you never learned the underlying concepts.
**Fix:** Use AI as an accelerator, not a crutch. When AI generates something you do not understand, ask it to explain. Then verify the explanation. Build understanding alongside productivity.

### Trap 6: Over-Investing in MLOps Before Core DevOps
**What happens:** You jump into Kubeflow and KServe before you are solid in Docker, K8s, and Terraform. You cannot debug basic pod issues, let alone ML-specific ones.
**Fix:** MLOps is an advanced specialization. Get strong in the first 4 factors before going deep on MLOps. The fundamentals (containers, orchestration, IaC, security) are prerequisites.

---

## Mini-Practice (Exercises)

### Exercise 1: AI-Powered Infrastructure Review
**What you do:** Take an existing Terraform project (yours or open-source) and use AI to perform a comprehensive review.
**Skills tested:** Prompt engineering, critical evaluation of AI output, infrastructure knowledge.
**Requirements:**
- Use AI to review for security issues, cost optimization, and best practices
- Evaluate each AI suggestion — is it correct? Is it relevant? Is it a real risk?
- Implement the valid suggestions
- Document cases where AI was wrong or gave bad advice
**Deliverable:** A before/after comparison with a document explaining each change.

### Exercise 2: Build a Complete CI/CD Pipeline with AI
**What you do:** Use AI to generate a complete CI/CD pipeline, then review, fix, and improve it.
**Skills tested:** AI workflow, CI/CD design, code review.
**Requirements:**
- Describe your project to AI (language, test framework, deployment target)
- Generate the pipeline with AI
- Review every step critically — fix errors, add missing steps, improve security
- Add steps AI missed (secret scanning, IaC validation, image signing)
- Run the pipeline and fix any issues
**Deliverable:** A working pipeline that you could not have built as fast without AI, but that you understand completely.

### Exercise 3: Deploy a Model Serving Pipeline
**What you build:** An end-to-end model deployment on Kubernetes.
**Skills tested:** Model serving, K8s GPU workloads, monitoring.
**Requirements:**
- Use a pre-trained model (HuggingFace has thousands — pick a simple text classifier)
- Containerize the model with a serving framework (BentoML or FastAPI wrapper)
- Deploy to Kubernetes with proper resource limits
- Set up health checks and autoscaling
- Add monitoring (request latency, error rate, model response distribution)
- Bonus: Add A/B testing between two model versions
**Deliverable:** A REST API endpoint that serves model predictions, running on K8s, with monitoring.

### Exercise 4: GPU Workload on Kubernetes
**What you build:** A GPU-scheduled workload on a K8s cluster.
**Skills tested:** GPU scheduling, node affinity, resource management.
**Requirements:**
- Set up a K8s cluster with GPU nodes (EKS with p3 instances, or use a local setup with GPU passthrough)
- Deploy a GPU workload with proper resource requests (`nvidia.com/gpu: 1`)
- Configure node affinity and tolerations for GPU nodes
- Set up monitoring for GPU utilization
- Implement auto-scaling based on queue length or GPU utilization
**Note:** If GPU instances are too expensive, simulate with CPU and document what would change for real GPU deployment.

### Exercise 5: Daily AI Integration Challenge (1 Week)
**What you do:** For 5 working days, use AI for every infrastructure task and log the results.
**Skills tested:** AI integration into daily workflow, prompt quality, critical evaluation.
**Daily log format:**
- Task description
- Prompt used
- AI output quality (1-5)
- Time saved vs. manual approach
- Errors or issues in AI output
- What you learned about effective prompting
**Deliverable:** A week-long log with patterns on when AI helps most and when it fails.

---

## "Signals" You Are Job-Ready (Checklist)

### AI Copilot Readiness:
- [ ] Uses AI tools daily for infrastructure work (not occasionally)
- [ ] Can write prompts that generate production-quality Terraform, Docker, and K8s code
- [ ] Can critically review AI output — catches errors, security issues, and antipatterns
- [ ] Can explain the difference between good and bad AI-generated infrastructure code
- [ ] Can use AI to debug complex infrastructure issues faster than manual approaches
- [ ] Has a workflow for: AI generates, human reviews, human applies

### MLOps Readiness:
- [ ] Can explain the ML lifecycle and identify which parts are DevOps responsibility
- [ ] Can containerize an ML model and deploy it as a REST API
- [ ] Can set up model serving on Kubernetes (KServe, Seldon, or BentoML)
- [ ] Can configure GPU workloads on K8s (resource requests, scheduling, tolerations)
- [ ] Can set up experiment tracking with MLflow
- [ ] Can build a CI/CD pipeline for model training and deployment
- [ ] Can monitor model performance (latency, errors, data drift)

> VOICEOVER: Here is the bottom line. In 2026, there are two types of DevOps engineers: those who use AI every day and those who are falling behind. And if you combine AI fluency with MLOps skills? You are in the top 5% of candidates. That is not a guess — that is what hiring managers are telling me.

---

## Links Inside the Repo

- Previous: [04 - Infrastructure as Code](../04-infrastructure-as-code/) — what AI helps you write faster
- Related: [01 - Cloud Adoption](../01-cloud-adoption/) — cloud platform for GPU workloads
- Related: [02 - Containers & Kubernetes](../02-containers-and-kubernetes/) — where models run
- Related: [03 - DevSecOps](../03-devsecops/) — security for ML pipelines
- Full path: [90 - Learning Roadmap](../90-roadmap/) — where AI/MLOps fits in the bigger picture
- Avoid traps: [91 - Common Mistakes](../91-mistakes/) — the "fear of AI" trap and others
