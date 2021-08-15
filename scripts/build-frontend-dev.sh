# Build the frontend and tag it
docker build -t classes-to-calendar-frontend:1.0 -f .\frontend.dockerfile --build-arg FRONTEND_ENV=development .