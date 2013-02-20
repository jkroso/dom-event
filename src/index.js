var code = require('keycode').code
var Event = window.Event

/**
 * Create a keyboard event
 *
 *   key('keypress', 'enter')
 *   key('keydown', 'caps lock')
 *   key('keyup', 'k')
 *
 * @param {String} type 'up', 'down', or 'press'
 * @param {String} key the key being pressed
 * @param {Object} o any options such as ctrl etc..
 * @return {KeyboardEvent}
 */

exports.key = function (type, key, o) {
  o || (o = {})
  var keycode = code[key]
  if (keycode === undefined) throw new Error('invalid key: '+key)
  key = key.length === 1 ? key.charCodeAt(0) : 0

  // Prefer custom events to avoid webkits bug https://bugs.webkit.org/show_bug.cgi?id=16735
  if (Event) {
    var e = new Event(type, {
      bubbles: o.bubbles !== false,
      cancelable: o.cancelable !== false
    })
    e.keyCode = keycode
    e.charCode = key
    e.shift = o.shift || false
    e.meta = o.meta || false
    e.ctrl = o.ctrl || false
    e.alt = o.alt || false
  } else {
    var e = document.createEvent('KeyboardEvent')
    // https://developer.mozilla.org/en/DOM/event.initKeyEvent
    // https://developer.mozilla.org/en/DOM/KeyboardEvent
    e[e.initKeyEvent ? 'initKeyEvent' : 'initKeyboardEvent'](
      type,                   // DOMString typeArg
      o.bubbles !== false,    // boolean canBubbleArg
      o.cancelable !== false, // boolean cancelableArg
      window,                 // Specifies UIEvent.view.
      o.ctrl === true,        // ctrl
      o.alt === true,         // alt
      o.shift === true,       // shift
      o.meta === true,        // meta
      keycode,                // unsigned long keyCodeArg
      key                     // unsigned long charCodeArg
    )
  }
  return e
}

/**
 * Create a native mouse event
 *
 *   mouse('mousemove', {clientX: 50, clientY: 50})
 *   mouse('mousemove') // apply defualts
 * 
 * @param {String} type of mouse event
 * @param {Object} [o] options
 * @return {MouseEvent}
 */

exports.mouse = function (type, o) {
  var e = document.createEvent('MouseEvents')
  o || (o = {})

  // https://developer.mozilla.org/en/DOM/event.initMouseEvent
  e.initMouseEvent(
    type,
    o.bubbles !== false,                      // canBubble
    o.cancelable !== false,                   // cancelable
    window,                                   // 'AbstractView'
    o.clicks || (type === 'dbclick' ? 2 : 0), // click count
    o.screenX || 0,                           // screenX
    o.screenY || 0,                           // screenY
    o.clientX || 0,                           // clientX
    o.clientY || 0,                           // clientY
    o.ctrl === true,                          // ctrl
    o.alt === true,                           // alt
    o.shift === true,                         // shift
    o.meta === true,                          // meta
    o.button || 0,                            // mouse button defaults to left
    null                                      // relatedTarget
  )
  return e
}

/**
 * Create a custom event
 *
 *   custom('select', {item: item})
 *   custom('select', {bubbles: false}) // to prevent bubbling
 *   custom('select', {cancelable: false}) // to prevent bubbling
 *
 * @param {String} type can be anthing
 * @param {Object} o custom properties you would like your event to have
 * @return {Event}
 */

exports.custom = function (type, o) {
  o || (o = {})
  var e = new Event(type, {
    bubbles: o.bubbles !== false,
    cancelable: o.cancelable !== false
  })
  for (var prop in o) e[prop] = o[prop]
  return e
}
