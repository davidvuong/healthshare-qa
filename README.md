# HealthShare QA

[![Code style: pep8](https://img.shields.io/badge/code%20style-pep8-yellow.svg?style=flat-square)](https://www.python.org/dev/peps/pep-0008/)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)

**Welcome to healthshare-qa!**

HealthShare QA's project structure is based off a Django+Angular boilerplate I wrote [here](https://github.com/davidvuong/django-bp). HealthShare QA is a simple question/answer site where users are able to ask and answer questions. The frontend is built using AngularJS and backed by a REST API written in Django + DRF.

## Getting Started

1. Clone the project repository:

  ```bash
  git clone git@github.com:davidvuong/healthshare-qa.git
  ```

1. Create a virtualenv for your project:

  ```bash
  sudo easy_install pip
  sudo pip install virtualenv virtualenvwrapper

  mkvirtualenv healthshare-qa
  add2virtualenv project
  ```

1. Install all the Python project dependencies:

  ```bash
  pip install -r requirements.txt
  ```

1. Install Node and all JavaScript project dependencies:

  ```bash
  nvm install 5.8.0
  nvm use 5.8.0

  cd healthshare-qa/ng/
  npm install
  ```

## Configuring Django

Most of the configuration has already been completed (`/project/settings.py`) however, there are commands you need to run as a bit of initial configuration before you can start hacking.

1. Export the `DJANGO_SETTINGS_MODULE` environment variable.

  ```bash
  export DJANGO_SETTINGS_MODULE='project.settings'
  ```

1. Run the database migrations:

  ```bash
  python manage.py migrate
  ```

1. Create a few users so you can test the app:

  ```bash
  python manage.py createsuperuser
  ```

## Executing `healthshare-qa`

Whilst developing, there are 2 servers that you need to run. The first is `webpack-dev-server` and the other is your Django server.

```bash
# Bundles your client and starts the `webpack-dev-server`:
npm start

# Starts your Django server via the standard `manage.py`:
python manage.py runserver
```

**Note:** Please make sure you're in the `/healthshare-qa/ng/` directory when running any client-side related commands.

Finally, you can access the `django-bp` frontend/backend by navigating to these urls:

```bash
# AngularJS frontend app:
open http://localhost:8080

# Django + DRF REST API:
open http://localhost:8000
```

## Final Notes & Comments

* HealthShare QA has only been tested on Chrome
* Most of the focus was on the Django REST API and AngularJS client-side (minimal focus was put to the interface, using standard Bootstrap components)
* Didn't have time to write any e2e or unit tests
