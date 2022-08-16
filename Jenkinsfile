pipeline {
    agent { label "SecondStreet-Frontend-Nodeupdate" }

    options {
        buildDiscarder(logRotator(daysToKeepStr: '10', numToKeepStr: '5'))
        disableConcurrentBuilds(abortPrevious: true)
        timeout(time: 3, unit: 'HOURS')
        timestamps()
    }

    environment {
        JOBS = 1
        CACHE_FOLDER = '/home/cache'
        CHROME_BIN = '/usr/bin/google-chrome'
        WHITESOURCE_PRODUCT_ID = '9181841de9e14a03b4c96ed0d0e201485806d8ddc014433e98380daf1b7fdfba'
        WHITESOURCE_PROJECT_TOKEN = '2089a40619c140b090c451b745099d4de0e7a15fd7574d70b758bd886c32ebfa'
    }

    stages {
        stage('initialize') {
            steps {
                bitbucketStatusNotify(buildState: 'INPROGRESS')
                sh'''
                    yarn config set ignore-engines true
                    node --version
                    npm --version
                    yarn --version
                '''
            }
        }

        stage('install deps') {
            steps {
                sh'''
                    yarn install --frozen-lockfile --network-concurrency 1
                '''
            }
        }

        stage('build') {
            parallel {
                stage('test') {
                    steps {
                        sh'''
                            yarn test:ember -r dot
                        '''
                    }
                }

                stage('lint') {
                    steps {
                        sh'''
                            yarn lint
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            jiraSendBuildInfo(site: 'uplandsoftware.atlassian.net')
        }

        success {
            bitbucketStatusNotify(buildState: 'SUCCESSFUL')
        }

        failure {
            bitbucketStatusNotify(buildState: 'FAILED')
        }

        cleanup {
            cleanWs()
        }
    }
}
