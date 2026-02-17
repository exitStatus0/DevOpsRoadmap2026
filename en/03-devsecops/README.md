# Factor 3: DevSecOps

> VOICEOVER: Here is the reality of 2026 — security is not someone else's job anymore. Every DevOps engineer is expected to own security basics. Not penetration testing. Not compliance auditing. But the practical security that stops your infrastructure from being the reason your company makes the news. Let me break down exactly what you need to know.

---

## Why It Matters in 2026

Security breaches cost companies an average of $4.5 million per incident. The vast majority of breaches are caused by:
- Misconfigured cloud resources (public S3 buckets, open security groups)
- Hardcoded secrets in code repositories
- Unpatched container images with known vulnerabilities
- Overly permissive access controls
- Supply chain attacks through compromised dependencies

All of these are preventable by the DevOps engineer who builds and maintains the infrastructure.

The industry responded by moving security "left" — earlier in the development pipeline. This is not a trend; it is now the standard. Job postings for "DevOps Engineer" increasingly list security skills as requirements, not nice-to-haves.

> ON SCREEN: "$4.5M average breach cost. Most breaches are preventable misconfigurations."

**What this means for your career:**
- Engineers with security skills earn 15-25% more than those without
- "DevSecOps" is the fastest-growing specialization within DevOps
- Companies that have been breached are willing to pay a premium for engineers who can prevent the next one
- Every cloud and K8s skill you learn in [Factor 1](../01-cloud-adoption/) and [Factor 2](../02-containers-and-kubernetes/) becomes more valuable when you can secure it

---

## What Problem It Solves in Real Teams

**Without DevSecOps in the pipeline:**
- Vulnerabilities are discovered in production — after deployment, sometimes after exploitation
- Secrets are committed to Git repositories (this happens more than you think)
- Container images run as root with known CVEs
- Anyone with cluster access can do anything — no RBAC, no audit trail
- Security reviews happen once a quarter, find 200 issues, and nothing gets fixed because the backlog is too large
- Compliance audits are painful, manual, and take weeks

**With DevSecOps integrated:**
- Vulnerabilities are caught in CI before they reach production
- Secrets are managed through Vault/AWS Secrets Manager — never in code
- Images are scanned automatically, and builds fail if critical CVEs are found
- RBAC enforces least privilege at every level
- Security is continuous, automated, and manageable
- Compliance evidence is generated automatically

---

## What You Must Learn (Core Skills)

### 1. Secret Management
This is the highest-ROI security skill. Leaked secrets are the #1 cause of breaches you can prevent.

**Tools to learn:**
- **HashiCorp Vault** — the industry standard for secret management
- **AWS Secrets Manager / SSM Parameter Store** — cloud-native option
- **External Secrets Operator** — syncs secrets from Vault/AWS into Kubernetes
- **git-secrets / gitleaks** — pre-commit hooks that prevent secret commits

**What you must be able to do:**
- Set up Vault with a basic secrets engine
- Implement secret rotation (automatic, not manual)
- Configure applications to read secrets from Vault/Secrets Manager at runtime
- Set up pre-commit hooks that scan for secrets before they are committed

### 2. Container Image Security
Every container image you deploy should be scanned.

**Tools to learn:**
- **Trivy** — the go-to open-source scanner (images, IaC, SBOM)
- **Grype** — alternative scanner by Anchore
- **Cosign** — image signing and verification

**What you must be able to do:**
- Add Trivy scanning to your CI pipeline
- Fail builds on CRITICAL/HIGH CVEs
- Understand the difference between OS-level and application-level vulnerabilities
- Choose base images that minimize attack surface (distroless, Alpine, scratch)
- Sign container images and verify signatures before deployment

### 3. SAST/DAST in the Pipeline
Static and Dynamic Application Security Testing — catching vulnerabilities in code before deployment.

**Tools to learn:**
- **SonarQube / SonarCloud** — static code analysis
- **Snyk** — dependency vulnerability scanning
- **OWASP ZAP** — dynamic application security testing
- **Checkov / tfsec** — IaC security scanning (catch misconfigured Terraform before it deploys)

**What you must be able to do:**
- Integrate at least one SAST tool into CI/CD
- Scan Terraform/CloudFormation for security issues before apply
- Run dependency vulnerability scans on every PR

### 4. Kubernetes Security
Securing the cluster and the workloads running on it.

**What to learn:**
- **RBAC** — Role-Based Access Control. Who can do what.
- **Network Policies** — which pods can talk to which pods
- **Pod Security Standards** — preventing privileged containers, host network access, etc.
- **OPA/Gatekeeper or Kyverno** — policy engines that enforce rules at admission
- **Falco** — runtime security monitoring

**Practical RBAC example:**
```yaml
# Role: developer can view pods and logs in 'staging' namespace
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: staging
  name: developer-role
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log", "services", "configmaps"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: staging
  name: developer-binding
subjects:
- kind: Group
  name: "developers"
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: developer-role
  apiGroup: rbac.authorization.k8s.io
```

### 5. Supply Chain Security
Ensuring everything in your pipeline — from source code to deployed images — is trustworthy.

**What to learn:**
- SBOM (Software Bill of Materials) generation
- Image signing with Cosign/Notary
- Dependency pinning (lock files, image SHA digests)
- Sigstore for verification
- Private registries with access controls

### 6. Network Security
**What to learn:**
- Network Policies in Kubernetes (see [Factor 2](../02-containers-and-kubernetes/))
- Security groups and NACLs in cloud (see [Factor 1](../01-cloud-adoption/))
- mTLS between services (Istio/Linkerd or cert-manager)
- Encryption in transit and at rest

---

## What Is Optional / "Worst ROI" to Learn First

1. **Penetration testing** — This is a specialized career path. DevOps engineers need to prevent common vulnerabilities, not discover novel exploits. Leave pentesting to pentesters.

2. **Compliance frameworks in depth (SOC2, HIPAA, PCI-DSS)** — You need to understand that they exist and what they require at a high level. You do not need to memorize the controls. Compliance is a team effort involving legal, security, and engineering.

3. **Custom security tooling** — Do not write your own scanner or policy engine. Use established tools (Trivy, Checkov, OPA). Custom security tools are for security engineering teams.

4. **Offensive security / CTF challenges** — Fun and educational, but not the fastest path to DevSecOps competence. Focus on defensive security first.

5. **Detailed cryptography** — Understand TLS, encryption at rest, key rotation at a practical level. You do not need to implement AES or understand elliptic curve math.

> VOICEOVER: You are not becoming a security engineer. You are becoming a DevOps engineer who does not leave the door open. Focus on the 20% of security knowledge that prevents 80% of breaches.

---

## How Deep to Go

### Beginner (weeks 1-3):
- Can explain what DevSecOps means and why security shifts left
- Can use gitleaks/git-secrets to scan a repo for exposed secrets
- Can run Trivy against a container image and interpret the results
- Can explain RBAC at a conceptual level
- Knows not to run containers as root

### Strong (months 2-4) — THIS IS THE HIRING THRESHOLD:
- Can integrate Trivy, Checkov, and secret scanning into a CI pipeline
- Can write Kubernetes RBAC roles and bindings for different team roles
- Can write NetworkPolicies that enforce pod-to-pod communication rules
- Can set up HashiCorp Vault or AWS Secrets Manager for application secrets
- Can implement secret rotation
- Can choose appropriate base images and explain why (distroless vs. Alpine vs. scratch)
- Can write OPA/Kyverno policies for basic admission control
- Can scan Terraform for security issues before apply

### Expert (6+ months):
- Can design a full security pipeline from commit to production
- Can implement Sigstore for supply chain verification
- Can set up Falco for runtime threat detection
- Can architect multi-tenant cluster security
- Can implement and manage a service mesh for mTLS
- Can design and implement secrets management at organizational scale
- Can create custom OPA policies for complex business rules

> ON SCREEN: "Strong level means you do not ship vulnerabilities. Expert means you design the security architecture."

---

## How AI Changes This Factor

### 1. AI for Reviewing Dockerfiles
```
Prompt: "Review this Dockerfile for security issues. Check for:
running as root, exposed secrets, unnecessary packages, base image
vulnerabilities, and layer optimization.
[paste Dockerfile]"
```
AI catches security issues faster than manual review.

### 2. AI for Writing OPA/Kyverno Policies
```
Prompt: "Write a Kyverno ClusterPolicy that:
1. Blocks pods running as root
2. Requires resource limits on all containers
3. Blocks images from public registries (only allow from our ECR)
4. Requires the label 'team' on all deployments"
```

### 3. AI for IAM Policy Review
```
Prompt: "Review this IAM policy for security issues. Identify any
overly permissive permissions and suggest a least-privilege version.
[paste IAM policy JSON]"
```

### 4. AI for Writing NetworkPolicies
```
Prompt: "I have three namespaces: frontend, backend, database.
Write NetworkPolicies so that:
- frontend can receive external traffic and connect to backend on port 8080
- backend can connect to database on port 5432
- database accepts connections only from backend
- all other traffic is denied by default"
```

### 5. AI for Incident Response
```
Prompt: "Trivy found CVE-2024-XXXX (critical) in our base image.
The image is node:18-alpine. What is the vulnerability, what is the
impact, and what is the fastest remediation path?"
```

> VOICEOVER: AI accelerates security work dramatically. Policy writing, vulnerability triage, Dockerfile review — these used to take hours. Now they take minutes. But you still need to understand what the policies do and whether the AI got them right.

---

## Common Mistakes & Traps

### Trap 1: Ignoring Security Until the Audit
**What happens:** You build everything without security. An audit (or worse, a breach) happens. Now you have 200 findings to fix while also doing your regular work.
**Fix:** Build security into your pipeline from day one. It takes 30 minutes to add Trivy and Checkov to CI. It takes weeks to remediate findings after the fact.

### Trap 2: Hardcoded Secrets
**What happens:** Database passwords, API keys, and tokens are committed to Git. Even if you delete them, they are in the Git history forever. Bots scrape GitHub for exposed secrets within minutes.
**Fix:** Use a secrets manager (Vault, AWS Secrets Manager). Set up pre-commit hooks (gitleaks). Rotate any secret that was ever committed to a repository — even if you "deleted" it.

### Trap 3: Running Everything as Root
**What happens:** Containers run as root. If an attacker breaks into the container, they have root access. Combined with a container escape vulnerability, they own the host.
**Fix:** Every Dockerfile should have a `USER` instruction. Every K8s pod spec should set `runAsNonRoot: true`. Use Pod Security Standards to enforce this cluster-wide.

### Trap 4: Scanning But Not Acting
**What happens:** You add Trivy to CI. It reports 47 HIGH and 12 CRITICAL vulnerabilities. You set the pipeline to "warn" instead of "fail" because fixing them would slow down the release.
**Fix:** Set a clear policy: CRITICAL = build fails. HIGH = must be fixed within X days. Actually enforce it. A vulnerability scanner that does not block anything is just generating noise.

### Trap 5: Overly Permissive RBAC
**What happens:** Everyone has `cluster-admin` because setting up RBAC "takes too long." One person accidentally deletes a production namespace.
**Fix:** Set up RBAC from the start. Start with minimal permissions and add more as needed. It is easier to grant additional access than to revoke it after an incident.

---

## Mini-Practice (Exercises)

### Exercise 1: Implement Secret Management
**What you build:** A secret management pipeline using Vault or AWS Secrets Manager.
**Skills tested:** Secret storage, rotation, application integration.
**Requirements:**
- Deploy HashiCorp Vault (dev mode for practice, HA mode for extra credit)
- Store application secrets (database password, API keys)
- Configure automatic secret rotation (every 24 hours)
- Application reads secrets from Vault at startup (not from environment variables)
- Set up pre-commit hooks with gitleaks to prevent secret commits

### Exercise 2: Add Security Scanning to CI
**What you build:** A CI pipeline (GitHub Actions or GitLab CI) with integrated security scanning.
**Skills tested:** Trivy, Checkov, SAST integration, pipeline design.
**Requirements:**
- Trivy scans container images — fails on CRITICAL CVEs
- Checkov scans Terraform code — fails on HIGH issues
- Snyk or npm audit scans application dependencies
- Results are posted as PR comments
- Pipeline blocks merge if any critical issue is found
**Deliverable:** A working CI configuration file with all scanners integrated.

### Exercise 3: Write Kubernetes Network Policies
**What you build:** A micro-segmented Kubernetes cluster.
**Skills tested:** NetworkPolicies, namespace isolation, traffic control.
**Setup:** Deploy 3 services across 3 namespaces (frontend, backend, database).
**Requirements:**
- Default deny all traffic in every namespace
- Frontend: allow ingress from external, allow egress to backend on port 8080
- Backend: allow ingress from frontend, allow egress to database on port 5432
- Database: allow ingress only from backend
- Verify with `kubectl exec` and `curl` that unauthorized traffic is blocked

### Exercise 4: Security Hardening Audit
**What you build:** A security audit report for a Kubernetes deployment.
**Skills tested:** Image scanning, RBAC review, pod security, network policies.
**Scenario:** You are given a "poorly secured" K8s deployment (create it yourself with intentional issues). Find and fix:
- Containers running as root
- Images with critical CVEs
- Missing network policies
- Overly permissive RBAC
- Secrets in environment variables instead of a secrets manager
**Deliverable:** Before/after manifests with documented changes and explanations.

---

## "Signals" You Are Job-Ready (Checklist)

- [ ] Can explain the DevSecOps shift-left concept and why it matters
- [ ] Can set up pre-commit hooks that prevent secret leaks
- [ ] Can integrate Trivy into a CI pipeline and configure failure thresholds
- [ ] Can scan Terraform code with Checkov/tfsec before apply
- [ ] Can write Kubernetes RBAC roles for different team access levels
- [ ] Can write NetworkPolicies that enforce micro-segmentation
- [ ] Can set up HashiCorp Vault or AWS Secrets Manager for application secrets
- [ ] Can choose secure base images and explain the tradeoffs
- [ ] Can write OPA or Kyverno policies for admission control
- [ ] Can explain the software supply chain and how to secure it (SBOM, image signing)
- [ ] Can describe a security incident response process for containerized applications
- [ ] Can review a Dockerfile and identify at least 5 security improvements

> VOICEOVER: When an interviewer asks "how do you handle security in your pipeline?" — you should be able to describe a complete picture, from pre-commit hooks to runtime monitoring. That is what separates candidates who "know about security" from candidates who practice it.

---

## Links Inside the Repo

- Previous: [02 - Containers & Kubernetes](../02-containers-and-kubernetes/) — what you are securing
- Next: [04 - Infrastructure as Code](../04-infrastructure-as-code/) — securing your IaC with policy as code
- Related: [01 - Cloud Adoption](../01-cloud-adoption/) — cloud IAM and network security
- Related: [05 - AI & MLOps](../05-ai-and-mlops/) — AI-assisted security workflows
- Full path: [90 - Learning Roadmap](../90-roadmap/) — where security fits in the bigger picture
- Avoid traps: [91 - Common Mistakes](../91-mistakes/) — ignoring fundamentals and other career killers
