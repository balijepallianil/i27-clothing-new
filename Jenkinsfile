// Jenkinsfile to build and deploy the apps to various environments 
// Jenkinsfile to deploy our react based applications
pipeline {
    agent any 
    stages {
        stage('Build') {
            // Code to build the app
        }
        stage ('DockerBuildAndPush') {
            // Docker build 
            // docker login
            // docker push
        }
        stage ('Dev Deploy') {
            // Code, logic to deploy to dev env 
            // container deploy
            // docker run --name {app_name} image runtimedata
        }
        stage ('Test Deploy') {
            // Code, logic to deploy to test env 
        }
        stage ('Prod Deploy') {
            // Code, logic to deploy to dev env 
        }
    }
}