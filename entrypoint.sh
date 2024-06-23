#!/bin/bash

# Set the environemnt to dev, if not provided
ENVIRONMENT="${1:-dev}"

case "$ENVIRONMENT" in
    dev)
        echo "Starting the application in development mode..."
        npm run start:dev
        ;;
    test)
        echo "Starting the application in Test mode..."
        npm run start:test
        ;;   
    prod) 
        echo "Starting the application in Production mode..."
        npm run start:prod
        ;;
    *)
        echo "Invalid environment specified, Valid options are 'dev', 'test', 'prod'"
        exit 1
        ;;
esac
