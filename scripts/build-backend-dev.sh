set -e

# Build the backend and tag it
docker build -t classes-to-calendar-backend:latest \
             -f ./backend/backend.dockerfile \
             --build-arg BACKEND_ENV=development \
             ./backend