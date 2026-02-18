# Фактор 4: Інфраструктура як код (IaC)

![Infrastructure as Code](../../en/04-infrastructure-as-code/04-iac.png)

> **Швидкий старт**
> - **7 днів:** Встановіть Terraform → розгорніть VPC + EC2 → налаштуйте remote state (S3 + DynamoDB). Запустіть `terraform destroy` після закінчення.
> - **30 днів:** Завершіть чек-лист початківця → напишіть власний модуль → налаштуйте CI/CD для Terraform (plan на PR, apply на merge).

---

## Чому це важливо у 2026

Якщо ваша інфраструктура не описана в коді — її не існує. У 2026 році ручне налаштування серверів — це технічний борг, який коштує компаніям мільйони.

Більшість зрілих DevOps-команд використовують IaC. Роками Terraform був беззаперечним стандартом. У серпні 2023 року HashiCorp змінив ліцензію Terraform з open-source (MPL 2.0) на Business Source License (BSL), яка обмежує комерційне використання в конкуруючих продуктах. Спільнота CNCF відповіла форком останньої open-source версії — **OpenTofu**, який є проєктом CNCF sandbox.

Це реальне рішення, яке інженерні команди приймають прямо зараз: залишитись на Terraform (BSL), мігрувати на OpenTofu (open source) або оцінити альтернативи. Вам потрібно розуміти обидва варіанти.

Інфраструктура як код — це підхід, де вся інфраструктура описується у конфігураційних файлах, зберігається в Git і розгортається автоматично. Це означає:

- **Відтворюваність** — будь-який інженер може підняти ідентичне середовище за хвилини
- **Версіонування** — git log показує, хто, коли і що змінив в інфраструктурі
- **Ревью** — зміни в інфраструктурі проходять PR-ревью, як і код
- **Автоматизація** — CI/CD для інфраструктури, а не ручний `terraform apply`
- **Тестування** — інфраструктуру можна тестувати до деплою

У 2026 році IaC — це **обов'язкова навичка** для DevOps-інженера. Не «бажана» — обов'язкова. Без неї ви не пройдете жодну серйозну співбесіду.

---

## Яку проблему це вирішує в реальних командах

«Хто створив цей security group? Коли? Навіщо?» — якщо відповіді немає в Git, її немає ніде.

| Проблема | Без IaC | З IaC |
|----------|---------|-------|
| «Snowflake servers» | Кожен сервер унікальний, ніхто не знає конфігурацію | Ідентичні середовища з одного шаблону |
| Configuration drift | Staging відрізняється від production | Один код = однакова інфраструктура |
| Disaster recovery | «Відновити з нуля? Це займе тижні» | `terraform apply` — і все піднято |
| Аудит змін | «Хто відкрив порт 22 для 0.0.0.0/0?» | `git blame` покаже автора та причину |
| Масштабування | Копіювати ручні кроки для нового регіону | Змінити змінну `region` та apply |
| Onboarding | Новий інженер тижнями розбирається | Код = документація інфраструктури |

**Реальний приклад:** Компанія з 200+ серверів, все налаштовано вручну. Один інженер звільнився — разом з ним пішло знання про половину інфраструктури. Відновлення після аварії зайняло 3 дні. Після впровадження Terraform — повний DR за 45 хвилин.

---

## Що потрібно вивчити (ключові навички)

### 1. Terraform / OpenTofu — основний інструмент

Terraform від HashiCorp та OpenTofu (CNCF open-source форк) — де-факто стандарти IaC. **HCL-синтаксис, екосистема провайдерів та формат стейту ідентичні** між ними до Terraform ~1.5. Все, що ви вчите в одному, безпосередньо застосовується до іншого.

#### Terraform vs OpenTofu — що обрати

| | Terraform | OpenTofu |
|--|-----------|----------|
| Ліцензія | BSL (обмежує конкуруючі продукти) | MPL 2.0 (повністю open source) |
| Управління | HashiCorp / IBM | Спільнота CNCF |
| Сумісність HCL | Канонічна | API-сумісний до ~1.5 |
| Реєстр провайдерів | registry.terraform.io | Обидва реєстри працюють |
| Формат стейту | Однаковий | Однаковий |
| Enterprise-функції | Terraform Cloud/Enterprise | Альтернативи спільноти |

**Фреймворк прийняття рішення:**
- **Новий проєкт, без обмежень ліцензії:** будь-який підходить — обирайте за перевагами команди
- **Існуюча кодова база Terraform:** оцініть наслідки BSL для вашого випадку; міграція на OpenTofu є простою
- **Вимога open source або конкуруючий продукт:** OpenTofu
- **Комерційна підтримка + enterprise UI:** Terraform Cloud/Enterprise

У вакансіях ви побачите обидва. На співбесідах продемонструйте, що розумієте розрив і можете працювати з обома.

```
Terraform / OpenTofu навички (в порядку пріоритету):
├── Основи HCL
│   ├── Resources, Data Sources
│   ├── Variables, Outputs
│   ├── Locals
│   └── Providers
├── Стан (State)
│   ├── Що таке state і навіщо він
│   ├── Remote state (S3 + DynamoDB, Terraform Cloud)
│   ├── State locking
│   ├── terraform import
│   └── terraform state mv / rm
├── Модулі
│   ├── Створення власних модулів
│   ├── Модулі з Terraform Registry
│   ├── Версіонування модулів
│   └── Композиція модулів
├── Планування та деплой
│   ├── terraform plan (ЗАВЖДИ перед apply)
│   ├── terraform apply
│   ├── terraform destroy
│   └── Targeted apply (-target)
├── Робочі простори (Workspaces)
│   └── Або directories per environment (рекомендовано)
└── Тестування
    ├── terraform validate
    ├── terraform fmt
    ├── tflint
    ├── Checkov / tfsec
    └── Terratest (інтеграційні тести)
```

**Мінімальний приклад Terraform:**

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

### 2. Керування станом (State Management)

```
Критичні правила роботи зі стейтом:
├── НІКОЛИ не зберігати state локально в production
├── ЗАВЖДИ використовувати remote backend з locking
├── НІКОЛИ не редагувати state вручну (без крайньої необхідності)
├── ЗАВЖДИ шифрувати state (містить секрети!)
├── Розділяти state по середовищах та компонентах
└── Backup state (версіонування S3-бакету)
```

### 3. GitOps з ArgoCD або Flux

```
GitOps-принципи:
├── Git як єдине джерело правди
├── Декларативний опис бажаного стану
├── Автоматична синхронізація (reconciliation)
└── Pull-модель (кластер тягне зміни з Git)

ArgoCD-навички:
├── Встановлення та конфігурація
├── Application та ApplicationSet
├── Sync policies (auto/manual)
├── Rollback
├── Multi-cluster management
└── Secrets management (Sealed Secrets, External Secrets)
```

### 4. Тестування IaC

```
Рівні тестування:
├── Статичний аналіз
│   ├── terraform validate — синтаксис
│   ├── terraform fmt — форматування
│   ├── tflint — лінтинг
│   └── Checkov / tfsec — security
├── Unit-тести
│   ├── Terratest (Go)
│   └── pytest + terraform (Python)
├── Integration-тести
│   ├── Розгортання в тестовому середовищі
│   ├── Перевірка результатів
│   └── Знищення
└── Policy-as-Code
    ├── OPA / Rego
    ├── Sentinel (Terraform Enterprise)
    └── Checkov custom policies
```

---

## Що можна пропустити / «найгірший ROI» для початку

### НЕ вчіть першим:

1. **Pulumi** — IaC на мовах програмування (Python, TypeScript, Go). Хороший інструмент, але нішевий. Terraform має набагато більшу екосистему та більше вакансій. Вивчайте Pulumi, тільки якщо ваша компанія його використовує.

2. **AWS CDK** — Схожа ситуація. CDK прив'язує до AWS. Terraform — мульти-хмарний. Почніть з Terraform.

3. **Crossplane з першого дня** — Kubernetes-native IaC. Потужна концепція, але вимагає глибокого знання K8s. Спочатку Terraform, потім Crossplane.

4. **Ansible для cloud provisioning** — Ansible — для конфігурації серверів (configuration management). Для створення хмарних ресурсів — Terraform. Різні інструменти для різних задач.

5. **Terraform Enterprise / Terraform Cloud з першого дня** — Почніть з CLI + remote state на S3. Enterprise — для великих команд.

### Найгірший ROI:

| Дія | Чому поганий ROI | Що робити замість |
|-----|-------------------|-------------------|
| Вчити 3 IaC-інструменти одночасно | Жоден не вивчите глибоко | Terraform першим, глибоко |
| Писати все з нуля, ігноруючи модулі | Винаходити велосипед | terraform-aws-modules + власні обгортки |
| Один гігантський state file | Повільний plan, ризик conflict | Розділити по компонентах |
| Terraform workspaces для environments | Складно масштабується | Directory per environment |

---

## Наскільки глибоко занурюватися

### Початківець (2-4 тижні)

- [ ] Встановити Terraform, зрозуміти init/plan/apply/destroy цикл
- [ ] Створити ресурси в AWS: VPC, EC2, S3, Security Group
- [ ] Використовувати змінні, виводи, локальні значення
- [ ] Налаштувати remote state (S3 + DynamoDB)
- [ ] Зрозуміти різницю між `resource` та `data`
- [ ] Використовувати `terraform import` для існуючих ресурсів
- [ ] Зрозуміти lifecycle: `create_before_destroy`, `prevent_destroy`

**Тест:** Можете розгорнути VPC + EC2 + RDS через Terraform та знищити все однією командою? Якщо так — йдіть далі.

### Впевнений (6-10 тижнів)

- [ ] Створювати та використовувати власні модулі
- [ ] Розділяти інфраструктуру на компоненти (networking, compute, database)
- [ ] Використовувати `for_each`, `count`, `dynamic` blocks
- [ ] Налаштувати CI/CD для Terraform (GitHub Actions: plan на PR, apply на merge)
- [ ] Використовувати tflint, Checkov для лінтингу та security
- [ ] Розгорнути EKS-кластер через Terraform
- [ ] Зрозуміти та використовувати `terraform state mv`, `terraform state rm`
- [ ] Впровадити тегування ресурсів як стандарт

**Тест:** Можете побудувати повну інфраструктуру (VPC + EKS + RDS + monitoring) з модулями, remote state та CI/CD? Якщо так — ви впевнений.

### Експерт (3-6 місяців)

- [ ] Проєктувати Terraform-архітектуру для організації (модулі, remote state, workspaces)
- [ ] Писати інтеграційні тести з Terratest
- [ ] Впровадити GitOps з ArgoCD для K8s-ресурсів
- [ ] Policy-as-Code з OPA або Sentinel
- [ ] Multi-account / multi-region стратегія
- [ ] Міграція існуючої інфраструктури в Terraform (terraform import at scale)
- [ ] Drift detection та remediation
- [ ] Custom Terraform providers (Go)

**Тест:** Можете спроєктувати IaC-стратегію для організації з 10+ команд та 3+ середовищ? Якщо так — ви експерт.

---

## Як ШІ змінює цей фактор (практичні приклади)

### 1. Генерація Terraform-модулів

```
Промпт:
"Створи Terraform-модуль для EKS-кластера з наступними параметрами:
- Версія K8s: 1.29
- 2 node groups: general (t3.medium, 2-5 нод) та spot (t3.large, 0-10 нод)
- OIDC provider для IRSA
- Addons: CoreDNS, kube-proxy, vpc-cni, ebs-csi-driver
- Encryption: envelope encryption для secrets
- Logging: api, audit, authenticator
- Variables для: cluster_name, vpc_id, subnet_ids, environment
- Tags на всіх ресурсах
Використовуй best practices: remote state, least privilege IAM."
```

### 2. Ревью HCL-коду

```
Промпт:
"Зроби code review цього Terraform-коду:
[вставити код]
Перевір:
- Security: надмірні привілеї, відкриті порти, незашифровані ресурси
- Best practices: naming conventions, тегування, модульність
- Performance: розмір state, залежності
- Reliability: multi-AZ, backup, lifecycle policies
Запропонуй конкретні виправлення."
```

### 3. Конвертація ручної інфраструктури в код

```
Промпт:
"Ось JSON-вивід з aws ec2 describe-instances та aws rds describe-db-instances:
[вставити JSON]
Створи Terraform-код, який описує цю існуючу інфраструктуру.
Включи import blocks для Terraform 1.5+."
```

### 4. Troubleshooting

```
Промпт:
"Terraform plan показує:
'Error: Error creating EKS Cluster: ResourceInUseException: Cluster already exists with name: my-cluster'
Але цей кластер не в моєму state.
Що сталося і як вирішити? Ось мій конфіг:
[вставити код]"
```

### 5. Щоденний workflow

| Задача | Без ШІ | З ШІ |
|--------|--------|------|
| Написати Terraform-модуль для нового сервісу | 2-4 години | 20-30 хвилин + ревью |
| Налаштувати CI/CD для Terraform | 1-2 години | 15-20 хвилин |
| Дебаг state-проблем | 1-3 години | 15-30 хвилин |
| Написати Checkov custom policy | 30-60 хвилин | 10 хвилин |
| Мігрувати ресурси між state files | 1-2 години | 20-30 хвилин |

**Важливо:** ШІ генерує ~80% правильного Terraform-коду. Ваша задача — перевірити останні 20%, бо саме там критичні помилки: неправильні IAM-політики, відсутнє шифрування, публічні ресурси.

---

## Типові помилки та пастки

### Пастка 1: Неправильне керування стейтом

**Що це:** Локальний state, відсутній locking, один state file для всієї інфраструктури.

**Чому шкодить:**
- Локальний state: втратили ноутбук = втратили інфраструктуру
- Без locking: два інженери роблять `apply` одночасно = зруйнована інфраструктура
- Один state file: `terraform plan` займає 15 хвилин, одна помилка ламає все

**Виправлення:**
```hcl
# Remote state з locking — з ПЕРШОГО ДНЯ
backend "s3" {
  bucket         = "company-terraform-state"
  key            = "production/networking/terraform.tfstate"
  region         = "us-east-1"
  dynamodb_table = "terraform-lock"
  encrypt        = true
}
```

Розділяйте state:
```
infrastructure/
├── networking/      ← окремий state
├── eks-cluster/     ← окремий state
├── databases/       ← окремий state
├── monitoring/      ← окремий state
└── applications/    ← окремий state
```

### Пастка 2: Монолітні конфігурації

**Що це:** Один `main.tf` на 2000 рядків з усім: VPC, EKS, RDS, S3, IAM, CloudWatch.

**Чому шкодить:** Неможливо ревьюїти. Неможливо тестувати окремо. Зміна в мережі може зламати базу даних.

**Виправлення:** Модулі + розділення по компонентах:
```
modules/
├── networking/    ← VPC, subnets, NAT
├── eks/           ← EKS cluster, node groups
├── rds/           ← Database instances
└── monitoring/    ← CloudWatch, alerts

environments/
├── production/
│   ├── main.tf    ← використовує модулі
│   └── terraform.tfvars
└── staging/
    ├── main.tf    ← ті ж модулі, інші змінні
    └── terraform.tfvars
```

### Пастка 3: Відсутність тестів

**Що це:** `terraform apply` без перевірок = молитва.

**Чому шкодить:** Terraform не перевіряє бізнес-логіку. Чи правильні CIDR? Чи достатньо прав IAM? Чи шифрується база даних?

**Виправлення:**
```bash
# Мінімальний набір перевірок у CI:
terraform fmt -check
terraform validate
tflint
checkov -d .
terraform plan -out=plan.tfplan
# Ревью plan вручну або автоматично
```

### Пастка 4: Ігнорування terraform plan

**Що це:** `terraform apply -auto-approve` без перегляду plan.

**Чому шкодить:** Terraform може видалити ресурси, які ви не очікували. `destroy and recreate` для бази даних = втрата даних.

**Виправлення:**
- ЗАВЖДИ переглядати `terraform plan` перед apply
- У CI/CD: plan на PR (як коментар), apply на merge
- Використовувати `prevent_destroy` для критичних ресурсів

### Пастка 5: Не використовувати модулі

**Що це:** Copy-paste однакового коду для кожного середовища.

**Чому шкодить:** Зміна в одному місці не пропагується в інші. 5 середовищ = 5 копій, які поступово розходяться.

**Виправлення:** Модулі з версіонуванням:
```hcl
module "vpc" {
  source  = "git::https://github.com/company/terraform-modules.git//vpc?ref=v1.2.0"
  # ...
}
```

---

## Міні-практика (5 вправ)

### Вправа 1: Повна VPC + EKS на Terraform (впевнений)

**Мета:** Побудувати production-ready інфраструктуру.

```
Кроки:
1. Створити S3 + DynamoDB для remote state (можна через CloudFormation bootstrap)
2. Модуль VPC: 2 public + 2 private підмережі, NAT, IGW
3. Модуль EKS: кластер + managed node group + IRSA
4. Модуль RDS: PostgreSQL Multi-AZ у private підмережах
5. Security Groups: мінімальні привілеї
6. Outputs: cluster endpoint, RDS endpoint, VPC ID
7. Variables: environment, region, instance types
8. terraform.tfvars для staging та production

Критерій успіху: terraform apply з нуля піднімає повну інфраструктуру за 15-20 хвилин
```

### Вправа 2: Remote State та State Management (початківець → впевнений)

**Мета:** Навчитися правильно працювати зі стейтом.

```
Кроки:
1. Налаштувати S3 backend з versioning та encryption
2. Налаштувати DynamoDB для state locking
3. Розділити існуючий state на 2 частини (terraform state mv)
4. Використати terraform import для існуючого ресурсу
5. Налаштувати data source для читання remote state іншого компонента
6. Симулювати state lock conflict та вирішити його

Критерій успіху: можете безпечно працювати зі стейтом у команді з 3+ інженерів
```

### Вправа 3: CI/CD для Terraform (впевнений)

**Мета:** Автоматизувати lifecycle Terraform.

```
Кроки (GitHub Actions):
1. PR opened/updated:
   - terraform fmt -check
   - terraform validate
   - tflint
   - checkov
   - terraform plan → коментар у PR
2. PR merged to main:
   - terraform apply -auto-approve
3. Додати manual approval для production
4. Налаштувати Terraform state lock timeout
5. Додати Slack notification при успіху/помилці

Критерій успіху: зміни в інфраструктурі проходять через PR → review → auto-apply
```

### Вправа 4: Тестування модулів з Terratest (впевнений → експерт)

**Мета:** Навчитися тестувати IaC.

```
Кроки:
1. Створити простий Terraform-модуль (наприклад, S3 bucket з encryption)
2. Написати Terratest тест на Go:
   - Deploy модуль у тестовий акаунт
   - Перевірити: bucket існує, encryption увімкнено, versioning увімкнено
   - Знищити ресурси
3. Інтегрувати тести в CI (запуск на PR)
4. Додати тести для VPC-модуля: перевірити кількість підмереж, CIDR

Критерій успіху: кожен модуль має автоматичні тести
```

### Вправа 5: GitOps з ArgoCD (впевнений → експерт)

**Мета:** Впровадити GitOps для K8s-деплоїв.

```
Кроки:
1. Встановити ArgoCD в K8s-кластер (через Helm)
2. Створити Git-репозиторій з K8s-маніфестами
3. Створити ArgoCD Application для staging (auto-sync)
4. Створити ArgoCD Application для production (manual sync)
5. Налаштувати ApplicationSet для автоматичного створення apps
6. Протестувати workflow:
   - Зміна в Git → auto-deploy в staging
   - Manual approve → deploy в production
7. Протестувати rollback через ArgoCD UI та CLI

Критерій успіху: всі зміни в K8s проходять через Git, ніяких ручних kubectl apply
```

---

## «Сигнали» готовності до роботи (чек-лист)

### Обов'язкове:

- [ ] Написати Terraform-конфігурацію для VPC + compute + database
- [ ] Налаштувати remote state з locking
- [ ] Створити та використати власний Terraform-модуль
- [ ] Зрозуміти terraform plan output та пояснити кожну зміну
- [ ] Використовувати змінні, outputs, locals правильно
- [ ] Розділяти інфраструктуру на компоненти (а не один великий файл)
- [ ] Використовувати `for_each` та `count` для динамічних ресурсів
- [ ] Налаштувати CI/CD для Terraform (plan на PR, apply на merge)
- [ ] Знати команди: init, plan, apply, destroy, import, state

### Бажане:

- [ ] Використовувати Terratest для тестування модулів
- [ ] Налаштувати tflint та Checkov у CI
- [ ] Впровадити GitOps з ArgoCD або Flux
- [ ] Пояснити зміну ліцензії HashiCorp BSL та чому був зроблений форк OpenTofu
- [ ] Знати, коли обирати Terraform vs OpenTofu для нового проєкту
- [ ] Розуміти, що HCL-синтаксис та формат стейту сумісні між ними
- [ ] Використовувати terraform workspaces або directory structure для environments
- [ ] Знати, як працювати з terraform import at scale

### На співбесіді зможете:

- [ ] Пояснити, навіщо потрібен remote state та state locking
- [ ] Описати структуру Terraform-проєкту для організації
- [ ] Пояснити різницю між `terraform plan` та `terraform apply`
- [ ] Описати, як ви обробляєте drift detection
- [ ] Пояснити переваги модулів та як їх версіонувати
- [ ] Описати CI/CD pipeline для Terraform

---

## Посилання всередині репозиторію

- Попередній фактор: [DevSecOps](../03-devsecops/)
- Наступний фактор: [ШІ та MLOps](../05-ai-and-mlops/)
- Хмарна інфраструктура: [Хмарне впровадження](../01-cloud-adoption/)
- IaC для K8s: [Контейнери та Kubernetes](../02-containers-and-kubernetes/)
- Безпека IaC: [DevSecOps](../03-devsecops/)
- Моніторинг інфраструктури: [Спостережуваність та SRE](../06-observability-and-sre/)
- Загальна дорожня карта: [Roadmap](../90-roadmap/)
- Помилки, яких варто уникати: [Типові помилки](../91-mistakes/)
- Повернутися до [головної сторінки](../)

**Застосуйте цей фактор:** [Проєкт А — Full-Stack DevOps Platform](../90-roadmap/#канонічні-проєкти-портфоліо) · [Проєкт B — IaC Library](../90-roadmap/#канонічні-проєкти-портфоліо)
