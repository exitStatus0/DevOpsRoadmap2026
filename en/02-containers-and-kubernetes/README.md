# Factor 2: Containers & Kubernetes

> VOICEOVER: If cloud is where things run, containers are how things are packaged. And Kubernetes is how you orchestrate them at scale. In 2026, Docker is not a skill on your resume — it is expected. Kubernetes is what separates junior from mid-level. Let me show you exactly what to learn and what to skip.

---

## Why It Matters in 2026

Containers solved the "works on my machine" problem. Kubernetes solved the "how do we run 500 of these reliably" problem. Together, they are the foundation of modern infrastructure.

The numbers:
- **96% of organizations** are either using or evaluating Kubernetes.
- **Container adoption** is standard in every company with more than 50 engineers.
- **Every major cloud provider** has a managed Kubernetes service (EKS, GKE, AKS).
- **Job postings** mentioning Kubernetes have grown 3x in the last three years and show no sign of slowing.

If you are pursuing DevOps in 2026 and you do not know containers and Kubernetes, you are missing the single most in-demand skill set in the field.

> ON SCREEN: "Docker = table stakes. Kubernetes = career accelerator."

---

## What Problem It Solves in Real Teams

**Without containers:**
- "It works on my machine" is a daily conversation
- Deployments take hours of manual server configuration
- Scaling means buying and configuring new servers
- Dev and prod environments are never truly identical
- Rollbacks are terrifying

**Without orchestration (Kubernetes):**
- Running 5 containers manually is fine. Running 500 is chaos.
- No self-healing — a crashed process stays crashed until someone notices
- No load balancing across container instances
- No rolling deployments — updates mean downtime
- Resource allocation is guesswork

**With containers + Kubernetes:**
- Identical environments from laptop to production
- Deployments are declarative — describe what you want, K8s makes it happen
- Self-healing — crashed containers restart automatically
- Scaling is a single command or automatic based on metrics
- Rolling updates with zero downtime, instant rollbacks

---

## What You Must Learn (Core Skills)

### Docker (Learn First — 2-3 weeks)

**Fundamentals:**
- How containers work (namespaces, cgroups — conceptual, not kernel-level)
- Writing Dockerfiles — not just copying from Docker Hub
- Multi-stage builds — your images should be small and secure
- Docker Compose for local multi-service development
- Image tagging strategy (semantic versioning, git SHA, never `latest` in production)
- Container registries (Docker Hub, ECR, GCR, Harbor)

**Dockerfile Best Practices:**
```dockerfile
# BAD: 1.2GB image, runs as root, no layer caching
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y nodejs npm
COPY . /app
RUN cd /app && npm install
CMD ["node", "/app/server.js"]

# GOOD: 150MB image, non-root, cached layers, multi-stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER appuser
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Kubernetes (Learn After Docker — 6-10 weeks)

**Core Objects — learn these in this order:**
1. **Pod** — the smallest deployable unit. Understand why it wraps containers.
2. **Deployment** — how you declare desired state for your pods
3. **Service** — how pods find and talk to each other (ClusterIP, NodePort, LoadBalancer)
4. **ConfigMap & Secret** — configuration and sensitive data management
5. **Namespace** — isolation and organization
6. **Ingress** — external traffic routing into the cluster
7. **PersistentVolume & PVC** — stateful workloads need storage
8. **RBAC** — who can do what in the cluster (links to [Factor 3: DevSecOps](../03-devsecops/))

**Networking — do NOT skip this:**
- Pod-to-pod communication
- Service discovery (DNS-based)
- Network policies (allow/deny traffic between pods)
- Ingress controllers (NGINX Ingress, Traefik)
- Understanding CNI plugins at a high level (Calico, Cilium)

**Helm — the K8s package manager:**
- Installing charts from public repos
- Writing your own Helm charts
- Values files for different environments
- Helm hooks for migrations

**Key Commands You Must Know Cold:**
```bash
kubectl get pods -A                    # all pods, all namespaces
kubectl describe pod <name>            # detailed pod info + events
kubectl logs <pod> -c <container> -f   # stream container logs
kubectl exec -it <pod> -- /bin/sh      # shell into a running container
kubectl apply -f manifest.yaml         # declarative apply
kubectl rollout status deployment/app  # watch a deployment roll out
kubectl rollout undo deployment/app    # instant rollback
kubectl top pods                       # resource usage
kubectl get events --sort-by='.lastTimestamp'  # recent cluster events
```

---

## What Is Optional / "Worst ROI" to Learn First

1. **Docker Swarm** — Kubernetes won the orchestration war. Swarm is legacy. Do not spend time on it unless you have an employer who requires it.

2. **Nomad** — Excellent tool, but niche market. Learn it if a specific job requires it, not as your primary orchestrator.

3. **Custom Operators from day one** — Writing Kubernetes operators is an expert-level skill. Learn to use existing operators first. Writing your own comes much later.

4. **Podman as your starting point** — Podman is a valid Docker alternative, but the ecosystem (docs, tutorials, community answers) is built around Docker. Start with Docker, switch to Podman when a job requires it.

5. **Service mesh (Istio/Linkerd) from day one** — These solve problems you do not have yet. Learn them when you are running multiple services that need mTLS, advanced traffic management, or observability.

6. **Kubernetes the Hard Way as your first K8s experience** — Kelsey Hightower's guide is legendary, but it is for understanding internals. Start with a managed cluster (EKS, minikube, kind), deploy real apps, then do "the hard way" for deeper understanding.

> VOICEOVER: I see people waste months learning Docker Swarm or trying to set up Kubernetes from scratch on bare metal as their first experience. That is backwards. Use a managed cluster, deploy real applications, and understand the internals later.

---

## How Deep to Go

### Beginner (weeks 1-3):
- Can write a Dockerfile for a simple application
- Can build and run a multi-container app with Docker Compose
- Can explain what Kubernetes is and why it exists
- Can deploy a pod, deployment, and service on a local cluster (minikube/kind)
- Can use `kubectl get`, `describe`, `logs`, and `exec`

### Strong (months 2-4) — THIS IS THE HIRING THRESHOLD:
- Can write production-quality multi-stage Dockerfiles
- Can design a K8s deployment for a multi-service application
- Can configure Ingress with TLS termination
- Can manage ConfigMaps, Secrets, and environment-specific configurations
- Can write Helm charts for reusable deployments
- Can set up RBAC for team access control
- Can debug pod failures systematically (CrashLoopBackOff, ImagePullBackOff, OOMKilled, pending pods)
- Can implement health checks (liveness, readiness, startup probes)
- Can set resource requests and limits appropriately
- Can write and apply NetworkPolicies

### Expert (6+ months):
- Can design multi-cluster strategies
- Can implement custom controllers/operators
- Can tune cluster autoscaler and HPA/VPA
- Can implement GitOps with ArgoCD/Flux (links to [Factor 4](../04-infrastructure-as-code/))
- Can manage stateful workloads (databases, message queues) on K8s
- Can implement service mesh for advanced traffic management
- Can troubleshoot CNI and kube-proxy issues

> ON SCREEN: "Can you debug a CrashLoopBackOff in under 5 minutes? That is strong level."

---

## How AI Changes This Factor

### 1. AI for Generating K8s Manifests
```
Prompt: "Write a Kubernetes deployment for a Node.js app with:
- 3 replicas
- Resource requests: 256Mi memory, 250m CPU
- Resource limits: 512Mi memory, 500m CPU
- Liveness probe on /health every 10 seconds
- Readiness probe on /ready every 5 seconds
- Environment variables from a ConfigMap called 'app-config'
- Pull from ECR registry 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.2.3"
```
AI generates the manifest in seconds. You review it, adjust, and apply.

### 2. AI for Debugging Pod Failures
```
Prompt: "My pod is in CrashLoopBackOff. Here are the logs:
[paste kubectl logs output]
Here is the describe output:
[paste kubectl describe pod output]
What is wrong and how do I fix it?"
```
AI analyzes the logs and events, identifies the root cause, and suggests fixes.

### 3. AI for Helm Chart Development
```
Prompt: "Convert this Kubernetes deployment manifest into a Helm chart with
values for: image tag, replica count, resource limits, ingress host,
and environment-specific ConfigMap values."
```

### 4. AI for Writing Dockerfiles
```
Prompt: "Write a production-optimized Dockerfile for a Python FastAPI application.
Requirements: multi-stage build, non-root user, minimal image size,
proper layer caching for pip dependencies, health check instruction."
```

### 5. AI for Network Policy Design
```
Prompt: "Write Kubernetes NetworkPolicies for this setup:
- frontend pods can receive traffic from ingress and talk to backend pods on port 8080
- backend pods can talk to database pods on port 5432
- database pods accept traffic only from backend pods
- nothing else is allowed"
```

> VOICEOVER: AI does not replace your need to understand Kubernetes. But it eliminates the time you spend looking up YAML syntax. Use AI to generate, use your brain to review and debug.

---

## Common Mistakes & Traps

### Trap 1: Not Understanding Networking
**What happens:** You deploy pods and services. They cannot talk to each other. You have no idea why. You spend hours guessing.
**Fix:** Before deploying anything on K8s, understand: how pods get IPs, how Services route traffic, how DNS resolution works inside the cluster, what a ClusterIP actually is. Draw diagrams.

### Trap 2: Skipping Namespaces and RBAC
**What happens:** Everything runs in the `default` namespace. Everyone has cluster-admin. This works in development. It is a disaster in production.
**Fix:** From your first K8s project, use namespaces. Set up RBAC. Get comfortable with `Role`, `ClusterRole`, `RoleBinding`, and `ClusterRoleBinding`. See [Factor 3: DevSecOps](../03-devsecops/) for more.

### Trap 3: Using `latest` Tag in Production
**What happens:** You deploy `image:latest`. It works. You deploy again a week later. It is a completely different image. Things break and you cannot reproduce the previous state.
**Fix:** Always use specific tags. Use git SHA or semantic version. Never `latest` outside of local development.

### Trap 4: No Resource Requests/Limits
**What happens:** One pod consumes all memory on a node. Other pods get OOMKilled. The node becomes unresponsive. Chaos.
**Fix:** Set resource requests and limits on every container. Start conservative, then tune based on actual usage with `kubectl top`.

### Trap 5: Ignoring Health Checks
**What happens:** A pod is running but the application inside is deadlocked or stuck. K8s thinks everything is fine because the process is still alive. Traffic keeps routing to a broken pod.
**Fix:** Implement liveness probes (restart if unhealthy), readiness probes (stop sending traffic if not ready), and startup probes for slow-starting apps.

### Trap 6: Treating K8s Manifests Like Scripts
**What happens:** You `kubectl apply` manually from your laptop. Different team members have different versions. Nobody knows what is actually running.
**Fix:** Store all manifests in Git. Deploy through CI/CD. Use GitOps (ArgoCD/Flux). See [Factor 4](../04-infrastructure-as-code/) for the full GitOps approach.

---

## Mini-Practice (Exercises)

### Exercise 1: Containerize a Multi-Service Application
**What you build:** A 3-service application (frontend, backend API, database) using Docker Compose.
**Skills tested:** Dockerfiles, multi-stage builds, Docker networking, Compose, environment variables.
**Requirements:**
- Frontend: React/Vue/static HTML served by Nginx
- Backend: Node.js or Python API
- Database: PostgreSQL with data persistence
- All Dockerfiles must be multi-stage, non-root user, under 200MB
**Deliverable:** `docker-compose up` runs the entire stack locally.

### Exercise 2: Deploy to Kubernetes with Helm
**What you build:** Take the application from Exercise 1 and deploy it to Kubernetes using Helm.
**Skills tested:** K8s deployments, services, ConfigMaps, Secrets, Ingress, Helm charts.
**Requirements:**
- Write Helm charts (not raw manifests)
- Different values files for `dev` and `prod`
- Ingress with TLS (use cert-manager or self-signed for practice)
- Health checks on all pods
- Resource requests and limits
**Deliverable:** `helm install` deploys the entire application to a local K8s cluster (kind or minikube).

### Exercise 3: Set Up Ingress and Observability
**What you build:** NGINX Ingress Controller with path-based routing and monitoring.
**Skills tested:** Ingress controllers, path-based routing, TLS, metrics.
**Requirements:**
- Install NGINX Ingress Controller
- Route `/api/*` to backend, `/*` to frontend
- TLS termination at ingress level
- Export Ingress metrics to Prometheus (if comfortable — links to observability)
**Deliverable:** Access the application via a domain name with HTTPS.

### Exercise 4: Debug a Broken Deployment
**What you build:** Nothing — you fix what is broken.
**Skills tested:** Troubleshooting, `kubectl describe`, logs, events, resource issues.
**Setup:** Create a deployment with intentional issues (wrong image tag, insufficient resources, missing ConfigMap, wrong port in readiness probe). Practice finding and fixing each one.
**Deliverable:** Document each issue, how you found it, and the fix. This is interview preparation.

---

## "Signals" You Are Job-Ready (Checklist)

- [ ] Can write a multi-stage Dockerfile from scratch without looking at references
- [ ] Can explain the difference between CMD and ENTRYPOINT, ADD and COPY
- [ ] Can deploy a multi-service application to Kubernetes
- [ ] Can write Helm charts with environment-specific values
- [ ] Can explain how Kubernetes networking works (pod IPs, Services, DNS, Ingress)
- [ ] Can set up RBAC for different team roles
- [ ] Can debug CrashLoopBackOff, ImagePullBackOff, OOMKilled, and Pending pods in under 10 minutes
- [ ] Can write and apply NetworkPolicies
- [ ] Can implement proper health checks (liveness, readiness, startup)
- [ ] Can set appropriate resource requests and limits based on observed usage
- [ ] Can perform a rolling update and rollback
- [ ] Can explain what happens when you run `kubectl apply -f deployment.yaml` (the full chain: API server, etcd, scheduler, kubelet)

> VOICEOVER: If someone hands you a broken Kubernetes deployment and you can diagnose and fix it in 15 minutes — you are ready. That is the real interview test, and that comes from practice, not from reading docs.

---

## Links Inside the Repo

- Previous: [01 - Cloud Adoption](../01-cloud-adoption/) — where your clusters will run
- Next: [03 - DevSecOps](../03-devsecops/) — securing your containers and clusters
- Related: [04 - Infrastructure as Code](../04-infrastructure-as-code/) — managing K8s infrastructure with Terraform and GitOps
- Related: [05 - AI & MLOps](../05-ai-and-mlops/) — GPU workloads and model serving on K8s
- Full path: [90 - Learning Roadmap](../90-roadmap/) — where containers/K8s fits in the bigger picture
- Avoid traps: [91 - Common Mistakes](../91-mistakes/) — tool hopping and other career killers
