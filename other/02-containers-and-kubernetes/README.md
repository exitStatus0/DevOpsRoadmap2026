# Фактор 2: Контейнеры и Kubernetes

![Containers & Kubernetes](../../en/02-containers-and-kubernetes/02-containers-and-kubernetes.png)

**Контейнеры и Kubernetes -- это момент, когда приложение перестаёт зависеть от случайной среды и начинает жить в предсказуемом delivery-процессе. Здесь начинается инженерная воспроизводимость, без которой невозможно уверенно расти, масштабироваться и выпускать изменения без страха.**

> **Быстрый старт**
> - **7 дней:** Контейнеризируйте своё приложение (Node.js или Python) и запустите его через Docker Compose.
> - **30 дней:** Задеплойте его в Minikube с Deployment, Service и Ingress.

---

## Старт здесь

- **Минимальный путь:** Начните с Docker и доведите его до уверенного, почти автоматического навыка. В Kubernetes стоит идти только тогда, когда вы умеете локально собирать, запускать, инспектировать и дебажить контейнеры.
- **Порог найма:** Цель этого модуля -- вывести вас на уровень **middle** с Deployments, Services, Ingress, Helm, probes, resource limits и системным troubleshooting.
- **Оставьте на потом:** Операторы, service mesh, multi-cluster и глубокую настройку Gateway API или Karpenter. Сначала освойте тот слой, который даёт рынку самый быстрый и заметный результат.

---

## Почему это важно в 2026

Docker сегодня воспринимается как базовая инженерная грамотность. Kubernetes -- как следующий шаг для тех, кто хочет не просто запускать контейнеры, а управлять ими в среде, где важны масштаб, повторяемость и скорость изменений.

Контейнеры изменили саму модель доставки приложений. Kubernetes стал стандартом не потому, что он прост, а потому что он решает реальные проблемы команд: предсказуемый деплой, масштабирование, rollback, изоляцию и операционную устойчивость.

В 2026 году это особенно заметно:
- **Docker** -- ожидается как базовый минимум на огромном количестве команд
- **Kubernetes** -- часто отделяет стартовый уровень от более уверенного middle-уровня
- **Container security** -- сканирование образов, non-root и policy checks всё чаще считаются нормой, а не бонусом (см. [Фактор 3: DevSecOps](../03-devsecops/))
- **GitOps** -- деплой через Git становится признаком зрелой платформенной культуры

---

## Какую проблему это решает в реальных командах

Контейнеры и Kubernetes нужны не для красоты в резюме. Они нужны для того, чтобы убрать хаос среды, сократить время релиза и превратить деплой из ручного стресса в повторяемый процесс.

Именно здесь заканчивается фраза «у меня на машине работает» и начинается среда, которой можно доверять в команде.

| Проблема | Без контейнеров | С контейнерами |
|----------|-----------------|----------------|
| «У меня работает, на сервере -- нет» | Разные версии библиотек, ОС, зависимостей | Одинаковое окружение везде |
| Конфликты зависимостей | Python 3.8 для одного сервиса, 3.11 для другого | Изолированные среды |
| Медленный деплой | Ansible playbook 20 минут | Docker pull + run за секунды |
| Масштабирование | Ручное добавление серверов | K8s auto-scaling |
| Rollback | «Откатить изменения? Какие именно?» | `kubectl rollout undo` |
| Microservices | Сложное управление десятками процессов | Каждый сервис -- отдельный pod |

**Реальный пример:** E-commerce команда с 8 микросервисами. До K8s: деплой занимал 2 часа, rollback -- 45 минут, масштабирование -- ручное. После K8s: деплой через CI/CD за 5 минут, rollback за 30 секунд, auto-scaling по метрикам CPU/памяти.

---

## Что нужно изучить (ключевые навыки)

### Этап 1: Docker (фундамент)

```
Docker-навыки (в порядке приоритета):
├── Dockerfile — написание с нуля
│   ├── Выбор базового образа (alpine vs slim vs full)
│   ├── Порядок слоёв для оптимизации кеша
│   ├── Multi-stage builds (обязательно!)
│   └── .dockerignore
├── Docker CLI
│   ├── build, run, exec, logs, inspect
│   ├── Сети (bridge, host, none)
│   ├── Volumes и bind mounts
│   └── docker compose (для локальной разработки)
├── Docker Registry
│   ├── Docker Hub, ECR, GCR, GHCR
│   ├── Тегирование образов (семантическое версионирование)
│   └── Оптимизация размера образов
└── Безопасность образов
    ├── Не запускать от root
    ├── Сканирование (Trivy, Snyk)
    └── Минимальные базовые образы
```

**Пример правильного Dockerfile (multi-stage):**

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
WORKDIR /app
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/main.js"]
```

### Этап 2: Kubernetes (основные объекты)

```
K8s-объекты (в порядке изучения):
├── Pod — минимальная единица деплоя
├── Deployment — управление replica sets
├── Service — сетевой доступ к подам
│   ├── ClusterIP (внутренний)
│   ├── NodePort (внешний, для тестов)
│   └── LoadBalancer (внешний, для production)
├── ConfigMap — конфигурация
├── Secret — секреты (base64 != шифрование!)
├── Namespace — изоляция окружений
├── Ingress — HTTP/HTTPS маршрутизация
├── PersistentVolume / PVC — хранилища
├── HPA — горизонтальное автомасштабирование
├── RBAC — контроль доступа
└── NetworkPolicy — сетевая безопасность
```

### Этап 3: Helm и шаблонизация

```
Helm-навыки:
├── Установка чартов (helm install/upgrade/rollback)
├── Работа с values.yaml
├── Создание собственных чартов
├── Шаблонизация (templates, helpers)
├── Управление releases
└── Helm repositories
```

### Этап 4: Сеть в Kubernetes

```
Сетевые концепции:
├── Pod-to-Pod коммуникация
├── Service discovery (DNS)
├── Ingress controllers (NGINX, Traefik)
├── Network Policies
├── Service Mesh (Istio/Linkerd) — для уровня «senior»
└── CoreDNS
```

### Этап 5: Gateway API

Gateway API -- более современный сетевой API, который развивается рядом с Ingress. Ingress всё ещё широко используется и остаётся нормальной точкой входа для обучения, а Gateway API становится важнее в новых и более сложных сценариях маршрутизации.

**Почему это важно:**
- Ingress закрывает базовые сценарии, но новые функции в экосистеме чаще смещаются в сторону Gateway API.
- Gateway API лучше подходит для мультиарендных кластеров и более сложных политик трафика.
- Разделяет маршрутизацию трафика на три ресурса: `GatewayClass` (уровень кластера), `Gateway` (уровень namespace), `HTTPRoute` (уровень приложения).
- Нативный traffic splitting, header matching, кросс-namespace маршрутизация — без хаков через аннотации.

**Ключевые ресурсы:**
```
Gateway API:
├── GatewayClass   -- определяет контроллер (как IngressClass)
├── Gateway        -- listener (порт 80/443 с TLS)
└── HTTPRoute      -- правила маршрутизации (path, header, weight)
```

**Реализации:** Envoy Gateway, Nginx Gateway Fabric, Istio, Traefik, Cilium.

### Этап 6: Автомасштабирование нод с Karpenter

Karpenter -- AWS-нативный инструмент динамического provisioning нод для EKS. Во многих EKS-сценариях его всё чаще рекомендуют вместо жёсткой привязки к заранее созданным node groups, но Cluster Autoscaler по-прежнему существует и используется.

**Почему Karpenter часто выбирают для EKS:**
- Cluster Autoscaler масштабирует заранее определённые node groups.
- Karpenter выбирает оптимальный тип инстанса для каждой нагрузки во время выполнения.
- Консолидация: Karpenter может заменить полупустую ноду на меньшую автоматически.
- Обработка Spot: Karpenter перебалансирует нагрузки при прерывании spot-инстансов.

**Ключевые ресурсы:**
```
Karpenter:
├── NodePool       -- ограничения на ноды, которые Karpenter может выделять
│   ├── категории инстансов, размеры, семейства
│   ├── тип ёмкости (on-demand vs spot)
│   └── срок действия и бюджет прерываний
└── EC2NodeClass   -- AWS-специфичная конфигурация (AMI, subnet, security groups)
```

---

## Что можно пропустить / «худший ROI» для начала

### НЕ учите первым:

1. **Docker Swarm** -- проиграл Kubernetes. Знать о существовании -- да. Изучать глубоко -- нет.

2. **Nomad** -- хороший инструмент, но нишевый. Kubernetes -- стандарт рынка. Изучайте Nomad, только если ваша компания его использует.

3. **Кастомные операторы K8s с первого дня** -- Operator SDK, controller-runtime -- это для опытных K8s-инженеров. Сначала научитесь использовать существующие операторы.

4. **Service Mesh с первого дня** -- Istio/Linkerd добавляют сложность. Они нужны для больших распределённых систем, не для обучения.

5. **K8s the Hard Way как первый шаг** -- Kelsey Hightower's K8s the Hard Way -- отличный ресурс, но для понимания внутренних механизмов. Сначала научитесь ИСПОЛЬЗОВАТЬ K8s.

### Худший ROI:

| Действие | Почему плохой ROI | Что делать вместо |
|----------|-------------------|-------------------|
| Учить Docker Compose вместо K8s | Compose -- для локальной разработки, не для production | Compose для dev, K8s для prod |
| Настраивать K8s на bare metal для обучения | Недели на инфраструктуру вместо обучения | Minikube / kind / k3s |
| Писать Helm-чарты до понимания K8s-манифестов | Шаблонизация без понимания = ошибки | Сначала чистые YAML, потом Helm |
| Изучать все Ingress controllers | Их десятки, все делают похожее | NGINX Ingress -- стандарт для старта |

---

## Насколько глубоко погружаться

### Новичок (2-4 недели)

- [ ] Написать Dockerfile для простого приложения (Node.js или Python)
- [ ] Понять multi-stage builds и зачем они
- [ ] Запустить Docker Compose с 2-3 сервисами (app + db + redis)
- [ ] Установить Minikube или kind
- [ ] Создать Deployment + Service + Ingress
- [ ] Понять разницу между ClusterIP, NodePort и LoadBalancer
- [ ] Использовать `kubectl` базовые команды: get, describe, logs, exec

**Тест:** Можете контейнеризировать приложение и задеплоить его в локальный K8s за 1 час? Если да -- идите дальше.

### Уверенный (6-10 недель)

- [ ] Писать production-ready Dockerfile (non-root, health checks, multi-stage)
- [ ] Настроить Helm-чарт для своего приложения
- [ ] Конфигурировать HPA (Horizontal Pod Autoscaler)
- [ ] Настроить Ingress с TLS
- [ ] Понимать и использовать RBAC
- [ ] Работать с ConfigMaps и Secrets (внешние secret stores)
- [ ] Настроить Network Policies
- [ ] Дебажить проблемы: CrashLoopBackOff, ImagePullBackOff, Pending pods
- [ ] Работать с PersistentVolumes
- [ ] Понять node affinity, taints и tolerations
- [ ] Понимать, когда использовать Gateway API вместо Ingress

**Тест:** Можете задеплоить микросервисное приложение (3+ сервиса) в K8s с Helm, ingress, HPA и мониторингом? Если да -- вы на уровне middle.

### Эксперт (3-6 месяцев)

- [ ] Настроить production K8s-кластер (EKS/GKE/AKS)
- [ ] Внедрить GitOps с ArgoCD или Flux
- [ ] Настроить Service Mesh (Istio или Linkerd)
- [ ] Писать кастомные контроллеры или операторы
- [ ] Оптимизировать ресурсы: requests/limits, VPA, Goldilocks
- [ ] Настроить multi-cluster стратегию
- [ ] Внедрить progressive delivery (Canary, Blue-Green) с Argo Rollouts
- [ ] Понимать K8s internals: API server, etcd, scheduler, kubelet
- [ ] Настроить Karpenter NodePools и EC2NodeClasses для оптимального выделения нод
- [ ] Использовать консолидацию Karpenter для автоматического rightsizing нод кластера

**Тест:** Можете спроектировать и поддерживать K8s-платформу для команды из 20+ разработчиков? Если да -- вы на уровне senior.

---

## Как ИИ меняет этот фактор (практические примеры)

### 1. Генерация K8s-манифестов

```
Промпт:
"Создай Kubernetes Deployment для Node.js-приложения:
- 3 реплики
- Образ: myapp:1.2.3
- Resource limits: 256Mi RAM, 250m CPU
- Resource requests: 128Mi RAM, 100m CPU
- Liveness и readiness probes на /health
- Environment variables из ConfigMap 'app-config'
- Secret 'db-credentials' для DATABASE_URL
Добавь соответствующий Service (ClusterIP) и HPA (min 3, max 10, target CPU 70%)."
```

### 2. Дебаг подов

```
Промпт:
"Мой pod в статусе CrashLoopBackOff. Вот вывод kubectl describe pod:
[вставить вывод]
Вот логи из kubectl logs:
[вставить логи]
Что не так и как исправить?"
```

### 3. Оптимизация Dockerfile

```
Промпт:
"Проанализируй этот Dockerfile и предложи оптимизации
для уменьшения размера образа, улучшения безопасности
и ускорения билдов:
[вставить Dockerfile]"
```

### 4. Helm-чарты

```
Промпт:
"Создай Helm-чарт для микросервиса со следующими values:
- replicaCount
- image.repository, image.tag
- service.type, service.port
- ingress.enabled, ingress.host
- resources.requests, resources.limits
- autoscaling.enabled, autoscaling.minReplicas, autoscaling.maxReplicas
Включи helpers для формирования имён ресурсов."
```

### 5. Ежедневный workflow

| Задача | Без ИИ | С ИИ |
|--------|--------|------|
| Написать K8s-манифесты для нового сервиса | 1-2 часа | 10-15 минут + ревью |
| Дебаг CrashLoopBackOff | 30-60 минут | 5-10 минут |
| Создать Helm-чарт | 2-4 часа | 30-45 минут + адаптация |
| Написать Network Policy | 30-60 минут | 5-10 минут + тестирование |
| Настроить Ingress с TLS | 30-60 минут | 10 минут + проверка |

---

## Типичные ошибки и ловушки

### Ловушка 1: Непонимание сети

**Что это:** «Мой сервис не видит другой сервис» -- и часы дебага.

**Почему вредит:** 70% проблем в K8s -- это сетевые проблемы. Если вы не понимаете Service, DNS, Network Policies -- вы будете тратить часы на простые вещи.

**Исправление:** Изучите сетевую модель K8s отдельно:
- Pod-to-Pod: каждый pod имеет свой IP
- Service: стабильный IP + DNS-имя
- DNS: `<service>.<namespace>.svc.cluster.local`
- Network Policies: default deny -> explicit allow

### Ловушка 2: Пропуск namespaces и RBAC

**Что это:** Всё в namespace `default`, один kubeconfig с cluster-admin для всех.

**Почему вредит:** Ноль изоляции. Один ошибочный `kubectl delete` -- и всё снесено. На production это катастрофа.

**Исправление:**
- Namespace per environment: `dev`, `staging`, `production`
- RBAC per team: разработчики видят только свой namespace
- Никогда не использовать cluster-admin для ежедневной работы

### Ловушка 3: Запуск от root в контейнере

**Что это:** Dockerfile без `USER` инструкции. Контейнер работает от root.

**Почему вредит:** Если злоумышленник получит доступ к контейнеру -- у него root-права. Container escape = root на хосте.

**Исправление:**
```dockerfile
RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001
USER appuser
```

### Ловушка 4: Игнорирование resource requests/limits

**Что это:** Pods без указанных requests и limits.

**Почему вредит:** Один «жадный» pod съедает всю память ноды -> OOMKilled -> каскадное падение других подов.

**Исправление:**
```yaml
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 256Mi
```

### Ловушка 5: `latest` тег в production

**Что это:** `image: myapp:latest` в Deployment.

**Почему вредит:** Вы не знаете, какая версия работает. Rollback невозможен. Два деплоя с разным кодом имеют одинаковый тег.

**Исправление:** Семантическое версионирование или SHA: `myapp:1.2.3` или `myapp:abc1234`.

### Ловушка 6: Kubectl apply с локальной машины в production

**Что это:** Изменения в production через `kubectl apply -f` с ноутбука.

**Почему вредит:** Нет аудита, нет ревью, нет rollback. «Кто изменил production?» -- никто не знает.

**Исправление:** GitOps: все изменения через Git -> ArgoCD/Flux -> K8s. Никаких ручных `kubectl apply`.

---

## Мини-практика (5 упражнений)

### Упражнение 1: Контейнеризация многосервисного приложения (junior)

**Цель:** Освоить Docker и Docker Compose.

```
Шаги:
1. Создать простое приложение: API (Node.js/Python) + PostgreSQL + Redis
2. Написать Dockerfile для API (multi-stage build)
3. Создать docker-compose.yaml для локальной разработки
4. Настроить health checks для всех сервисов
5. Оптимизировать размер образа (< 100MB для API)
6. Добавить .dockerignore

Критерий успеха: docker compose up — и всё работает с первого раза
```

### Упражнение 2: Деплой в Kubernetes с Helm (middle)

**Цель:** Освоить основные K8s-объекты и Helm.

```
Шаги:
1. Установить Minikube или kind
2. Создать Helm-чарт для вашего приложения
3. Deployment с 3 репликами, probes, resource limits
4. Service (ClusterIP) + Ingress с TLS (cert-manager)
5. ConfigMap для конфигурации, Secret для credentials
6. HPA: масштабирование от 3 до 10 подов при CPU > 70%
7. Задеплоить PostgreSQL через Helm-чарт (bitnami/postgresql)
8. Проверить: kubectl get all -n <namespace>

Критерий успеха: приложение доступно через Ingress, масштабируется автоматически
```

### Упражнение 3: Настройка Ingress и сетевых политик (middle)

**Цель:** Глубоко понять сеть в K8s.

```
Шаги:
1. Установить NGINX Ingress Controller
2. Настроить Ingress для 3 сервисов (path-based routing)
3. Добавить TLS через cert-manager (Let's Encrypt или self-signed)
4. Создать Network Policies:
   - Default deny all ingress в namespace
   - Разрешить API -> Database
   - Разрешить Ingress -> API
   - Запретить Database -> что-либо внешнее
5. Протестировать: kubectl exec -it <pod> -- curl <service>

Критерий успеха: только разрешённый трафик проходит
```

### Упражнение 4: CI/CD для Kubernetes (middle -> senior)

**Цель:** Полный пайплайн от коммита до деплоя.

```
Шаги:
1. GitHub Actions (или GitLab CI) пайплайн:
   - Lint Dockerfile (hadolint)
   - Build и push образа (с тегом = SHA коммита)
   - Сканирование образа (Trivy)
   - Обновить Helm values (image tag)
   - Deploy в staging через ArgoCD
2. ArgoCD:
   - Установить ArgoCD в K8s
   - Создать Application для staging и production
   - Настроить auto-sync для staging
   - Manual sync для production
3. Протестировать полный цикл: код -> PR -> merge -> auto-deploy

Критерий успеха: push в main = автоматический деплой в staging за 5 минут
```

### Упражнение 5: Troubleshooting challenge (middle)

**Цель:** Научиться дебажить K8s как профи.

```
Сценарии для дебага (создайте их сами и исправьте):
1. Pod в CrashLoopBackOff (неправильная команда CMD)
2. Pod в Pending (недостаточно ресурсов)
3. Pod в ImagePullBackOff (неправильный тег)
4. Service не маршрутизирует трафик (неправильные labels)
5. Ingress возвращает 404 (неправильный path)
6. Pod не может соединиться с другим сервисом (Network Policy)

Для каждого:
1. Диагностировать проблему (kubectl describe, logs, events)
2. Найти причину
3. Исправить
4. Задокументировать: симптом -> диагностика -> причина -> решение

Критерий успеха: для каждого сценария написан runbook
```

---

## «Сигналы» готовности к работе (чек-лист)

### Обязательное:

- [ ] Написать production-ready Dockerfile (multi-stage, non-root, health check)
- [ ] Оптимизировать размер образа до разумного минимума
- [ ] Объяснить разницу между CMD и ENTRYPOINT
- [ ] Создать Deployment с probes, resource limits и rolling update strategy
- [ ] Объяснить разницу между ClusterIP, NodePort и LoadBalancer
- [ ] Настроить Ingress с path-based routing
- [ ] Работать с ConfigMaps и Secrets
- [ ] Использовать kubectl для диагностики: describe, logs, exec, port-forward
- [ ] Дебажить основные проблемы: CrashLoopBackOff, Pending, ImagePullBackOff
- [ ] Установить приложение через Helm

### Желательное:

- [ ] Создать собственный Helm-чарт
- [ ] Настроить HPA и понять VPA
- [ ] Настроить Network Policies
- [ ] Использовать RBAC для изоляции
- [ ] Работать с PersistentVolumes
- [ ] Знать, как работает ArgoCD или Flux (GitOps)
- [ ] Сканировать образы на уязвимости (Trivy)

### На собеседовании сможете:

- [ ] Объяснить разницу между Docker и containerd
- [ ] Описать жизненный цикл пода
- [ ] Объяснить, как работает Service discovery в K8s
- [ ] Нарисовать архитектуру K8s-кластера (control plane vs worker nodes)
- [ ] Описать стратегию деплоя (rolling update vs blue-green vs canary)
- [ ] Объяснить, почему нужны resource requests и limits

---

## Ссылки внутри репозитория

- Предыдущий фактор: [Облачное внедрение](../01-cloud-adoption/)
- Следующий фактор: [DevSecOps](../03-devsecops/)
- IaC для K8s: [Инфраструктура как код](../04-infrastructure-as-code/)
- Безопасность контейнеров: [DevSecOps](../03-devsecops/)
- ИИ для K8s: [ИИ и MLOps](../05-ai-and-mlops/)
- Мониторинг K8s: [Наблюдаемость и SRE](../06-observability-and-sre/)
- Общая дорожная карта: [Roadmap](../90-roadmap/)
- Ошибки, которых стоит избегать: [Типичные ошибки](../91-mistakes/)
- Вернуться на [главную страницу](../)

Этот фактор особенно хорошо продаёт ваш уровень на собеседовании: по нему быстро видно, умеете ли вы не просто запускать приложение, а доставлять его воспроизводимо и безопасно.

**Примените этот фактор:** [Проект А — Full-Stack DevOps Platform](../90-roadmap/#канонические-проекты-портфолио)
