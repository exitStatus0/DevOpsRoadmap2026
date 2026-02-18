# Factor 5: AI & MLOps

![AI & MLOps](05-ai-and-mlops.png)

> **Quick start**
> - **7 days:** Use an AI tool (Claude or Copilot) for 5 DevOps tasks → containerize a simple ML model (FastAPI + scikit-learn). Read "What Not to Learn First."
> - **30 days:** Complete the Beginner checklist → Exercise 2 (CI/CD for an ML project) → deploy MLflow locally.

---

## Why It Matters in 2026

AI changes DevOps in two ways. First, AI becomes your daily assistant. Second, MLOps is a new field that specifically needs DevOps skills.

Most companies are investing in AI, and MLOps has become one of the fastest-growing specializations in the industry.

Two dimensions of AI for a DevOps engineer:

**Dimension 1: AI as a DevOps Engineer's Assistant**
- Generating Terraform/K8s/Docker configurations
- Debugging and troubleshooting
- Writing CI/CD pipelines
- Log and incident analysis
- Code review of infrastructure code

**Dimension 2: MLOps -- DevOps for ML**
- ML pipelines (training, evaluation, deployment)
- Model serving (inference endpoints)
- GPU infrastructure
- Model versioning and registry
- Model monitoring (drift detection)

Why this is critical:
- **Every other company** is implementing ML/AI -- and they need infrastructure
- **MLOps is 80% DevOps**: CI/CD, containers, K8s, monitoring, IaC
- **GPU infrastructure** -- a new scarce skill: few people know how to do it properly
- **AI assistants** can significantly increase a DevOps engineer's productivity

---

## What Problem It Solves in Real Teams

### AI as Assistant

| Problem | Without AI | With AI |
|---------|-----------|---------|
| Write a K8s manifest for a new service | 1-2 hours | 10-15 minutes + review |
| Debug a complex problem | Hours reading logs | Ask AI with context -> hint in minutes |
| Learn a new tool | Days of documentation | Interactive learning through dialogue |
| Write a runbook for an incident | 2-3 hours of documentation | 30 minutes with AI assistance |
| Review Terraform code | 30-60 minutes | 10 minutes with AI hints |

### MLOps

| Problem | Without MLOps Engineer | With MLOps Engineer |
|---------|----------------------|---------------------|
| ML engineer deploys a model | "I ran Jupyter on EC2..." | Automated serving pipeline |
| Model versioning | "Model in folder models_v3_final_FINAL" | ML Registry (MLflow, Weights & Biases) |
| GPU resources | Constantly running GPU instances = $$$$ | Auto-scaling GPU on K8s |
| Model monitoring | "Why did accuracy drop?" -- nobody knows | Drift detection + automatic alerts |
| Reproducibility | "It worked in my Jupyter" | Containerized training pipelines |

**Real example:** A Data Science team with 5 ML engineers. Without MLOps: deploying a model took 2 weeks (manual DevOps + ML work), GPU instances ran 24/7 (bill $15,000/month), reproducing training was impossible. After implementing MLOps: deployment in 30 minutes via CI/CD, GPUs auto-scale ($4,000/month), every training run is versioned and reproducible.

---

## What You Must Learn (Core Skills)

### 1. Prompt Engineering for Infrastructure

This is not about "using ChatGPT." This is about **systematic use of AI** in daily DevOps work:

```
An effective DevOps prompt must have:
├── Context: "I am using AWS EKS 1.29 with Terraform"
├── Task: "Create a Deployment for a Python API"
├── Constraints: "Non-root, resource limits, health probes"
├── Format: "Terraform HCL / K8s YAML / Bash script"
└── Verification: "Explain why each parameter was chosen"
```

**Examples of effective prompts:**

```
Prompt 1 (Terraform):
"Create a Terraform module for AWS EKS with the following specification:
- K8s version: 1.29
- Node groups: general (t3.medium, 2-5), gpu (g4dn.xlarge, 0-3, spot)
- IRSA enabled
- Addons: CoreDNS, vpc-cni, ebs-csi, gpu-device-plugin
- Encryption at rest for secrets
- Logging: api, audit
Explain each decision."

Prompt 2 (Troubleshooting):
"Pod 'ml-api-7d8f9c6b4-xk2mn' is in CrashLoopBackOff.
Logs: 'RuntimeError: CUDA out of memory. Tried to allocate 2.00 GiB'
Resources: requests gpu 1, limits gpu 1
Node has NVIDIA T4 (16GB VRAM).
Other pods on this node: ml-worker (using 12GB VRAM).
What is wrong and how to fix it?"

Prompt 3 (CI/CD):
"Create a GitHub Actions workflow for an ML project:
- On PR: lint, unit tests, build Docker image
- On merge to main: train model (GPU runner), evaluate, register in MLflow
- On tag: deploy model to staging (Kubernetes serving)
- Manual approval for production
Project: Python, PyTorch, FastAPI for serving."
```

### 2. MLOps Pipelines

```
MLOps Pipeline:
├── Data Pipeline
│   ├── Data collection and validation
│   ├── Feature store (Feast)
│   └── Data versioning (DVC)
├── Training Pipeline
│   ├── Containerized training
│   ├── Hyperparameter tuning
│   ├── Experiment tracking (MLflow, W&B)
│   └── GPU scheduling (K8s + NVIDIA device plugin)
├── Evaluation Pipeline
│   ├── Quality metrics
│   ├── A/B testing
│   └── Shadow deployment
├── Deployment Pipeline
│   ├── Model registry (MLflow)
│   ├── Serving (TorchServe, Triton, KServe, vLLM)
│   ├── Canary deployment
│   └── Rollback
└── Monitoring Pipeline
    ├── Model performance metrics
    ├── Data drift detection
    ├── Latency and throughput
    └── Cost monitoring (GPU utilization)
```

**Key MLOps Tools:**

| Category | Tool | Purpose |
|----------|------|---------|
| Experiment tracking | MLflow, W&B | Track experiments, parameters, metrics |
| Model registry | MLflow, Vertex AI | Model versioning and storage |
| Pipeline orchestration | Kubeflow, Airflow, Argo Workflows | ML pipeline orchestration |
| Serving | KServe, Triton, vLLM, TGI | Deploy models for inference |
| Feature store | Feast | Feature storage and serving |
| Data versioning | DVC | Dataset versioning |
| GPU management | NVIDIA GPU Operator, MIG | GPU resource management |

### 3. GPU Infrastructure

```
GPU skills for DevOps:
├── GPU Basics
│   ├── Difference between CPU and GPU workloads
│   ├── VRAM vs RAM
│   ├── CUDA and NVIDIA drivers
│   └── GPU types (T4, A10, A100, H100, L40S)
├── GPU on K8s
│   ├── NVIDIA Device Plugin
│   ├── GPU Operator
│   ├── Resource requests/limits for GPU
│   ├── Node selectors and tolerations for GPU nodes
│   ├── MIG (Multi-Instance GPU) for H100/A100
│   └── Time-slicing for smaller GPUs
├── GPU in the Cloud
│   ├── AWS: p4d, p5, g5, g4dn instances
│   ├── GCP: a2, g2 instances
│   ├── Spot/Preemptible GPU (60-90% savings)
│   └── Reserved GPU instances
└── Cost Optimization
    ├── Auto-scaling GPU nodes (Karpenter, Cluster Autoscaler)
    ├── Batch processing instead of real-time
    ├── Model quantization (reducing GPU requirements)
    └── Monitoring GPU utilization (DCGM Exporter + Prometheus)
```

### 4. Model Serving

```
Serving strategies:
├── Real-time inference
│   ├── REST API (FastAPI + model)
│   ├── gRPC (for high-throughput)
│   └── Managed: SageMaker, Vertex AI
├── Batch inference
│   ├── Spark / Dask
│   ├── Kubernetes Jobs
│   └── Scheduled pipelines
├── LLM Serving (especially relevant in 2026)
│   ├── vLLM -- open-source serving for LLMs
│   ├── TGI (Text Generation Inference) -- Hugging Face
│   ├── Triton Inference Server -- NVIDIA
│   └── KServe -- K8s-native
└── Scaling
    ├── HPA based on custom metrics (request queue, GPU util)
    ├── KEDA for event-driven scaling
    └── Scale-to-zero for cost optimization
```

---

## What Is Optional / "Worst ROI" to Learn First

### Do NOT learn first:

1. **Building ML models** -- You are a DevOps/MLOps engineer, not an ML engineer. You do not need to understand how a transformer or CNN works. It is enough to know: what a model is, how it is trained, how it is deployed.

2. **Deep learning theory** -- Backpropagation, gradient descent, loss functions -- these are for Data Scientists. Your job is infrastructure for training and deployment.

3. **Specific ML frameworks in detail** -- You do not need to know the PyTorch API. It is enough to know: "this is a TensorFlow model, it needs a GPU with 16GB VRAM, it is deployed through TorchServe."

4. **Building a feature store from scratch** -- Use Feast or managed services. Building your own is for large ML platform teams.

5. **Fine-tuning LLMs** -- This is the ML engineer's job. Your job is to provide GPU infrastructure and CI/CD for the fine-tuning pipeline.

---

## How Deep to Go

### Beginner (2-3 weeks)

- [ ] Use AI daily for DevOps tasks (Terraform, Docker, K8s, CI/CD)
- [ ] Understand the difference between training and inference
- [ ] Understand what a model is, model version, model registry
- [ ] Containerize a simple ML service (FastAPI + scikit-learn)
- [ ] Understand why GPU is needed and which tasks are impossible without it
- [ ] Know basic terms: epoch, batch, inference latency, throughput

**Test:** Can you explain to a non-technical person how MLOps differs from DevOps? If yes -- move on.

### Strong (4-8 weeks)

- [ ] Deploy MLflow for experiment tracking
- [ ] Create a CI/CD pipeline for an ML project (train -> evaluate -> register -> deploy)
- [ ] Set up GPU nodes in K8s (NVIDIA Device Plugin)
- [ ] Deploy a model through KServe or TorchServe
- [ ] Set up auto-scaling for inference endpoints
- [ ] Monitor GPU utilization (DCGM Exporter + Prometheus + Grafana)
- [ ] Understand model drift and how to detect it
- [ ] Use Spot GPU instances for training

**Test:** Can you build a full pipeline from model training to serving with monitoring? If yes -- you are strong.

### Expert (3-6 months)

- [ ] Design an ML platform for an organization
- [ ] Implement Kubeflow or Argo Workflows for ML pipelines
- [ ] Set up multi-GPU training (distributed training)
- [ ] Optimize GPU costs: MIG, time-slicing, spot instances
- [ ] Implement A/B testing for models
- [ ] Set up LLM serving (vLLM on K8s)
- [ ] Feature store with Feast
- [ ] Compliance and governance for ML (model cards, audit trail)

**Test:** Can you design and implement an ML platform that serves 5+ ML teams? If yes -- you are an expert.

---

## How AI Changes This Factor (Practical Examples)

This factor is about AI, so the focus here is not "how AI helps" but "how to use AI every day."

### Daily AI Workflow of a DevOps Engineer

**Morning: Planning**
```
Prompt: "I need to migrate 3 microservices from Docker Compose
to Kubernetes. Services: API (Node.js), Worker (Python), Redis.
Create a migration plan with specific steps and Helm charts for each."
```

**Day: Development**
```
Prompt: "Create a GitHub Actions workflow:
1. On push to feature branch: lint + test + build image
2. On PR to main: terraform plan + security scan
3. On merge to main: terraform apply + deploy to staging
4. On tag: deploy to production (manual approval)
Use OIDC for AWS credentials, not static keys."
```

**Incident: Troubleshooting**
```
Prompt: "Alertmanager fired: 'HighMemoryUsage' on pod 'api-server'.
Here is the output of kubectl top pods, kubectl describe pod, and the last 50 lines of logs:
[paste data]
What could be the cause and how to fix it?"
```

**Evening: Documentation**
```
Prompt: "Based on this Terraform code [paste], create:
1. Architecture Decision Record (ADR) -- why this architecture was chosen
2. Runbook for disaster recovery
3. Architecture diagram in Mermaid format"
```

### Building MLOps Pipelines with AI

```
Prompt: "Create an Argo Workflows template for an ML pipeline:
1. Step 1: Download data from S3
2. Step 2: Preprocessing (Python container)
3. Step 3: Training (GPU container, PyTorch)
4. Step 4: Evaluation (compare with previous model)
5. Step 5: If accuracy > threshold -> register in MLflow
6. Step 6: Deploy via KServe (canary 10% -> 50% -> 100%)
Each step is a separate container with specific resource requests."
```

### AI Tools for DevOps in 2026

| Tool | Category | How To Use |
|------|----------|------------|
| Claude Code / GitHub Copilot | Coding | Generate Terraform, K8s, CI/CD |
| ChatGPT / Claude | Troubleshooting | Debugging, explanations, planning |
| K8sGPT | K8s-specific | Automatic analysis of cluster problems |
| AWS Application Composer | AWS | Visual architecture design |
| Kubecost + AI | FinOps | K8s cost optimization |

---

## Common Mistakes & Traps

### Trap 1: "AI Will Replace Me"

**What it is:** Fear that AI will make DevOps engineers unnecessary.

**Why it hurts:** Paradox: those who fear AI and ignore it will truly become uncompetitive. Not because of AI, but because of those who use it.

**Fix:** AI is a tool, like Terraform or Docker. It amplifies your skills, it does not replace them. A DevOps engineer with AI does in a day what used to take a week. But AI needs a human who knows what to verify.

### Trap 2: Ignoring AI Tools

**What it is:** "I do everything manually, I do not need AI."

**Why it hurts:** You are measurably slower than a colleague who uses AI. It is like refusing an IDE in favor of Notepad.

**Fix:** Start simple:
1. Use AI for generating boilerplate (Terraform modules, K8s manifests)
2. Use AI for troubleshooting (paste logs -> get a solution)
3. Use AI for learning (explain a concept -> ask questions)

### Trap 3: Trying to Become an ML Engineer

**What it is:** A DevOps engineer studies PyTorch, TensorFlow, deep learning math.

**Why it hurts:** You spend months on skills that are not needed for your role. ML engineers have PhDs and years of experience. You will not become an ML engineer in 3 months.

**Fix:** Your zone is **infrastructure for ML**:
- CI/CD for ML projects
- GPU scheduling on K8s
- Model serving and scaling
- Monitoring and observability
- Cost optimization for GPU

### Trap 4: Blind Trust in AI

**What it is:** Copying AI-generated code without verification.

**Why it hurts:** AI generates code that looks correct but may have critical errors: open Security Groups, excessive IAM privileges, missing encryption.

**Fix:** The "trust but verify" rule:
1. AI generates -> you review
2. Run linting (tflint, checkov) on generated code
3. Test in staging before production
4. Understand every line of code you deploy

### Trap 5: GPU Costs Without Control

**What it is:** GPU instances running 24/7, even when inference traffic = 0.

**Why it hurts:** One g5.xlarge = ~$1/hour. 24/7 = $730/month. 10 of those = $7,300/month. And that is without any load.

**Fix:**
- Scale-to-zero for inference (KEDA + KServe)
- Spot instances for training (60-90% savings)
- Monitor GPU utilization (alert when < 30%)
- Batch processing instead of real-time where possible
- Model quantization (smaller model = smaller GPU)

---

## Mini-Practice (5 Exercises)

### Exercise 1: Daily AI Use for DevOps (beginner)

**Goal:** Integrate AI into your daily workflow.

```
Week challenge:
Monday: Generate a Terraform module for S3 + CloudFront using AI
Tuesday: Ask AI to do a security review of your Dockerfile
Wednesday: Create K8s manifests for a new service through AI
Thursday: Debug a real problem with AI assistance (paste logs + describe context)
Friday: Generate a CI/CD pipeline and runbook through AI

For each day:
1. Write down the prompt
2. Write down the result
3. What you had to fix
4. How much time was saved

Success criteria: AI is used at least 5 times per day for DevOps tasks
```

### Exercise 2: CI/CD for an ML Project (strong)

**Goal:** Build a complete pipeline for ML.

```
Steps:
1. Create a simple ML project: FastAPI + scikit-learn model
2. Dockerfile: multi-stage, non-root, health check
3. GitHub Actions pipeline:
   - Lint + test
   - Train model (with fixed seed for reproducibility)
   - Evaluate (compare with baseline)
   - Build and push Docker image
   - Register model in MLflow
   - Deploy to K8s (Deployment + Service + Ingress)
4. MLflow:
   - Set up MLflow server
   - Log experiment parameters, metrics, artifacts
   - Model registry: staging -> production
5. Monitoring: latency, throughput, error rate

Success criteria: push to main -> automatic training -> evaluation -> deploy
```

### Exercise 3: GPU Workloads on K8s (strong -> expert)

**Goal:** Learn to work with GPU on Kubernetes.

```
Steps:
1. Set up a K8s cluster with GPU nodes
   (EKS with g4dn.xlarge or kind + NVIDIA GPU)
2. Install NVIDIA GPU Operator
3. Create a Pod with GPU:
   - requests: nvidia.com/gpu: 1
   - limits: nvidia.com/gpu: 1
4. Run an inference service (FastAPI + PyTorch model)
5. Set up HPA on custom metrics (request queue length)
6. Monitoring: DCGM Exporter -> Prometheus -> Grafana
   - GPU utilization
   - GPU memory usage
   - Temperature
7. Optimization: scale-to-zero when there is no traffic

Success criteria: GPU workload runs on K8s with auto-scaling and monitoring
```

### Exercise 4: Model Serving Pipeline (strong -> expert)

**Goal:** Deploy an ML model in a production-ready way.

```
Steps:
1. Choose a serving framework: KServe or vLLM
2. Containerize the model
3. Create K8s resources for serving:
   - InferenceService (KServe) or Deployment
   - Auto-scaling (min 0, max 5)
   - Resource requests/limits
4. Canary deployment: 10% -> 50% -> 100%
5. A/B testing: old model vs new
6. Monitoring:
   - Latency (p50, p95, p99)
   - Throughput (requests/sec)
   - Error rate
   - Model-specific metrics (accuracy, drift)
7. Rollback procedure: automatic when error rate > 5%

Success criteria: model deploys through GitOps with canary and automatic rollback
```

### Exercise 5: LLM Serving on K8s (expert)

**Goal:** Deploy an LLM for inference.

```
Steps:
1. Choose an open-source model (Llama 3, Mistral)
2. Install vLLM on K8s:
   - GPU node with sufficient VRAM
   - Model weights from Hugging Face Hub or S3
   - vLLM Deployment with OpenAI-compatible API
3. Optimization:
   - Quantization (AWQ or GPTQ) to reduce VRAM
   - Continuous batching (vLLM does this automatically)
   - Tensor parallelism for multi-GPU
4. Ingress + rate limiting
5. Monitoring:
   - Tokens/second
   - Time-to-first-token (TTFT)
   - GPU utilization and VRAM usage
6. Cost analysis: compare with OpenAI API pricing

Success criteria: LLM runs on K8s, accessible via API, with monitoring and auto-scaling
```

---

## "Signals" You Are Job-Ready (Checklist)

### Required:

- [ ] Use AI daily for DevOps tasks and know its limitations
- [ ] Write effective prompts for generating Terraform/K8s/CI code
- [ ] Explain the difference between training and inference
- [ ] Containerize an ML service (FastAPI + model)
- [ ] Understand why GPU is needed and what types of GPU instances exist
- [ ] Know the main MLOps tools: MLflow, KServe, vLLM

### Desired:

- [ ] Build a CI/CD pipeline for an ML project
- [ ] Set up GPU nodes in K8s with NVIDIA Device Plugin
- [ ] Deploy a model through KServe or vLLM
- [ ] Set up model monitoring (drift detection)
- [ ] Optimize GPU costs (spot instances, scale-to-zero)
- [ ] Understand MLflow model registry

### In an Interview You Can:

- [ ] Explain how AI changes the work of a DevOps engineer (with specific examples)
- [ ] Describe an MLOps pipeline from training to serving
- [ ] Explain the difference between DevOps and MLOps
- [ ] Describe how to scale an inference endpoint
- [ ] Explain a GPU cost optimization strategy
- [ ] Describe how to monitor an ML model in production

---

## Links Inside the Repo

- Previous factor: [Infrastructure as Code](../04-infrastructure-as-code/)
- Containers for ML: [Containers & Kubernetes](../02-containers-and-kubernetes/)
- Cloud GPU infrastructure: [Cloud Adoption](../01-cloud-adoption/)
- ML pipeline security: [DevSecOps](../03-devsecops/)
- IaC for ML infrastructure: [Infrastructure as Code](../04-infrastructure-as-code/)
- Learning roadmap: [Roadmap](../90-roadmap/)
- Mistakes to avoid: [Common Mistakes](../91-mistakes/)
- Back to [course overview](../README.md)

**Apply this factor:** [Project A — Full-Stack DevOps Platform](../90-roadmap/#canonical-portfolio-projects) (MLOps track)
