# Фактор 3: DevSecOps (Безпека)

![DevSecOps](../../en/03-devsecops/03-devsecops.png)

> **Швидкий старт**
> - **7 днів:** Запустіть Trivy проти Docker-образу → додайте gitleaks pre-commit hook → прочитайте «Що НЕ вчити першим».
> - **30 днів:** Завершіть рівень початківця → Вправа 2 (сканування у CI) → Вправа 3 (Network Policies).

---

## Чому це важливо у 2026

Безпека — це не окрема команда, яка приходить перед релізом. У 2026 році безпека — це частина кожного коміту, кожного пайплайну, кожного деплою.

Витоки даних коштують компаніям мільйони, і більшість серйозних організацій вже впровадили shift-left security.

**Shift-left security** означає, що безпека зміщується ліворуч по timeline розробки — ближче до коду, далі від production. Замість «перевіримо безпеку перед релізом» — «безпека вбудована в кожен етап».

Чому DevOps-інженер повинен розуміти безпеку:

- **Ви будуєте пайплайни** — якщо безпека не в пайплайні, її немає ніде
- **Ви керуєте інфраструктурою** — неправильна конфігурація = відкриті двері для атак
- **Ви працюєте з секретами** — API-ключі, паролі, сертифікати проходять через ваші руки
- **Ви відповідальні за runtime** — якщо контейнер зламано, це ваша зона відповідальності
- **Ринок платить більше** — DevSecOps-інженери зазвичай заробляють більше за «чистих» DevOps

---

## Яку проблему це вирішує в реальних командах

| Проблема | Без DevSecOps | З DevSecOps |
|----------|---------------|-------------|
| Вразливості у залежностях | Дізнаємося після злому | Автоматичне сканування в CI |
| Захардкоджені секрети | Паролі в Git-історії | Vault/Secrets Manager + pre-commit hooks |
| Надмірні привілеї | Кожен має admin-доступ | RBAC + принцип мінімальних привілеїв |
| Незахищені контейнери | Root у контейнері, ніякого сканування | Non-root + Trivy + runtime security |
| Мережеві атаки | Все відкрито, flat network | Network Policies + zero trust |
| Supply chain attacks | Довіряємо будь-яким образам і пакетам | Підписані образи, SBOM, перевірені registry |

**Реальний приклад:** Фінтех-стартап. Розробник випадково закомітив AWS access key у публічний репозиторій. Через 15 хвилин бот просканував GitHub, знайшов ключ і запустив crypto-mining на 47 EC2-інстансах. Рахунок: $23,000 за 4 години. З pre-commit hook (gitleaks) та IAM-політикою мінімальних привілеїв — цього б не сталося.

---

## Що потрібно вивчити (ключові навички)

### 1. Керування секретами

```
Ієрархія інструментів:
├── Рівень 1: Environment variables (мінімум, не для production)
├── Рівень 2: Cloud-native (AWS Secrets Manager, GCP Secret Manager)
├── Рівень 3: HashiCorp Vault (кросплатформний стандарт)
├── Рівень 4: External Secrets Operator (для K8s)
└── Практики:
    ├── Ніколи не коммітити секрети в Git
    ├── Ротація секретів (автоматична)
    ├── Аудит доступу до секретів
    └── Pre-commit hooks (gitleaks, detect-secrets)
```

### 2. Сканування образів та залежностей

```
Інструменти та їх місце:
├── Trivy — сканування контейнерних образів (вразливості + misconfigurations)
├── Snyk — сканування залежностей коду
├── Grype — сканування образів (альтернатива Trivy)
├── Checkov — сканування IaC (Terraform, CloudFormation, K8s)
├── SBOM (Software Bill of Materials)
│   ├── Syft — генерація SBOM
│   └── Cosign — підпис образів
└── Інтеграція в CI/CD:
    ├── Fail pipeline при Critical/High вразливостях
    ├── Звіти у PR-коментарях
    └── Periodic scanning (не тільки при білді)
```

### 3. SAST та DAST

```
Static Application Security Testing (SAST):
├── SonarQube — аналіз коду на вразливості
├── Semgrep — легкий, з хорошими правилами
├── CodeQL — GitHub-native, потужний
└── Коли: на кожному PR

Dynamic Application Security Testing (DAST):
├── OWASP ZAP — безкоштовний, стандарт
├── Nuclei — швидкий сканер
└── Коли: після деплою в staging
```

### 4. RBAC та контроль доступу

```
RBAC-навички:
├── Kubernetes RBAC
│   ├── Roles та ClusterRoles
│   ├── RoleBindings та ClusterRoleBindings
│   ├── ServiceAccounts
│   └── Принцип мінімальних привілеїв
├── Cloud IAM
│   ├── IAM Policies (AWS/GCP/Azure)
│   ├── Cross-account/cross-project доступ
│   └── Тимчасові credentials (AssumeRole, Workload Identity)
└── CI/CD
    ├── Обмежені permissions для pipeline runners
    ├── OIDC замість статичних ключів
    └── Branch protection rules
```

### 5. Мережеві політики та zero trust

```
Мережева безпека:
├── K8s Network Policies
│   ├── Default deny all
│   ├── Allow тільки необхідний трафік
│   └── Ingress та Egress правила
├── Cloud Security Groups / NACLs
├── WAF (Web Application Firewall)
├── mTLS між сервісами (Service Mesh)
└── Zero Trust принципи:
    ├── Не довіряти нікому за замовчуванням
    ├── Перевіряти кожен запит
    └── Мінімальний доступ
```

### 6. Безпека ланцюга постачання (Supply Chain Security)

```
Supply Chain Security:
├── Підписання образів (Cosign, Notary)
├── SBOM (Software Bill of Materials)
├── Перевірка базових образів
├── Pinning версій залежностей
├── Сканування CI/CD-пайплайнів
├── SLSA framework (рівні 1-4)
└── Admission controllers
    ├── OPA/Gatekeeper
    ├── Kyverno
    └── Забороняють незахищені ресурси
```

---

## Що можна пропустити / «найгірший ROI» для початку

### НЕ вчіть першим:

1. **Пентестинг (penetration testing)** — це окрема спеціалізація. DevOps-інженеру достатньо знати, як захистити, а не як зламати. Пентест — для security-інженерів.

2. **Детальні фреймворки комплаєнсу** — SOC 2, PCI DSS, HIPAA, ISO 27001 — їх деталі потрібні для compliance engineers. Вам достатньо знати, що це існує і які вимоги вони створюють для інфраструктури.

3. **Криптографія на глибокому рівні** — Вам не потрібно розуміти математику за AES чи RSA. Достатньо знати: коли шифрувати, який алгоритм обрати, як керувати ключами.

4. **Власний SIEM з нуля** — ELK для security logs — це для великих команд. Почніть з CloudTrail + CloudWatch або managed SIEM.

5. **Bug bounty та exploit development** — Це для offensive security. Ваша задача — defensive.

---

## Наскільки глибоко занурюватися

### Початківець (2-3 тижні)

- [ ] Налаштувати pre-commit hooks для виявлення секретів (gitleaks)
- [ ] Додати Trivy у CI/CD-пайплайн
- [ ] Написати Dockerfile без root-користувача
- [ ] Зрозуміти принцип мінімальних привілеїв для IAM
- [ ] Налаштувати MFA для всіх облікових записів
- [ ] Зрозуміти різницю між автентифікацією та авторизацією
- [ ] Зберігати секрети в AWS Secrets Manager або аналогу

**Тест:** Можете створити CI-пайплайн, який блокує деплой при наявності Critical вразливостей? Якщо так — йдіть далі.

### Впевнений (4-8 тижнів)

- [ ] Встановити та налаштувати HashiCorp Vault
- [ ] Налаштувати RBAC у Kubernetes (Role, RoleBinding)
- [ ] Створити Network Policies (default deny + allow list)
- [ ] Впровадити SAST (Semgrep або SonarQube) у CI
- [ ] Налаштувати OPA/Gatekeeper або Kyverno для admission control
- [ ] Підписувати Docker-образи (Cosign)
- [ ] Генерувати SBOM (Syft)
- [ ] Автоматична ротація секретів
- [ ] Налаштувати Cloud audit logging (CloudTrail, Cloud Audit Logs)

**Тест:** Можете провести security review інфраструктури іншої команди та знайти 5+ проблем? Якщо так — ви впевнений.

### Експерт (3-6 місяців)

- [ ] Впровадити повний security pipeline (pre-commit → SAST → build → scan image → sign → deploy → DAST → runtime)
- [ ] Налаштувати runtime security (Falco)
- [ ] Впровадити Service Mesh з mTLS
- [ ] Дизайн zero trust мережевої архітектури
- [ ] Incident response plan та runbooks
- [ ] Compliance as Code (автоматична перевірка відповідності)
- [ ] Threat modeling для інфраструктури

**Тест:** Можете спроєктувати та впровадити security framework для організації? Якщо так — ви експерт.

---

## Як ШІ змінює цей фактор (практичні приклади)

### 1. Аудит Dockerfile

```
Промпт:
"Проаналізуй цей Dockerfile з точки зору безпеки.
Знайди всі потенційні вразливості та запропонуй виправлення:
[вставити Dockerfile]

Перевір:
- Чи запускається від root
- Чи є непотрібні пакети
- Чи використовуються multi-stage builds
- Чи закріплені версії базових образів
- Чи є HEALTHCHECK
- Чи є COPY --chown"
```

### 2. Написання OPA/Kyverno політик

```
Промпт:
"Створи Kyverno ClusterPolicy, яка:
1. Забороняє pods з privileged: true
2. Вимагає наявності resource limits
3. Забороняє образи з тегом 'latest'
4. Вимагає non-root user
5. Вимагає readOnlyRootFilesystem: true
Кожне правило — окрема policy з зрозумілим повідомленням про помилку."
```

### 3. Аналіз IAM-політик

```
Промпт:
"Проаналізуй цю IAM-політику на предмет надмірних привілеїв:
[вставити JSON]
Знайди:
- Wildcard permissions (*)
- Надмірно широкі Resource ARN
- Відсутні Condition keys
Запропонуй мінімальну версію."
```

### 4. Генерація Network Policies

```
Промпт:
"Створи K8s Network Policies для мікросервісної архітектури:
- frontend (port 80) — приймає трафік зовні
- api (port 8080) — приймає тільки від frontend
- database (port 5432) — приймає тільки від api
- redis (port 6379) — приймає тільки від api
Default deny all. Namespace: production."
```

### 5. Incident response

```
Промпт:
"Я виявив, що AWS access key був закомічений у публічний GitHub-репозиторій 2 години тому.
Створи покроковий incident response plan:
1. Негайні дії (перші 15 хвилин)
2. Розслідування (1-2 години)
3. Ремедіація
4. Post-mortem та запобігання повторенню"
```

---

## Типові помилки та пастки

### Пастка 1: «Безпека — це не моя робота»

**Що це:** Відкладати безпеку на «security team» або «потім».

**Чому шкодить:** Безпека, додана на фінальному етапі, коштує в 30 разів дорожче, ніж вбудована з початку. І зазвичай додається після інциденту.

**Виправлення:** Додайте хоча б 3 security-кроки в кожен CI/CD-пайплайн:
1. Pre-commit: gitleaks (секрети)
2. Build: Trivy (образи), Checkov (IaC)
3. Post-deploy: OWASP ZAP (DAST) у staging

### Пастка 2: Захардкоджені секрети

**Що це:** `DB_PASSWORD=my-secret-123` у коді, Docker Compose, або Terraform.

**Чому шкодить:** Якщо код потрапить у публічний репо (або зловмисник отримає доступ) — всі секрети скомпрометовані.

**Виправлення:**
```bash
# Погано:
export DB_PASSWORD="my-secret-123"

# Добре:
export DB_PASSWORD=$(aws secretsmanager get-secret-value \
  --secret-id prod/db-password \
  --query SecretString --output text)
```

### Пастка 3: Base64 = шифрування

**Що це:** Вірити, що Kubernetes Secrets захищені, бо вони в base64.

**Чому шкодить:** `echo "bXktc2VjcmV0" | base64 -d` = `my-secret`. Base64 — це кодування, НЕ шифрування.

**Виправлення:**
- Увімкнути encryption at rest для etcd
- Використовувати External Secrets Operator + Vault
- Або Sealed Secrets (Bitnami)

### Пастка 4: Ігнорування supply chain

**Що це:** `FROM python:latest` — без перевірки, хто створив цей образ і що в ньому.

**Чому шкодить:** Compromised базовий образ = compromised ваш застосунок. Supply chain attacks зростають щорічно.

**Виправлення:**
```dockerfile
# Закріпити SHA
FROM python:3.12-slim@sha256:abc123...
```
Плюс: сканувати образи, генерувати SBOM, використовувати trusted registries.

### Пастка 5: «Я ж у private subnet»

**Що це:** Покладатися на мережеву ізоляцію як єдиний рівень захисту.

**Чому шкодить:** Defense in depth — базовий принцип безпеки. Один рівень = один point of failure.

**Виправлення:** Кілька рівнів: Network Policies + RBAC + secrets management + image scanning + runtime security.

---

## Міні-практика (5 вправ)

### Вправа 1: Ротація секретів (початківець)

**Мета:** Навчитися працювати з секретами правильно.

```
Кроки:
1. Створити секрет в AWS Secrets Manager
2. Написати скрипт, що читає секрет і використовує його
3. Налаштувати автоматичну ротацію (кожні 30 днів)
4. Інтегрувати з K8s через External Secrets Operator
5. Налаштувати pre-commit hook (gitleaks) у репозиторії
6. Перевірити: спробувати закомітити секрет — hook повинен заблокувати

Критерій успіху: секрети ніде не захардкоджені, ротація автоматична
```

### Вправа 2: Trivy у CI/CD (початківець → впевнений)

**Мета:** Вбудувати сканування образів у пайплайн.

```
Кроки:
1. Додати Trivy в GitHub Actions / GitLab CI:
   - Сканувати Docker-образ після build
   - Fail pipeline при Critical вразливостях
   - Генерувати звіт у SARIF/JSON
2. Додати Checkov для сканування Terraform/K8s-маніфестів
3. Налаштувати Dependabot/Renovate для автоматичного оновлення залежностей
4. Створити dashboard з результатами сканування

Приклад кроку в GitHub Actions:
  - name: Scan image
    uses: aquasecurity/trivy-action@master
    with:
      image-ref: 'myapp:${{ github.sha }}'
      severity: 'CRITICAL,HIGH'
      exit-code: '1'

Критерій успіху: жоден образ з Critical вразливістю не потрапляє в production
```

### Вправа 3: Network Policies у Kubernetes (впевнений)

**Мета:** Навчитися ізолювати трафік у K8s.

```
Кроки:
1. Створити namespace з 3 сервісами: frontend, api, database
2. Перевірити: всі сервіси бачать один одного (до Network Policies)
3. Створити default deny policy
4. Перевірити: нічого не працює
5. Додати allow-правила:
   - frontend → api (port 8080)
   - api → database (port 5432)
   - ingress → frontend (port 80)
6. Перевірити: тільки дозволений трафік проходить
7. Спробувати: database → frontend — повинно бути заблоковано

Критерій успіху: кожен сервіс має доступ тільки до того, що потрібно
```

### Вправа 4: Admission Control з Kyverno (впевнений → експерт)

**Мета:** Автоматично enforce security policies в K8s.

```
Кроки:
1. Встановити Kyverno в K8s-кластер
2. Створити політики:
   - Заборонити privileged containers
   - Вимагати resource limits
   - Заборонити latest tag
   - Вимагати non-root
   - Вимагати specific labels
3. Протестувати: спробувати створити pod, що порушує політику
4. Налаштувати audit mode (не блокувати, а логувати)
5. Генерувати Policy Report

Критерій успіху: незахищені ресурси не можуть бути створені в кластері
```

### Вправа 5: Повний security pipeline (експерт)

**Мета:** Побудувати end-to-end security pipeline.

```
Кроки:
1. Pre-commit: gitleaks, detect-secrets
2. SAST: Semgrep у CI
3. Build: multi-stage Dockerfile, non-root
4. Image scan: Trivy (fail on CRITICAL)
5. IaC scan: Checkov для Terraform
6. Sign image: Cosign
7. Generate SBOM: Syft
8. Deploy: тільки підписані образи (Kyverno verify-images)
9. Post-deploy: OWASP ZAP у staging
10. Runtime: Falco для виявлення аномалій

Критерій успіху: будь-яка security проблема блокує деплой або генерує алерт
```

---

## «Сигнали» готовності до роботи (чек-лист)

### Обов'язкове:

- [ ] Налаштувати pre-commit hooks для виявлення секретів
- [ ] Інтегрувати сканер образів (Trivy) у CI/CD
- [ ] Написати Dockerfile без root-користувача з health check
- [ ] Пояснити принцип мінімальних привілеїв та застосувати його в IAM
- [ ] Зберігати секрети у відповідному сервісі (Vault, Secrets Manager)
- [ ] Налаштувати RBAC у Kubernetes
- [ ] Пояснити різницю між SAST та DAST
- [ ] Створити базові Network Policies

### Бажане:

- [ ] Налаштувати HashiCorp Vault з автоматичною ротацією
- [ ] Впровадити admission control (OPA/Gatekeeper або Kyverno)
- [ ] Підписувати образи (Cosign)
- [ ] Генерувати SBOM (Syft)
- [ ] Налаштувати SAST у CI (Semgrep або SonarQube)
- [ ] Знати основи OWASP Top 10

### На співбесіді зможете:

- [ ] Описати security pipeline від коміту до production
- [ ] Пояснити, що таке shift-left security і навіщо
- [ ] Відповісти на питання: «Як ви керуєте секретами?»
- [ ] Описати план дій при витоку credentials
- [ ] Пояснити різницю між мережевою ізоляцією та zero trust
- [ ] Описати supply chain security та SBOM

---

## Посилання всередині репозиторію

- Попередній фактор: [Контейнери та Kubernetes](../02-containers-and-kubernetes/)
- Наступний фактор: [Інфраструктура як код](../04-infrastructure-as-code/)
- Безпека контейнерів: [Контейнери та Kubernetes](../02-containers-and-kubernetes/)
- IaC-безпека: [Інфраструктура як код](../04-infrastructure-as-code/)
- ШІ для безпеки: [ШІ та MLOps](../05-ai-and-mlops/)
- Загальна дорожня карта: [Roadmap](../90-roadmap/)
- Помилки, яких варто уникати: [Типові помилки](../91-mistakes/)
- Повернутися до [головної сторінки](../)

**Застосуйте цей фактор:** [Проєкт C — Security Pipeline](../90-roadmap/#канонічні-проєкти-портфоліо)
