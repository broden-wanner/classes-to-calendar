set -e

# Run the backend in a dev environment
docker stop classes-to-calendar-backend || true
docker rm classes-to-calendar-backend || true
docker run -p 8000:80 -d --name classes-to-calendar-backend --env-file .env classes-to-calendar-backend:latest