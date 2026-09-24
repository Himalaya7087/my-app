#!/bin/bash
set -euo pipefail

source /opt/my-app/scripts/image.env

echo "Logging in to ECR $REGISTRY"
aws ecr get-login-password --region "$AWS_REGION" \
  | docker login --username AWS --password-stdin "$REGISTRY"

echo "Pulling $IMAGE_URI"
docker pull "$IMAGE_URI"

echo "Starting container"
docker run -d \
  --name my-app \
  --restart unless-stopped \
  -p 80:3000 \
  -e APP_VERSION="$IMAGE_TAG" \
  "$IMAGE_URI"

# Remove old, unused images to save disk space
docker image prune -af || true
