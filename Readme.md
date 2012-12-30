# dom-event

low level helper for creating dom event objects

## API

```javascript
var event = require('dom-event')
```
  - [exports.key()](#exportskeytypestringkeystringoobject)
  - [exports.mouse()](#exportsmousetypestringoobject)
  - [exports.custom()](#exportscustomtypestringoobject)

## exports.key(type:String, key:String, o:Object)

  Create a keyboard event
  
```js
key('press', 'enter')
key('down', 'caps lock')
key('up', 'k')
```

## exports.mouse(type:String, [o]:Object)

  Create a native mouse event
  
```js
mouse('move', {clientX: 50, clientY: 50})
mouse('move') // apply defualts
```

## exports.custom(type:String, o:Object)

  Create a custom event
  
```js
custom('select', {item: item})
custom('select', {bubbles: false}) // to prevent bubbling
custom('select', {cancelable: false}) // to prevent bubbling
```

## Contributing
Please do!

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Jakeb Rosoman

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
