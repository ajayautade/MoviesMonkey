# 🎬 Movies Monkey

[![CI](https://github.com/ajayautade/MoviesMonkey/actions/workflows/ci.yml/badge.svg)](https://github.com/ajayautade/MoviesMonkey/actions/workflows/ci.yml)
[![CD](https://github.com/ajayautade/MoviesMonkey/actions/workflows/cd.yml/badge.svg)](https://github.com/ajayautade/MoviesMonkey/actions/workflows/cd.yml)
[![Docker Image](https://img.shields.io/docker/image-size/ajayautade/moviemonkey/latest?label=Docker%20Image)](https://hub.docker.com/r/ajayautade/moviemonkey)

Movies Monkey is a **React-based web application** designed for movie enthusiasts. It allows users to discover upcoming films, search for specific titles, and manage a personal watchlist. The application features a modern, responsive interface with both light and dark themes.

Built with a full **DevOps pipeline** — containerized with Docker, orchestrated on Kubernetes, provisioned with Terraform, and monitored with Prometheus & Grafana.

## 🔗 Live Preview
[MoviesMonkey](https://mymoviesmonkey.netlify.app)

---

## 🌐 Key Features

### 1. Upcoming Movies (Home)
The default landing page showcases the latest upcoming movies. Users can browse these titles immediately upon opening the site.
![Upcoming Movies](./public/home_preview.png)

### 2. Find Movies & Genre Filter
Search for movies by name or explore by genre. The new **Genre Filter** allows users to select categories like Action, Comedy, Drama, etc., to discover movies tailored to their interests.
-   **Search**: Real-time search by title.
-   **Filter**: Dropdown menu to filter movies by official TMDB genres.

### 3. Top Rated Movies
Browse the highest-rated movies of all time, curated from TMDB's database.

### 4. Watchlist Management
Keep track of movies you want to watch. Add movies to your watchlist from any page and manage them in a dedicated section.
![Watchlist](./public/watchlist_preview.png)

### 5. Dark Mode
Toggle between Light and Dark themes for a comfortable viewing experience in any lighting condition. The toggle is conveniently located in the navigation bar.

### 6. Movie Details & Similar Movies
View detailed information about any movie including IMDB ratings, cast, box office data, director, runtime, and awards. Plus, get smart recommendations for similar movies you might enjoy.

---

## 🏗️ Architecture

```mermaid
graph LR
    A[Developer Push] --> B[GitHub Actions CI]
    B --> C{Tests Pass?}
    C -->|Yes| D[Build Docker Image]
    D --> E[Push to Docker Hub]
    E --> F[Deploy to K8s]
    F --> G[Prometheus Metrics]
    G --> H[Grafana Dashboard]
    C -->|No| I[Notify Developer]
```

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, React Router, Axios |
| **Styling** | CSS3 (Custom Grid, Flexbox, Variables) |
| **API** | [TMDB API](https://www.themoviedb.org/documentation/api), [OMDB API](https://www.omdbapi.com/) |
| **Containerization** | Docker (multi-stage), Docker Compose |
| **CI/CD** | GitHub Actions (lint → test → build → push → scan) |
| **Orchestration** | Kubernetes, Helm Charts |
| **IaC** | Terraform (AWS EKS + VPC) |
| **Monitoring** | Prometheus, Grafana, Alertmanager |
| **Security** | Trivy (image scan), Hadolint (Dockerfile lint), npm audit |

---

## 📁 Project Structure

```
MovieMonkey/
├── .github/workflows/       # CI/CD pipelines
│   ├── ci.yml               # Build, test, lint
│   └── cd.yml               # Docker build, push, security scan
├── k8s/                     # Kubernetes manifests
│   ├── deployment.yaml      # 2-replica deployment with probes
│   ├── service.yaml         # NodePort service (port 30000)
│   ├── ingress.yaml         # Nginx ingress
│   ├── configmap.yaml       # Nginx config with caching
│   ├── hpa.yaml             # Horizontal Pod Autoscaler
│   └── namespace.yaml
├── helm/moviemonkey/        # Helm chart
│   ├── Chart.yaml
│   ├── values.yaml          # Default values
│   ├── values-dev.yaml      # Dev overrides
│   ├── values-prod.yaml     # Prod overrides
│   └── templates/
├── terraform/               # AWS infrastructure (EKS + VPC)
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── monitoring/              # Observability stack
│   ├── prometheus.yml
│   ├── alert_rules.yml
│   └── grafana-dashboard.json
├── scripts/
│   ├── setup.sh             # Quick local setup
│   └── deploy.sh            # Multi-target deploy script
├── Dockerfile               # Multi-stage build
├── docker-compose.yml       # App (prod + dev profiles)
├── docker-compose.monitoring.yml
├── Makefile                 # One-command shortcuts
└── src/                     # React application
```

---

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher) and npm for local development
*   [Docker](https://www.docker.com/products/docker-desktop/) (optional, for containerized deployment)

### Local Development
```bash
./scripts/setup.sh
npm start
```

Or manually:
1.  Clone the repository:
    ```bash
    git clone https://github.com/ajayautade/MoviesMonkey.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd MoviesMonkey
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm start
    ```

### Docker Usage

This project includes a multi-stage Dockerfile for containerized deployment.

To build and run locally:
```bash
make docker-build
make docker-run
```

Or manually:
```bash
docker build -t moviemonkey-local .
docker run -d -p 80:80 --name moviemonkey-local moviemonkey-local
```

To pull and run the latest image from Docker Hub:
```bash
docker pull ajayautade/moviemonkey:latest
docker run -d -p 80:80 --name moviemonkey ajayautade/moviemonkey:latest
```

Then visit http://localhost in your browser.

### Docker Compose
```bash
# Production mode
make up

# Development with hot-reload
make up-dev
```

### Kubernetes (Minikube/kind)
```bash
make k8s-deploy
```

### Helm
```bash
# Dev environment
helm install moviemonkey helm/moviemonkey/ -f helm/moviemonkey/values-dev.yaml -n moviemonkey --create-namespace

# Production
helm install moviemonkey helm/moviemonkey/ -f helm/moviemonkey/values-prod.yaml -n moviemonkey --create-namespace
```

---

## ⚙️ CI/CD Pipeline

The project uses **GitHub Actions** with two workflows:

### CI Pipeline (`ci.yml`)
Triggers on push/PR to `main` and `develop`:
1. **Lint** — ESLint code quality check
2. **Test** — Unit tests with coverage
3. **Build** — Production build + artifact upload
4. **Docker Lint** — Hadolint Dockerfile validation

### CD Pipeline (`cd.yml`)
Triggers on push to `main` and version tags:
1. **Docker Build & Push** — Multi-tag image to Docker Hub
2. **Security Scan** — Trivy vulnerability scan
3. **Deploy Notification** — Summary in GitHub Actions

### Required GitHub Secrets
| Secret | Description |
|---|---|
| `TMDB_API_KEY` | TMDB API key |
| `OMDB_API_KEY` | OMDB API key |
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token |

---

## 📊 Monitoring

Start the monitoring stack:
```bash
docker-compose -f docker-compose.monitoring.yml up -d
# Prometheus: http://localhost:9090
# Grafana:    http://localhost:3001 (admin/moviemonkey)
```

| Component | Port | Purpose |
|---|---|---|
| Prometheus | 9090 | Metrics collection |
| Grafana | 3001 | Dashboards & visualization |
| Alertmanager | 9093 | Alert routing |
| Node Exporter | 9100 | System metrics |
| Nginx Exporter | 9113 | Nginx metrics |

### Alert Rules
- **High Error Rate** — >5% of 5xx errors for 5 minutes
- **High Response Time** — P95 latency > 2 seconds
- **Container Down** — App unreachable
- **High Memory Usage** — >90% for 5 minutes

---

## 🚢 Deployment Showcase — K8s + ArgoCD + Monitoring on AWS

MovieMonkey is deployed on a **K3s Kubernetes cluster** running on AWS EC2 (`m7i-flex.large`, Ubuntu 24.04) with **ArgoCD** for GitOps and a full **Prometheus + Grafana** monitoring stack.

### Architecture
```
GitHub (main branch)
  └── k8s/ manifests
        ↓  ArgoCD auto-sync (every 3 min)
K3s Cluster (AWS EC2)
  ├── argocd namespace       → GitOps controller
  ├── moviemonkey namespace  → 2 app replicas
  └── monitoring namespace   → Prometheus + Grafana + AlertManager
```

### 🎬 MovieMonkey Live on Kubernetes
![MovieMonkey Live](./docs/screenshots/01-moviemonkey-live-app.png)

---

### 🔄 ArgoCD GitOps — Continuous Deployment

ArgoCD watches the `k8s/` directory in this repository. Any change pushed to `main` is automatically detected and synced to the cluster — **no manual deployment needed**.

| View | Screenshot |
|---|---|
| **Network View** — Shows the traffic flow: Ingress → Service → 2 Pods | |

![ArgoCD Network](./docs/screenshots/02-argocd-app-network-view.png)

| View | Screenshot |
|---|---|
| **Tree View** — Shows all K8s resources: Deployment, ReplicaSet, HPA, Pods | |

![ArgoCD Tree](./docs/screenshots/03-argocd-app-tree-view.png)

| View | Screenshot |
|---|---|
| **Expanded Tree** — Full resource hierarchy: ConfigMap, Namespace, Service, Deployment, HPA, Ingress | |

![ArgoCD Expanded](./docs/screenshots/04-argocd-app-tree-expanded.png)

| View | Screenshot |
|---|---|
| **App Overview** — Sync status, health, and last sync info | |

![ArgoCD Overview](./docs/screenshots/05-argocd-app-overview.png)

---

### 📊 Grafana Monitoring Dashboards

The monitoring stack includes **30+ pre-built Kubernetes dashboards** plus a custom MovieMonkey application dashboard.

#### Kubernetes Cluster Monitoring

| Dashboard | What It Shows |
|---|---|
| **Kubernetes Overview** | Cluster-wide resource utilization |
| **Cluster Metrics** | Node count, pod scheduling, resource allocation |
| **Node Resources** | Per-node CPU, memory, disk, and network |

![K8s Overview](./docs/screenshots/06-grafana-kubernetes-overview.png)
![Cluster Metrics](./docs/screenshots/07-grafana-cluster-metrics.png)
![Node Resources](./docs/screenshots/08-grafana-node-resources.png)

#### Kubelet & Container Runtime Metrics

| Dashboard | What It Shows |
|---|---|
| **Kubelet Dashboard** | Storage operations, cgroup management |
| **Pod Metrics** | Pod start rate, container operations latency |
| **Operations** | Storage operation rates and error rates |

![Kubelet](./docs/screenshots/09-grafana-kubelet-dashboard.png)
![Pod Metrics](./docs/screenshots/10-grafana-kubelet-pod-metrics.png)
![Operations](./docs/screenshots/11-grafana-kubelet-operations.png)

#### Prometheus Self-Monitoring

![Prometheus Overview](./docs/screenshots/12-grafana-prometheus-overview.png)
![Prometheus Stats](./docs/screenshots/13-grafana-prometheus-stats.png)

---

### 🔍 Prometheus & AlertManager

| Tool | Purpose |
|---|---|
| **Prometheus** | Time-series metrics collection, PromQL queries |
| **AlertManager** | Alert routing, grouping, and silencing |

![Prometheus UI](./docs/screenshots/14-prometheus-ui-targets.png)
![Prometheus Query](./docs/screenshots/15-prometheus-ui-query.png)
![AlertManager](./docs/screenshots/16-alertmanager-ui.png)

---

### 🎬 Custom MovieMonkey Application Dashboard

A dedicated Grafana dashboard for monitoring MovieMonkey, with panels for:
- **Pod Status** — Running replica count
- **CPU & Memory** — Real-time usage per pod
- **Network I/O** — Bytes received/transmitted
- **Pod Restarts** — Stability tracking
- **Node Gauges** — CPU, Memory, Disk % at the node level

![MovieMonkey Dashboard](./docs/screenshots/17-grafana-moviemonkey-dashboard.png)
![MovieMonkey Metrics](./docs/screenshots/18-grafana-moviemonkey-metrics.png)

---

## 🔒 Security

- API keys managed via environment variables (never hardcoded in production)
- Docker image vulnerability scanning with **Trivy**
- Dockerfile best practices validated with **Hadolint**
- `npm audit` for dependency vulnerability checks
- Kubernetes RBAC and resource limits configured
- **[View Detailed Stress Test & Capacity Report](./docs/STRESS_TEST_RESULTS.md)**

> **Note:** For production, you should use environment variables for API keys instead of hardcoding them.

---

## Created By

[Ajay Autade](https://www.linkedin.com/in/ajayautadepatil/)
