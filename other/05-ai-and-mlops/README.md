# Фактор 5: ИИ и MLOps

![AI & MLOps](../../en/05-ai-and-mlops/05-ai-and-mlops.png)

**Этот фактор про два разных, но связанных рычага роста: ИИ как ежедневный ускоритель DevOps-работы и MLOps как отдельную инфраструктурную специализацию. Здесь важно не поддаться хайпу, а увидеть, где именно для вас находится реальная практическая ценность.**

> **Быстрый старт**
> - **7 дней:** Используйте ИИ-инструмент для 5 DevOps-задач и внимательно ревьюйте результат. Опционально: контейнеризируйте простой ML-сервис.
> - **30 дней:** Пройдите чек-лист уровня «Новичок». Если вам нужен MLOps-трек, выполните упражнение 2 и поднимите MLflow локально.

---

## Старт здесь

- **Минимальный путь:** Для большинства студентов этот модуль в первую очередь про грамотное использование ИИ в ежедневной DevOps-работе. Именно здесь находится самый быстрый и практичный ROI.
- **Порог найма:** Если AI / ML инфраструктура входит в вашу целевую роль, добавьте MLflow, простое model serving и маленький CI/CD pipeline, чтобы показать уже не интерес к теме, а реальную рабочую готовность.
- **Оставьте на потом:** Kubeflow, multi-GPU training, feature stores, LLM serving и enterprise ML platform design. Сначала разберитесь, где заканчивается полезный DevOps-ускоритель и начинается MLOps-специализация.

---

## Почему это важно в 2026

ИИ меняет DevOps сразу в двух измерениях. Во-первых, он становится ежедневным рабочим усилителем: помогает быстрее писать, анализировать, дебажить и документировать. Во-вторых, там, где компании начинают строить ML-нагрузки, появляется новая инфраструктурная зона ответственности -- MLOps.

Именно поэтому этот фактор так важен: он не только ускоряет вашу текущую работу, но и открывает дополнительную траекторию роста для тех, кто хочет заходить в AI / ML инфраструктуру глубже.

Два измерения ИИ для DevOps-инженера:

**Измерение 1: ИИ как помощник DevOps-инженера**
- Генерация Terraform/K8s/Docker конфигураций
- Дебаг и troubleshooting
- Написание CI/CD-пайплайнов
- Анализ логов и инцидентов
- Code review инфраструктурного кода

**Измерение 2: MLOps -- DevOps для ML**
- ML-пайплайны (training, evaluation, deployment)
- Serving моделей (inference endpoints)
- GPU-инфраструктура
- Model versioning и registry
- Мониторинг моделей (drift detection)

Почему это критично:
- **Многие команды** уже экспериментируют с ML/ИИ-нагрузками -- и им нужна инфраструктурная опора
- **Значительная часть MLOps пересекается с DevOps**: CI/CD, контейнеры, K8s, мониторинг, IaC
- **GPU-инфраструктура** -- новый дефицитный навык, который заметно повышает ценность специалиста
- **ИИ-помощники** ощутимо увеличивают продуктивность DevOps-инженера, если ими пользоваться осознанно

> Для большинства студентов главный вывод этого фактора -- AI-assisted DevOps workflow. Полный MLOps, GPU-инфраструктура и LLM serving -- это трек специализации, а не обязательное требование для первой работы.

---

## Какую проблему это решает в реальных командах

Для одних команд ИИ убирает часы рутины и ускоряет стандартную DevOps-работу. Для других он приносит целый новый класс систем, который нужно обучать, разворачивать, масштабировать и наблюдать. Именно в этом пересечении и рождается практическая ценность модуля.

### ИИ как помощник

| Проблема | Без ИИ | С ИИ |
|----------|--------|------|
| Написать K8s-манифест для нового сервиса | 1-2 часа | 10-15 минут + ревью |
| Дебаг сложной проблемы | Часы чтения логов | Запросить ИИ с контекстом -> подсказка за минуты |
| Разобраться с новым инструментом | Дни документации | Интерактивное обучение через диалог |
| Написать runbook для инцидента | 2-3 часа документации | 30 минут с ИИ-помощью |
| Ревью Terraform-кода | 30-60 минут | 10 минут с ИИ-подсказками |

### MLOps

| Проблема | Без MLOps-инженера | С MLOps-инженером |
|----------|---------------------|-------------------|
| ML-инженер деплоит модель | «Я запустил Jupyter на EC2...» | Автоматизированный serving pipeline |
| Версионирование моделей | «Модель в папке models_v3_final_FINAL» | ML Registry (MLflow, Weights & Biases) |
| GPU-ресурсы | Постоянно запущенные GPU-инстансы = $$$$ | Auto-scaling GPU на K8s |
| Мониторинг моделей | «Почему accuracy упала?» -- никто не знает | Drift detection + автоматические алерты |
| Воспроизводимость | «У меня работало в Jupyter» | Контейнеризированные тренировочные пайплайны |

**Реальный пример:** Data Science команда из 5 ML-инженеров. Без MLOps: деплой модели занимал 2 недели (ручная работа DevOps + ML), GPU-инстансы работали 24/7 (счёт $15,000/мес), воспроизвести тренировку было невозможно. После внедрения MLOps: деплой за 30 минут через CI/CD, GPU автоматически масштабируются ($4,000/мес), каждая тренировка версионирована и воспроизводима.

---

## Что нужно изучить (ключевые навыки)

### 1. Промпт-инжиниринг для инфраструктуры

Это не про «использовать ChatGPT». Это про **системное использование ИИ** в ежедневной работе DevOps:

```
Эффективный промпт для DevOps имеет:
├── Контекст: «Я использую актуальную поддерживаемую версию EKS с Terraform»
├── Задачу: «Создай Deployment для Python API»
├── Ограничения: «Non-root, resource limits, health probes»
├── Формат: «Terraform HCL / K8s YAML / Bash script»
└── Проверку: «Объясни, почему каждый параметр выбран так»
```

**Примеры эффективных промптов:**

```
Промпт 1 (Terraform):
"Создай Terraform-модуль для AWS EKS со следующей спецификацией:
- K8s version: актуальный поддерживаемый релиз EKS
- Node groups: general (t3.medium, 2-5), gpu (g4dn.xlarge, 0-3, spot)
- IRSA enabled
- Addons: CoreDNS, vpc-cni, ebs-csi, gpu-device-plugin
- Encryption at rest для secrets
- Logging: api, audit
Объясни каждое решение."

Промпт 2 (Troubleshooting):
"Pod 'ml-api-7d8f9c6b4-xk2mn' в CrashLoopBackOff.
Логи: 'RuntimeError: CUDA out of memory. Tried to allocate 2.00 GiB'
Resources: requests gpu 1, limits gpu 1
Node имеет NVIDIA T4 (16GB VRAM).
Другие pods на этом node: ml-worker (использует 12GB VRAM).
Что не так и как решить?"

Промпт 3 (CI/CD):
"Создай GitHub Actions workflow для ML-проекта:
- На PR: lint, unit tests, build Docker image
- На merge в main: train model (GPU runner), evaluate, register в MLflow
- На tag: deploy model to staging (Kubernetes serving)
- Manual approval для production
Проект: Python, PyTorch, FastAPI для serving."
```

### 2. MLOps-пайплайны

```
MLOps Pipeline:
├── Data Pipeline
│   ├── Сбор и валидация данных
│   ├── Feature store (Feast)
│   └── Data versioning (DVC)
├── Training Pipeline
│   ├── Контейнеризированное обучение
│   ├── Hyperparameter tuning
│   ├── Experiment tracking (MLflow, W&B)
│   └── GPU scheduling (K8s + NVIDIA device plugin)
├── Evaluation Pipeline
│   ├── Метрики качества
│   ├── A/B тестирование
│   └── Shadow deployment
├── Deployment Pipeline
│   ├── Model registry (MLflow)
│   ├── Serving (TorchServe, Triton, KServe, vLLM)
│   ├── Canary deployment
│   └── Rollback
└── Monitoring Pipeline
    ├── Model performance metrics
    ├── Data drift detection
    ├── Latency и throughput
    └── Cost monitoring (GPU utilization)
```

**Ключевые инструменты MLOps:**

| Категория | Инструмент | Для чего |
|-----------|-----------|----------|
| Experiment tracking | MLflow, W&B | Трекинг экспериментов, параметров, метрик |
| Model registry | MLflow, Vertex AI | Версионирование и хранение моделей |
| Pipeline orchestration | Kubeflow, Airflow, Argo Workflows | Оркестрация ML-пайплайнов |
| Serving | KServe, Triton, vLLM, TGI | Деплой моделей для inference |
| Feature store | Feast | Хранение и serving фичей |
| Data versioning | DVC | Версионирование датасетов |
| GPU management | NVIDIA GPU Operator, MIG | Управление GPU-ресурсами |

### 3. GPU-инфраструктура

```
GPU-навыки для DevOps:
├── Основы GPU
│   ├── Разница между CPU и GPU workloads
│   ├── VRAM vs RAM
│   ├── CUDA и NVIDIA drivers
│   └── Типы GPU (T4, A10, A100, H100, L40S)
├── GPU на K8s
│   ├── NVIDIA Device Plugin
│   ├── GPU Operator
│   ├── Resource requests/limits для GPU
│   ├── Node selectors и tolerations для GPU-нод
│   ├── MIG (Multi-Instance GPU) для H100/A100
│   └── Time-slicing для меньших GPU
├── GPU в облаке
│   ├── AWS: p4d, p5, g5, g4dn инстансы
│   ├── GCP: a2, g2 инстансы
│   ├── Spot/Preemptible GPU (экономия 60-90%)
│   └── Reserved GPU instances
└── Оптимизация расходов
    ├── Auto-scaling GPU-нод (Karpenter, Cluster Autoscaler)
    ├── Batch processing вместо real-time
    ├── Model quantization (уменьшение потребности в GPU)
    └── Мониторинг GPU utilization (DCGM Exporter + Prometheus)
```

### 4. Serving моделей

```
Serving-стратегии:
├── Real-time inference
│   ├── REST API (FastAPI + model)
│   ├── gRPC (для high-throughput)
│   └── Managed: SageMaker, Vertex AI
├── Batch inference
│   ├── Spark / Dask
│   ├── Kubernetes Jobs
│   └── Scheduled pipelines
├── LLM Serving (особенно актуально в 2026)
│   ├── vLLM — open-source serving для LLM
│   ├── TGI (Text Generation Inference) — Hugging Face
│   ├── Triton Inference Server — NVIDIA
│   └── KServe — K8s-native
└── Scaling
    ├── HPA на основе custom metrics (request queue, GPU util)
    ├── KEDA для event-driven scaling
    └── Scale-to-zero для cost optimization
```

---

## Что можно пропустить / «худший ROI» для начала

### НЕ учите первым:

1. **Создание ML-моделей** -- Вы DevOps/MLOps-инженер, не ML-инженер. Вам не нужно понимать, как работает transformer или CNN. Достаточно знать: что такое модель, как она тренируется, как деплоится.

2. **Теория глубокого обучения** -- Backpropagation, gradient descent, loss functions -- это для Data Scientists. Ваша задача -- инфраструктура для тренировки и деплоя.

3. **Конкретные ML-фреймворки в деталях** -- Вам не нужно знать PyTorch API. Достаточно знать: «это TensorFlow-модель, ей нужен GPU с 16GB VRAM, она деплоится через TorchServe».

4. **Построение feature store с нуля** -- Используйте Feast или managed сервисы. Построение собственного -- это для больших ML-платформенных команд.

5. **Fine-tuning LLM** -- Это задача ML-инженера. Ваша задача -- предоставить GPU-инфраструктуру и CI/CD для fine-tuning pipeline.

---

## Насколько глубоко погружаться

### Новичок (2-3 недели)

- [ ] Ежедневно использовать ИИ для DevOps-задач (Terraform, Docker, K8s, CI/CD)
- [ ] Понять разницу между training и inference
- [ ] Понять, что такое модель, версия модели, model registry
- [ ] Контейнеризировать простой ML-сервис (FastAPI + scikit-learn)
- [ ] Понять, зачем нужен GPU и какие задачи без него невозможны
- [ ] Знать основные термины: epoch, batch, inference latency, throughput

**Тест:** Можете объяснить нетехническому человеку, чем MLOps отличается от DevOps? Если да -- идите дальше.

### Уверенный (4-8 недель)

- [ ] Развернуть MLflow для experiment tracking
- [ ] Создать CI/CD-пайплайн для ML-проекта (train -> evaluate -> register -> deploy)
- [ ] Настроить GPU-ноды в K8s (NVIDIA Device Plugin)
- [ ] Задеплоить модель через KServe или TorchServe
- [ ] Настроить auto-scaling для inference endpoints
- [ ] Мониторить GPU utilization (DCGM Exporter + Prometheus + Grafana)
- [ ] Понять model drift и как его выявлять
- [ ] Использовать Spot GPU-инстансы для тренировки

**Тест:** Можете построить полный пайплайн от тренировки модели до serving с мониторингом? Если да -- вы уверенный.

### Эксперт (3-6 месяцев)

- [ ] Спроектировать ML-платформу для организации
- [ ] Внедрить Kubeflow или Argo Workflows для ML-пайплайнов
- [ ] Настроить multi-GPU training (distributed training)
- [ ] Оптимизировать GPU-расходы: MIG, time-slicing, spot instances
- [ ] Внедрить A/B тестирование для моделей
- [ ] Настроить LLM serving (vLLM на K8s)
- [ ] Feature store с Feast
- [ ] Compliance и governance для ML (model cards, audit trail)

**Тест:** Можете спроектировать и внедрить ML-платформу, которая обслуживает 5+ ML-команд? Если да -- вы эксперт.

---

## Как ИИ меняет этот фактор (практические примеры)

Этот фактор -- про ИИ, поэтому тут не «как ИИ помогает», а «как использовать ИИ каждый день».

### Ежедневный ИИ-workflow DevOps-инженера

**Утро: Планирование**
```
Промпт: "Мне нужно мигрировать 3 микросервиса с Docker Compose
на Kubernetes. Сервисы: API (Node.js), Worker (Python), Redis.
Создай план миграции с конкретными шагами и Helm-чартами для каждого."
```

**День: Разработка**
```
Промпт: "Создай GitHub Actions workflow:
1. On push to feature branch: lint + test + build image
2. On PR to main: terraform plan + security scan
3. On merge to main: terraform apply + deploy to staging
4. On tag: deploy to production (manual approval)
Используй OIDC для AWS credentials, не static keys."
```

**Инцидент: Troubleshooting**
```
Промпт: "Alertmanager сработал: 'HighMemoryUsage' на pod 'api-server'.
Вот вывод kubectl top pods, kubectl describe pod, и последние 50 строк логов:
[вставить данные]
Что может быть причиной и как исправить?"
```

**Вечер: Документация**
```
Промпт: "На основе этого Terraform-кода [вставить] создай:
1. Architecture Decision Record (ADR) — почему выбрали эту архитектуру
2. Runbook для восстановления после аварии
3. Диаграмму архитектуры в Mermaid-формате"
```

### Построение MLOps-пайплайнов с ИИ

```
Промпт: "Создай Argo Workflows template для ML-пайплайна:
1. Step 1: Загрузить данные из S3
2. Step 2: Preprocessing (Python container)
3. Step 3: Training (GPU container, PyTorch)
4. Step 4: Evaluation (сравнить с предыдущей моделью)
5. Step 5: Если accuracy > threshold -> register в MLflow
6. Step 6: Deploy через KServe (canary 10% -> 50% -> 100%)
Каждый step — отдельный контейнер с конкретными resource requests."
```

### ИИ-инструменты для DevOps в 2026

| Инструмент | Категория | Как использовать |
|------------|-----------|---------------------|
| Claude Code / GitHub Copilot | Кодинг | Генерация Terraform, K8s, CI/CD |
| ChatGPT / Claude | Troubleshooting | Дебаг, объяснения, планирование |
| K8sGPT | K8s-специфичный | Автоматический анализ проблем кластера |
| AWS Infrastructure Composer | AWS | Визуальное проектирование архитектуры |
| Kubecost + ИИ | FinOps | Оптимизация расходов K8s |

---

## Типичные ошибки и ловушки

### Ловушка 1: «ИИ меня заменит»

**Что это:** Страх, что ИИ сделает DevOps-инженеров ненужными.

**Почему вредит:** Парадокс: те, кто боится ИИ и игнорирует его -- действительно станут неконкурентоспособными. Не из-за ИИ, а из-за тех, кто его использует.

**Исправление:** ИИ -- это инструмент, как Terraform или Docker. Он усиливает ваши навыки, а не заменяет их. С ним вы часто делаете рутину заметно быстрее, но критическая часть всё ещё за вами: понять, проверить и безопасно применить результат.

### Ловушка 2: Игнорирование ИИ-инструментов

**Что это:** «Я всё делаю вручную, мне не нужен ИИ».

**Почему вредит:** Вы заметно медленнее коллеги, который использует ИИ. Это как отказываться от IDE в пользу Notepad.

**Исправление:** Начните с простого:
1. Используйте ИИ для генерации boilerplate (Terraform modules, K8s manifests)
2. Используйте ИИ для troubleshooting (вставьте логи -> получите решение)
3. Используйте ИИ для обучения (объясни концепцию -> задай вопрос)

### Ловушка 3: Попытка стать ML-инженером

**Что это:** DevOps-инженер изучает PyTorch, TensorFlow, математику глубокого обучения.

**Почему вредит:** Вы тратите месяцы на навыки, которые не нужны для вашей роли. ML-инженеры имеют PhD и годы опыта. Вы не станете ML-инженером за 3 месяца.

**Исправление:** Ваша зона -- **инфраструктура для ML**:
- CI/CD для ML-проектов
- GPU scheduling на K8s
- Model serving и scaling
- Monitoring и observability
- Cost optimization для GPU

### Ловушка 4: «Слепое доверие к ИИ»

**Что это:** Копировать сгенерированный ИИ код без проверки.

**Почему вредит:** ИИ генерирует код, который выглядит правильно, но может иметь критические ошибки: открытые Security Groups, чрезмерные IAM-привилегии, отсутствие шифрования.

**Исправление:** Правило «доверяй, но проверяй»:
1. ИИ генерирует -> вы ревьюите
2. Запускайте linting (tflint, checkov) на сгенерированном коде
3. Тестируйте в staging перед production
4. Понимайте каждую строку кода, который деплоите

### Ловушка 5: GPU-расходы без контроля

**Что это:** GPU-инстансы работают 24/7, даже когда inference трафик = 0.

**Почему вредит:** Один g5.xlarge = ~$1/час. 24/7 = $730/мес. 10 таких = $7,300/мес. И это без нагрузки.

**Исправление:**
- Scale-to-zero для inference (KEDA + KServe)
- Spot instances для training (экономия 60-90%)
- Мониторинг GPU utilization (алерт при < 30%)
- Batch processing вместо real-time где возможно
- Model quantization (меньшая модель = меньший GPU)

---

## Мини-практика (5 упражнений)

### Упражнение 1: Ежедневное использование ИИ для DevOps (новичок)

**Цель:** Интегрировать ИИ в ежедневный рабочий процесс.

```
Неделя-челлендж:
Понедельник: Сгенерировать Terraform-модуль для S3 + CloudFront с помощью ИИ
Вторник: Попросить ИИ сделать security review вашего Dockerfile
Среда: Создать K8s-манифесты для нового сервиса через ИИ
Четверг: Дебажить реальную проблему с помощью ИИ (вставить логи + описать контекст)
Пятница: Сгенерировать CI/CD-пайплайн и runbook через ИИ

Для каждого дня:
1. Запишите промпт
2. Запишите результат
3. Что пришлось исправить
4. Сколько времени сэкономлено

Критерий успеха: ИИ используется минимум 5 раз в день для DevOps-задач
```

### Упражнение 2: CI/CD для ML-проекта (уверенный)

**Цель:** Построить полный пайплайн для ML.

```
Шаги:
1. Создать простой ML-проект: FastAPI + scikit-learn model
2. Dockerfile: multi-stage, non-root, health check
3. GitHub Actions pipeline:
   - Lint + test
   - Train model (с фиксированным seed для воспроизводимости)
   - Evaluate (сравнить с baseline)
   - Build и push Docker image
   - Register model в MLflow
   - Deploy в K8s (Deployment + Service + Ingress)
4. MLflow:
   - Установить MLflow server
   - Логировать experiment parameters, metrics, artifacts
   - Model registry: staging -> production
5. Мониторинг: latency, throughput, error rate

Критерий успеха: push в main -> автоматическая тренировка -> evaluation -> deploy
```

### Упражнение 3: GPU-нагрузка на K8s (уверенный -> эксперт)

**Цель:** Научиться работать с GPU на Kubernetes.

```
Шаги:
1. Настроить K8s-кластер с GPU-нодами
   (EKS с g4dn.xlarge или kind + NVIDIA GPU)
2. Установить NVIDIA GPU Operator
3. Создать Pod с GPU:
   - requests: nvidia.com/gpu: 1
   - limits: nvidia.com/gpu: 1
4. Запустить inference-сервис (FastAPI + PyTorch model)
5. Настроить HPA на custom metrics (request queue length)
6. Мониторинг: DCGM Exporter -> Prometheus -> Grafana
   - GPU utilization
   - GPU memory usage
   - Temperature
7. Оптимизация: scale-to-zero при отсутствии трафика

Критерий успеха: GPU-нагрузка работает на K8s с auto-scaling и мониторингом
```

### Упражнение 4: Model Serving Pipeline (уверенный -> эксперт)

**Цель:** Задеплоить ML-модель production-ready способом.

```
Шаги:
1. Выбрать serving framework: KServe или vLLM
2. Контейнеризировать модель
3. Создать K8s-ресурсы для serving:
   - InferenceService (KServe) или Deployment
   - Auto-scaling (min 0, max 5)
   - Resource requests/limits
4. Canary deployment: 10% -> 50% -> 100%
5. A/B тестирование: старая модель vs новая
6. Мониторинг:
   - Latency (p50, p95, p99)
   - Throughput (requests/sec)
   - Error rate
   - Model-specific metrics (accuracy, drift)
7. Rollback procedure: автоматический при error rate > 5%

Критерий успеха: модель деплоится через GitOps с canary и автоматическим rollback
```

### Упражнение 5: LLM Serving на K8s (эксперт)

**Цель:** Задеплоить LLM для inference.

```
Шаги:
1. Выбрать open-source модель (Llama 3, Mistral)
2. Установить vLLM на K8s:
   - GPU node с достаточным VRAM
   - Model weights из Hugging Face Hub или S3
   - vLLM Deployment с OpenAI-совместимым API
3. Оптимизация:
   - Quantization (AWQ или GPTQ) для уменьшения VRAM
   - Continuous batching (vLLM делает автоматически)
   - Tensor parallelism для multi-GPU
4. Ingress + rate limiting
5. Мониторинг:
   - Tokens/second
   - Time-to-first-token (TTFT)
   - GPU utilization и VRAM usage
6. Cost analysis: сравнить с OpenAI API pricing

Критерий успеха: LLM работает на K8s, доступен через API, с мониторингом и auto-scaling
```

---

## «Сигналы» готовности к работе (чек-лист)

### Обязательное:

- [ ] Ежедневно использовать ИИ для DevOps-задач и знать его ограничения
- [ ] Писать эффективные промпты для генерации Terraform/K8s/CI кода
- [ ] Объяснить, как ИИ помогает в troubleshooting, генерации кода и документации

### Если идёте в MLOps-специализацию:

- [ ] Объяснить разницу между training и inference
- [ ] Контейнеризировать ML-сервис (FastAPI + модель)
- [ ] Понять, зачем нужен GPU и какие есть типы GPU-инстансов
- [ ] Знать основные MLOps-инструменты: MLflow, KServe, vLLM

### Желательное:

- [ ] Построить CI/CD-пайплайн для ML-проекта
- [ ] Настроить GPU-ноды в K8s с NVIDIA Device Plugin
- [ ] Задеплоить модель через KServe или vLLM
- [ ] Настроить model monitoring (drift detection)
- [ ] Оптимизировать GPU-расходы (spot instances, scale-to-zero)
- [ ] Понимать MLflow model registry

### На собеседовании сможете:

- [ ] Объяснить, как ИИ меняет работу DevOps-инженера (с конкретными примерами)
- [ ] Описать MLOps-пайплайн от тренировки до serving
- [ ] Объяснить разницу между DevOps и MLOps
- [ ] Описать, как масштабировать inference endpoint
- [ ] Объяснить стратегию оптимизации GPU-расходов
- [ ] Описать, как мониторить ML-модель в production

---

## Ссылки внутри репозитория

- Предыдущий фактор: [Инфраструктура как код](../04-infrastructure-as-code/)
- Контейнеры для ML: [Контейнеры и Kubernetes](../02-containers-and-kubernetes/)
- Облачная GPU-инфраструктура: [Облачное внедрение](../01-cloud-adoption/)
- Безопасность ML-пайплайнов: [DevSecOps](../03-devsecops/)
- IaC для ML-инфраструктуры: [Инфраструктура как код](../04-infrastructure-as-code/)
- Общая дорожная карта: [Roadmap](../90-roadmap/)
- Ошибки, которых стоит избегать: [Типичные ошибки](../91-mistakes/)
- Вернуться на [главную страницу](../)

Этот фактор особенно полезен тем, кто хочет показать современное инженерное мышление: не спорить с новой реальностью, а использовать её себе в усиление.

**Примените этот фактор:** [Проект А — Full-Stack DevOps Platform (MLOps-трек)](../90-roadmap/#канонические-проекты-портфолио)
