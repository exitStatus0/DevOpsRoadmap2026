# Фактор 5: ШІ та MLOps

![AI & MLOps](../../en/05-ai-and-mlops/05-ai-and-mlops.png)

> **Швидкий старт**
> - **7 днів:** Використайте ШІ-інструмент для 5 DevOps-задач і уважно перевіряйте результат. Опційно: контейнеризуйте простий ML-сервіс.
> - **30 днів:** Завершіть чек-лист початківця. Якщо вам потрібен MLOps-трек, виконайте вправу 2 і розгорніть MLflow локально.

---

## Старт тут

- **Мінімальний шлях:** Для більшості студентів цей модуль насамперед про грамотне використання ШІ у щоденній DevOps-роботі.
- **Поріг найму:** Якщо AI / ML інфраструктура входить у вашу цільову роль, додайте MLflow, простий model serving і маленький CI/CD pipeline.
- **Залиште на потім:** Kubeflow, multi-GPU training, feature stores, LLM serving і enterprise ML platform design.

---

## Чому це важливо у 2026

ШІ змінює DevOps двічі. По-перше, ШІ стає вашим щоденним помічником. По-друге, MLOps — це нова область, де потрібні саме DevOps-навички.

Багато компаній інвестують у ШІ, а там, де з’являються ML-навантаження, MLOps стає корисною спеціалізацією.

Два виміри ШІ для DevOps-інженера:

**Вимір 1: ШІ як помічник DevOps-інженера**
- Генерація Terraform/K8s/Docker конфігурацій
- Дебаг та troubleshooting
- Написання CI/CD-пайплайнів
- Аналіз логів та інцидентів
- Code review інфраструктурного коду

**Вимір 2: MLOps — DevOps для ML**
- ML-пайплайни (training, evaluation, deployment)
- Serving моделей (inference endpoints)
- GPU-інфраструктура
- Model versioning та registry
- Моніторинг моделей (drift detection)

Чому це критично:
- **Багато команд** уже експериментують з ML/ШІ-навантаженнями — і їм потрібна інфраструктура
- **Значна частина MLOps перетинається з DevOps**: CI/CD, контейнери, K8s, моніторинг, IaC
- **GPU-інфраструктура** — новий дефіцитний навик: мало хто вміє правильно
- **ШІ-помічники** помітно підвищують продуктивність DevOps-інженера

> Для більшості студентів головний висновок цього фактора — AI-assisted DevOps workflow. Повний MLOps, GPU-інфраструктура та LLM serving — це трек спеціалізації, а не обов’язкова вимога для першої роботи.

---

## Яку проблему це вирішує в реальних командах

### ШІ як помічник

| Проблема | Без ШІ | З ШІ |
|----------|--------|------|
| Написати K8s-маніфест для нового сервісу | 1-2 години | 10-15 хвилин + ревью |
| Дебаг складної проблеми | Години читання логів | Запитати ШІ з контекстом → підказка за хвилини |
| Розібратися з новим інструментом | Дні документації | Інтерактивне навчання через діалог |
| Написати runbook для інциденту | 2-3 години документації | 30 хвилин з ШІ-допомогою |
| Ревью Terraform-коду | 30-60 хвилин | 10 хвилин з ШІ-підказками |

### MLOps

| Проблема | Без MLOps-інженера | З MLOps-інженером |
|----------|---------------------|-------------------|
| ML-інженер деплоїть модель | «Я запустив Jupyter на EC2...» | Автоматизований serving pipeline |
| Версіонування моделей | «Модель у папці models_v3_final_FINAL» | ML Registry (MLflow, Weights & Biases) |
| GPU-ресурси | Постійно запущені GPU-інстанси = $$$$ | Auto-scaling GPU на K8s |
| Моніторинг моделей | «Чому accuracy впала?» — ніхто не знає | Drift detection + автоматичні алерти |
| Відтворюваність | «У мене працювало в Jupyter» | Контейнеризовані тренувальні пайплайни |

**Реальний приклад:** Data Science команда з 5 ML-інженерів. Без MLOps: деплой моделі займав 2 тижні (ручна робота DevOps + ML), GPU-інстанси працювали 24/7 (рахунок $15,000/міс), відтворити тренування було неможливо. Після впровадження MLOps: деплой за 30 хвилин через CI/CD, GPU автоматично масштабуються ($4,000/міс), кожне тренування версіоноване та відтворюване.

---

## Що потрібно вивчити (ключові навички)

### 1. Промпт-інжиніринг для інфраструктури

Це не про «використовувати ChatGPT». Це про **системне використання ШІ** у щоденній роботі DevOps:

```
Ефективний промпт для DevOps має:
├── Контекст: «Я використовую актуальну підтримувану версію EKS з Terraform»
├── Задачу: «Створи Deployment для Python API»
├── Обмеження: «Non-root, resource limits, health probes»
├── Формат: «Terraform HCL / K8s YAML / Bash script»
└── Перевірку: «Поясни, чому кожен параметр обраний так»
```

**Приклади ефективних промптів:**

```
Промпт 1 (Terraform):
"Створи Terraform-модуль для AWS EKS з наступною специфікацією:
- K8s version: актуальний підтримуваний реліз EKS
- Node groups: general (t3.medium, 2-5), gpu (g4dn.xlarge, 0-3, spot)
- IRSA enabled
- Addons: CoreDNS, vpc-cni, ebs-csi, gpu-device-plugin
- Encryption at rest для secrets
- Logging: api, audit
Поясни кожне рішення."

Промпт 2 (Troubleshooting):
"Pod 'ml-api-7d8f9c6b4-xk2mn' у CrashLoopBackOff.
Логи: 'RuntimeError: CUDA out of memory. Tried to allocate 2.00 GiB'
Resources: requests gpu 1, limits gpu 1
Node має NVIDIA T4 (16GB VRAM).
Інші pods на цьому node: ml-worker (використовує 12GB VRAM).
Що не так і як вирішити?"

Промпт 3 (CI/CD):
"Створи GitHub Actions workflow для ML-проєкту:
- На PR: lint, unit tests, build Docker image
- На merge в main: train model (GPU runner), evaluate, register in MLflow
- На tag: deploy model to staging (Kubernetes serving)
- Manual approval для production
Проєкт: Python, PyTorch, FastAPI для serving."
```

### 2. MLOps-пайплайни

```
MLOps Pipeline:
├── Data Pipeline
│   ├── Збір та валідація даних
│   ├── Feature store (Feast)
│   └── Data versioning (DVC)
├── Training Pipeline
│   ├── Контейнеризоване тренування
│   ├── Hyperparameter tuning
│   ├── Experiment tracking (MLflow, W&B)
│   └── GPU scheduling (K8s + NVIDIA device plugin)
├── Evaluation Pipeline
│   ├── Метрики якості
│   ├── A/B тестування
│   └── Shadow deployment
├── Deployment Pipeline
│   ├── Model registry (MLflow)
│   ├── Serving (TorchServe, Triton, KServe, vLLM)
│   ├── Canary deployment
│   └── Rollback
└── Monitoring Pipeline
    ├── Model performance metrics
    ├── Data drift detection
    ├── Latency та throughput
    └── Cost monitoring (GPU utilization)
```

**Ключові інструменти MLOps:**

| Категорія | Інструмент | Для чого |
|-----------|-----------|----------|
| Experiment tracking | MLflow, W&B | Трекінг експериментів, параметрів, метрик |
| Model registry | MLflow, Vertex AI | Версіонування та зберігання моделей |
| Pipeline orchestration | Kubeflow, Airflow, Argo Workflows | Оркестрація ML-пайплайнів |
| Serving | KServe, Triton, vLLM, TGI | Деплой моделей для inference |
| Feature store | Feast | Зберігання та serving фічей |
| Data versioning | DVC | Версіонування датасетів |
| GPU management | NVIDIA GPU Operator, MIG | Управління GPU-ресурсами |

### 3. GPU-інфраструктура

```
GPU-навички для DevOps:
├── Основи GPU
│   ├── Різниця між CPU та GPU workloads
│   ├── VRAM vs RAM
│   ├── CUDA та NVIDIA drivers
│   └── Типи GPU (T4, A10, A100, H100, L40S)
├── GPU на K8s
│   ├── NVIDIA Device Plugin
│   ├── GPU Operator
│   ├── Resource requests/limits для GPU
│   ├── Node selectors та tolerations для GPU-нод
│   ├── MIG (Multi-Instance GPU) для H100/A100
│   └── Time-slicing для менших GPU
├── GPU у хмарі
│   ├── AWS: p4d, p5, g5, g4dn інстанси
│   ├── GCP: a2, g2 інстанси
│   ├── Spot/Preemptible GPU (економія 60-90%)
│   └── Reserved GPU instances
└── Оптимізація витрат
    ├── Auto-scaling GPU-нод (Karpenter, Cluster Autoscaler)
    ├── Batch processing замість real-time
    ├── Model quantization (зменшення потреби в GPU)
    └── Моніторинг GPU utilization (DCGM Exporter + Prometheus)
```

### 4. Serving моделей

```
Serving-стратегії:
├── Real-time inference
│   ├── REST API (FastAPI + model)
│   ├── gRPC (для high-throughput)
│   └── Managed: SageMaker, Vertex AI
├── Batch inference
│   ├── Spark / Dask
│   ├── Kubernetes Jobs
│   └── Scheduled pipelines
├── LLM Serving (особливо актуально у 2026)
│   ├── vLLM — open-source serving для LLM
│   ├── TGI (Text Generation Inference) — Hugging Face
│   ├── Triton Inference Server — NVIDIA
│   └── KServe — K8s-native
└── Scaling
    ├── HPA на основі custom metrics (request queue, GPU util)
    ├── KEDA для event-driven scaling
    └── Scale-to-zero для cost optimization
```

---

## Що можна пропустити / «найгірший ROI» для початку

### НЕ вчіть першим:

1. **Створення ML-моделей** — Ви DevOps/MLOps-інженер, не ML-інженер. Вам не потрібно розуміти, як працює transformer або CNN. Достатньо знати: що таке модель, як вона тренується, як деплоїться.

2. **Теорія глибокого навчання** — Backpropagation, gradient descent, loss functions — це для Data Scientists. Ваша задача — інфраструктура для тренування та деплою.

3. **Конкретні ML-фреймворки в деталях** — Вам не потрібно знати PyTorch API. Достатньо знати: «це TensorFlow-модель, їй потрібен GPU з 16GB VRAM, вона деплоїться через TorchServe».

4. **Побудова feature store з нуля** — Використовуйте Feast або managed сервіси. Побудова власного — це для великих ML-платформних команд.

5. **Fine-tuning LLM** — Це задача ML-інженера. Ваша задача — надати GPU-інфраструктуру та CI/CD для fine-tuning pipeline.

---

## Наскільки глибоко занурюватися

### Початківець (2-3 тижні)

- [ ] Щоденно використовувати ШІ для DevOps-задач (Terraform, Docker, K8s, CI/CD)
- [ ] Зрозуміти різницю між training та inference
- [ ] Зрозуміти, що таке модель, версія моделі, model registry
- [ ] Контейнеризувати простий ML-сервіс (FastAPI + scikit-learn)
- [ ] Зрозуміти, навіщо потрібен GPU та які задачі без нього неможливі
- [ ] Знати основні терміни: epoch, batch, inference latency, throughput

**Тест:** Можете пояснити нетехнічній людині, чим MLOps відрізняється від DevOps? Якщо так — йдіть далі.

### Впевнений (4-8 тижнів)

- [ ] Розгорнути MLflow для experiment tracking
- [ ] Створити CI/CD-пайплайн для ML-проєкту (train → evaluate → register → deploy)
- [ ] Налаштувати GPU-ноди в K8s (NVIDIA Device Plugin)
- [ ] Задеплоїти модель через KServe або TorchServe
- [ ] Налаштувати auto-scaling для inference endpoints
- [ ] Моніторити GPU utilization (DCGM Exporter + Prometheus + Grafana)
- [ ] Зрозуміти model drift та як його виявляти
- [ ] Використовувати Spot GPU-інстанси для тренування

**Тест:** Можете побудувати повний пайплайн від тренування моделі до serving з моніторингом? Якщо так — ви впевнений.

### Експерт (3-6 місяців)

- [ ] Спроєктувати ML-платформу для організації
- [ ] Впровадити Kubeflow або Argo Workflows для ML-пайплайнів
- [ ] Налаштувати multi-GPU training (distributed training)
- [ ] Оптимізувати GPU-витрати: MIG, time-slicing, spot instances
- [ ] Впровадити A/B тестування для моделей
- [ ] Налаштувати LLM serving (vLLM на K8s)
- [ ] Feature store з Feast
- [ ] Compliance та governance для ML (model cards, audit trail)

**Тест:** Можете спроєктувати та впровадити ML-платформу, яка обслуговує 5+ ML-команд? Якщо так — ви експерт.

---

## Як ШІ змінює цей фактор (практичні приклади)

Цей фактор — про ШІ, тому тут не «як ШІ допомагає», а «як використовувати ШІ щодня».

### Щоденний ШІ-workflow DevOps-інженера

**Ранок: Планування**
```
Промпт: "Мені потрібно мігрувати 3 мікросервіси з Docker Compose
на Kubernetes. Сервіси: API (Node.js), Worker (Python), Redis.
Створи план міграції з конкретними кроками та Helm-чартами для кожного."
```

**День: Розробка**
```
Промпт: "Створи GitHub Actions workflow:
1. On push to feature branch: lint + test + build image
2. On PR to main: terraform plan + security scan
3. On merge to main: terraform apply + deploy to staging
4. On tag: deploy to production (manual approval)
Використовуй OIDC для AWS credentials, не static keys."
```

**Інцидент: Troubleshooting**
```
Промпт: "Alertmanager спрацював: 'HighMemoryUsage' на pod 'api-server'.
Ось вивід kubectl top pods, kubectl describe pod, та останні 50 рядків логів:
[вставити дані]
Що може бути причиною та як виправити?"
```

**Вечір: Документація**
```
Промпт: "На основі цього Terraform-коду [вставити] створи:
1. Architecture Decision Record (ADR) — чому обрали цю архітектуру
2. Runbook для відновлення після аварії
3. Діаграму архітектури в Mermaid-форматі"
```

### Побудова MLOps-пайплайнів з ШІ

```
Промпт: "Створи Argo Workflows template для ML-пайплайну:
1. Step 1: Завантажити дані з S3
2. Step 2: Preprocessing (Python container)
3. Step 3: Training (GPU container, PyTorch)
4. Step 4: Evaluation (порівняти з попередньою моделлю)
5. Step 5: Якщо accuracy > threshold → register в MLflow
6. Step 6: Deploy через KServe (canary 10% → 50% → 100%)
Кожен step — окремий контейнер з конкретними resource requests."
```

### ШІ-інструменти для DevOps у 2026

| Інструмент | Категорія | Як використовувати |
|------------|-----------|---------------------|
| Claude Code / GitHub Copilot | Кодинг | Генерація Terraform, K8s, CI/CD |
| ChatGPT / Claude | Troubleshooting | Дебаг, пояснення, планування |
| K8sGPT | K8s-специфічний | Автоматичний аналіз проблем кластера |
| AWS Infrastructure Composer | AWS | Візуальне проєктування архітектури |
| Kubecost + ШІ | FinOps | Оптимізація витрат K8s |

---

## Типові помилки та пастки

### Пастка 1: «ШІ мене замінить»

**Що це:** Страх, що ШІ зробить DevOps-інженерів непотрібними.

**Чому шкодить:** Парадокс: ті, хто боїться ШІ і ігнорує його — справді стануть неконкурентоспроможними. Не через ШІ, а через тих, хто його використовує.

**Виправлення:** ШІ — це інструмент, як Terraform або Docker. Він підсилює ваші навички, а не замінює їх. З ним ви часто робите рутину помітно швидше, але критична частина все одно за вами: зрозуміти, перевірити й безпечно застосувати результат.

### Пастка 2: Ігнорування ШІ-інструментів

**Що це:** «Я все роблю вручну, мені не потрібен ШІ».

**Чому шкодить:** Ви помітно повільніший за колегу, який використовує ШІ. Це як відмовлятися від IDE на користь Notepad.

**Виправлення:** Почніть з простого:
1. Використовуйте ШІ для генерації boilerplate (Terraform modules, K8s manifests)
2. Використовуйте ШІ для troubleshooting (вставте логи → отримайте рішення)
3. Використовуйте ШІ для навчання (поясни концепцію → задай питання)

### Пастка 3: Спроба стати ML-інженером

**Що це:** DevOps-інженер вивчає PyTorch, TensorFlow, математику глибокого навчання.

**Чому шкодить:** Ви витрачаєте місяці на навички, які не потрібні для вашої ролі. ML-інженери мають PhD та роки досвіду. Ви не станете ML-інженером за 3 місяці.

**Виправлення:** Ваша зона — **інфраструктура для ML**:
- CI/CD для ML-проєктів
- GPU scheduling на K8s
- Model serving та scaling
- Monitoring та observability
- Cost optimization для GPU

### Пастка 4: «Сліпа довіра до ШІ»

**Що це:** Копіювати згенерований ШІ код без перевірки.

**Чому шкодить:** ШІ генерує код, який виглядає правильно, але може мати критичні помилки: відкриті Security Groups, надмірні IAM-привілеї, відсутнє шифрування.

**Виправлення:** Правило «довіряй, але перевіряй»:
1. ШІ генерує → ви ревьюїте
2. Запускайте linting (tflint, checkov) на згенерованому коді
3. Тестуйте в staging перед production
4. Розумійте кожен рядок коду, який деплоїте

### Пастка 5: GPU-витрати без контролю

**Що це:** GPU-інстанси працюють 24/7, навіть коли inference трафік = 0.

**Чому шкодить:** Один g5.xlarge = ~$1/годину. 24/7 = $730/міс. 10 таких = $7,300/міс. І це без навантаження.

**Виправлення:**
- Scale-to-zero для inference (KEDA + KServe)
- Spot instances для training (економія 60-90%)
- Моніторинг GPU utilization (алерт при < 30%)
- Batch processing замість real-time де можливо
- Model quantization (менша модель = менший GPU)

---

## Міні-практика (5 вправ)

### Вправа 1: Щоденне використання ШІ для DevOps (початківець)

**Мета:** Інтегрувати ШІ у щоденний робочий процес.

```
Тиждень-челендж:
Понеділок: Згенерувати Terraform-модуль для S3 + CloudFront за допомогою ШІ
Вівторок: Попросити ШІ зробити security review вашого Dockerfile
Середа: Створити K8s-маніфести для нового сервісу через ШІ
Четвер: Дебажити реальну проблему з допомогою ШІ (вставити логи + описати контекст)
П'ятниця: Згенерувати CI/CD-пайплайн та runbook через ШІ

Для кожного дня:
1. Запишіть промпт
2. Запишіть результат
3. Що довелося виправити
4. Скільки часу зекономлено

Критерій успіху: ШІ використовується мінімум 5 разів на день для DevOps-задач
```

### Вправа 2: CI/CD для ML-проєкту (впевнений)

**Мета:** Побудувати повний пайплайн для ML.

```
Кроки:
1. Створити простий ML-проєкт: FastAPI + scikit-learn model
2. Dockerfile: multi-stage, non-root, health check
3. GitHub Actions pipeline:
   - Lint + test
   - Train model (з фіксованим seed для відтворюваності)
   - Evaluate (порівняти з baseline)
   - Build та push Docker image
   - Register model в MLflow
   - Deploy в K8s (Deployment + Service + Ingress)
4. MLflow:
   - Встановити MLflow server
   - Логувати experiment parameters, metrics, artifacts
   - Model registry: staging → production
5. Моніторинг: latency, throughput, error rate

Критерій успіху: push в main → автоматичне тренування → evaluation → deploy
```

### Вправа 3: GPU-навантаження на K8s (впевнений → експерт)

**Мета:** Навчитися працювати з GPU на Kubernetes.

```
Кроки:
1. Налаштувати K8s-кластер з GPU-нодами
   (EKS з g4dn.xlarge або kind + NVIDIA GPU)
2. Встановити NVIDIA GPU Operator
3. Створити Pod з GPU:
   - requests: nvidia.com/gpu: 1
   - limits: nvidia.com/gpu: 1
4. Запустити inference-сервіс (FastAPI + PyTorch model)
5. Налаштувати HPA на custom metrics (request queue length)
6. Моніторинг: DCGM Exporter → Prometheus → Grafana
   - GPU utilization
   - GPU memory usage
   - Temperature
7. Оптимізація: scale-to-zero при відсутності трафіку

Критерій успіху: GPU-навантаження працює на K8s з auto-scaling та моніторингом
```

### Вправа 4: Model Serving Pipeline (впевнений → експерт)

**Мета:** Задеплоїти ML-модель production-ready способом.

```
Кроки:
1. Обрати serving framework: KServe або vLLM
2. Контейнеризувати модель
3. Створити K8s-ресурси для serving:
   - InferenceService (KServe) або Deployment
   - Auto-scaling (min 0, max 5)
   - Resource requests/limits
4. Canary deployment: 10% → 50% → 100%
5. A/B тестування: стара модель vs нова
6. Моніторинг:
   - Latency (p50, p95, p99)
   - Throughput (requests/sec)
   - Error rate
   - Model-specific metrics (accuracy, drift)
7. Rollback procedure: автоматичний при error rate > 5%

Критерій успіху: модель деплоїться через GitOps з canary та автоматичним rollback
```

### Вправа 5: LLM Serving на K8s (експерт)

**Мета:** Задеплоїти LLM для inference.

```
Кроки:
1. Обрати open-source модель (Llama 3, Mistral)
2. Встановити vLLM на K8s:
   - GPU node з достатнім VRAM
   - Model weights з Hugging Face Hub або S3
   - vLLM Deployment з OpenAI-сумісним API
3. Оптимізація:
   - Quantization (AWQ або GPTQ) для зменшення VRAM
   - Continuous batching (vLLM робить автоматично)
   - Tensor parallelism для multi-GPU
4. Ingress + rate limiting
5. Моніторинг:
   - Tokens/second
   - Time-to-first-token (TTFT)
   - GPU utilization та VRAM usage
6. Cost analysis: порівняти з OpenAI API pricing

Критерій успіху: LLM працює на K8s, доступний через API, з моніторингом та auto-scaling
```

---

## «Сигнали» готовності до роботи (чек-лист)

### Обов'язкове:

- [ ] Щоденно використовувати ШІ для DevOps-задач та знати його обмеження
- [ ] Писати ефективні промпти для генерації Terraform/K8s/CI коду
- [ ] Пояснити, як ШІ допомагає в troubleshooting, генерації коду та документації

### Якщо йдете в MLOps-спеціалізацію:

- [ ] Пояснити різницю між training та inference
- [ ] Контейнеризувати ML-сервіс (FastAPI + модель)
- [ ] Зрозуміти, навіщо потрібен GPU та які є типи GPU-інстансів
- [ ] Знати основні MLOps-інструменти: MLflow, KServe, vLLM

### Бажане:

- [ ] Побудувати CI/CD-пайплайн для ML-проєкту
- [ ] Налаштувати GPU-ноди в K8s з NVIDIA Device Plugin
- [ ] Задеплоїти модель через KServe або vLLM
- [ ] Налаштувати model monitoring (drift detection)
- [ ] Оптимізувати GPU-витрати (spot instances, scale-to-zero)
- [ ] Розуміти MLflow model registry

### На співбесіді зможете:

- [ ] Пояснити, як ШІ змінює роботу DevOps-інженера (з конкретними прикладами)
- [ ] Описати MLOps-пайплайн від тренування до serving
- [ ] Пояснити різницю між DevOps та MLOps
- [ ] Описати, як масштабувати inference endpoint
- [ ] Пояснити стратегію оптимізації GPU-витрат
- [ ] Описати, як моніторити ML-модель в production

---

## Посилання всередині репозиторію

- Попередній фактор: [Інфраструктура як код](../04-infrastructure-as-code/)
- Контейнери для ML: [Контейнери та Kubernetes](../02-containers-and-kubernetes/)
- Хмарна GPU-інфраструктура: [Хмарне впровадження](../01-cloud-adoption/)
- Безпека ML-пайплайнів: [DevSecOps](../03-devsecops/)
- IaC для ML-інфраструктури: [Інфраструктура як код](../04-infrastructure-as-code/)
- Загальна дорожня карта: [Roadmap](../90-roadmap/)
- Помилки, яких варто уникати: [Типові помилки](../91-mistakes/)
- Повернутися до [головної сторінки](../)

**Застосуйте цей фактор:** [Проєкт А — Full-Stack DevOps Platform](../90-roadmap/#канонічні-проєкти-портфоліо) (MLOps-трек)
