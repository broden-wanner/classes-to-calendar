# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14-buster as build-stage

WORKDIR /app 

# Install NPM packages
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

# Copy over nginx configuration
COPY ./nginx.conf /nginx.conf
COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf

# Copy app over
COPY . .

ARG FRONTEND_ENV=production
ENV REACT_APP_ENV=${FRONTEND_ENV}

# Build the app
RUN npm run build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf