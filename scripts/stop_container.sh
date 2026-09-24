#!/bin/bash
# Stop and remove the running container (if any)
docker rm -f my-app 2>/dev/null || true
