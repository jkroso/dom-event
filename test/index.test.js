
var should = require('chai').should()
  , event = require('../src')

function run () {
  for (var i = 0, len = arguments.length; i < len; i++) {
    var name = arguments[i]
    it('should work with ' + name, function(){
      var a = document.createElement('a')
      document.body.appendChild(a)
      var count = 0
      a.addEventListener(name, function(e){
        count++
      }, true)
      a.dispatchEvent(event(name))
      document.body.removeChild(a)
      count.should.equal(1)
    })
  }
}

describe('key(type, key, options)', function () {
  it('should have the correct keyCode and charCode', function () {
    var e = event('keypress', {key: 'a'})
    e.keyCode.should.equal(65)
    e.charCode.should.equal(97)

    var e = event('keydown', {key: 'a'})
    e.keyCode.should.equal(65)
    e.charCode.should.equal(97)
    
    var e = event('keyup', {key: 'a'})
    e.keyCode.should.equal(65)
    e.charCode.should.equal(97)
  })
  
  run('keydown', 'keyup', 'keypress')
  
  // chrome bug
  it.skip('should create a KeyboardEvent', function () {
    events.key('keydown', 'a').should.be.an.instanceOf(KeyboardEvent)
  })
})

describe('mouse events', function() {
  run('click', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout')
})

describe('custom events', function () {
  run('login', 'logout')
})

describe('html events', function () {
  run('blur', 'change', 'focus')
})
