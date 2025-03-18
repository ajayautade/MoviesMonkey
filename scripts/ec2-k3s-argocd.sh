#!/bin/bash
set -e
exec > /var/log/k3s-argocd-setup.log 2>&1

echo "=== Starting K3s + ArgoCD Setup ==="

# ─── Install K3s ──────────────────────────────────────────────
echo "Installing K3s..."
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik --write-kubeconfig-mode 644" sh -

# Wait for K3s to be ready
echo "Waiting for K3s to be ready..."
sleep 30
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

# Make kubectl accessible to ubuntu user
mkdir -p /home/ubuntu/.kube
cp /etc/rancher/k3s/k3s.yaml /home/ubuntu/.kube/config
chown -R ubuntu:ubuntu /home/ubuntu/.kube
echo 'export KUBECONFIG=/home/ubuntu/.kube/config' >> /home/ubuntu/.bashrc

kubectl wait --for=condition=Ready node --all --timeout=120s
echo "✅ K3s is ready!"

# ─── Install ArgoCD ──────────────────────────────────────────
echo "Installing ArgoCD..."
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

echo "Waiting for ArgoCD pods to start..."
sleep 90
kubectl wait --for=condition=Available deployment/argocd-server -n argocd --timeout=300s
echo "✅ ArgoCD is ready!"

# Expose ArgoCD via NodePort on port 30080
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort", "ports": [{"port": 443, "targetPort": 8080, "nodePort": 30080, "protocol": "TCP"}]}}'

# ─── Create ArgoCD Application for MovieMonkey ───────────────
echo "Creating ArgoCD Application..."
cat <<EOF | kubectl apply -f -
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: moviemonkey
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/ajayautade/MoviesMonkey.git
    targetRevision: main
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: moviemonkey
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
EOF

# ─── Save ArgoCD admin password ──────────────────────────────
ARGOCD_PASS=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)
echo "========================================" > /home/ubuntu/argocd-credentials.txt
echo "ArgoCD URL: http://<PUBLIC_IP>:30080" >> /home/ubuntu/argocd-credentials.txt
echo "Username: admin" >> /home/ubuntu/argocd-credentials.txt
echo "Password: $ARGOCD_PASS" >> /home/ubuntu/argocd-credentials.txt
echo "========================================" >> /home/ubuntu/argocd-credentials.txt
chown ubuntu:ubuntu /home/ubuntu/argocd-credentials.txt

echo "=== Setup Complete ==="
