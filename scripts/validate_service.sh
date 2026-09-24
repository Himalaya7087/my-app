#!/bin/bash
# Fail the deployment if the app doesn't become healthy
for i in $(seq 1 20); do
  if curl -sf http://localhost/health > /dev/null; then
    echo "App is healthy"
    exit 0
  fi
  echo "Waiting for app... ($i/20)"
  sleep 3
done
echo "App failed health check"
docker logs my-app --tail 50 || true
exit 1
