#!/bin/bash
# EC2 user data (Amazon Linux 2023): installs Docker + CodeDeploy agent.
# Paste into "Advanced details > User data" when launching the instance.
REGION=ap-south-1   # change to your region

dnf update -y
dnf install -y docker ruby wget
systemctl enable --now docker
usermod -aG docker ec2-user

cd /home/ec2-user
wget https://aws-codedeploy-${REGION}.s3.${REGION}.amazonaws.com/latest/install
chmod +x install
./install auto
systemctl enable --now codedeploy-agent
