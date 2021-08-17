set -e
set -x

bash scripts/test.sh --cov-report=xml "${@}"