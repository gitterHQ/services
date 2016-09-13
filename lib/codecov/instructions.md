Setup your Codecov repo web hook notification by adding your Gitter webhook url into your `codecov.yml`.

```
coverage:
  notify:
    gitter:
      default:
        url: "https://webhooks.gitter.im/e/youruniqueurl"
        threshold: 1%
```
> Learn more about Codecov's yaml configuration at http://docs.codecov.io/docs/codecov-yaml
