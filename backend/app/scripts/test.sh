set -e
set -x

pytest --cov=app --cov-report=term-missing app/tests "${@}"