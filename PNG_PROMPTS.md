# PNG Prompts

This file contains image-generation prompts for the main course PNG assets.

## General Notes

- Preferred format: `16:9`
- Style goal: clean technical infographic, not poster noise
- Recommended workflow: generate layout/background with AI, then add final text manually in Figma, Canva, or Photoshop for perfect readability
- Keep text short inside the generated image; avoid dense paragraphs

## Shared Art Direction

Use this style block as the base for all prompts:

```text
16:9 clean vector infographic, dark navy background, subtle circuitry lines, cyan and teal primary accents, minimal magenta highlights, high contrast, lots of whitespace, modern technical style, maximum 3 main content zones, short readable text only, strong hierarchy, no fake code, no distorted letters, no tiny footer text, no gibberish, all typography must be perfectly readable and professionally typeset.
```

---

## 1. Root Landing Image

Target file: `DevOpsRoadmap.png`

```text
Create a landing-page hero infographic. Title: "DevOps Roadmap 2026". Subtitle: "A Practical Mini-Course for DevOps, Platform Engineering, and SRE". Center hexagon: "6 Growth Factors". Around it: Cloud Adoption, Containers & Kubernetes, DevSecOps, Infrastructure as Code, AI Workflows & MLOps, Observability & SRE. Bottom strip: "Foundations -> Core Tools -> Scale & Automate -> Specialize". Minimal copy, clean icons, no extra paragraphs.
```

---

## 2. English Course Overview

Target file: `en/Intro.png`

```text
Create an English course overview infographic. Title: "DevOps Roadmap 2026: The 6 Growth Factors". Two-lane structure. Left lane labeled "Core Path" with 1 Cloud Adoption, 2 Containers & Kubernetes, 3 DevSecOps, 4 Infrastructure as Code, 6 Observability & SRE. Right lane labeled "Specialization Track" with 5 AI Workflows & MLOps. Footer icons: Why it matters, What to learn, What to skip, Depth levels, AI workflows, Exercises, Job-ready signals. Keep the message practical, not hype-driven.
```

---

## 3. Learning Roadmap

Target file: `en/90-roadmap/roadmap.png`

```text
Create a roadmap infographic with 4 horizontal stages. Stage 1: Foundations (Linux, Networking, Git, Scripting). Stage 2: Core Tools (Docker, CI/CD, AWS basics). Stage 3: Scale & Automate (Kubernetes, Terraform/OpenTofu, Security Basics, Observability). Stage 4: Specialize (Platform, SRE, Cloud+IaC, GitOps+K8s, AI/MLOps). Add 3 small bottom cards: Cloud Lab Safety, Portfolio Projects, Public Proof of Work. Emphasize progression and realistic pacing, not hype.
```

---

## 4. Mistakes Poster

Target file: `en/91-mistakes/common-mistakes-fix.png`

```text
Create a 3x4 grid poster titled "Top Beginner Mistakes in DevOps". One card per mistake: Isolated Courses, Sandbox Dependency, Opportunity Cost, Learning in Silence, Certification First, Tool Hopping, Missing Fundamentals, Copy-Paste DevOps, Perfectionism, Ignoring Soft Skills, All or Nothing, Premature Scale. Each card must contain exactly 2 short lines: the mistake and the fix. Bottom bar: "Build one growing project. Practice in real environments. Stay consistent. Publish proof of work." Very readable, no dense footer text.
```

---

## 5. Factor 1: Cloud Adoption

Target file: `en/01-cloud-adoption/01-cloud-adoption.png`

```text
Create a 3-column infographic titled "Factor 1: Cloud Adoption". Column 1: "Start Here" with cloud-agnostic concepts, AWS Level 1 services, CLI first, billing alerts. Column 2: "Core Path" with IAM, VPC, EC2, S3, ALB, RDS, CloudWatch, IaC transition. Column 3: "Leave for Later" with multi-account design, org-level FinOps, advanced networking, deep serverless. Footer: Job-ready signals for junior/mid cloud roles. Mention current AWS Free Tier / credits carefully, without saying everything is free.
```

---

## 6. Factor 2: Containers & Kubernetes

Target file: `en/02-containers-and-kubernetes/02-containers-and-kubernetes.png`

```text
Create a 3-column infographic titled "Factor 2: Containers & Kubernetes". Column 1: "Start Here" with Docker first, Compose, image tagging, debugging containers. Column 2: "Hiring Threshold" with Deployments, Services, Ingress, Helm, probes, resource limits, RBAC, NetworkPolicies, troubleshooting. Column 3: "Advanced Later" with Gateway API, Karpenter, service mesh, operators, multi-cluster. Footer: Job-ready signals focused on Dockerfiles, Helm, networking, and fixing broken deployments.
```

---

## 7. Factor 3: DevSecOps

Target file: `en/03-devsecops/03-devsecops.png`

```text
Create a 3-column infographic titled "Factor 3: DevSecOps". Column 1: "Start Here" with secrets hygiene, Trivy, gitleaks, RBAC, NetworkPolicies, least privilege. Column 2: "Core Controls" with Secret Management, Image Security, SAST/DAST, Kubernetes Security, Supply Chain Security, Network Security. Column 3: "Leave for Later" with deep compliance, custom tooling, advanced service-mesh security, org-scale secrets platforms. Tone should be practical and calm: security basics are expected, but this is not a pentesting course.
```

---

## 8. Factor 4: Infrastructure as Code

Target file: `en/04-infrastructure-as-code/04-iac.png`

```text
Create a 3-column infographic titled "Factor 4: Infrastructure as Code". Column 1: "Start Here" with one tool deeply, small configs, plan before apply, remote state with locking enabled. Column 2: "Core Skills" with Terraform/OpenTofu, modules, state management, CI checks, GitOps link, testing basics. Column 3: "Common Traps" with local state, monolith configs, no tests, blind apply, copy-paste modules. Use current Terraform language: show S3 remote state with locking enabled, not DynamoDB as the default teaching path.
```

---

## 9. Factor 5: AI & MLOps

Target file: `en/05-ai-and-mlops/05-ai-and-mlops.png`

```text
Create a two-lane infographic titled "Factor 5: AI & MLOps". Left lane, larger: "AI for Every DevOps Engineer" with generating Terraform/K8s/CI, troubleshooting, runbooks, documentation, review. Right lane, smaller and marked "Advanced Specialization": "MLOps" with MLflow, model serving, GPU infrastructure, monitoring, drift, cost control. Bottom row: "Start Here", "Hiring Threshold if ML is your target", "Leave for Later". Make it visually obvious that AI workflows are core, but full MLOps is optional specialization.
```

---

## 10. Factor 6: Observability & SRE

Target file: `en/06-observability-and-sre/observability-and-sre.png`

```text
Create a 3-column infographic titled "Factor 6: Observability & SRE". Column 1: "Start Here" with metrics, logs, one dashboard, one alert, one SLO. Column 2: "Core Stack" with Prometheus, Grafana, Loki, OpenTelemetry, traces, RED/USE, error budgets. Column 3: "Advanced Later" with tail sampling, multi-burn-rate alerts, chaos engineering, multi-team architecture. Footer: Job-ready signals focused on PromQL, SLOs, alerts, logs+traces correlation, and post-mortems.
```
