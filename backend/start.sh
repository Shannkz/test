#!/bin/bash

# Install dependencies
# pip install --no-cache-dir -r requirements.txt
echo "Running python scripts to start app server..."
# Prepare database migrations
python manage.py makemigrations

# Migrate the changes to database
python manage.py migrate

# Create the super user to be used
python manage.py createsuperuser --noinput --first_name dragos --last_name dragos

# Start the application server
python manage.py runserver 0.0.0.0:8000