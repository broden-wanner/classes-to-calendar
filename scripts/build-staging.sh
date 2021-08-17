# Exit in case of error
set -e

TAG=${TAG?Variable not set} \
FRONTEND_ENV=${FRONTEND_ENV-staging} \
docker-compose -f docker-compose.yml build
