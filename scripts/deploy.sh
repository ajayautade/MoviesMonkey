#!/bin/bash
# ─── MovieMonkey Deploy Script ────────────────────────────────
# Deploy to Kubernetes or Docker

set -e

ENVIRONMENT=${1:-"docker"}
IMAGE_NAME=${DOCKER_IMAGE:-"ajayautade/moviemonkey"}
IMAGE_TAG=${IMAGE_TAG:-"latest"}

echo "🚀 MovieMonkey Deploy"
echo "====================="
echo "Environment: $ENVIRONMENT"
echo "Image: $IMAGE_NAME:$IMAGE_TAG"
echo ""

case $ENVIRONMENT in
  docker)
    echo "🐳 Deploying with Docker..."
    docker stop moviemonkey 2>/dev/null || true
    docker rm moviemonkey 2>/dev/null || true
    docker run -d -p 80:80 --name moviemonkey "$IMAGE_NAME:$IMAGE_TAG"
    echo "✅ App running at http://localhost"
    ;;

  compose)
    echo "🐳 Deploying with Docker Compose..."
    docker-compose up -d app
    echo "✅ App running at http://localhost"
    ;;

  k8s)
    echo "☸️  Deploying to Kubernetes..."
    kubectl apply -f k8s/namespace.yaml
    kubectl apply -f k8s/
    echo "✅ Deployed to Kubernetes"
    kubectl get pods -n moviemonkey
    ;;

  helm)
    echo "⎈ Deploying with Helm..."
    HELM_VALUES=${2:-"helm/moviemonkey/values.yaml"}
    helm upgrade --install moviemonkey helm/moviemonkey/ \
      -f "$HELM_VALUES" \
      --set image.tag="$IMAGE_TAG" \
      --namespace moviemonkey --create-namespace
    echo "✅ Deployed with Helm"
    ;;

  *)
    echo "Usage: ./scripts/deploy.sh [docker|compose|k8s|helm] [helm-values-file]"
    exit 1
    ;;
esac
