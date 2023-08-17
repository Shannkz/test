FROM python:3.8.10

# Allows docker to cache installed dependencies between builds
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Mounts the application code to the image
WORKDIR /code
COPY . .

ENV DJANGO_SUPERUSER_PASSWORD=test
ENV DJANGO_SUPERUSER_USERNAME=admin
ENV DJANGO_SUPERUSER_EMAIL=test@admin.ro

EXPOSE 8000

RUN ["python", "manage.py", "makemigrations"]
RUN ["python", "manage.py", "migrate"]
RUN ["python", "manage.py", "createsuperuser", "--noinput", "--first_name", "dragos", "--last_name", "dragos"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]