pipeline {
    agent {
        label 'k8s-slave'
    }
    parameters {
        choice (name: 'dockerPush',
            choices: 'no\nyes',
            description: "Docker Build and push to registry"
        )
    }
    tools{
            jdk 'JDK-17'
        }
    environment {
        APPLICATION_NAME = "clothing"
        DOCKER_HUB = "docker.io/i27anilb3"
        DOCKER_CREDS = credentials('docker_creds')
    }
    stages {
        stage ('Docker Build and push') {
            when {
                anyOf {
                    expression {
                        params.dockerPush == 'yes'
                    }
                }
            } 
            steps {
                script  {
                    imageBuildFrontEnd().call()
                    }
            }
        }
    }
}

def imageBuildFrontEnd() {
    return{
    echo "**************************** Building Docker Image ****************************"
    sh "docker build --force-rm --no-cache -t ${env.DOCKER_HUB}/${env.APPLICATION_NAME}:${GIT_COMMIT} ./.cicd"
    echo "********Docker login******"
    sh "docker login -u ${DOCKER_CREDS_USR} -p ${DOCKER_CREDS_PSW}"
    echo "********Docker Push******"
    sh "docker push ${env.DOCKER_HUB}/${env.APPLICATION_NAME}:${GIT_COMMIT}"
    }
}