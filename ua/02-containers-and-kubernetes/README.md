# Фактор 2: Контейнери та Kubernetes

![Containers & Kubernetes](../../en/02-containers-and-kubernetes/02-containers-and-kubernetes.png)

> **Швидкий старт**
> - **7 днів:** Напишіть Dockerfile → запустіть застосунок із Docker Compose. Прочитайте «Що НЕ вчити першим».
> - **30 днів:** Завершіть рівень початківця → задеплойте у локальний K8s (kind або minikube) → продебажте перший CrashLoopBackOff (Вправа 5).

---

## Старт тут

- **Мінімальний шлях:** Спочатку Docker. Не йдіть у Kubernetes, поки не вмієте локально збирати, запускати, інспектувати й дебажити контейнери.
- **Поріг найму:** Вийдіть на рівень **впевнений** з Deployments, Services, Ingress, Helm, probes, resource limits і системним troubleshooting.
- **Залиште на потім:** Оператори, service mesh, multi-cluster і глибоке налаштування Gateway API або Karpenter.

---

## Чому це важливо у 2026

Docker — це базовий навик. Kubernetes — частий стандарт оркестрації та важливий крок для cloud-native ролей.

Контейнери змінили спосіб, яким ми пакуємо, доставляємо та запускаємо застосунки. Kubernetes став **де-факто стандартом оркестрації** — не тому, що він простий (він складний), а тому, що він вирішує реальні проблеми масштабування.

У 2026 році:
- **Docker** — очікується на багатьох командах як базовий мінімум
- **Kubernetes** — часто відрізняє початковий рівень від більш упевненого mid-level
- **Container security** — сканування образів, non-root і policy checks дедалі частіше стають нормою (див. [Фактор 3: DevSecOps](../03-devsecops/))
- **GitOps** — деплой через Git (ArgoCD, Flux) дедалі частіше зустрічається в зрілих командах

---

## Яку проблему це вирішує в реальних командах

«У мене на машині працює» — це фраза, яку контейнери вбили раз і назавжди.

| Проблема | Без контейнерів | З контейнерами |
|----------|-----------------|----------------|
| «У мене працює, на сервері — ні» | Різні версії бібліотек, ОС, залежностей | Однакове середовище скрізь |
| Конфлікти залежностей | Python 3.8 для одного сервісу, 3.11 для іншого | Ізольовані середовища |
| Повільний деплой | Ansible playbook 20 хвилин | Docker pull + run за секунди |
| Масштабування | Ручне додавання серверів | K8s auto-scaling |
| Rollback | «Відкотити зміни? Які саме?» | `kubectl rollout undo` |
| Microservices | Складне управління десятками процесів | Кожен сервіс — окремий pod |

**Реальний приклад:** E-commerce команда з 8 мікросервісами. До K8s: деплой займав 2 години, rollback — 45 хвилин, масштабування — ручне. Після K8s: деплой через CI/CD за 5 хвилин, rollback за 30 секунд, auto-scaling за метриками CPU/пам'яті.

---

## Що потрібно вивчити (ключові навички)

### Етап 1: Docker (фундамент)

```
Docker-навички (в порядку пріоритету):
├── Dockerfile — написання з нуля
│   ├── Вибір базового образу (alpine vs slim vs full)
│   ├── Порядок шарів для оптимізації кешу
│   ├── Multi-stage builds (обов'язково!)
│   └── .dockerignore
├── Docker CLI
│   ├── build, run, exec, logs, inspect
│   ├── Мережі (bridge, host, none)
│   ├── Volumes та bind mounts
│   └── docker compose (для локальної розробки)
├── Docker Registry
│   ├── Docker Hub, ECR, GCR, GHCR
│   ├── Тегування образів (семантичне версіонування)
│   └── Оптимізація розміру образів
└── Безпека образів
    ├── Не запускати від root
    ├── Сканування (Trivy, Snyk)
    └── Мінімальні базові образи
```

**Приклад правильного Dockerfile (multi-stage):**

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

### Етап 2: Kubernetes (основні об'єкти)

```
K8s-об'єкти (в порядку вивчення):
├── Pod — мінімальна одиниця деплою
├── Deployment — управління replica sets
├── Service — мережевий доступ до подів
│   ├── ClusterIP (внутрішній)
│   ├── NodePort (зовнішній, для тестів)
│   └── LoadBalancer (зовнішній, для production)
├── ConfigMap — конфігурація
├── Secret — секрети (base64 != шифрування!)
├── Namespace — ізоляція середовищ
├── Ingress — HTTP/HTTPS маршрутизація
├── PersistentVolume / PVC — сховища
├── HPA — горизонтальне автомасштабування
├── RBAC — контроль доступу
└── NetworkPolicy — мережева безпека
```

### Етап 3: Helm та шаблонізація

```
Helm-навички:
├── Встановлення чартів (helm install/upgrade/rollback)
├── Робота з values.yaml
├── Створення власних чартів
├── Шаблонізація (templates, helpers)
├── Управління releases
└── Helm repositories
```

### Етап 4: Мережа в Kubernetes

```
Мережеві концепції:
├── Pod-to-Pod комунікація
├── Service discovery (DNS)
├── Ingress controllers (NGINX, Traefik)
├── Network Policies
├── Service Mesh (Istio/Linkerd) — для рівня «експерт»
└── CoreDNS
```

### Етап 5: Gateway API

Gateway API — сучасніший мережевий API, який розвивається поруч із Ingress. Ingress усе ще широко використовується і залишається нормальною точкою входу для навчання, а Gateway API стає важливішим у нових і складніших сценаріях маршрутизації.

**Чому це важливо:**
- Ingress закриває базові сценарії, але нові можливості в екосистемі частіше зміщуються в бік Gateway API.
- Gateway API краще підходить для мультиорендних кластерів і складніших політик трафіку.
- Розділяє маршрутизацію трафіку на три ресурси: `GatewayClass` (рівень кластера), `Gateway` (рівень namespace), `HTTPRoute` (рівень застосунку).
- Нативний traffic splitting, header matching, крос-namespace маршрутизація — без хаків через анотації.

**Ключові ресурси:**
```
Gateway API:
├── GatewayClass   — визначає контролер (як IngressClass)
├── Gateway        — listener (порт 80/443 з TLS)
└── HTTPRoute      — правила маршрутизації (path, header, weight)
```

**Реалізації:** Envoy Gateway, Nginx Gateway Fabric, Istio, Traefik, Cilium.

### Етап 6: Автомасштабування нод з Karpenter

Karpenter — AWS-нативний інструмент динамічного provisioning нод для EKS. У багатьох EKS-сценаріях його дедалі частіше рекомендують замість жорсткої прив’язки до заздалегідь створених node groups, але Cluster Autoscaler і далі існує та використовується.

**Чому Karpenter часто обирають для EKS:**
- Cluster Autoscaler масштабує заздалегідь визначені node groups.
- Karpenter вибирає оптимальний тип інстансу для кожного навантаження під час виконання.
- Консолідація: Karpenter може замінити напівпусту ноду на меншу автоматично.
- Обробка Spot: Karpenter перебалансовує навантаження при перериванні spot-інстансів.

**Ключові ресурси:**
```
Karpenter:
├── NodePool       — обмеження на ноди, які Karpenter може виділяти
│   ├── категорії інстансів, розміри, сімейства
│   ├── тип ємності (on-demand vs spot)
│   └── термін дії та бюджет переривань
└── EC2NodeClass   — AWS-специфічна конфігурація (AMI, subnet, security groups)
```

---

## Що можна пропустити / «найгірший ROI» для початку

### НЕ вчіть першим:

1. **Docker Swarm** — програв Kubernetes. Знати про існування — так. Вивчати глибоко — ні.

2. **Nomad** — хороший інструмент, але нішевий. Kubernetes — стандарт ринку. Вивчайте Nomad, тільки якщо ваша компанія його використовує.

3. **Кастомні оператори K8s з першого дня** — Operator SDK, controller-runtime — це для досвідчених K8s-інженерів. Спочатку навчіться використовувати існуючі оператори.

4. **Service Mesh з першого дня** — Istio/Linkerd додають складність. Вони потрібні для великих розподілених систем, не для навчання.

5. **K8s the Hard Way як перший крок** — Kelsey Hightower's K8s the Hard Way — відмінний ресурс, але для розуміння внутрішніх механізмів. Спочатку навчіться ВИКОРИСТОВУВАТИ K8s.

### Найгірший ROI:

| Дія | Чому поганий ROI | Що робити замість |
|-----|-------------------|-------------------|
| Вчити Docker Compose замість K8s | Compose — для локальної розробки, не для production | Compose для dev, K8s для prod |
| Налаштовувати K8s на bare metal для навчання | Тижні на інфраструктуру замість навчання | Minikube / kind / k3s |
| Писати Helm-чарти до розуміння K8s-маніфестів | Шаблонізація без розуміння = помилки | Спочатку чисті YAML, потім Helm |
| Вивчати всі Ingress controllers | Їх десятки, всі роблять схоже | NGINX Ingress — стандарт для старту |

---

## Наскільки глибоко занурюватися

### Початківець (2-4 тижні)

- [ ] Написати Dockerfile для простого застосунку (Node.js або Python)
- [ ] Зрозуміти multi-stage builds і навіщо вони
- [ ] Запустити Docker Compose з 2-3 сервісами (app + db + redis)
- [ ] Встановити Minikube або kind
- [ ] Створити Deployment + Service + Ingress
- [ ] Зрозуміти різницю між ClusterIP, NodePort та LoadBalancer
- [ ] Використовувати `kubectl` базові команди: get, describe, logs, exec

**Тест:** Можете контейнеризувати застосунок і задеплоїти його в локальний K8s за 1 годину? Якщо так — йдіть далі.

### Впевнений (6-10 тижнів)

- [ ] Писати production-ready Dockerfile (non-root, health checks, multi-stage)
- [ ] Налаштувати Helm-чарт для свого застосунку
- [ ] Конфігурувати HPA (Horizontal Pod Autoscaler)
- [ ] Налаштувати Ingress з TLS
- [ ] Розуміти та використовувати RBAC
- [ ] Працювати з ConfigMaps та Secrets (зовнішні secret stores)
- [ ] Налаштувати Network Policies
- [ ] Дебажити проблеми: CrashLoopBackOff, ImagePullBackOff, Pending pods
- [ ] Працювати з PersistentVolumes
- [ ] Зрозуміти node affinity, taints та tolerations
- [ ] Розуміти, коли використовувати Gateway API замість Ingress

**Тест:** Можете задеплоїти мікросервісний застосунок (3+ сервіси) в K8s з Helm, ingress, HPA та моніторингом? Якщо так — ви впевнений.

### Експерт (3-6 місяців)

- [ ] Налаштувати production K8s-кластер (EKS/GKE/AKS)
- [ ] Впровадити GitOps з ArgoCD або Flux
- [ ] Налаштувати Service Mesh (Istio або Linkerd)
- [ ] Писати кастомні контролери або оператори
- [ ] Оптимізувати ресурси: requests/limits, VPA, Goldilocks
- [ ] Налаштувати multi-cluster стратегію
- [ ] Впровадити progressive delivery (Canary, Blue-Green) з Argo Rollouts
- [ ] Розуміти K8s internals: API server, etcd, scheduler, kubelet
- [ ] Налаштувати Karpenter NodePools та EC2NodeClasses для оптимального виділення нод
- [ ] Використовувати консолідацію Karpenter для автоматичного rightsizing нод кластера

**Тест:** Можете спроєктувати та підтримувати K8s-платформу для команди з 20+ розробників? Якщо так — ви експерт.

---

## Як ШІ змінює цей фактор (практичні приклади)

### 1. Генерація K8s-маніфестів

```
Промпт:
"Створи Kubernetes Deployment для Node.js-застосунку:
- 3 репліки
- Образ: myapp:1.2.3
- Resource limits: 256Mi RAM, 250m CPU
- Resource requests: 128Mi RAM, 100m CPU
- Liveness та readiness probes на /health
- Environment variables з ConfigMap 'app-config'
- Secret 'db-credentials' для DATABASE_URL
Додай відповідний Service (ClusterIP) та HPA (min 3, max 10, target CPU 70%)."
```

### 2. Дебаг подів

```
Промпт:
"Мій pod у статусі CrashLoopBackOff. Ось вивід kubectl describe pod:
[вставити вивід]
Ось логи з kubectl logs:
[вставити логи]
Що не так і як виправити?"
```

### 3. Оптимізація Dockerfile

```
Промпт:
"Проаналізуй цей Dockerfile та запропонуй оптимізації
для зменшення розміру образу, покращення безпеки
та прискорення білдів:
[вставити Dockerfile]"
```

### 4. Helm-чарти

```
Промпт:
"Створи Helm-чарт для мікросервісу з наступними values:
- replicaCount
- image.repository, image.tag
- service.type, service.port
- ingress.enabled, ingress.host
- resources.requests, resources.limits
- autoscaling.enabled, autoscaling.minReplicas, autoscaling.maxReplicas
Включи helpers для формування імен ресурсів."
```

### 5. Щоденний workflow

| Задача | Без ШІ | З ШІ |
|--------|--------|------|
| Написати K8s-маніфести для нового сервісу | 1-2 години | 10-15 хвилин + ревью |
| Дебаг CrashLoopBackOff | 30-60 хвилин | 5-10 хвилин |
| Створити Helm-чарт | 2-4 години | 30-45 хвилин + адаптація |
| Написати Network Policy | 30-60 хвилин | 5-10 хвилин + тестування |
| Налаштувати Ingress з TLS | 30-60 хвилин | 10 хвилин + перевірка |

---

## Типові помилки та пастки

### Пастка 1: Нерозуміння мережі

**Що це:** «Мій сервіс не бачить інший сервіс» — і години дебагу.

**Чому шкодить:** 70% проблем у K8s — це мережеві проблеми. Якщо ви не розумієте Service, DNS, Network Policies — ви будете витрачати години на прості речі.

**Виправлення:** Вивчіть мережеву модель K8s окремо:
- Pod-to-Pod: кожен pod має свій IP
- Service: стабільний IP + DNS-ім'я
- DNS: `<service>.<namespace>.svc.cluster.local`
- Network Policies: default deny → explicit allow

### Пастка 2: Пропуск namespaces та RBAC

**Що це:** Все в namespace `default`, один kubeconfig з cluster-admin для всіх.

**Чому шкодить:** Нуль ізоляції. Один помилковий `kubectl delete` — і все знесено. На production це катастрофа.

**Виправлення:**
- Namespace per environment: `dev`, `staging`, `production`
- RBAC per team: розробники бачать тільки свій namespace
- Ніколи не використовувати cluster-admin для щоденної роботи

### Пастка 3: Запуск від root у контейнері

**Що це:** Dockerfile без `USER` інструкції. Контейнер працює від root.

**Чому шкодить:** Якщо зловмисник отримає доступ до контейнера — у нього root-права. Container escape = root на хості.

**Виправлення:**
```dockerfile
RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001
USER appuser
```

### Пастка 4: Ігнорування resource requests/limits

**Що це:** Pods без вказаних requests та limits.

**Чому шкодить:** Один «жадібний» pod з'їдає всю пам'ять ноди → OOMKilled → каскадне падіння інших подів.

**Виправлення:**
```yaml
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 256Mi
```

### Пастка 5: `latest` тег у production

**Що це:** `image: myapp:latest` у Deployment.

**Чому шкодить:** Ви не знаєте, яка версія працює. Rollback неможливий. Два деплої з різним кодом мають однаковий тег.

**Виправлення:** Семантичне версіонування або SHA: `myapp:1.2.3` або `myapp:abc1234`.

### Пастка 6: Kubectl apply з локальної машини в production

**Що це:** Зміни в production через `kubectl apply -f` з ноутбука.

**Чому шкодить:** Немає аудиту, немає ревью, немає rollback. «Хто змінив production?» — ніхто не знає.

**Виправлення:** GitOps: всі зміни через Git → ArgoCD/Flux → K8s. Ніяких ручних `kubectl apply`.

---

## Міні-практика (5 вправ)

### Вправа 1: Контейнеризація багатосервісного застосунку (початківець)

**Мета:** Освоїти Docker та Docker Compose.

```
Кроки:
1. Створити простий застосунок: API (Node.js/Python) + PostgreSQL + Redis
2. Написати Dockerfile для API (multi-stage build)
3. Створити docker-compose.yaml для локальної розробки
4. Налаштувати health checks для всіх сервісів
5. Оптимізувати розмір образу (< 100MB для API)
6. Додати .dockerignore

Критерій успіху: docker compose up — і все працює з першого разу
```

### Вправа 2: Деплой у Kubernetes з Helm (впевнений)

**Мета:** Освоїти основні K8s-об'єкти та Helm.

```
Кроки:
1. Встановити Minikube або kind
2. Створити Helm-чарт для вашого застосунку
3. Deployment з 3 репліками, probes, resource limits
4. Service (ClusterIP) + Ingress з TLS (cert-manager)
5. ConfigMap для конфігурації, Secret для credentials
6. HPA: масштабування від 3 до 10 подів при CPU > 70%
7. Задеплоїти PostgreSQL через Helm-чарт (bitnami/postgresql)
8. Перевірити: kubectl get all -n <namespace>

Критерій успіху: застосунок доступний через Ingress, масштабується автоматично
```

### Вправа 3: Налаштування Ingress та мережевих політик (впевнений)

**Мета:** Глибоко зрозуміти мережу в K8s.

```
Кроки:
1. Встановити NGINX Ingress Controller
2. Налаштувати Ingress для 3 сервісів (path-based routing)
3. Додати TLS через cert-manager (Let's Encrypt або self-signed)
4. Створити Network Policies:
   - Default deny all ingress в namespace
   - Дозволити API → Database
   - Дозволити Ingress → API
   - Заборонити Database → будь-що зовнішнє
5. Протестувати: kubectl exec -it <pod> -- curl <service>

Критерій успіху: тільки дозволений трафік проходить
```

### Вправа 4: CI/CD для Kubernetes (впевнений → експерт)

**Мета:** Повний пайплайн від коміту до деплою.

```
Кроки:
1. GitHub Actions (або GitLab CI) пайплайн:
   - Lint Dockerfile (hadolint)
   - Build та push образу (з тегом = SHA коміту)
   - Сканування образу (Trivy)
   - Оновити Helm values (image tag)
   - Deploy в staging через ArgoCD
2. ArgoCD:
   - Встановити ArgoCD в K8s
   - Створити Application для staging та production
   - Налаштувати auto-sync для staging
   - Manual sync для production
3. Протестувати повний цикл: код → PR → merge → auto-deploy

Критерій успіху: push в main = автоматичний деплой у staging за 5 хвилин
```

### Вправа 5: Troubleshooting challenge (впевнений)

**Мета:** Навчитися дебажити K8s як профі.

```
Сценарії для дебагу (створіть їх самі та виправте):
1. Pod у CrashLoopBackOff (неправильна команда CMD)
2. Pod у Pending (недостатньо ресурсів)
3. Pod у ImagePullBackOff (неправильний тег)
4. Service не маршрутизує трафік (неправильні labels)
5. Ingress повертає 404 (неправильний path)
6. Pod не може з'єднатися з іншим сервісом (Network Policy)

Для кожного:
1. Діагностувати проблему (kubectl describe, logs, events)
2. Знайти причину
3. Виправити
4. Задокументувати: симптом → діагностика → причина → рішення

Критерій успіху: для кожного сценарію написаний runbook
```

---

## «Сигнали» готовності до роботи (чек-лист)

### Обов'язкове:

- [ ] Написати production-ready Dockerfile (multi-stage, non-root, health check)
- [ ] Оптимізувати розмір образу до розумного мінімуму
- [ ] Пояснити різницю між CMD та ENTRYPOINT
- [ ] Створити Deployment з probes, resource limits та rolling update strategy
- [ ] Пояснити різницю між ClusterIP, NodePort та LoadBalancer
- [ ] Налаштувати Ingress з path-based routing
- [ ] Працювати з ConfigMaps та Secrets
- [ ] Використовувати kubectl для діагностики: describe, logs, exec, port-forward
- [ ] Дебажити основні проблеми: CrashLoopBackOff, Pending, ImagePullBackOff
- [ ] Встановити застосунок через Helm

### Бажане:

- [ ] Створити власний Helm-чарт
- [ ] Налаштувати HPA та зрозуміти VPA
- [ ] Налаштувати Network Policies
- [ ] Використовувати RBAC для ізоляції
- [ ] Працювати з PersistentVolumes
- [ ] Знати, як працює ArgoCD або Flux (GitOps)
- [ ] Сканувати образи на вразливості (Trivy)

### На співбесіді зможете:

- [ ] Пояснити різницю між Docker і containerd
- [ ] Описати життєвий цикл пода
- [ ] Пояснити, як працює Service discovery в K8s
- [ ] Намалювати архітектуру K8s-кластера (control plane vs worker nodes)
- [ ] Описати стратегію деплою (rolling update vs blue-green vs canary)
- [ ] Пояснити, чому потрібні resource requests та limits

---

## Посилання всередині репозиторію

- Попередній фактор: [Хмарне впровадження](../01-cloud-adoption/)
- Наступний фактор: [DevSecOps](../03-devsecops/)
- IaC для K8s: [Інфраструктура як код](../04-infrastructure-as-code/)
- Безпека контейнерів: [DevSecOps](../03-devsecops/)
- ШІ для K8s: [ШІ та MLOps](../05-ai-and-mlops/)
- Моніторинг K8s: [Спостережуваність та SRE](../06-observability-and-sre/)
- Загальна дорожня карта: [Roadmap](../90-roadmap/)
- Помилки, яких варто уникати: [Типові помилки](../91-mistakes/)
- Повернутися до [головної сторінки](../)

**Застосуйте цей фактор:** [Проєкт А — Full-Stack DevOps Platform](../90-roadmap/#канонічні-проєкти-портфоліо)
