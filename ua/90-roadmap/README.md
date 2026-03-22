# Дорожня карта навчання DevOps 2026

![Дорожня карта](../../en/90-roadmap/roadmap.png)

---

Ось покроковий план: від нуля до робочої готовності. Не намагайтеся вивчити все одночасно. Є послідовність, яка працює.

Фаза 0 → 1 → 2 → 3. Від основ до production-ready DevOps-інженера.

---

## Безпека хмарних лабораторій: витрати та очищення

Перед початком хмарних вправ захистіть себе від несподіваних рахунків:

- **Спочатку налаштуйте billing alert.** AWS: Billing → Budgets → створіть alert на $10. Зробіть це до запуску будь-яких ресурсів.
- **Знищуйте ресурси після кожної сесії.** Запускайте `terraform destroy` або перевіряйте `aws resourcegroupstaggingapi get-resources`, щоб переконатися, що нічого не залишилося.
- **Використовуйте Free Tier / credits розумно.** Актуальні ліміти залежать від дати створення акаунта та обраного плану. Не розраховуйте, що кожна вправа буде повністю безкоштовною.
- **Тегуйте кожен ресурс.** Додавайте `Environment=learning` до всього — це спрощує масове очищення.
- **Ніколи не використовуйте root-акаунт.** Створіть IAM-користувача з обмеженими правами для практики.

> Забутий RDS-інстанс або NAT Gateway може коштувати $50–$200/міс. П'ять хвилин налаштування на початку — і цього не станеться.

---

## Фаза 0 → 1: Основи (2-4 тижні)

**Мета:** Закласти фундамент, без якого все інше буде на піску.

### Що вивчати

#### Linux (5-7 днів)
```
Linux-навички:
├── Командний рядок
│   ├── Навігація: cd, ls, pwd, find, which
│   ├── Файли: cp, mv, rm, mkdir, chmod, chown
│   ├── Перегляд: cat, less, head, tail, grep, awk
│   ├── Процеси: ps, top, htop, kill, systemctl
│   └── Pipes та redirect: |, >, >>, 2>&1
├── Файлова система
│   ├── Структура: /, /etc, /var, /home, /tmp
│   ├── Permissions: rwx, chmod, chown
│   └── Disk: df, du, mount
├── Мережа
│   ├── Діагностика: ping, traceroute, dig, nslookup
│   ├── З'єднання: curl, wget, ss, netstat
│   └── Конфігурація: ip addr, /etc/hosts, /etc/resolv.conf
├── Сервіси
│   ├── systemd: systemctl start/stop/enable/status
│   ├── Логи: journalctl, /var/log/
│   └── cron: crontab -e
└── SSH
    ├── ssh-keygen
    ├── ssh-copy-id
    └── ~/.ssh/config
```

#### Мережі (3-5 днів)
```
Мережеві основи:
├── OSI Model (зосередитися на L3-L7)
├── IP-адресація: IPv4, CIDR, subnetting
├── DNS: A, CNAME, MX, TXT, NS, TTL
├── HTTP/HTTPS: методи, статус-коди, заголовки
├── TCP vs UDP
├── Порти: 22 (SSH), 80 (HTTP), 443 (HTTPS), 5432 (PostgreSQL)
├── Firewall: iptables базово, Security Groups (AWS)
├── NAT: що це і навіщо
├── Load Balancing: L4 vs L7
└── TLS/SSL: сертифікати, handshake (high-level)
```

#### Git (2-3 дні)
```
Git-навички:
├── Основи: init, clone, add, commit, push, pull
├── Branching: branch, checkout, merge
├── Collaborative: pull request, code review, merge conflicts
├── Корисне: stash, rebase (базово), cherry-pick
├── .gitignore
├── Conventional commits (feat:, fix:, docs:)
└── Git workflow: trunk-based або GitFlow
```

#### Скриптинг: Bash + Python (3-5 днів)
```
Bash:
├── Змінні, умови (if/else), цикли (for, while)
├── Функції
├── Аргументи скрипту ($1, $2, $@)
├── Exit codes
├── Робота з файлами та текстом
└── Практика: скрипт для backup, моніторингу, деплою

Python (базово):
├── Синтаксис, типи даних, функції
├── Робота з файлами (open, read, write)
├── JSON/YAML парсинг
├── Requests (HTTP)
├── subprocess (виклик shell-команд)
└── Boto3 (AWS SDK) — для подальшої роботи з хмарою
```

### Як зрозуміти, що фаза пройдена

- [ ] Можете підключитися по SSH до сервера та налаштувати базовий веб-сервер (Nginx)
- [ ] Можете пояснити, що відбувається при `curl https://example.com` (DNS → TCP → TLS → HTTP)
- [ ] Можете створити PR, зробити code review та вирішити merge conflict
- [ ] Написали скрипт на Bash, який автоматизує рутинну задачу (backup, health check)
- [ ] Можете пояснити: що таке CIDR /24, навіщо NAT, як працює DNS

---

## Фаза 1 → 2: Основні інструменти (6-10 тижнів)

**Мета:** Освоїти інструменти, які використовуються в кожній DevOps-команді.

### Що вивчати

#### Docker (2-3 тижні) → [Фактор 2](../02-containers-and-kubernetes/)
```
Docker-план:
Тиждень 1:
├── Dockerfile: FROM, RUN, COPY, CMD, ENTRYPOINT
├── Multi-stage builds
├── Docker CLI: build, run, exec, logs, inspect
├── Docker Compose для локальної розробки
└── .dockerignore

Тиждень 2:
├── Volumes та bind mounts
├── Мережі (bridge, host)
├── Health checks
├── Оптимізація розміру образів
├── Docker Registry (Docker Hub, ECR)
└── Безпека: non-root, scan з Trivy

Тиждень 3 (якщо потрібно):
├── Docker Compose для складних сетапів
├── Logging drivers
└── Resource limits
```

#### CI/CD (2-3 тижні)
```
CI/CD-план:
Тиждень 1: Концепції
├── Що таке CI: build → test → lint → scan
├── Що таке CD: deploy to staging → testing → production
├── Continuous Delivery vs Continuous Deployment
├── Pipeline triggers: push, PR, tag, schedule
└── Артефакти: Docker images, Helm charts

Тиждень 2: GitHub Actions (або GitLab CI)
├── Workflow syntax: jobs, steps, actions
├── Secrets та environment variables
├── Matrix builds
├── Caching для прискорення
├── Reusable workflows
└── Self-hosted runners (коли потрібно)

Тиждень 3: Практичний pipeline
├── Build та push Docker image
├── Run tests (unit, integration)
├── Security scan (Trivy, Checkov)
├── Deploy to staging (K8s або ECS)
├── Smoke tests
└── Manual approval → production
```

#### Хмарний провайдер (3-4 тижні) → [Фактор 1](../01-cloud-adoption/)
```
AWS-план (рекомендовано):
Тиждень 1: Основи
├── AWS Account + MFA + billing alert
├── IAM: users, groups, roles, policies
├── EC2: launch, SSH, Security Groups
├── S3: create, upload, permissions
└── VPC: subnets, route tables, IGW

Тиждень 2: Сервіси
├── RDS: launch PostgreSQL, connect
├── ALB: target groups, health checks
├── Route 53: hosted zone, DNS records
├── CloudWatch: metrics, logs, alarms
└── Secrets Manager

Тиждень 3-4: Практика
├── Розгорнути 3-tier архітектуру
├── Все через CLI (не консоль!)
├── Налаштувати моніторинг та алерти
└── Документувати архітектуру
```

### Як зрозуміти, що фаза пройдена

- [ ] Контейнеризували застосунок та запушили образ у registry
- [ ] Побудували CI/CD-пайплайн, який білдить, тестує та деплоїть
- [ ] Розгорнули застосунок у хмарі (EC2 або ECS) з ALB та RDS
- [ ] Налаштували моніторинг (CloudWatch алерти) та логування
- [ ] Можете пояснити: як працює CI/CD pipeline від коміту до production

---

## Фаза 2 → 3: Масштабування та автоматизація (3-6 місяців)

**Мета:** Стати production-ready DevOps-інженером. Це рівень, на якому вас наймають.

### Що вивчати

#### Kubernetes (4-6 тижнів) → [Фактор 2](../02-containers-and-kubernetes/)
```
K8s-план:
Тижні 1-2: Основні об'єкти
├── Pod, Deployment, Service, Ingress
├── ConfigMap, Secret
├── Namespace, RBAC
├── kubectl: get, describe, logs, exec, port-forward
└── Minikube або kind для практики

Тижні 3-4: Production-навички
├── Helm charts
├── HPA, VPA
├── Network Policies
├── PersistentVolumes
├── Liveness/Readiness/Startup probes
└── Resource requests та limits

Тижні 5-6: Advanced
├── ArgoCD (GitOps)
├── Ingress controllers (NGINX)
├── cert-manager (TLS)
├── Troubleshooting patterns
└── EKS або GKE (managed K8s)
```

#### Terraform (3-4 тижні) → [Фактор 4](../04-infrastructure-as-code/)
```
Terraform-план:
Тижні 1-2: Основи
├── HCL syntax
├── Resources, Variables, Outputs
├── Providers
├── State та remote backend
├── terraform init/plan/apply/destroy
└── terraform import

Тижні 3-4: Advanced
├── Модулі (створення та використання)
├── for_each, count, dynamic blocks
├── CI/CD для Terraform
├── tflint, Checkov
└── State management (mv, rm, import)
```

#### Спостережуваність та SRE (2-3 тижні) → [Фактор 6](../06-observability-and-sre/)
```
Observability-план:
├── Три стовпи: Metrics, Logs, Traces
├── Prometheus + Grafana
│   ├── Встановлення (Helm: kube-prometheus-stack)
│   ├── Service monitors, PromQL базово
│   ├── RED-method дашборди
│   └── SLO-based alerting (burn rate)
├── Loki для логів
│   ├── Збір логів з K8s (Promtail)
│   ├── Фільтрація та пошук у Grafana
│   └── Кореляція лог-метрика
├── OpenTelemetry
│   ├── SDK інструментування (будь-яка мова)
│   ├── Розгортання Collector (DaemonSet)
│   └── Трейси до Grafana Tempo
├── Alertmanager
│   ├── Routing правила (P1 → PagerDuty, P2/P3 → Slack)
│   ├── Silence та inhibit
│   └── Інтеграція з черговими
└── SLI/SLO/Error Budget
    ├── Визначення SLI та SLO для сервісу
    ├── Error budget policy
    └── Pyrra або Sloth для управління SLO

Kubernetes → Prometheus → OpenTelemetry → SLO
```

#### Основи безпеки (2-3 тижні) → [Фактор 3](../03-devsecops/)
```
Security-план:
├── Secret management (Vault або cloud-native)
├── Image scanning (Trivy)
├── RBAC в K8s та хмарі
├── Network Policies
├── Pre-commit hooks (gitleaks)
└── Базові security best practices
```

### Як зрозуміти, що фаза пройдена

- [ ] Задеплоїли мікросервісний застосунок (3+ сервіси) в K8s з Helm
- [ ] Побудували повну інфраструктуру через Terraform (VPC + EKS + RDS)
- [ ] Налаштували моніторинг з Prometheus + Grafana з алертами
- [ ] Впровадили базову безпеку: secrets management, image scanning, RBAC
- [ ] Побудували end-to-end pipeline: код → PR → CI → staging → production
- [ ] Написали runbook для 3+ типових інцидентів
- [ ] Можете пояснити архітектуру свого проєкту та кожне рішення

---

## Граф залежностей навичок

```
Linux/Мережі (фундамент)
    │
    ├── Git ───────────────────────────────┐
    │                                      │
    ├── Bash/Python ──────────────────┐    │
    │                                 │    │
    ├── Docker ───────────────────────┤    │
    │     │                           │    │
    │     ├── Kubernetes ─────────────┤    │
    │     │     │                     │    │
    │     │     ├── Helm ─────────┐   │    │
    │     │     │                 │   │    │
    │     │     ├── ArgoCD ──────────────── CI/CD
    │     │     │                 │   │    │
    │     │     └── Network ─── Security   │
    │     │           Policies     │       │
    │     │                        │       │
    │     └── Image ──── Trivy ────┘       │
    │           Scanning                    │
    │                                       │
    ├── Cloud (AWS) ────────────────────────┤
    │     │                                 │
    │     ├── IAM ──────── Security ────────┘
    │     │
    │     ├── VPC/Networking
    │     │
    │     └── Managed Services (RDS, ECS, EKS)
    │           │
    │           └── Terraform ───── Remote State
    │                 │
    │                 ├── Modules
    │                 │
    │                 └── CI/CD for IaC
    │
    └── Kubernetes ─── Prometheus + Grafana
                            │
                            ├── OpenTelemetry (трейси)
                            │         │
                            │         └── Grafana Tempo
                            │
                            └── SLO + Error Budgets
                                      │
                                      └── Alertmanager → PagerDuty/Slack

→ Повний модуль спостережуваності: [Фактор 6](../06-observability-and-sre/)
```

**Правило:** Не переходьте до наступного рівня, поки попередній не стабільний. Docker до K8s. K8s до Helm. Хмара до Terraform.

---

## Бюджет глибини: скільки часу приділяти кожній області

Розподіл часу навчання за областями

| Область | % часу | Обґрунтування |
|---------|--------|---------------|
| Linux / Мережі / Git | 10% | Фундамент. Один раз добре — і на все життя |
| Docker / Контейнери | 15% | Базовий мінімум. Використовується щодня |
| Kubernetes | 20% | Найскладніший і один із найцінніших навиків |
| Cloud (AWS) | 20% | Основа всієї інфраструктури |
| IaC (Terraform / OpenTofu) | 15% | Один із ключових робочих навиків для зрілої інфраструктури |
| CI/CD | 10% | Важливо, але менш складно |
| Security | 5% | Основи обов'язкові, глибина — для спеціалізації |
| Monitoring / Observability | 5% | Основи обов'язкові, глибина — з досвідом |

**Примітка:** Це базовий розподіл. Якщо ви спеціалізуєтесь (наприклад, Platform Engineering) — розподіл зміниться.

---

## Комбінації навичок (спеціалізації)

### 1. Platform Engineering + Security

```
Фокус:
├── Kubernetes (глибоко)
├── Terraform (глибоко)
├── ArgoCD / Flux (GitOps)
├── OPA / Kyverno (Policy-as-Code)
├── Vault (Secret Management)
├── Network Policies + Service Mesh
└── Internal Developer Platform (Backstage)

Роль: Platform Engineer / DevSecOps Engineer
```

### 2. SRE + Observability

```
Фокус:
├── Prometheus + Grafana (глибоко)
├── OpenTelemetry (traces)
├── Logging (Loki / ELK)
├── SLI / SLO / Error budgets
├── Incident management (PagerDuty, Opsgenie)
├── Chaos engineering (Litmus, Chaos Monkey)
└── Post-mortems та blameless culture

Роль: Site Reliability Engineer (SRE)
```

### 3. Cloud + IaC

```
Фокус:
├── AWS (глибоко) + GCP або Azure (базово)
├── Terraform (глибоко, включно з модулями та тестами)
├── Cloud Architecture (Well-Architected Framework)
├── Cost optimization (FinOps)
├── Multi-account strategy
├── Migration (on-premise → cloud)
└── DR та Business Continuity

Роль: Cloud Engineer / Cloud Architect
```

### 4. GitOps + Kubernetes

```
Фокус:
├── Kubernetes (глибоко, включно з оператори)
├── ArgoCD / Flux (глибоко)
├── Helm + Kustomize
├── Progressive Delivery (Argo Rollouts, Flagger)
├── Multi-cluster management
├── Service Mesh (Istio / Linkerd)
└── K8s platform для розробників

Роль: Kubernetes Platform Engineer
```

---

## Канонічні проєкти портфоліо

Три проєкти, що охоплюють усі шість факторів. Кожен модуль посилається сюди — використовуйте їх як цілі для практики.

Збирайте їх шарами: спочатку робочий мінімум, потім безпека, observability, GitOps і полірування.

### Проєкт А: Full-Stack DevOps Platform

*Розгорніть 3-сервісний застосунок від нуля до production на Kubernetes.*

- [ ] VPC + EKS + RDS розгорнуто через Terraform / OpenTofu (remote state, багаторазові модулі)
- [ ] 3 мікросервіси задеплоєно через Helm-чарти з health checks та resource limits
- [ ] CI/CD: збірка → Trivy/Checkov-сканування → деплой у staging → просування в production
- [ ] ArgoCD для GitOps; RBAC + NetworkPolicies + Vault для секретів
- [ ] Prometheus + Grafana-дашборди з алертами на основі SLO ([Фактор 6](../06-observability-and-sre/))
- [ ] OpenTelemetry інструментування: трейси до Grafana Tempo, логи скорельовано в Grafana
- [ ] Визначено хоча б один SLO з error budget policy та burn-rate alerting
- [ ] Публічний GitHub-репозиторій із README та архітектурною діаграмою

### Проєкт B: IaC Module Library

*Побудуйте бібліотеку Terraform-модулів з автоматизованими тестами.*

- [ ] 3+ модулів: VPC, EKS, RDS — кожен із змінними, виводами та inline-документацією
- [ ] Remote state з увімкненим locking; state розділений по компонентах
- [ ] Terratest integration-тести, що запускаються на кожному PR
- [ ] CI-пайплайн: fmt → validate → tflint → checkov → test
- [ ] Semantic versioning через GitHub Releases

### Проєкт C: Security Pipeline

*Додайте повноцінний security layer до існуючого застосунку.*

- [ ] Pre-commit hooks: gitleaks (секрети) + hadolint (Dockerfile)
- [ ] CI-сканування: Trivy (образи), Checkov (IaC), Semgrep (SAST)
- [ ] Kyverno admission policies: заборона root, заборона тегу `latest`, обов'язкові resource limits
- [ ] Vault + External Secrets Operator для секретів застосунку
- [ ] Falco runtime anomaly detection з Slack-алертами

---

## Портфоліо-проєкти — повний опис

### Проєкт 1: «Full-Stack DevOps Platform» (6-10 тижнів)

**Опис:** Повна інфраструктура для мікросервісного застосунку.

```
Компоненти:
├── Terraform: VPC + EKS + RDS + monitoring
├── K8s: 3 мікросервіси (API + Worker + Frontend)
├── Helm: чарти для кожного сервісу
├── CI/CD: GitHub Actions → build → test → scan → deploy
├── ArgoCD: GitOps для K8s-деплоїв
├── Monitoring: Prometheus + Grafana + Loki
├── Security: Trivy, RBAC, Network Policies, Vault
└── Documentation: Architecture Decision Records

Демонструє: Усі 6 факторів. Це ваш «головний» проєкт.
```

### Проєкт 2: «IaC Library» (3-4 тижні)

**Опис:** Бібліотека Terraform-модулів з тестами.

```
Компоненти:
├── 5+ модулів: VPC, EKS, RDS, S3, IAM
├── Кожен модуль: variables, outputs, documentation
├── Тести: Terratest для кожного модуля
├── CI: автоматичне тестування при PR
├── Versioning: semantic versioning, changelog
└── Registry: GitHub Releases або Terraform Registry

Демонструє: Фактор 4 (IaC) глибоко. Показує зрілість підходу.
```

### Проєкт 3: «Security Pipeline» (3-4 тижні)

**Опис:** Повний security pipeline від коміту до runtime.

```
Компоненти:
├── Pre-commit: gitleaks, hadolint
├── CI: Trivy (images), Checkov (IaC), Semgrep (SAST)
├── Signing: Cosign для образів
├── Admission: Kyverno policies (no root, no latest, require limits)
├── Runtime: Falco для виявлення аномалій
├── Secrets: Vault + External Secrets Operator
└── Dashboard: security posture overview

Демонструє: Фактор 3 (DevSecOps) глибоко. Виділяє вас серед інших кандидатів.
```

### Проєкт 4: «MLOps Pipeline» (4-8 тижнів)

**Опис:** Повний пайплайн для ML: від тренування до serving.

```
Компоненти:
├── Training: контейнеризоване тренування на GPU
├── Tracking: MLflow для експериментів
├── Registry: MLflow Model Registry
├── Serving: KServe або vLLM на K8s
├── CI/CD: train → evaluate → register → deploy
├── Monitoring: model performance + infrastructure metrics
└── Auto-scaling: HPA на custom metrics

Демонструє: Фактор 5 (ШІ та MLOps). Показує, що ви готові до MLOps-ролі.
```

### Проєкт 5: «Incident Response System» (2-3 тижні)

**Опис:** Система для управління інцидентами.

```
Компоненти:
├── Alerting: Prometheus → Alertmanager → Slack/PagerDuty
├── Runbooks: документовані процедури для типових інцидентів
├── Dashboards: Grafana з SLI/SLO
├── Post-mortem template
├── Chaos testing: Litmus або manual fault injection
└── Documentation: SLA, escalation matrix

Демонструє: SRE-мислення. Показує зрілість та операційний досвід.
```

---

## Рекомендації щодо публічності

Навчання без публічності — це як тренування без матчів. Ваші проєкти повинні бути видимі.

1. **GitHub** — всі проєкти в публічних репозиторіях з гарними README
2. **LinkedIn** — пост про кожен завершений проєкт (1-2 рази на тиждень)
3. **Блог / Dev.to** — технічні статті про те, що вивчили (1-2 на місяць)
4. **YouTube / Telegram** — відеоогляди або канал з нотатками (опціонально, але потужно)

Детальніше про помилки «тихого навчання» та інші — у [Типових помилках](../91-mistakes/).

---

## Посилання всередині репозиторію

- Фактор 1: [Хмарне впровадження](../01-cloud-adoption/)
- Фактор 2: [Контейнери та Kubernetes](../02-containers-and-kubernetes/)
- Фактор 3: [DevSecOps](../03-devsecops/)
- Фактор 4: [Інфраструктура як код](../04-infrastructure-as-code/)
- Фактор 5: [ШІ та MLOps](../05-ai-and-mlops/)
- Фактор 6: [Спостережуваність та SRE](../06-observability-and-sre/)
- Типові помилки: [91-mistakes](../91-mistakes/)
- Повернутися до [головної сторінки](../)
