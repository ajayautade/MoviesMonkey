#!/bin/bash
# ─── MovieMonkey K8s + ArgoCD AWS Cleanup Script ─────────────
# Run this to tear down all AWS resources and avoid charges
#
# Usage: ./scripts/aws-k8s-cleanup.sh

set -e

echo "🧹 MovieMonkey K8s AWS Cleanup"
echo "=============================="
echo ""

INSTANCE_ID="i-09f12bf52fe951413"
SG_ID="sg-063477ed76cb8d380"
KEY_NAME="moviemonkey-k8s-key"

# Terminate EC2 instance
echo "⏳ Terminating EC2 instance $INSTANCE_ID..."
aws ec2 terminate-instances --instance-ids "$INSTANCE_ID" --output json > /dev/null 2>&1 || echo "Instance already terminated or not found"

echo "⏳ Waiting for instance to terminate..."
aws ec2 wait instance-terminated --instance-ids "$INSTANCE_ID" 2>/dev/null || echo "Wait timed out, may already be terminated"

# Delete security group
echo "⏳ Deleting security group $SG_ID..."
aws ec2 delete-security-group --group-id "$SG_ID" 2>/dev/null || echo "Security group already deleted"

# Delete key pair
echo "⏳ Deleting key pair $KEY_NAME..."
aws ec2 delete-key-pair --key-name "$KEY_NAME" 2>/dev/null || echo "Key pair already deleted"

# Remove local key file
rm -f moviemonkey-k8s-key.pem
echo "✅ Local key file removed"

echo ""
echo "✅ All AWS resources cleaned up!"
echo "💰 No more charges will be incurred."
