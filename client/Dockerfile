FROM node:12.13.0

WORKDIR /usr/app/client

ENV PATH /usr/app/client/node_modules/.bin:$PATH

COPY . .

# Install node
RUN npm install npm@latest -g

# Install dependencies
RUN npm install --production=true

# Compile production build
RUN npm run build

# Start and nginx container
FROM nginx

# Set our custom nginx.conf in the container
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the react build from the build container
COPY --from=builder /usr/app/client/build /usr/share/nginx/html

# Set permissions so nginx can serve it
RUN chown nginx.nginx /usr/share/nginx/html/ -R

EXPOSE 80
