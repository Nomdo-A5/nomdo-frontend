FROM node:lts-alpine3.12 AS build

WORKDIR /app

# Essentials
RUN echo "UTC" > /etc/timezone
RUN apk add --no-cache zip unzip nano git

# Install bash
RUN apk add --no-cache bash
RUN sed -i 's/bin\/ash/bin\/bash/g' /etc/passwd

# Copy app to docker
COPY . /app

# Build app
RUN npm ci --silent
RUN npm install --no-optional --silent
RUN npm run build 
  
### NGINX ###
FROM nginx:stable-alpine

# Essentials
RUN echo "UTC" > /etc/timezone
RUN apk add --no-cache nano git

# Install bash
RUN apk add --no-cache bash
RUN sed -i 's/bin\/ash/bin\/bash/g' /etc/passwd

# Copy to nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY ./etc/nginx/conf.d/app.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80 443

# Run nginx on foreground
CMD ["nginx", "-g", "daemon off;"]
