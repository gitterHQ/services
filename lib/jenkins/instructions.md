You need to configure your Jenkins job to send Webhook notifications with the [Jenkins Notification Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Notification+Plugin). Once the plugin is installed, do the following:

1. Select your job in Jenkins
2. Click the "Configure" link
3. Scroll down to Job notifications
4. Click the "Add Endpoint" button
5. Make sure Format is "JSON"
6. Make sure protocol is "HTTP"
7. Paste in your webhook url into "URL"
8. Click "Apply"
