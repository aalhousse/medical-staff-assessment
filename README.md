# Medical Staff Patient Care Assessment
This app aims to help nurses at evaluating and documenting the time patient care takes
according to the PPBV ("Pflegepersonalbemessungsverordnung").

## Features
The list of features

## Getting Started
```shell
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

#### Creating a superuser if needed

```shell
python manage.py createsuperuser
```

#### Loading example data
```shell
python manage.py loaddata "./example_data/all_data.json"
```


## Docker
Before running the following commands, install [Docker](https://www.docker.com/).
Also create the .env file (see [production.env](production.env) or [development.env](development.env) for required fields).
```shell
docker-compose build
docker-compose up
```

## Linting

We use flake for linting. Run it with

```shell
flake8 .
```

If you use a virtual environment, please use the flake command specified in the `Scripts` folder in the `venv` folder.

## Documentation
TODO Link documentation here