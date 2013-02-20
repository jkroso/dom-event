var should = chai.should()
  , events = require('dom-event')

function run (type, eventnames) {
  eventnames.forEach(function (event) {
    it('should create the ' + event + ' event', function(done){
      exec(
        events[type](event, type === 'key' ? 'a': null), 
        function(e) { done() }
      )
    })
  })
}

function exec (event, cb) {
  var a = document.createElement('a');
  a.addEventListener(event.type, cb, true)
  a.dispatchEvent(event)
}

describe('key(type, key, options)', function () {
  it('should have the correct keyCode and charCode', function () {
    var e = events.key('keypress', 'a')
    e.keyCode.should.equal(65)
    e.charCode.should.equal(97)

    var e = events.key('keydown', 'a')
    e.keyCode.should.equal(65)
    e.charCode.should.equal(97)
    
    var e = events.key('keyup', 'a')
    e.keyCode.should.equal(65)
    e.charCode.should.equal(97)
  })
  
  run('key', ['keydown', 'keyup', 'keypress'])
  
  it.skip('should create a KeyboardEvent (fails atm)', function () {
    events.key('keydown', 'a').should.be.an.instanceOf(KeyboardEvent)
  })
})

describe('mouse event', function() {
  run('mouse', ['click', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout'])
})

describe('.custom(type, options)', function () {
  run('custom', ['login', 'logout', 'mousedown', 'keypress'])
  it('should mix in all properties passed', function (done) {
    exec(events.custom('test', {data:'no other'}), function (e) {
      e.data.should.equal('no other')
      done()
    })
  })
})
