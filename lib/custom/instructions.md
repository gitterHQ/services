Accepts form or json encoded messages to display in the activity feed.

`message` (required): the message that you want to be displayed (in markdown).
`level` (optional): what level of message. Can be `info` or `error`, but default is `info`. This only affects styling.

e.g simple post:
`curl -d message=hello your_url`

e.g error levels:
`curl -d message=oops -d level=error your_url`

e.g markdown:
`curl --data-urlencode "message=_markdown_ is fun" your_url`
