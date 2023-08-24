#!/bin/bash

# Docker load
docker load -i django_docker_image.tar.gz

# Docker start
docker run -d --name django-backend -p 8000:8000 django-backend