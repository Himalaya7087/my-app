# my-app: Dummy app for an EC2 + CodeBuild + ECR + CodeDeploy pipeline

A small Node.js (Express) app packaged as a Docker image.
Pushing to `main` builds the image, pushes it to ECR and deploys it to EC2.

## Endpoints
- `/`: page showing version (git commit), hostname and start time
- `/health`: JSON health check, used by CodeDeploy's ValidateService hook

## Run locally
    npm install && npm start              # http://localhost:3000
    docker build -t my-app . && docker run -p 3000:3000 my-app

## Files
| File | Purpose |
|---|---|
| Dockerfile | Builds the app image |
| buildspec.yml | CodeBuild: build, push to ECR, write scripts/image.env |
| appspec.yml | CodeDeploy: lifecycle hooks on EC2 |
| scripts/stop_container.sh | Removes the old container |
| scripts/before_install.sh | Cleans /opt/my-app |
| scripts/start_container.sh | ECR login, pull and run the new image (port 80 -> 3000) |
| scripts/validate_service.sh | Polls /health and fails the deploy if the app is unhealthy |
| scripts/ec2-user-data.sh | Installs Docker + CodeDeploy agent on EC2 |

## Deploy steps (summary)
1. Create ECR repo `my-app`. Set region and repo name in `buildspec.yml`.
2. Launch EC2 (Amazon Linux 2023) with:
   - An IAM role that has ECR read-only and S3 read access
   - The tag `App=my-app`
   - Port 80 open in its security group
   - `scripts/ec2-user-data.sh` as user data
3. Push this code to GitHub or CodeCommit.
4. CodeBuild project: **Privileged mode ON**. Its role needs ECR push permissions.
5. CodeDeploy: create an EC2/On-premises application and a deployment group that targets tag `App=my-app`.
6. CodePipeline: Source -> Build (CodeBuild) -> Deploy (CodeDeploy, input = build artifact).
7. Open `http://<EC2-public-IP>/`. Change something, push, and watch the version updat.
