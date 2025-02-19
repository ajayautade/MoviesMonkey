.PHONY: help dev build start stop clean test lint docker-build docker-run docker-stop

# Default target
help: ## Show this help
	@echo "MovieMonkey - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ─── Local Development ────────────────────────────────────────
install: ## Install dependencies
	npm install

dev: ## Start development server
	npm start

test: ## Run tests
	npm test -- --coverage --watchAll=false

lint: ## Run ESLint
	npx eslint src/ --ext .js,.jsx

build: ## Build for production
	npm run build

# ─── Docker ───────────────────────────────────────────────────
docker-build: ## Build Docker image
	docker build -t moviemonkey:latest .

docker-run: ## Run Docker container
	docker run -d -p 80:80 --name moviemonkey moviemonkey:latest

docker-stop: ## Stop Docker container
	docker stop moviemonkey && docker rm moviemonkey

# ─── Docker Compose ───────────────────────────────────────────
up: ## Start app with docker-compose (production)
	docker-compose up -d app

up-dev: ## Start app with docker-compose (development with hot-reload)
	docker-compose --profile dev up -d dev

down: ## Stop all docker-compose services
	docker-compose down

logs: ## View docker-compose logs
	docker-compose logs -f

# ─── Kubernetes ───────────────────────────────────────────────
k8s-deploy: ## Deploy to Kubernetes
	kubectl apply -f k8s/namespace.yaml
	kubectl apply -f k8s/

k8s-delete: ## Remove Kubernetes deployment
	kubectl delete -f k8s/

# ─── Cleanup ──────────────────────────────────────────────────
clean: ## Clean build artifacts and node_modules
	rm -rf build node_modules coverage
