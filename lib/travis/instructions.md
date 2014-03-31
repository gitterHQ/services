You need to configure your Travis job to send [Webhook notifications](http://about.travis-ci.org/docs/user/notifications).

Add the following to your `.travis.yml` configuration:
```
notifications:
  webhooks:
    urls:
      - YOUR_WEBHOOK_URL
    on_success: change  # options: [always|never|change] default: always
    on_failure: always  # options: [always|never|change] default: always
    on_start: false     # default: false
```
