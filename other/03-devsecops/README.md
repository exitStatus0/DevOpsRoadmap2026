# Фактор 3: DevSecOps (Безопасность)

![DevSecOps](../../en/03-devsecops/03-devsecops.png)

> **Быстрый старт**
> - **7 дней:** Добавьте pre-commit hook (gitleaks) и Trivy в ваш существующий CI/CD-пайплайн.
> - **30 дней:** Настройте HashiCorp Vault и создайте базовые Network Policies в K8s-кластере.

---

## Почему это важно в 2026

Безопасность -- это не отдельная команда, которая приходит перед релизом. В 2026 году безопасность -- это часть каждого коммита, каждого пайплайна, каждого деплоя.

Средняя стоимость утечки данных исчисляется миллионами. Компании активно внедряют shift-left security.

**Shift-left security** означает, что безопасность смещается влево по timeline разработки -- ближе к коду, дальше от production. Вместо «проверим безопасность перед релизом» -- «безопасность встроена в каждый этап».

Почему DevOps-инженер должен понимать безопасность:

- **Вы строите пайплайны** -- если безопасность не в пайплайне, её нет нигде
- **Вы управляете инфраструктурой** -- неправильная конфигурация = открытые двери для атак
- **Вы работаете с секретами** -- API-ключи, пароли, сертификаты проходят через ваши руки
- **Вы отвечаете за runtime** -- если контейнер взломан, это ваша зона ответственности
- **Рынок платит больше** -- DevSecOps-инженеры зарабатывают заметно больше «чистых» DevOps

---

## Какую проблему это решает в реальных командах

| Проблема | Без DevSecOps | С DevSecOps |
|----------|---------------|-------------|
| Уязвимости в зависимостях | Узнаём после взлома | Автоматическое сканирование в CI |
| Захардкоженные секреты | Пароли в Git-истории | Vault/Secrets Manager + pre-commit hooks |
| Чрезмерные привилегии | Каждый имеет admin-доступ | RBAC + принцип минимальных привилегий |
| Незащищённые контейнеры | Root в контейнере, никакого сканирования | Non-root + Trivy + runtime security |
| Сетевые атаки | Всё открыто, flat network | Network Policies + zero trust |
| Supply chain attacks | Доверяем любым образам и пакетам | Подписанные образы, SBOM, проверенные registry |

**Реальный пример:** Финтех-стартап. Разработчик случайно закоммитил AWS access key в публичный репозиторий. Через 15 минут бот просканировал GitHub, нашёл ключ и запустил crypto-mining на 47 EC2-инстансах. Счёт: $23,000 за 4 часа. С pre-commit hook (gitleaks) и IAM-политикой минимальных привилегий -- этого бы не произошло.

---

## Что нужно изучить (ключевые навыки)

### 1. Управление секретами

```
Иерархия инструментов:
├── Уровень 1: Environment variables (минимум, не для production)
├── Уровень 2: Cloud-native (AWS Secrets Manager, GCP Secret Manager)
├── Уровень 3: HashiCorp Vault (кроссплатформенный стандарт)
├── Уровень 4: External Secrets Operator (для K8s)
└── Практики:
    ├── Никогда не коммитить секреты в Git
    ├── Ротация секретов (автоматическая)
    ├── Аудит доступа к секретам
    └── Pre-commit hooks (gitleaks, detect-secrets)
```

### 2. Сканирование образов и зависимостей

```
Инструменты и их место:
├── Trivy — сканирование контейнерных образов (уязвимости + misconfigurations)
├── Snyk — сканирование зависимостей кода
├── Grype — сканирование образов (альтернатива Trivy)
├── Checkov — сканирование IaC (Terraform, CloudFormation, K8s)
├── SBOM (Software Bill of Materials)
│   ├── Syft — генерация SBOM
│   └── Cosign — подпись образов
└── Интеграция в CI/CD:
    ├── Fail pipeline при Critical/High уязвимостях
    ├── Отчёты в PR-комментариях
    └── Periodic scanning (не только при билде)
```

### 3. SAST и DAST

```
Static Application Security Testing (SAST):
├── SonarQube — анализ кода на уязвимости
├── Semgrep — лёгкий, с хорошими правилами
├── CodeQL — GitHub-native, мощный
└── Когда: на каждом PR

Dynamic Application Security Testing (DAST):
├── OWASP ZAP — бесплатный, стандарт
├── Nuclei — быстрый сканер
└── Когда: после деплоя в staging
```

### 4. RBAC и контроль доступа

```
RBAC-навыки:
├── Kubernetes RBAC
│   ├── Roles и ClusterRoles
│   ├── RoleBindings и ClusterRoleBindings
│   ├── ServiceAccounts
│   └── Принцип минимальных привилегий
├── Cloud IAM
│   ├── IAM Policies (AWS/GCP/Azure)
│   ├── Cross-account/cross-project доступ
│   └── Временные credentials (AssumeRole, Workload Identity)
└── CI/CD
    ├── Ограниченные permissions для pipeline runners
    ├── OIDC вместо статических ключей
    └── Branch protection rules
```

### 5. Сетевые политики и zero trust

```yaml
# Пример: Запретить весь входящий трафик по умолчанию
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress

---
# Разрешить трафик только от фронтенда к бэкенду
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - port: 8080
```

```
Сетевая безопасность:
├── K8s Network Policies
│   ├── Default deny all
│   ├── Allow только необходимый трафик
│   └── Ingress и Egress правила
├── Cloud Security Groups / NACLs
├── WAF (Web Application Firewall)
├── mTLS между сервисами (Service Mesh)
└── Zero Trust принципы:
    ├── Не доверять никому по умолчанию
    ├── Проверять каждый запрос
    └── Минимальный доступ
```

### 6. Безопасность цепочки поставок (Supply Chain Security)

```
Supply Chain Security:
├── Подписание образов (Cosign, Notary)
├── SBOM (Software Bill of Materials)
├── Проверка базовых образов
├── Pinning версий зависимостей
├── Сканирование CI/CD-пайплайнов
├── SLSA framework (уровни 1-4)
└── Admission controllers
    ├── OPA/Gatekeeper
    ├── Kyverno
    └── Запрещают незащищённые ресурсы
```

---

## Что можно пропустить / «худший ROI» для начала

### НЕ учите первым:

1. **Пентестинг (penetration testing)** -- это отдельная специализация. DevOps-инженеру достаточно знать, как защитить, а не как взломать. Пентест -- для security-инженеров.

2. **Детальные фреймворки комплаенса** -- SOC 2, PCI DSS, HIPAA, ISO 27001 -- их детали нужны для compliance engineers. Вам достаточно знать, что это существует и какие требования они создают для инфраструктуры.

3. **Криптография на глубоком уровне** -- Вам не нужно понимать математику за AES или RSA. Достаточно знать: когда шифровать, какой алгоритм выбрать, как управлять ключами.

4. **Собственный SIEM с нуля** -- ELK для security logs -- это для больших команд. Начните с CloudTrail + CloudWatch или managed SIEM.

5. **Bug bounty и exploit development** -- Это для offensive security. Ваша задача -- defensive.

---

## Насколько глубоко погружаться

### Новичок (2-3 недели)

- [ ] Настроить pre-commit hooks для выявления секретов (gitleaks)
- [ ] Добавить Trivy в CI/CD-пайплайн
- [ ] Написать Dockerfile без root-пользователя
- [ ] Понять принцип минимальных привилегий для IAM
- [ ] Настроить MFA для всех учётных записей
- [ ] Понять разницу между аутентификацией и авторизацией
- [ ] Хранить секреты в AWS Secrets Manager или аналоге

**Тест:** Можете создать CI-пайплайн, который блокирует деплой при наличии Critical уязвимостей? Если да -- идите дальше.

### Уверенный (4-8 недель)

- [ ] Установить и настроить HashiCorp Vault
- [ ] Настроить RBAC в Kubernetes (Role, RoleBinding)
- [ ] Создать Network Policies (default deny + allow list)
- [ ] Внедрить SAST (Semgrep или SonarQube) в CI
- [ ] Настроить OPA/Gatekeeper или Kyverno для admission control
- [ ] Подписывать Docker-образы (Cosign)
- [ ] Генерировать SBOM (Syft)
- [ ] Автоматическая ротация секретов
- [ ] Настроить Cloud audit logging (CloudTrail, Cloud Audit Logs)

**Тест:** Можете провести security review инфраструктуры другой команды и найти 5+ проблем? Если да -- вы уверенный.

### Эксперт (3-6 месяцев)

- [ ] Внедрить полный security pipeline (pre-commit -> SAST -> build -> scan image -> sign -> deploy -> DAST -> runtime)
- [ ] Настроить runtime security (Falco)
- [ ] Внедрить Service Mesh с mTLS
- [ ] Дизайн zero trust сетевой архитектуры
- [ ] Incident response plan и runbooks
- [ ] Compliance as Code (автоматическая проверка соответствия)
- [ ] Threat modeling для инфраструктуры

**Тест:** Можете спроектировать и внедрить security framework для организации? Если да -- вы эксперт.

---

## Как ИИ меняет этот фактор (практические примеры)

### 1. Аудит Dockerfile

```
Промпт:
"Проанализируй этот Dockerfile с точки зрения безопасности.
Найди все потенциальные уязвимости и предложи исправления:
[вставить Dockerfile]

Проверь:
- Запускается ли от root
- Есть ли ненужные пакеты
- Используются ли multi-stage builds
- Закреплены ли версии базовых образов
- Есть ли HEALTHCHECK
- Есть ли COPY --chown"
```

### 2. Написание OPA/Kyverno политик

```
Промпт:
"Создай Kyverno ClusterPolicy, которая:
1. Запрещает pods с privileged: true
2. Требует наличия resource limits
3. Запрещает образы с тегом 'latest'
4. Требует non-root user
5. Требует readOnlyRootFilesystem: true
Каждое правило — отдельная policy с понятным сообщением об ошибке."
```

### 3. Анализ IAM-политик

```
Промпт:
"Проанализируй эту IAM-политику на предмет чрезмерных привилегий:
[вставить JSON]
Найди:
- Wildcard permissions (*)
- Чрезмерно широкие Resource ARN
- Отсутствующие Condition keys
Предложи минимальную версию."
```

### 4. Генерация Network Policies

```
Промпт:
"Создай K8s Network Policies для микросервисной архитектуры:
- frontend (port 80) — принимает трафик извне
- api (port 8080) — принимает только от frontend
- database (port 5432) — принимает только от api
- redis (port 6379) — принимает только от api
Default deny all. Namespace: production."
```

### 5. Incident response

```
Промпт:
"Я обнаружил, что AWS access key был закоммичен в публичный GitHub-репозиторий 2 часа назад.
Создай пошаговый incident response plan:
1. Немедленные действия (первые 15 минут)
2. Расследование (1-2 часа)
3. Ремедиация
4. Post-mortem и предотвращение повторения"
```

---

## Типичные ошибки и ловушки

### Ловушка 1: «Безопасность -- это не моя работа»

**Что это:** Откладывать безопасность на «security team» или «потом».

**Почему вредит:** Безопасность, добавленная на финальном этапе, стоит в 30 раз дороже, чем встроенная с начала. И обычно добавляется после инцидента.

**Исправление:** Добавьте хотя бы 3 security-шага в каждый CI/CD-пайплайн:
1. Pre-commit: gitleaks (секреты)
2. Build: Trivy (образы), Checkov (IaC)
3. Post-deploy: OWASP ZAP (DAST) в staging

### Ловушка 2: Захардкоженные секреты

**Что это:** `DB_PASSWORD=my-secret-123` в коде, Docker Compose, или Terraform.

**Почему вредит:** Если код попадёт в публичный репо (или злоумышленник получит доступ) -- все секреты скомпрометированы.

**Исправление:**
```bash
# Плохо:
export DB_PASSWORD="my-secret-123"

# Хорошо:
export DB_PASSWORD=$(aws secretsmanager get-secret-value \
  --secret-id prod/db-password \
  --query SecretString --output text)
```

### Ловушка 3: Base64 = шифрование

**Что это:** Верить, что Kubernetes Secrets защищены, потому что они в base64.

**Почему вредит:** `echo "bXktc2VjcmV0" | base64 -d` = `my-secret`. Base64 -- это кодирование, НЕ шифрование.

**Исправление:**
- Включить encryption at rest для etcd
- Использовать External Secrets Operator + Vault
- Или Sealed Secrets (Bitnami)

### Ловушка 4: Игнорирование supply chain

**Что это:** `FROM python:latest` -- без проверки, кто создал этот образ и что в нём.

**Почему вредит:** Compromised базовый образ = compromised ваше приложение. Supply chain attacks растут ежегодно.

**Исправление:**
```dockerfile
# Закрепить SHA
FROM python:3.12-slim@sha256:abc123...
```
Плюс: сканировать образы, генерировать SBOM, использовать trusted registries.

### Ловушка 5: «Я же в private subnet»

**Что это:** Полагаться на сетевую изоляцию как единственный уровень защиты.

**Почему вредит:** Defense in depth -- базовый принцип безопасности. Один уровень = один point of failure.

**Исправление:** Несколько уровней: Network Policies + RBAC + secrets management + image scanning + runtime security.

---

## Мини-практика (5 упражнений)

### Упражнение 1: Ротация секретов (новичок)

**Цель:** Научиться работать с секретами правильно.

```
Шаги:
1. Создать секрет в AWS Secrets Manager
2. Написать скрипт, который читает секрет и использует его
3. Настроить автоматическую ротацию (каждые 30 дней)
4. Интегрировать с K8s через External Secrets Operator
5. Настроить pre-commit hook (gitleaks) в репозитории
6. Проверить: попробовать закоммитить секрет — hook должен заблокировать

Критерий успеха: секреты нигде не захардкожены, ротация автоматическая
```

### Упражнение 2: Trivy в CI/CD (новичок -> уверенный)

**Цель:** Встроить сканирование образов в пайплайн.

```
Шаги:
1. Добавить Trivy в GitHub Actions / GitLab CI:
   - Сканировать Docker-образ после build
   - Fail pipeline при Critical уязвимостях
   - Генерировать отчёт в SARIF/JSON
2. Добавить Checkov для сканирования Terraform/K8s-манифестов
3. Настроить Dependabot/Renovate для автоматического обновления зависимостей
4. Создать dashboard с результатами сканирования

Пример шага в GitHub Actions:
  - name: Scan image
    uses: aquasecurity/trivy-action@master
    with:
      image-ref: 'myapp:${{ github.sha }}'
      severity: 'CRITICAL,HIGH'
      exit-code: '1'

Критерий успеха: ни один образ с Critical уязвимостью не попадает в production
```

### Упражнение 3: Network Policies в Kubernetes (уверенный)

**Цель:** Научиться изолировать трафик в K8s.

```
Шаги:
1. Создать namespace с 3 сервисами: frontend, api, database
2. Проверить: все сервисы видят друг друга (до Network Policies)
3. Создать default deny policy
4. Проверить: ничего не работает
5. Добавить allow-правила:
   - frontend -> api (port 8080)
   - api -> database (port 5432)
   - ingress -> frontend (port 80)
6. Проверить: только разрешённый трафик проходит
7. Попробовать: database -> frontend — должно быть заблокировано

Критерий успеха: каждый сервис имеет доступ только к тому, что нужно
```

### Упражнение 4: Admission Control с Kyverno (уверенный -> эксперт)

**Цель:** Автоматически enforce security policies в K8s.

```
Шаги:
1. Установить Kyverno в K8s-кластер
2. Создать политики:
   - Запретить privileged containers
   - Требовать resource limits
   - Запретить latest tag
   - Требовать non-root
   - Требовать specific labels
3. Протестировать: попробовать создать pod, нарушающий политику
4. Настроить audit mode (не блокировать, а логировать)
5. Генерировать Policy Report

Критерий успеха: незащищённые ресурсы не могут быть созданы в кластере
```

### Упражнение 5: Полный security pipeline (эксперт)

**Цель:** Построить end-to-end security pipeline.

```
Шаги:
1. Pre-commit: gitleaks, detect-secrets
2. SAST: Semgrep в CI
3. Build: multi-stage Dockerfile, non-root
4. Image scan: Trivy (fail on CRITICAL)
5. IaC scan: Checkov для Terraform
6. Sign image: Cosign
7. Generate SBOM: Syft
8. Deploy: только подписанные образы (Kyverno verify-images)
9. Post-deploy: OWASP ZAP в staging
10. Runtime: Falco для обнаружения аномалий

Критерий успеха: любая security проблема блокирует деплой или генерирует алерт
```

---

## «Сигналы» готовности к работе (чек-лист)

### Обязательное:

- [ ] Настроить pre-commit hooks для выявления секретов
- [ ] Интегрировать сканер образов (Trivy) в CI/CD
- [ ] Написать Dockerfile без root-пользователя с health check
- [ ] Объяснить принцип минимальных привилегий и применить его в IAM
- [ ] Хранить секреты в соответствующем сервисе (Vault, Secrets Manager)
- [ ] Настроить RBAC в Kubernetes
- [ ] Объяснить разницу между SAST и DAST
- [ ] Создать базовые Network Policies

### Желательное:

- [ ] Настроить HashiCorp Vault с автоматической ротацией
- [ ] Внедрить admission control (OPA/Gatekeeper или Kyverno)
- [ ] Подписывать образы (Cosign)
- [ ] Генерировать SBOM (Syft)
- [ ] Настроить SAST в CI (Semgrep или SonarQube)
- [ ] Знать основы OWASP Top 10

### На собеседовании сможете:

- [ ] Описать security pipeline от коммита до production
- [ ] Объяснить, что такое shift-left security и зачем
- [ ] Ответить на вопрос: «Как вы управляете секретами?»
- [ ] Описать план действий при утечке credentials
- [ ] Объяснить разницу между сетевой изоляцией и zero trust
- [ ] Описать supply chain security и SBOM

---

## Ссылки внутри репозитория

- Предыдущий фактор: [Контейнеры и Kubernetes](../02-containers-and-kubernetes/)
- Следующий фактор: [Инфраструктура как код](../04-infrastructure-as-code/)
- Безопасность контейнеров: [Контейнеры и Kubernetes](../02-containers-and-kubernetes/)
- IaC-безопасность: [Инфраструктура как код](../04-infrastructure-as-code/)
- ИИ для безопасности: [ИИ и MLOps](../05-ai-and-mlops/)
- Общая дорожная карта: [Roadmap](../90-roadmap/)
- Ошибки, которых стоит избегать: [Типичные ошибки](../91-mistakes/)
- Вернуться на [главную страницу](../)

**Примените этот фактор:** [Проект C — Security Pipeline](../90-roadmap/#канонические-проекты-портфолио)
