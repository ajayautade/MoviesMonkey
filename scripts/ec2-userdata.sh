#!/bin/bash
yum update -y
yum install -y docker
service docker start
usermod -a -G docker ec2-user
docker pull ajayautade/moviemonkey:latest
docker run -d -p 80:80 --name moviemonkey --restart unless-stopped ajayautade/moviemonkey:latest
