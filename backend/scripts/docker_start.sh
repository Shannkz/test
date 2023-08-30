#!/bin/bash

# Docker start
echo "Starting Docker Django backend container..."
docker run -d --name django-backend -p 8000:8000 django-backend