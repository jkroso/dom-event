# dom-event

low level helper for creating DOM event objects. It abstracts away the goofiness of the DOM api and browser quirks.

## API

```javascript
var event = require('dom-event')
```
  - [event()](#event)

### event()

  Create a native DOM event
  
```js
event('mousemove')
event('keydown', { key: 'a' })
event('user-login')
```

## Available events

- load
- unload
- abort
- error
- select
- change
- submit
- reset
- focus
- blur
- resize
- scroll
- input
- click
- dblclick
- mousedown
- mouseup
- mouseover
- mousemove
- mouseout
- contextmenu
- keypress
- keydown
- keyup

Anything else is currently considered a custom event so doesn't get any special attributes or behaviour.

## Contributing
There are many more "native" events which should be included. They haven't been added simply because I don't need them just yet. If you add something, e.g. mutation events, please submit a pull-request.