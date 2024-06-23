# Dockerfile for react application
# docker build -t node:v1 .


# reference : https://github.com/devopswithcloud/weather-app/blob/master/Dockerfile

FROM node:14
ARG SRC_DIR=/opt/i27
# Which will be inside the container
RUN mkdir $SRC_DIR
# Set the Working Directory  inside the container
WORKDIR $SRC_DIR

# Copy the Current Contnet to /opt/i27 directory , this is our home dir 
COPY . $SRC_DIR

# Install nodejs dependencies 
RUN npm install 

# Expose the port 
EXPOSE 3000

# The script to start the application with different environments
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]



