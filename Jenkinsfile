pipeline {
    agent {
        label 'k8s-slave'
    }
    parameters {
        choice (name: 'dockerPush',
            choices: 'no\nyes',
            description: "Docker Build and push to registry"
        )
        choice (name: 'deployToDev',
                choices: 'no\nyes',
                description: "Deploy app in DEV"
        )
    }
    tools{
            jdk 'JDK-17'
        }
    environment {
        APPLICATION_NAME = "clothing"
        DOCKER_HUB = "docker.io/i27anilb3"
        DOCKER_CREDS = credentials('docker_creds')
        DEV_NAMESPACE = "i27-dev-ns"
        FILE_PATH = "${WORKSPACE}/k8s-dev.yaml"

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
        stage ('Deploy to Dev') {
            when {
                anyOf {
                    expression {
                        params.deployToDev == 'yes'
                    }
                }
            } 
            steps {
                script  {
                    k8sdeploy().call()
                    }
            }
        }
    }
}
       


def imageBuildFrontEnd() {
    return{
    echo "**************************** Building Docker Image ****************************"
    sh "docker build --force-rm --no-cache -t ${env.DOCKER_HUB}/${env.APPLICATION_NAME}:${GIT_COMMIT} ."
    echo "********Docker login******"
    sh "docker login -u ${DOCKER_CREDS_USR} -p ${DOCKER_CREDS_PSW}"
    echo "********Docker Push******"
    sh "docker push ${env.DOCKER_HUB}/${env.APPLICATION_NAME}:${GIT_COMMIT}"
    }
}
def k8sdeploy(){
    return{
        def docker_image = "${env.DOCKER_HUB}/${env.APPLICATION_NAME}:${GIT_COMMIT}"
        echo "${docker_image}"
        sh "ls -l"
        echo "Executing K8S Deploy Method"
        sh "sed -i s|DIT|"${docker_image}"|g ${env.FILE_PATH}"
        sh "kubectl apply -f ${env.FILE_PATH} -n ${env.DEV_NAMESPACE}"
    }
}