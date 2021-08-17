# Build the frontend and tag it
docker build -t classes-to-calendar-frontend:latest \
             -f ./frontend/frontend.dockerfile \
             --build-arg FRONTEND_ENV=development .