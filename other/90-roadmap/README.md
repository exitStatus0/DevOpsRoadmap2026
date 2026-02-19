# Дорожная карта обучения DevOps 2026

![Дорожная карта](../../en/90-roadmap/roadmap.png)

---

Вот пошаговый план: от нуля до рабочей готовности. Не пытайтесь изучить всё одновременно. Есть последовательность, которая работает.

Фаза 0 -> 1 -> 2 -> 3. От основ до production-ready DevOps-инженера.

---

## Безопасность облачных лабораторий: расходы и очистка

- **Сначала настройте billing alert.** AWS: Billing → Budgets → создайте оповещение на $10, чтобы избежать неожиданных расходов.
- **Удаляйте ресурсы после каждой сессии.** Запускайте `terraform destroy` — не оставляйте работающие инстансы без надобности.
- **Используйте бесплатный уровень разумно.** EC2 t2.micro, S3 (5 ГБ), RDS t3.micro входят в Free Tier — используйте их для практики.
- **Помечайте каждый ресурс тегами.** Добавляйте `Environment=learning`, чтобы легко находить и удалять учебные ресурсы.
- **Никогда не используйте root-аккаунт.** Создайте IAM-пользователя с минимальными правами для всей учебной работы.

> Забытый RDS-инстанс или NAT Gateway может стоить $50–$200 в месяц. Настройте billing alert прямо сейчас, до первого `terraform apply`.

---

## Фаза 0 -> 1: Основы (2-4 недели)

**Цель:** Заложить фундамент, без которого всё остальное будет на песке.

### Что изучать

#### Linux (5-7 дней)
```
Linux-навыки:
├── Командная строка
│   ├── Навигация: cd, ls, pwd, find, which
│   ├── Файлы: cp, mv, rm, mkdir, chmod, chown
│   ├── Просмотр: cat, less, head, tail, grep, awk
│   ├── Процессы: ps, top, htop, kill, systemctl
│   └── Pipes и redirect: |, >, >>, 2>&1
├── Файловая система
│   ├── Структура: /, /etc, /var, /home, /tmp
│   ├── Permissions: rwx, chmod, chown
│   └── Disk: df, du, mount
├── Сеть
│   ├── Диагностика: ping, traceroute, dig, nslookup
│   ├── Соединения: curl, wget, ss, netstat
│   └── Конфигурация: ip addr, /etc/hosts, /etc/resolv.conf
├── Сервисы
│   ├── systemd: systemctl start/stop/enable/status
│   ├── Логи: journalctl, /var/log/
│   └── cron: crontab -e
└── SSH
    ├── ssh-keygen
    ├── ssh-copy-id
    └── ~/.ssh/config
```

#### Сети (3-5 дней)
```
Сетевые основы:
├── OSI Model (фокус на L3-L7)
├── IP-адресация: IPv4, CIDR, subnetting
├── DNS: A, CNAME, MX, TXT, NS, TTL
├── HTTP/HTTPS: методы, статус-коды, заголовки
├── TCP vs UDP
├── Порты: 22 (SSH), 80 (HTTP), 443 (HTTPS), 5432 (PostgreSQL)
├── Firewall: iptables базово, Security Groups (AWS)
├── NAT: что это и зачем
├── Load Balancing: L4 vs L7
└── TLS/SSL: сертификаты, handshake (high-level)
```

#### Git (2-3 дня)
```
Git-навыки:
├── Основы: init, clone, add, commit, push, pull
├── Branching: branch, checkout, merge
├── Collaborative: pull request, code review, merge conflicts
├── Полезное: stash, rebase (базово), cherry-pick
├── .gitignore
├── Conventional commits (feat:, fix:, docs:)
└── Git workflow: trunk-based или GitFlow
```

#### Скриптинг: Bash + Python (3-5 дней)
```
Bash:
├── Переменные, условия (if/else), циклы (for, while)
├── Функции
├── Аргументы скрипта ($1, $2, $@)
├── Exit codes
├── Работа с файлами и текстом
└── Практика: скрипт для backup, мониторинга, деплоя

Python (базово):
├── Синтаксис, типы данных, функции
├── Работа с файлами (open, read, write)
├── JSON/YAML парсинг
├── Requests (HTTP)
├── subprocess (вызов shell-команд)
└── Boto3 (AWS SDK) — для дальнейшей работы с облаком
```

### Как понять, что фаза пройдена

- [ ] Можете подключиться по SSH к серверу и настроить базовый веб-сервер (Nginx)
- [ ] Можете объяснить, что происходит при `curl https://example.com` (DNS -> TCP -> TLS -> HTTP)
- [ ] Можете создать PR, сделать code review и разрешить merge conflict
- [ ] Написали скрипт на Bash, который автоматизирует рутинную задачу (backup, health check)
- [ ] Можете объяснить: что такое CIDR /24, зачем NAT, как работает DNS

---

## Фаза 1 -> 2: Основные инструменты (6-10 недель)

**Цель:** Освоить инструменты, которые используются в каждой DevOps-команде.

### Что изучать

#### Docker (2-3 недели) -> [Фактор 2](../02-containers-and-kubernetes/)
```
Docker-план:
Неделя 1:
├── Dockerfile: FROM, RUN, COPY, CMD, ENTRYPOINT
├── Multi-stage builds
├── Docker CLI: build, run, exec, logs, inspect
├── Docker Compose для локальной разработки
└── .dockerignore

Неделя 2:
├── Volumes и bind mounts
├── Сети (bridge, host)
├── Health checks
├── Оптимизация размера образов
├── Docker Registry (Docker Hub, ECR)
└── Безопасность: non-root, scan с Trivy

Неделя 3 (если нужно):
├── Docker Compose для сложных сетапов
├── Logging drivers
└── Resource limits
```

#### CI/CD (2-3 недели)
```
CI/CD-план:
Неделя 1: Концепции
├── Что такое CI: build -> test -> lint -> scan
├── Что такое CD: deploy to staging -> testing -> production
├── Continuous Delivery vs Continuous Deployment
├── Pipeline triggers: push, PR, tag, schedule
└── Артефакты: Docker images, Helm charts

Неделя 2: GitHub Actions (или GitLab CI)
├── Workflow syntax: jobs, steps, actions
├── Secrets и environment variables
├── Matrix builds
├── Caching для ускорения
├── Reusable workflows
└── Self-hosted runners (когда нужно)

Неделя 3: Практический pipeline
├── Build и push Docker image
├── Run tests (unit, integration)
├── Security scan (Trivy, Checkov)
├── Deploy to staging (K8s или ECS)
├── Smoke tests
└── Manual approval -> production
```

#### Облачный провайдер (3-4 недели) -> [Фактор 1](../01-cloud-adoption/)
```
AWS-план (рекомендовано):
Неделя 1: Основы
├── AWS Account + MFA + billing alert
├── IAM: users, groups, roles, policies
├── EC2: launch, SSH, Security Groups
├── S3: create, upload, permissions
└── VPC: subnets, route tables, IGW

Неделя 2: Сервисы
├── RDS: launch PostgreSQL, connect
├── ALB: target groups, health checks
├── Route 53: hosted zone, DNS records
├── CloudWatch: metrics, logs, alarms
└── Secrets Manager

Неделя 3-4: Практика
├── Развернуть 3-tier архитектуру
├── Всё через CLI (не консоль!)
├── Настроить мониторинг и алерты
└── Документировать архитектуру
```

### Как понять, что фаза пройдена

- [ ] Контейнеризировали приложение и запушили образ в registry
- [ ] Построили CI/CD-пайплайн, который билдит, тестирует и деплоит
- [ ] Развернули приложение в облаке (EC2 или ECS) с ALB и RDS
- [ ] Настроили мониторинг (CloudWatch алерты) и логирование
- [ ] Можете объяснить: как работает CI/CD pipeline от коммита до production

---

## Фаза 2 -> 3: Масштабирование и автоматизация (3-6 месяцев)

**Цель:** Стать production-ready DevOps-инженером. Это уровень, на котором вас нанимают.

### Что изучать

#### Kubernetes (4-6 недель) -> [Фактор 2](../02-containers-and-kubernetes/)
```
K8s-план:
Недели 1-2: Основные объекты
├── Pod, Deployment, Service, Ingress
├── ConfigMap, Secret
├── Namespace, RBAC
├── kubectl: get, describe, logs, exec, port-forward
└── Minikube или kind для практики

Недели 3-4: Production-навыки
├── Helm charts
├── HPA, VPA
├── Network Policies
├── PersistentVolumes
├── Liveness/Readiness/Startup probes
└── Resource requests и limits

Недели 5-6: Advanced
├── ArgoCD (GitOps)
├── Ingress controllers (NGINX)
├── cert-manager (TLS)
├── Troubleshooting patterns
└── EKS или GKE (managed K8s)
```

#### Terraform (3-4 недели) -> [Фактор 4](../04-infrastructure-as-code/)
```
Terraform-план:
Недели 1-2: Основы
├── HCL syntax
├── Resources, Variables, Outputs
├── Providers
├── State и remote backend
├── terraform init/plan/apply/destroy
└── terraform import

Недели 3-4: Advanced
├── Модули (создание и использование)
├── for_each, count, dynamic blocks
├── CI/CD для Terraform
├── tflint, Checkov
└── State management (mv, rm, import)
```

#### Наблюдаемость и SRE (2-3 недели) -> [Фактор 6](../06-observability-and-sre/)
```
Observability-план:
├── Три столпа: Metrics, Logs, Traces
├── Prometheus + Grafana
│   ├── Установка (Helm: kube-prometheus-stack)
│   ├── Service monitors, PromQL базово
│   ├── RED-method дашборды
│   └── SLO-based alerting (burn rate)
├── Loki для логов
│   ├── Сбор логов из K8s (Promtail)
│   ├── Фильтрация и поиск в Grafana
│   └── Корреляция лог-метрика
├── OpenTelemetry
│   ├── SDK инструментирование (любой язык)
│   ├── Развёртывание Collector (DaemonSet)
│   └── Трейсы в Grafana Tempo
├── Alertmanager
│   ├── Routing правила (P1 -> PagerDuty, P2/P3 -> Slack)
│   ├── Silence и inhibit
│   └── Интеграция с дежурными
└── SLI/SLO/Error Budget
    ├── Определение SLI и SLO для сервиса
    ├── Error budget policy
    └── Pyrra или Sloth для управления SLO

Kubernetes -> Prometheus -> OpenTelemetry -> SLO
```

#### Основы безопасности (2-3 недели) -> [Фактор 3](../03-devsecops/)
```
Security-план:
├── Secret management (Vault или cloud-native)
├── Image scanning (Trivy)
├── RBAC в K8s и облаке
├── Network Policies
├── Pre-commit hooks (gitleaks)
└── Базовые security best practices
```

### Как понять, что фаза пройдена

- [ ] Задеплоили микросервисное приложение (3+ сервиса) в K8s с Helm
- [ ] Построили полную инфраструктуру через Terraform (VPC + EKS + RDS)
- [ ] Настроили мониторинг с Prometheus + Grafana с алертами
- [ ] Внедрили базовую безопасность: secrets management, image scanning, RBAC
- [ ] Построили end-to-end pipeline: код -> PR -> CI -> staging -> production
- [ ] Написали runbook для 3+ типовых инцидентов
- [ ] Можете объяснить архитектуру своего проекта и каждое решение

---

## Граф зависимостей навыков

```
Linux/Сети (фундамент)
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
                            ├── OpenTelemetry (трейсы)
                            │         │
                            │         └── Grafana Tempo
                            │
                            └── SLO + Error Budgets
                                      │
                                      └── Alertmanager -> PagerDuty/Slack

-> Полный модуль наблюдаемости: [Фактор 6](../06-observability-and-sre/)
```

**Правило:** Не переходите к следующему уровню, пока предыдущий не стабилен. Docker до K8s. K8s до Helm. Облако до Terraform.

---

## Бюджет глубины: сколько времени уделять каждой области

Распределение времени обучения по областям

| Область | % времени | Обоснование |
|---------|-----------|-------------|
| Linux / Сети / Git | 10% | Фундамент. Один раз хорошо -- и на всю жизнь |
| Docker / Контейнеры | 15% | Базовый минимум. Используется каждый день |
| Kubernetes | 20% | Самый сложный и самый ценный навык |
| Cloud (AWS) | 20% | Основа всей инфраструктуры |
| IaC (Terraform) | 15% | Обязательный для любой серьёзной позиции |
| CI/CD | 10% | Важно, но менее сложно |
| Security | 5% | Основы обязательны, глубина -- для специализации |
| Monitoring / Observability | 5% | Основы обязательны, глубина -- с опытом |

**Примечание:** Это базовое распределение. Если вы специализируетесь (например, Platform Engineering) -- распределение изменится.

---

## Комбинации навыков (специализации)

### 1. Platform Engineering + Security

```
Фокус:
├── Kubernetes (глубоко)
├── Terraform (глубоко)
├── ArgoCD / Flux (GitOps)
├── OPA / Kyverno (Policy-as-Code)
├── Vault (Secret Management)
├── Network Policies + Service Mesh
└── Internal Developer Platform (Backstage)

Роль: Platform Engineer / DevSecOps Engineer
Зарплата: +20-35% к базовому DevOps
```

### 2. SRE + Observability

```
Фокус:
├── Prometheus + Grafana (глубоко)
├── OpenTelemetry (traces)
├── Logging (Loki / ELK)
├── SLI / SLO / Error budgets
├── Incident management (PagerDuty, Opsgenie)
├── Chaos engineering (Litmus, Chaos Monkey)
└── Post-mortems и blameless culture

Роль: Site Reliability Engineer (SRE)
Зарплата: +15-30% к базовому DevOps
```

### 3. Cloud + IaC

```
Фокус:
├── AWS (глубоко) + GCP или Azure (базово)
├── Terraform (глубоко, включая модули и тесты)
├── Cloud Architecture (Well-Architected Framework)
├── Cost optimization (FinOps)
├── Multi-account strategy
├── Migration (on-premise -> cloud)
└── DR и Business Continuity

Роль: Cloud Engineer / Cloud Architect
Зарплата: +25-40% к базовому DevOps
```

### 4. GitOps + Kubernetes

```
Фокус:
├── Kubernetes (глубоко, включая операторы)
├── ArgoCD / Flux (глубоко)
├── Helm + Kustomize
├── Progressive Delivery (Argo Rollouts, Flagger)
├── Multi-cluster management
├── Service Mesh (Istio / Linkerd)
└── K8s platform для разработчиков

Роль: Kubernetes Platform Engineer
Зарплата: +20-35% к базовому DevOps
```

---

## Канонические проекты портфолио

Три проекта, охватывающие все шесть факторов. Каждый модуль ссылается сюда — выбирайте проекты, подходящие к вашему этапу обучения.

### Проект А: Full-Stack DevOps Platform

*Разверните приложение из 3 сервисов с нуля до production на Kubernetes.*

- [ ] VPC + EKS + RDS, настроенные через Terraform / OpenTofu (remote state, переиспользуемые модули)
- [ ] 3 микросервиса, развёрнутые через Helm-чарты с health checks и resource limits
- [ ] CI/CD: сборка → сканирование Trivy/Checkov → деплой в staging → продвижение в production
- [ ] ArgoCD для GitOps; RBAC + NetworkPolicies + Vault для секретов
- [ ] Prometheus + Grafana-дашборды с SLO-алертами ([Фактор 6](../06-observability-and-sre/))
- [ ] OpenTelemetry инструментирование: трейсы в Grafana Tempo, логи скоррелированы в Grafana
- [ ] Определён хотя бы один SLO с error budget policy и burn-rate alerting
- [ ] Публичный GitHub-репозиторий с README и архитектурной диаграммой

### Проект B: IaC-библиотека

*Создайте переиспользуемую библиотеку Terraform-модулей с автоматическими тестами.*

- [ ] 3+ модуля: VPC, EKS, RDS — каждый с переменными, выводами и документацией
- [ ] Remote state (S3 + DynamoDB); state разделён по компонентам
- [ ] Terratest-тесты, запускаемые на каждом PR
- [ ] CI-пайплайн: fmt → validate → tflint → checkov → test
- [ ] Семантическое версионирование через GitHub Releases

### Проект C: Security Pipeline

*Добавьте полный security-слой к существующему пайплайну приложения.*

- [ ] Pre-commit hooks: gitleaks (секреты) + hadolint (Dockerfile)
- [ ] CI-сканирование: Trivy (образы), Checkov (IaC), Semgrep (SAST)
- [ ] Kyverno admission policies: запрет root, тега `latest`, обязательные resource limits
- [ ] Vault + External Secrets Operator для секретов приложения
- [ ] Falco для обнаружения аномалий в runtime с алертами в Slack

---

## Портфолио-проекты — полный список

### Проект 1: «Full-Stack DevOps Platform» (4-6 недель)

**Описание:** Полная инфраструктура для микросервисного приложения.

```
Компоненты:
├── Terraform: VPC + EKS + RDS + monitoring
├── K8s: 3 микросервиса (API + Worker + Frontend)
├── Helm: чарты для каждого сервиса
├── CI/CD: GitHub Actions -> build -> test -> scan -> deploy
├── ArgoCD: GitOps для K8s-деплоев
├── Monitoring: Prometheus + Grafana + Loki
├── Security: Trivy, RBAC, Network Policies, Vault
└── Documentation: Architecture Decision Records

Демонстрирует: Все 6 факторов. Это ваш «главный» проект.
```

### Проект 2: «IaC Library» (2-3 недели)

**Описание:** Библиотека Terraform-модулей с тестами.

```
Компоненты:
├── 5+ модулей: VPC, EKS, RDS, S3, IAM
├── Каждый модуль: variables, outputs, documentation
├── Тесты: Terratest для каждого модуля
├── CI: автоматическое тестирование при PR
├── Versioning: semantic versioning, changelog
└── Registry: GitHub Releases или Terraform Registry

Демонстрирует: Фактор 4 (IaC) глубоко. Показывает зрелость подхода.
```

### Проект 3: «Security Pipeline» (2-3 недели)

**Описание:** Полный security pipeline от коммита до runtime.

```
Компоненты:
├── Pre-commit: gitleaks, hadolint
├── CI: Trivy (images), Checkov (IaC), Semgrep (SAST)
├── Signing: Cosign для образов
├── Admission: Kyverno policies (no root, no latest, require limits)
├── Runtime: Falco для обнаружения аномалий
├── Secrets: Vault + External Secrets Operator
└── Dashboard: security posture overview

Демонстрирует: Фактор 3 (DevSecOps) глубоко. Выделяет вас среди других кандидатов.
```

### Проект 4: «MLOps Pipeline» (3-4 недели)

**Описание:** Полный пайплайн для ML: от тренировки до serving.

```
Компоненты:
├── Training: контейнеризированное обучение на GPU
├── Tracking: MLflow для экспериментов
├── Registry: MLflow Model Registry
├── Serving: KServe или vLLM на K8s
├── CI/CD: train -> evaluate -> register -> deploy
├── Monitoring: model performance + infrastructure metrics
└── Auto-scaling: HPA на custom metrics

Демонстрирует: Фактор 5 (ИИ и MLOps). Показывает, что вы готовы к MLOps-роли.
```

### Проект 5: «Incident Response System» (1-2 недели)

**Описание:** Система для управления инцидентами.

```
Компоненты:
├── Alerting: Prometheus -> Alertmanager -> Slack/PagerDuty
├── Runbooks: документированные процедуры для типовых инцидентов
├── Dashboards: Grafana с SLI/SLO
├── Post-mortem template
├── Chaos testing: Litmus или manual fault injection
└── Documentation: SLA, escalation matrix

Демонстрирует: SRE-мышление. Показывает зрелость и операционный опыт.
```

---

## Рекомендации по публичности

Обучение без публичности -- это как тренировка без матчей. Ваши проекты должны быть видимы.

1. **GitHub** -- все проекты в публичных репозиториях с хорошими README
2. **LinkedIn** -- пост о каждом завершённом проекте (1-2 раза в неделю)
3. **Блог / Dev.to** -- технические статьи о том, что изучили (1-2 в месяц)
4. **YouTube / Telegram** -- видеообзоры или канал с заметками (опционально, но мощно)

Подробнее об ошибках «тихого обучения» и других -- в [Типичных ошибках](../91-mistakes/).

---

## Ссылки внутри репозитория

- Фактор 1: [Облачное внедрение](../01-cloud-adoption/)
- Фактор 2: [Контейнеры и Kubernetes](../02-containers-and-kubernetes/)
- Фактор 3: [DevSecOps](../03-devsecops/)
- Фактор 4: [Инфраструктура как код](../04-infrastructure-as-code/)
- Фактор 5: [ИИ и MLOps](../05-ai-and-mlops/)
- Фактор 6: [Наблюдаемость и SRE](../06-observability-and-sre/)
- Типичные ошибки: [91-mistakes](../91-mistakes/)
- Вернуться на [главную страницу](../)
