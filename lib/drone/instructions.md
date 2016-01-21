#### Drone 0.4+
You need to configure the [Gitter plugin](http://addons.drone.io/gitter/) for your Drone project. Please note that this is only supported in the [open source version](https://github.com/drone/drone).

Add the following to your `.drone.yml` configuration:

```
notify:
  gitter:
    webhook: "YOUR_WEBHOOK_URL"
```  

#### Drone 0.3.x, 0.2.x (*Deprecated*)
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
