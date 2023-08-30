#!/bin/bash

# Check if Django backend is running
if [ "$(docker ps -a -q -f name=django-backend)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=django-backend)" ]; then
        # cleanup
        docker rm django-backend
    fi
    # Kill the container if it is running to prepare for fresh install
    docker rm -f django-backend
fi