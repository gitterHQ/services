You need to configure your Drone job to send [Webhook notifications](http://readme.drone.io/usage/notify/webhook/). Please note that this is only supported in the [open source version](https://github.com/drone/drone).

Add the following to your `.drone.yml` configuration:
```
notify:
  webhook:
    urls:
      - "YOUR_WEBHOOK_URL"
    on_success: true
    on_failure: true
```
