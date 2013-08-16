
var codes = require('keycode').codes
var Event = window.Event

/**
 * Create a native DOM event
 *
 *   event('mousemove')
 *   event('keydown', { key: 'a' })
 *   event('user-login')
 *
 * @param {String} type
 * @param {Object} [options]
 * @return {DomEvent}
 */

function event(type, options){
  return (make[type] || custom)(type, options || {})
}

/*!
 * TODO: switch functions to fallbacks here
 * if we are in an old IE
 */

var make = {
  // html
  load: html,
  unload: html,
  abort: html,
  error: html,
  select: html,
  change: html,
  submit: html,
  reset: html,
  focus: html,
  blur: html,
  resize: html,
  scroll: html,
  input: html,

  // mouse
  click: function(name, o){
   'clicks' in o || (o.clicks = 1)
    return mouse('click', o)
  },
  dblclick: function(name, o){
    'clicks' in o || (o.clicks = 2)
    return mouse('dblclick', o)
  },
  mousedown: mouse,
  mouseup: mouse,
  mouseover: mouse,
  mousemove: mouse,
  mouseout: mouse,
  contextmenu: function(name, o){
    'button' in o || (o.button = 2)
    return mouse('contextmenu', o)
  },

  // keyboard
  keypress: keyboard,
  keydown: keyboard,
  keyup: keyboard
}

/**
 * Create a native mouse event
 *
 *   mouse('mousemove', {})
 *   mouse('mousemove', {clientX: 50, clientY: 50})
 * 
 * @param {String} name
 * @param {Object} o
 * @return {MouseEvent}
 * @api private
 */

function mouse (name, o){
  var event = document.createEvent('MouseEvents')
  event.initMouseEvent(
    name,
    o.bubbles !== false,
    o.cancelable !== false,
    window,
    o.clicks,
    o.screenX || 0,
    o.screenY || 0,
    o.clientX || 0,
    o.clientY || 0,
    o.ctrl === true,
    o.alt === true,
    o.shift === true,
    o.meta === true,
    o.button || 0,
    o.relatedTarget
  )
  return event
}

/**
 * Create a html document event
 *
 *   event('blur', {})
 *   event('change', {bubbles: false})
 *
 * @param {String} name
 * @param {Object} o
 * @return {HTMLEvent}
 * @api private
 */

function html (name, o){
  var event = document.createEvent('HTMLEvents')
  event.initEvent(name, 
    o.bubbles !== false, 
    o.cancelable !== false
  )
  return event
}

/**
 * Create a keyboard event
 *
 *   event('keypress', {
 *     key: 'enter'
 *   })
 *
 * @param {String} type
 * @param {Object} o
 * @return {KeyboardEvent}
 * @api private
 */

function keyboard(type, o) {
  var key = o.key || 'a'
  var keycode = codes[key]
  if (!keycode) throw new Error('invalid key: '+key)

  var charCode = key.length === 1
    ? key.charCodeAt(0) 
    : 0

  // Prefer custom events to avoid webkits bug 
  // https://bugs.webkit.org/show_bug.cgi?id=16735
  if (Event) {
    var e = custom(type, o)
    e.keyCode = keycode
    e.charCode = charCode
    e.shift = o.shift === true
    e.meta = o.meta === true
    e.ctrl = o.ctrl === true
    e.alt = o.alt === true
  } else {
    var e = document.createEvent('KeyboardEvent')
    e[e.initKeyEvent ? 'initKeyEvent' : 'initKeyboardEvent'](
      type,
      o.bubbles !== false,
      o.cancelable !== false,
      window,
      o.ctrl === true,
      o.alt === true,
      o.shift === true,
      o.meta === true,
      keycode,
      charCode
    )
  }
  return e
}

/**
 * Create a custom event
 *
 *   custom('select', {
 *     bubbles: false
 *   })
 *
 * @param {String} name
 * @param {Object} o
 * @return {Event}
 * @api private
 */

function custom(name, o) {
  return new Event(name, {
    bubbles: o.bubbles !== false,
    cancelable: o.cancelable !== false
  })
}

/*!
 * Export event factory and helpers
 */

module.exports = event
event.mouse = mouse
event.keyboard = keyboard
event.custom = custom
event.html = html
