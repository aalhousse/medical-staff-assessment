#!/bin/bash

# Wait for the PostgreSQL server to be available
echo "Waiting for PostgreSQL..."
while ! nc -z db 5432; do
  sleep 1
done
echo "PostgreSQL started"

# Check if the database exists
DB_EXISTS=$(PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U $POSTGRES_USER -lqt | cut -d \| -f 1 | grep -w $POSTGRES_DB | wc -l)

if [ $DB_EXISTS -eq 0 ]; then
  echo "Database $POSTGRES_DB does not exist. Creating..."
  PGPASSWORD=$POSTGRES_PASSWORD createdb -h db -U $POSTGRES_USER $POSTGRES_DB
  echo "Database $POSTGRES_DB created."
else
  echo "Database $POSTGRES_DB already exists. Skipping creation."
fi

# Create the database
echo 'Make migrations'
python /app/manage.py makemigrations
python /app/manage.py migrate

# Create superuser
echo 'Create superuser'
python /app/manage.py createsuperuser --noinput # noinput flag to use environment variables

# Fill database with questions from the PPBV
echo 'Fill database with questions from the PPBV'
python /app/manage.py loaddata /app/backend/fixtures/questions.json

# Run server on PORT 8000
python /app/manage.py runserver 0.0.0.0:8000


