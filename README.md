# How to fork and clone
One quick note about cloning this project. If you wish to make commits and push your own code, you'll need to fork the project first. Forking allows you to have your own copy of this repository by adding a duplicate version in your own profile!

You can see the fork button in the top right corner of every GitHub project; click it and a copy of the project will be added to your GitHub profile under the same name as the original project.

<img width="612" alt="github fork" src="https://user-images.githubusercontent.com/10578605/157998981-4bfd1f83-825c-4664-b22d-b2c7d471dc70.png">

After forking the project, simply clone it the way you would from the new forked project in your own GitHub repository and you can commit and push to it freely!

# After you fork and clone:

## Install dependencies
In your terminal after you clone your project down, remember to run either `yarn` or `npm install` to build all the dependencies in the project.

## API URL Configuration
If you look into project structure there is a file under src `config.js`. Here is the link to that file [config.js](src\config.js). This file contains the variables that define the service(learner-user-service and learner-product-service) URL and API URLs. If there is any change in host URL or service URL it can be updated within that file.

## Run Commands for different environment
- local : "cross-env REACT_APP_ENV=local react-scripts start",
- dev: "cross-env REACT_APP_ENV=development react-scripts start",
- test: "cross-env REACT_APP_ENV=test react-scripts start",
- stage: "cross-env REACT_APP_ENV=stage react-scripts start",
- prod: "cross-env REACT_APP_ENV=production react-scripts start"