set -x

mypy app
black app --check
isort --check-only app
flake8