# Дорожная карта обучения DevOps 2026

VOICEOVER: Это не ещё один список технологий. Это пошаговый план с чёткими фазами, зависимостями и сигналами, когда двигаться дальше. Каждая фаза заканчивается конкретным чек-листом — не «я посмотрел курс», а «я могу сделать Х своими руками».

ON SCREEN: Дорожная карта — три фазы с таймлайном

---

## Обзор фаз

```
Фаза 0→1: Основы                    [2-4 недели]
    │
    ▼
Фаза 1→2: Основные инструменты      [6-10 недель]
    │
    ▼
Фаза 2→3: Масштабирование           [3-6 месяцев]
    │
    ▼
[Готов к работе / Специализация]
```

**Общее время:** 6-10 месяцев интенсивного обучения (3-4 часа в день) или 12-18 месяцев при обучении по вечерам (1-2 часа в день).

---

## Фаза 0→1: Основы (2-4 недели)

### Что изучить

#### 1. Linux (5-7 дней)

Не нужно становиться сисадмином. Нужен рабочий минимум:

- **Файловая система:** ls, cd, cp, mv, rm, find, chmod, chown
- **Процессы:** ps, top, htop, kill, systemctl
- **Сеть:** ping, curl, wget, netstat/ss, dig, nslookup, traceroute
- **Текст:** grep, awk, sed, cat, head, tail, less
- **Пакеты:** apt/yum, systemd-сервисы
- **SSH:** ssh, scp, ssh-keygen, ssh-config
- **Пользователи и права:** sudo, useradd, groups, файл /etc/passwd

**Практика:** Установи Ubuntu Server в VirtualBox или WSL2. Работай ТОЛЬКО через терминал 5 дней. Никакого GUI.

#### 2. Сети (3-5 дней)

Сети — это фундамент, на котором стоит всё остальное:

- **Модель OSI / TCP/IP** — зачем 7 уровней, как данные передаются
- **IP-адресация и подсети** — CIDR-нотация, расчёт подсетей
- **DNS** — как работает, A/CNAME/MX-записи, резолвинг
- **HTTP/HTTPS** — методы, статус-коды, заголовки, TLS
- **Порты и протоколы** — TCP vs UDP, общеизвестные порты
- **Firewalls** — iptables/nftables, концепция stateful/stateless
- **NAT** — зачем и как работает
- **Load Balancing** — L4 vs L7, алгоритмы балансировки

**Практика:** Настрой два сервера в одной сети, чтобы один мог пинговать другой. Настрой nginx как reverse proxy.

#### 3. Git (2-3 дня)

Git — язык коммуникации в DevOps:

- **Базовые команды:** init, clone, add, commit, push, pull
- **Ветвление:** branch, checkout/switch, merge, rebase
- **Работа в команде:** pull requests, merge conflicts, code review
- **Продвинутое:** cherry-pick, stash, bisect, reflog
- **Git workflow:** Git Flow vs Trunk-Based Development
- **.gitignore** — что НЕ коммитить

**Практика:** Создай репозиторий, поработай с ветками, создай PR, разреши конфликт.

#### 4. Скриптинг — Bash (3-5 дней)

Не нужно быть программистом. Нужно уметь автоматизировать:

- **Переменные, условия, циклы**
- **Функции**
- **Аргументы командной строки**
- **Работа с файлами и текстом**
- **Exit codes и обработка ошибок**
- **Cron — планировщик задач**

**Практика:** Напиши скрипт, который:
1. Проверяет доступность 5 серверов (ping)
2. Собирает логи за последние 24 часа
3. Отправляет отчёт на email или в Slack

### Как понять, что Фаза 0→1 пройдена

- [ ] Могу подключиться к удалённому серверу по SSH и настроить сервис (nginx)
- [ ] Могу объяснить, как HTTP-запрос доходит от браузера до сервера (DNS, TCP, HTTP)
- [ ] Могу работать с Git: ветки, PR, конфликты
- [ ] Могу написать Bash-скрипт на 50-100 строк для автоматизации рутины
- [ ] Могу рассчитать подсети для VPC (CIDR-нотация)
- [ ] Комфортно работаю в терминале без GUI

---

## Фаза 1→2: Основные инструменты (6-10 недель)

### Что изучить

#### 1. Docker (1-2 недели)

Ссылка на детали: [Фактор 2 — Контейнеры](../02-containers-and-kubernetes/)

- Dockerfile: синтаксис, multi-stage builds
- Docker CLI: build, run, exec, logs, inspect
- Docker Compose: многосервисные приложения
- Docker networking и volumes
- Реестры: Docker Hub, ECR, GHCR
- Security: non-root, минимальные образы, .dockerignore

**Практика:** Контейнеризируй 3 разных приложения (Node.js, Python, Go). Создай docker-compose для полного стека.

#### 2. CI/CD (2-3 недели)

- **GitHub Actions** (рекомендуемый старт) или GitLab CI
- Концепция пайплайна: build -> test -> deploy
- Артефакты, кэширование, матрицы
- Секреты в CI/CD (OIDC > Access Keys)
- Деплой-стратегии: rolling, blue-green, canary
- Уведомления: Slack, email

**Пример минимального pipeline:**
```yaml
name: CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t my-app:${{ github.sha }} .
      - name: Push to registry
        run: docker push my-app:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to staging
        run: helm upgrade --install my-app ./chart --set image.tag=${{ github.sha }}
```

**Практика:** Настрой полный CI/CD для своего приложения: тесты -> сборка образа -> деплой.

#### 3. Облачный провайдер — AWS (3-4 недели)

Ссылка на детали: [Фактор 1 — Облачное внедрение](../01-cloud-adoption/)

- Аккаунт AWS (Free Tier)
- Core-сервисы: EC2, S3, VPC, IAM, RDS
- CLI: `aws` команды для всех операций
- Базовый мониторинг: CloudWatch
- Стоимость: Billing Alerts, Cost Explorer

**Практика:** Разверни приложение в AWS: VPC + EC2 + RDS + ALB. Всё через CLI (не консоль).

### Как понять, что Фаза 1→2 пройдена

- [ ] Могу написать Dockerfile для любого приложения (multi-stage build)
- [ ] Могу настроить docker-compose для 3+ сервисов
- [ ] Могу настроить CI/CD pipeline с нуля (GitHub Actions)
- [ ] Pipeline включает: тесты, сборку образа, деплой
- [ ] Могу развернуть инфраструктуру в AWS через CLI
- [ ] Понимаю VPC, подсети, security groups, IAM-роли
- [ ] У меня есть 2+ проекта на GitHub с Docker + CI/CD

---

## Фаза 2→3: Масштабирование и автоматизация (3-6 месяцев)

### Что изучить

#### 1. Kubernetes (4-6 недель)

Ссылка на детали: [Фактор 2 — Контейнеры и Kubernetes](../02-containers-and-kubernetes/)

- Основные объекты: Pod, Deployment, Service, Ingress, ConfigMap, Secret
- Helm: установка и создание чартов
- RBAC и Namespaces
- HPA и resource management
- Networking: Services, Ingress, NetworkPolicy
- Troubleshooting: logs, describe, events, exec

#### 2. Terraform (3-4 недели)

Ссылка на детали: [Фактор 4 — Инфраструктура как код](../04-infrastructure-as-code/)

- HCL-синтаксис, ресурсы, переменные, outputs
- Remote State с locking
- Модули: использование и создание
- Terraform в CI/CD
- Структура проекта по окружениям

#### 3. Мониторинг и Observability (2-3 недели)

- **Prometheus** — сбор метрик, PromQL-запросы
- **Grafana** — дашборды и визуализация
- **Alertmanager** — алерты и маршрутизация
- **ELK/EFK или Loki** — централизованное логирование
- **Jaeger/Tempo** — distributed tracing (основы)
- **SLI/SLO/SLA** — как измерять надёжность

**Практика:** Настрой Prometheus + Grafana для K8s-кластера. Создай дашборд и 3 алерта.

#### 4. Основы безопасности (2-3 недели)

Ссылка на детали: [Фактор 3 — DevSecOps](../03-devsecops/)

- Управление секретами (Vault / AWS Secrets Manager)
- Сканирование образов (Trivy)
- Kubernetes RBAC и NetworkPolicy
- Security в CI/CD: gitleaks, SAST
- Базовый IAM в облаке

### Как понять, что Фаза 2→3 пройдена

- [ ] Могу задеплоить приложение в K8s с Helm, Ingress, TLS
- [ ] Могу развернуть полную инфраструктуру через Terraform (VPC + EKS + RDS)
- [ ] Terraform структурирован по окружениям с Remote State
- [ ] Настроен мониторинг: Prometheus + Grafana + алерты
- [ ] Настроена базовая безопасность: секреты, сканирование, RBAC
- [ ] Могу продебажить проблему в K8s-кластере
- [ ] У меня есть 3-5 проектов на GitHub, показывающих все навыки
- [ ] Могу пройти техническое собеседование на Junior/Middle DevOps

---

## Граф зависимостей навыков

```
Linux/Сети ─────────────────────────────────────────────┐
    │                                                    │
    ├── Git ──── Bash-скриптинг                         │
    │     │          │                                   │
    │     ├──────────┼── CI/CD (GitHub Actions)          │
    │     │          │       │                           │
    │     │          │       ├── Docker ─────────┐       │
    │     │          │       │     │             │       │
    │     │          │       │     ├── K8s ──────┤       │
    │     │          │       │     │    │        │       │
    │     │          │       │     │    ├── Helm │       │
    │     │          │       │     │    │        │       │
    ├─────┼──────────┼───────┼─────┼────┼── AWS  │       │
    │     │          │       │     │    │    │   │       │
    │     │          │       │     │    │    ├── Terraform
    │     │          │       │     │    │    │       │
    │     │          │       │     │    │    │    GitOps (ArgoCD)
    │     │          │       │     │    │    │       │
    │     │          │       │     │    ├────┼── Мониторинг
    │     │          │       │     │    │    │   (Prometheus/Grafana)
    │     │          │       │     │    │    │
    │     │          │       │     ├────┼────┼── Безопасность
    │     │          │       │     │    │    │   (DevSecOps)
    │     │          │       │     │    │    │
    └─────┴──────────┴───────┴─────┴────┴────┴── ИИ/MLOps
                                                  (используй с первого дня)

Стрелки показывают зависимости:
- Без Linux/сетей невозможно эффективно учить ничего дальше
- Docker зависит от Linux и CI/CD
- K8s зависит от Docker
- Terraform зависит от AWS и Git
- Безопасность пронизывает ВСЁ
- ИИ — инструмент для КАЖДОГО этапа
```

---

## Бюджет глубины: сколько времени уделять каждой области

Это распределение для первых 6-10 месяцев обучения:

| Область | % времени | Обоснование |
|---------|-----------|-------------|
| **Linux/Сети/Bash** | 10% | Фундамент, учится быстро, но критически важен |
| **Docker** | 10% | Базовый навык, быстрый ROI |
| **CI/CD** | 10% | Используется на каждом проекте |
| **Облако (AWS)** | 20% | Самая большая доля вакансий, много для изучения |
| **Kubernetes** | 20% | Сложный инструмент, требует практики |
| **Terraform/IaC** | 15% | Обязательный навык, средняя кривая обучения |
| **Мониторинг** | 5% | Важно, но освоится быстро при наличии K8s/облака |
| **Безопасность** | 5% | Встраивается в каждый этап, не отдельный блок |
| **ИИ/MLOps** | 5% | ИИ используется с первого дня, MLOps — после основ |

**Важно:** Безопасность и ИИ — не отдельные блоки, а сквозные навыки. Используй ИИ при изучении каждой темы. Думай о безопасности при каждом деплое.

---

## Комбинации навыков (специализации)

После прохождения базовых фаз можешь углубиться в одну из специализаций:

### 1. Platform Engineering + Security

```
Фокус: Внутренняя платформа разработки с встроенной безопасностью
Навыки:
├── Kubernetes (глубоко: операторы, admission controllers)
├── ArgoCD/Flux (GitOps)
├── Kyverno/OPA (Policy-as-Code)
├── Backstage (Developer Portal)
├── Vault (управление секретами)
└── Falco (runtime security)

Вакансии: Platform Engineer, DevSecOps Engineer
Зарплата: Выше среднего на 20-30%
```

### 2. SRE + Observability

```
Фокус: Надёжность систем, мониторинг, incident management
Навыки:
├── Prometheus + Grafana (глубоко: recording rules, federation)
├── OpenTelemetry (traces, metrics, logs)
├── ELK/Loki (централизованное логирование)
├── SLI/SLO/SLA (определение и мониторинг)
├── Chaos Engineering (Litmus, Chaos Monkey)
├── Incident Management (PagerDuty, postmortems)
└── Performance Engineering (нагрузочное тестирование)

Вакансии: SRE, Observability Engineer
Зарплата: Одна из самых высоких в DevOps
```

### 3. Cloud + IaC (Cloud Infrastructure Engineer)

```
Фокус: Облачная инфраструктура, архитектура, автоматизация
Навыки:
├── AWS (глубоко: Organizations, Landing Zone, Control Tower)
├── Terraform (модули, тестирование, CI/CD)
├── Networking (Transit Gateway, VPN, Direct Connect)
├── Cost Optimization (Reserved, Spot, Savings Plans)
├── Migration (on-premise -> cloud)
└── Compliance (CloudTrail, Config, GuardDuty)

Вакансии: Cloud Engineer, Infrastructure Architect
Зарплата: Высокая, особенно с мультиоблачностью
```

### 4. GitOps + Kubernetes

```
Фокус: Полный жизненный цикл приложений на K8s
Навыки:
├── Kubernetes (глубоко: networking, storage, scheduling)
├── ArgoCD/Flux (GitOps)
├── Helm + Kustomize
├── Service Mesh (Istio/Linkerd)
├── Canary/Blue-Green деплои (Flagger, Argo Rollouts)
└── Multi-cluster (federation, Admiralty)

Вакансии: Kubernetes Engineer, GitOps Engineer
Зарплата: Высокая, растущий спрос
```

---

## Портфолио-проекты

Эти проекты покрывают все ключевые навыки и впечатляют на собеседовании:

### Проект 1: «Полный стек инфраструктуры» (Главный проект)

**Описание:** Production-ready инфраструктура от кода до мониторинга.

```
Что включает:
├── Terraform: VPC + EKS + RDS + S3 (модульная структура)
├── K8s: приложение из 3 микросервисов (Helm-чарты)
├── CI/CD: GitHub Actions (test -> build -> scan -> deploy)
├── GitOps: ArgoCD для деплоя в K8s
├── Мониторинг: Prometheus + Grafana + алерты
├── Безопасность: Trivy, gitleaks, RBAC, NetworkPolicy
├── Документация: README, архитектурная диаграмма, ADR
└── Всё в одном репозитории (или monorepo с разделением)
```

**Время:** 2-3 недели
**Ценность:** Показывает владение ВСЕМИ ключевыми навыками.

### Проект 2: «Self-healing инфраструктура»

**Описание:** Инфраструктура, которая сама обнаруживает и исправляет проблемы.

```
Что включает:
├── K8s с HPA и PodDisruptionBudget
├── Liveness/Readiness probes для всех сервисов
├── Prometheus алерты -> автоматическое действие
├── Chaos Engineering: периодическое убийство подов
├── Автоматический rollback при ошибках деплоя
└── Постмортем-шаблон и runbook
```

**Время:** 1-2 недели
**Ценность:** Показывает SRE-мышление.

### Проект 3: «Secure CI/CD Pipeline»

**Описание:** Pipeline с полным набором security-проверок.

```
Что включает:
├── gitleaks — проверка секретов
├── Semgrep — SAST
├── Trivy — сканирование образов
├── Cosign — подписание образов
├── SBOM-генерация
├── Kyverno — admission policies в K8s
├── Vault — управление секретами
└── Отчёт безопасности как артефакт pipeline
```

**Время:** 1 неделя
**Ценность:** Выделяет из толпы — мало кто делает security правильно.

### Проект 4: «ML Model Serving Platform»

**Описание:** Инфраструктура для деплоя ML-моделей.

```
Что включает:
├── K8s-кластер (EKS или minikube с GPU)
├── Model Serving (FastAPI + модель в Docker)
├── MLflow для трекинга и Model Registry
├── CI/CD: обучение -> упаковка -> деплой
├── A/B-тестирование (2 версии модели)
├── Мониторинг: latency, throughput, error rate
└── Автомасштабирование по нагрузке
```

**Время:** 2 недели
**Ценность:** Показывает навык MLOps — горячий тренд.

### Проект 5: «Infrastructure Cost Optimizer»

**Описание:** Инструмент для анализа и оптимизации облачных расходов.

```
Что включает:
├── Скрипт сбора данных из AWS Cost Explorer
├── Анализ: неиспользуемые ресурсы, oversized инстансы
├── Рекомендации: Reserved vs. Spot vs. On-Demand
├── Grafana-дашборд с расходами по тегам
├── Алерты при превышении бюджета
└── Еженедельный отчёт в Slack
```

**Время:** 1 неделя
**Ценность:** Показывает бизнес-мышление — экономия денег.

---

## Советы по организации обучения

### Распорядок дня (при полной занятости)

```
Утро (1 час до работы):
├── 30 мин — теория (документация, статья, видео)
└── 30 мин — практика (hands-on)

Вечер (1-2 часа):
├── 45 мин — практика (продолжение утреннего или новая задача)
├── 30 мин — документирование (README, заметки, блог)
└── 15 мин — план на завтра

Выходные (3-4 часа):
└── Портфолио-проект (связывание всех навыков вместе)
```

### Правило 70/20/10

- **70% времени** — практика (руками, в терминале, реальные задачи)
- **20% времени** — обучение через других (менторинг, сообщество, чужой код)
- **10% времени** — теория (курсы, документация, книги)

### Публичное обучение

- Веди лог обучения на GitHub (daily/weekly notes)
- Делись прогрессом в LinkedIn/Twitter
- Пиши короткие посты о том, что изучил
- Отвечай на вопросы других (лучший способ закрепить знания)

Подробнее об ошибках: [91-mistakes](../91-mistakes/) — особенно ошибка #4 «Тихое обучение»

---

## Ссылки внутри репозитория

- [Фактор 1 — Облачное внедрение](../01-cloud-adoption/)
- [Фактор 2 — Контейнеры и Kubernetes](../02-containers-and-kubernetes/)
- [Фактор 3 — DevSecOps](../03-devsecops/)
- [Фактор 4 — Инфраструктура как код](../04-infrastructure-as-code/)
- [Фактор 5 — ИИ и MLOps](../05-ai-and-mlops/)
- [Топ ошибок](../91-mistakes/)
- [Главная страница курса](../)
