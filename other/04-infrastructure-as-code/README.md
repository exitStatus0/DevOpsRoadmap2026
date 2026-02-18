# Фактор 4: Инфраструктура как код (IaC)

![Infrastructure as Code](../../en/04-infrastructure-as-code/04-iac.png)

> **Быстрый старт**
> - **7 дней:** Установите Terraform и разверните VPC + EC2 в AWS. Уничтожьте всё одной командой.
> - **30 дней:** Перепишите в модули, добавьте remote state (S3 + DynamoDB) и настройте CI/CD для Terraform.

---

## Почему это важно в 2026

Если ваша инфраструктура не описана в коде -- её не существует. В 2026 году ручная настройка серверов -- это технический долг, который стоит компаниям миллионы.

Большинство организаций используют IaC. Годами Terraform был бесспорным стандартом. В августе 2023 года HashiCorp сменил лицензию Terraform с open-source (MPL 2.0) на Business Source License (BSL), которая ограничивает коммерческое использование в конкурирующих продуктах. Сообщество CNCF ответило форком последней open-source версии — **OpenTofu**, который является проектом CNCF sandbox.

Это реальное решение, которое инженерные команды принимают прямо сейчас: остаться на Terraform (BSL), мигрировать на OpenTofu (open source) или оценить альтернативы. Вам нужно понимать оба варианта.

Инфраструктура как код -- это подход, где вся инфраструктура описывается в конфигурационных файлах, хранится в Git и разворачивается автоматически. Это означает:

- **Воспроизводимость** -- любой инженер может поднять идентичное окружение за минуты
- **Версионирование** -- git log показывает, кто, когда и что изменил в инфраструктуре
- **Ревью** -- изменения в инфраструктуре проходят PR-ревью, как и код
- **Автоматизация** -- CI/CD для инфраструктуры, а не ручной `terraform apply`
- **Тестирование** -- инфраструктуру можно тестировать до деплоя

В 2026 году IaC -- это **обязательный навык** для DevOps-инженера. Не «желательный» -- обязательный. Без него вы не пройдёте ни одно серьёзное собеседование.

---

## Какую проблему это решает в реальных командах

«Кто создал этот security group? Когда? Зачем?» -- если ответа нет в Git, его нет нигде.

| Проблема | Без IaC | С IaC |
|----------|---------|-------|
| «Snowflake servers» | Каждый сервер уникален, никто не знает конфигурацию | Идентичные окружения из одного шаблона |
| Configuration drift | Staging отличается от production | Один код = одинаковая инфраструктура |
| Disaster recovery | «Восстановить с нуля? Это займёт недели» | `terraform apply` -- и всё поднято |
| Аудит изменений | «Кто открыл порт 22 для 0.0.0.0/0?» | `git blame` покажет автора и причину |
| Масштабирование | Копировать ручные шаги для нового региона | Изменить переменную `region` и apply |
| Onboarding | Новый инженер неделями разбирается | Код = документация инфраструктуры |

**Реальный пример:** Компания с 200+ серверов, всё настроено вручную. Один инженер уволился -- вместе с ним ушло знание о половине инфраструктуры. Восстановление после аварии заняло 3 дня. После внедрения Terraform -- полный DR за 45 минут.

---

## Что нужно изучить (ключевые навыки)

### 1. Terraform / OpenTofu -- основной инструмент

Terraform от HashiCorp и OpenTofu (CNCF open-source форк) -- де-факто стандарты IaC. **HCL-синтаксис, экосистема провайдеров и формат state идентичны** между ними до Terraform ~1.5. Всё, что вы учите в одном, напрямую применяется к другому.

#### Terraform vs OpenTofu -- что выбрать

| | Terraform | OpenTofu |
|--|-----------|----------|
| Лицензия | BSL (ограничивает конкурирующие продукты) | MPL 2.0 (полностью open source) |
| Управление | HashiCorp / IBM | Сообщество CNCF |
| Совместимость HCL | Каноническая | API-совместим до ~1.5 |
| Реестр провайдеров | registry.terraform.io | Оба реестра работают |
| Формат state | Одинаковый | Одинаковый |
| Enterprise-функции | Terraform Cloud/Enterprise | Альтернативы сообщества |

**Фреймворк принятия решения:**
- **Новый проект, без ограничений лицензии:** любой подходит -- выбирайте по предпочтениям команды
- **Существующая кодовая база Terraform:** оцените последствия BSL для вашего случая; миграция на OpenTofu проста
- **Требование open source или конкурирующий продукт:** OpenTofu
- **Коммерческая поддержка + enterprise UI:** Terraform Cloud/Enterprise

В вакансиях вы увидите оба. На собеседованиях продемонстрируйте, что понимаете различие и можете работать с обоими.

```
Terraform / OpenTofu навыки (в порядке приоритета):
├── Основы HCL
│   ├── Resources, Data Sources
│   ├── Variables, Outputs
│   ├── Locals
│   └── Providers
├── Состояние (State)
│   ├── Что такое state и зачем он
│   ├── Remote state (S3 + DynamoDB, Terraform Cloud)
│   ├── State locking
│   ├── terraform import
│   └── terraform state mv / rm
├── Модули
│   ├── Создание собственных модулей
│   ├── Модули из Terraform Registry
│   ├── Версионирование модулей
│   └── Композиция модулей
├── Планирование и деплой
│   ├── terraform plan (ВСЕГДА перед apply)
│   ├── terraform apply
│   ├── terraform destroy
│   └── Targeted apply (-target)
├── Рабочие пространства (Workspaces)
│   └── Или directories per environment (рекомендовано)
└── Тестирование
    ├── terraform validate
    ├── terraform fmt
    ├── tflint
    ├── Checkov / tfsec
    └── Terratest (интеграционные тесты)
```

**Минимальный пример Terraform:**

```hcl
# providers.tf
terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.region
}

# variables.tf
variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
}

# main.tf
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "${var.environment}-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["${var.region}a", "${var.region}b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = var.environment != "production"

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# outputs.tf
output "vpc_id" {
  value = module.vpc.vpc_id
}
```

### 2. Управление состоянием (State Management)

```
Критические правила работы со стейтом:
├── НИКОГДА не хранить state локально в production
├── ВСЕГДА использовать remote backend с locking
├── НИКОГДА не редактировать state вручную (без крайней необходимости)
├── ВСЕГДА шифровать state (содержит секреты!)
├── Разделять state по окружениям и компонентам
└── Backup state (версионирование S3-бакета)
```

### 3. GitOps с ArgoCD или Flux

```
GitOps-принципы:
├── Git как единый источник правды
├── Декларативное описание желаемого состояния
├── Автоматическая синхронизация (reconciliation)
└── Pull-модель (кластер тянет изменения из Git)

ArgoCD-навыки:
├── Установка и конфигурация
├── Application и ApplicationSet
├── Sync policies (auto/manual)
├── Rollback
├── Multi-cluster management
└── Secrets management (Sealed Secrets, External Secrets)
```

### 4. Тестирование IaC

```
Уровни тестирования:
├── Статический анализ
│   ├── terraform validate — синтаксис
│   ├── terraform fmt — форматирование
│   ├── tflint — линтинг
│   └── Checkov / tfsec — security
├── Unit-тесты
│   ├── Terratest (Go)
│   └── pytest + terraform (Python)
├── Integration-тесты
│   ├── Развёртывание в тестовом окружении
│   ├── Проверка результатов
│   └── Уничтожение
└── Policy-as-Code
    ├── OPA / Rego
    ├── Sentinel (Terraform Enterprise)
    └── Checkov custom policies
```

---

## Что можно пропустить / «худший ROI» для начала

### НЕ учите первым:

1. **Pulumi** -- IaC на языках программирования (Python, TypeScript, Go). Хороший инструмент, но нишевый. Terraform имеет намного большую экосистему и больше вакансий. Изучайте Pulumi, только если ваша компания его использует.

2. **AWS CDK** -- Похожая ситуация. CDK привязывает к AWS. Terraform -- мульти-облачный. Начните с Terraform.

3. **Crossplane с первого дня** -- Kubernetes-native IaC. Мощная концепция, но требует глубокого знания K8s. Сначала Terraform, потом Crossplane.

4. **Ansible для cloud provisioning** -- Ansible -- для конфигурации серверов (configuration management). Для создания облачных ресурсов -- Terraform. Разные инструменты для разных задач.

5. **Terraform Enterprise / Terraform Cloud с первого дня** -- Начните с CLI + remote state на S3. Enterprise -- для больших команд.

### Худший ROI:

| Действие | Почему плохой ROI | Что делать вместо |
|----------|-------------------|-------------------|
| Учить 3 IaC-инструмента одновременно | Ни один не изучите глубоко | Terraform первым, глубоко |
| Писать всё с нуля, игнорируя модули | Изобретать велосипед | terraform-aws-modules + собственные обёртки |
| Один гигантский state file | Медленный plan, риск конфликтов | Разделить по компонентам |
| Terraform workspaces для environments | Сложно масштабируется | Directory per environment |

---

## Насколько глубоко погружаться

### Новичок (2-4 недели)

- [ ] Установить Terraform, понять init/plan/apply/destroy цикл
- [ ] Создать ресурсы в AWS: VPC, EC2, S3, Security Group
- [ ] Использовать переменные, выводы, локальные значения
- [ ] Настроить remote state (S3 + DynamoDB)
- [ ] Понять разницу между `resource` и `data`
- [ ] Использовать `terraform import` для существующих ресурсов
- [ ] Понять lifecycle: `create_before_destroy`, `prevent_destroy`

**Тест:** Можете развернуть VPC + EC2 + RDS через Terraform и уничтожить всё одной командой? Если да -- идите дальше.

### Уверенный (6-10 недель)

- [ ] Создавать и использовать собственные модули
- [ ] Разделять инфраструктуру на компоненты (networking, compute, database)
- [ ] Использовать `for_each`, `count`, `dynamic` blocks
- [ ] Настроить CI/CD для Terraform (GitHub Actions: plan на PR, apply на merge)
- [ ] Использовать tflint, Checkov для линтинга и security
- [ ] Развернуть EKS-кластер через Terraform
- [ ] Понять и использовать `terraform state mv`, `terraform state rm`
- [ ] Внедрить тегирование ресурсов как стандарт

**Тест:** Можете построить полную инфраструктуру (VPC + EKS + RDS + monitoring) с модулями, remote state и CI/CD? Если да -- вы уверенный.

### Эксперт (3-6 месяцев)

- [ ] Проектировать Terraform-архитектуру для организации (модули, remote state, workspaces)
- [ ] Писать интеграционные тесты с Terratest
- [ ] Внедрить GitOps с ArgoCD для K8s-ресурсов
- [ ] Policy-as-Code с OPA или Sentinel
- [ ] Multi-account / multi-region стратегия
- [ ] Миграция существующей инфраструктуры в Terraform (terraform import at scale)
- [ ] Drift detection и remediation
- [ ] Custom Terraform providers (Go)

**Тест:** Можете спроектировать IaC-стратегию для организации с 10+ команд и 3+ окружений? Если да -- вы эксперт.

---

## Как ИИ меняет этот фактор (практические примеры)

### 1. Генерация Terraform-модулей

```
Промпт:
"Создай Terraform-модуль для EKS-кластера с параметрами:
- Версия K8s: 1.29
- 2 node groups: general (t3.medium, 2-5 нод) и spot (t3.large, 0-10 нод)
- OIDC provider для IRSA
- Addons: CoreDNS, kube-proxy, vpc-cni, ebs-csi-driver
- Encryption: envelope encryption для secrets
- Logging: api, audit, authenticator
- Variables для: cluster_name, vpc_id, subnet_ids, environment
- Tags на всех ресурсах
Используй best practices: remote state, least privilege IAM."
```

### 2. Ревью HCL-кода

```
Промпт:
"Сделай code review этого Terraform-кода:
[вставить код]
Проверь:
- Security: чрезмерные привилегии, открытые порты, незашифрованные ресурсы
- Best practices: naming conventions, тегирование, модульность
- Performance: размер state, зависимости
- Reliability: multi-AZ, backup, lifecycle policies
Предложи конкретные исправления."
```

### 3. Конвертация ручной инфраструктуры в код

```
Промпт:
"Вот JSON-вывод из aws ec2 describe-instances и aws rds describe-db-instances:
[вставить JSON]
Создай Terraform-код, который описывает эту существующую инфраструктуру.
Включи import blocks для Terraform 1.5+."
```

### 4. Troubleshooting

```
Промпт:
"Terraform plan показывает:
'Error: Error creating EKS Cluster: ResourceInUseException: Cluster already exists with name: my-cluster'
Но этот кластер не в моём state.
Что произошло и как решить? Вот мой конфиг:
[вставить код]"
```

### 5. Ежедневный workflow

| Задача | Без ИИ | С ИИ |
|--------|--------|------|
| Написать Terraform-модуль для нового сервиса | 2-4 часа | 20-30 минут + ревью |
| Настроить CI/CD для Terraform | 1-2 часа | 15-20 минут |
| Дебаг state-проблем | 1-3 часа | 15-30 минут |
| Написать Checkov custom policy | 30-60 минут | 10 минут |
| Мигрировать ресурсы между state files | 1-2 часа | 20-30 минут |

**Важно:** ИИ генерирует ~80% правильного Terraform-кода. Ваша задача -- проверить последние 20%, потому что именно там критические ошибки: неправильные IAM-политики, отсутствие шифрования, публичные ресурсы.

---

## Типичные ошибки и ловушки

### Ловушка 1: Неправильное управление стейтом

**Что это:** Локальный state, отсутствие locking, один state file для всей инфраструктуры.

**Почему вредит:**
- Локальный state: потеряли ноутбук = потеряли инфраструктуру
- Без locking: два инженера делают `apply` одновременно = разрушенная инфраструктура
- Один state file: `terraform plan` занимает 15 минут, одна ошибка ломает всё

**Исправление:**
```hcl
# Remote state с locking — с ПЕРВОГО ДНЯ
backend "s3" {
  bucket         = "company-terraform-state"
  key            = "production/networking/terraform.tfstate"
  region         = "us-east-1"
  dynamodb_table = "terraform-lock"
  encrypt        = true
}
```

Разделяйте state:
```
infrastructure/
├── networking/      <- отдельный state
├── eks-cluster/     <- отдельный state
├── databases/       <- отдельный state
├── monitoring/      <- отдельный state
└── applications/    <- отдельный state
```

### Ловушка 2: Монолитные конфигурации

**Что это:** Один `main.tf` на 2000 строк со всем: VPC, EKS, RDS, S3, IAM, CloudWatch.

**Почему вредит:** Невозможно ревьюить. Невозможно тестировать отдельно. Изменение в сети может сломать базу данных.

**Исправление:** Модули + разделение по компонентам:
```
modules/
├── networking/    <- VPC, subnets, NAT
├── eks/           <- EKS cluster, node groups
├── rds/           <- Database instances
└── monitoring/    <- CloudWatch, alerts

environments/
├── production/
│   ├── main.tf    <- использует модули
│   └── terraform.tfvars
└── staging/
    ├── main.tf    <- те же модули, другие переменные
    └── terraform.tfvars
```

### Ловушка 3: Отсутствие тестов

**Что это:** `terraform apply` без проверок = молитва.

**Почему вредит:** Terraform не проверяет бизнес-логику. Правильные ли CIDR? Достаточно ли прав IAM? Шифруется ли база данных?

**Исправление:**
```bash
# Минимальный набор проверок в CI:
terraform fmt -check
terraform validate
tflint
checkov -d .
terraform plan -out=plan.tfplan
# Ревью plan вручную или автоматически
```

### Ловушка 4: Игнорирование terraform plan

**Что это:** `terraform apply -auto-approve` без просмотра plan.

**Почему вредит:** Terraform может удалить ресурсы, которые вы не ожидали. `destroy and recreate` для базы данных = потеря данных.

**Исправление:**
- ВСЕГДА просматривать `terraform plan` перед apply
- В CI/CD: plan на PR (как комментарий), apply на merge
- Использовать `prevent_destroy` для критических ресурсов

### Ловушка 5: Не использовать модули

**Что это:** Copy-paste одинакового кода для каждого окружения.

**Почему вредит:** Изменение в одном месте не пропагируется в другие. 5 окружений = 5 копий, которые постепенно расходятся.

**Исправление:** Модули с версионированием:
```hcl
module "vpc" {
  source  = "git::https://github.com/company/terraform-modules.git//vpc?ref=v1.2.0"
  # ...
}
```

---

## Мини-практика (5 упражнений)

### Упражнение 1: Полная VPC + EKS на Terraform (уверенный)

**Цель:** Построить production-ready инфраструктуру.

```
Шаги:
1. Создать S3 + DynamoDB для remote state (можно через CloudFormation bootstrap)
2. Модуль VPC: 2 public + 2 private подсети, NAT, IGW
3. Модуль EKS: кластер + managed node group + IRSA
4. Модуль RDS: PostgreSQL Multi-AZ в private подсетях
5. Security Groups: минимальные привилегии
6. Outputs: cluster endpoint, RDS endpoint, VPC ID
7. Variables: environment, region, instance types
8. terraform.tfvars для staging и production

Критерий успеха: terraform apply с нуля поднимает полную инфраструктуру за 15-20 минут
```

### Упражнение 2: Remote State и State Management (новичок -> уверенный)

**Цель:** Научиться правильно работать со стейтом.

```
Шаги:
1. Настроить S3 backend с versioning и encryption
2. Настроить DynamoDB для state locking
3. Разделить существующий state на 2 части (terraform state mv)
4. Использовать terraform import для существующего ресурса
5. Настроить data source для чтения remote state другого компонента
6. Симулировать state lock conflict и решить его

Критерий успеха: можете безопасно работать со стейтом в команде из 3+ инженеров
```

### Упражнение 3: CI/CD для Terraform (уверенный)

**Цель:** Автоматизировать lifecycle Terraform.

```
Шаги (GitHub Actions):
1. PR opened/updated:
   - terraform fmt -check
   - terraform validate
   - tflint
   - checkov
   - terraform plan -> комментарий в PR
2. PR merged to main:
   - terraform apply -auto-approve
3. Добавить manual approval для production
4. Настроить Terraform state lock timeout
5. Добавить Slack notification при успехе/ошибке

Критерий успеха: изменения в инфраструктуре проходят через PR -> review -> auto-apply
```

### Упражнение 4: Тестирование модулей с Terratest (уверенный -> эксперт)

**Цель:** Научиться тестировать IaC.

```
Шаги:
1. Создать простой Terraform-модуль (например, S3 bucket с encryption)
2. Написать Terratest тест на Go:
   - Deploy модуль в тестовый аккаунт
   - Проверить: bucket существует, encryption включён, versioning включён
   - Уничтожить ресурсы
3. Интегрировать тесты в CI (запуск на PR)
4. Добавить тесты для VPC-модуля: проверить количество подсетей, CIDR

Критерий успеха: каждый модуль имеет автоматические тесты
```

### Упражнение 5: GitOps с ArgoCD (уверенный -> эксперт)

**Цель:** Внедрить GitOps для K8s-деплоев.

```
Шаги:
1. Установить ArgoCD в K8s-кластер (через Helm)
2. Создать Git-репозиторий с K8s-манифестами
3. Создать ArgoCD Application для staging (auto-sync)
4. Создать ArgoCD Application для production (manual sync)
5. Настроить ApplicationSet для автоматического создания apps
6. Протестировать workflow:
   - Изменение в Git -> auto-deploy в staging
   - Manual approve -> deploy в production
7. Протестировать rollback через ArgoCD UI и CLI

Критерий успеха: все изменения в K8s проходят через Git, никаких ручных kubectl apply
```

---

## «Сигналы» готовности к работе (чек-лист)

### Обязательное:

- [ ] Написать Terraform-конфигурацию для VPC + compute + database
- [ ] Настроить remote state с locking
- [ ] Создать и использовать собственный Terraform-модуль
- [ ] Понять terraform plan output и объяснить каждое изменение
- [ ] Использовать переменные, outputs, locals правильно
- [ ] Разделять инфраструктуру на компоненты (а не один большой файл)
- [ ] Использовать `for_each` и `count` для динамических ресурсов
- [ ] Настроить CI/CD для Terraform (plan на PR, apply на merge)
- [ ] Знать команды: init, plan, apply, destroy, import, state

### Желательное:

- [ ] Использовать Terratest для тестирования модулей
- [ ] Настроить tflint и Checkov в CI
- [ ] Внедрить GitOps с ArgoCD или Flux
- [ ] Объяснить смену лицензии HashiCorp BSL и почему был создан форк OpenTofu
- [ ] Знать, когда выбирать Terraform vs OpenTofu для нового проекта
- [ ] Понимать, что HCL-синтаксис и формат state совместимы между ними
- [ ] Использовать terraform workspaces или directory structure для environments
- [ ] Знать, как работать с terraform import at scale

### На собеседовании сможете:

- [ ] Объяснить, зачем нужен remote state и state locking
- [ ] Описать структуру Terraform-проекта для организации
- [ ] Объяснить разницу между `terraform plan` и `terraform apply`
- [ ] Описать, как вы обрабатываете drift detection
- [ ] Объяснить преимущества модулей и как их версионировать
- [ ] Описать CI/CD pipeline для Terraform

---

## Ссылки внутри репозитория

- Предыдущий фактор: [DevSecOps](../03-devsecops/)
- Следующий фактор: [ИИ и MLOps](../05-ai-and-mlops/)
- Облачная инфраструктура: [Облачное внедрение](../01-cloud-adoption/)
- IaC для K8s: [Контейнеры и Kubernetes](../02-containers-and-kubernetes/)
- Безопасность IaC: [DevSecOps](../03-devsecops/)
- Мониторинг инфраструктуры: [Наблюдаемость и SRE](../06-observability-and-sre/)
- Общая дорожная карта: [Roadmap](../90-roadmap/)
- Ошибки, которых стоит избегать: [Типичные ошибки](../91-mistakes/)
- Вернуться на [главную страницу](../)

**Примените этот фактор:** [Проект А — Full-Stack DevOps Platform](../90-roadmap/#канонические-проекты-портфолио) · [Проект B — IaC-библиотека](../90-roadmap/#канонические-проекты-портфолио)
