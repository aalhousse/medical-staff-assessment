#!/bin/bash

# Wait for the PostgreSQL server to be available
while ! nc -z $DB_HOST $DB_PORT_INTERNAL; do
  echo "Waiting for database to be ready..."
  sleep 3
done
echo "PostgreSQL started"

# Check if the database exists
DB_EXISTS=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -lqt | cut -d \| -f 1 | grep -w $DB_NAME | wc -l)

if [ $DB_EXISTS -eq 0 ]; then
  echo "Database $DB_NAME does not exist. Creating..."
  PGPASSWORD=$DB_PASSWORD createdb -h $DB_HOST -U $DB_USER $DB_NAME
  echo "Database $DB_NAME created."
else
  echo "Database $DB_NAME already exists. Skipping creation."
fi

# Create the database
echo 'Make migrations'
python /app/manage.py makemigrations backend
python /app/manage.py migrate

# Create superuser
echo 'Create superuser'
python /app/manage.py createsuperuser --noinput # noinput flag to use environment variables

# Fill database with questions from the PPBV
echo 'Fill database with questions from the PPBV'
python /app/manage.py loaddata /app/backend/fixtures/questions.json

# Run server
python /app/manage.py runserver 0.0.0.0:$WEB_PORT


