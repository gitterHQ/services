You need to configure your `circle.yml` file to use the [Notification WebHooks](https://circleci.com/docs/configuration#notify) which send the test result data to a remote server.

Add the following to your `circle.yml` file:
```yaml
notify:
  webhooks:
    # A list of hook hashes, containing the url field
    # gitter hook
    - url: YOUR_WEBHOOK_URL
```