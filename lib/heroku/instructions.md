You need to configure your Heroku app to send Webhook notifications.

1. Open your Heroku app in a terminal
2. Run this command with your webhook URL: 
```
heroku addons:add deployhooks:http --url=webhook_url
```
3. Click Apply
