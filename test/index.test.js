var should = chai.should()
  , events = require('dom-event')

function dispatch (target, event) {
	target.dispatchEvent(event)
}

function run (type, eventnames) {
	eventnames.forEach(function (event) {
		it('should create the ' + event + ' event', function(done){
			test(events[type](event, type === 'key' ? 'a': null), function() {
				done()
			})
		})
	})
}

/**
 * run the event such that it is passed to the callback
 */
function test (event, cb) {
	var a = document.createElement('a');
	a.addEventListener(event.type, cb, true)
	dispatch(a, event)
}

describe('key(type, key, options)', function () {
	run('key', ['keydown', 'keyup', 'keypress'])
	it('should create a KeyboardEvent (fails atm)', function () {
		events.key('down', 'a').should.be.an.instanceOf(KeyboardEvent)
	})
	it('should have the correct keyCode and charCode', function () {
		var e = events.key('press', 'a')
		e.keyCode.should.equal(65)
		e.charCode.should.equal(97)

		var e = events.key('down', 'a')
		e.keyCode.should.equal(65)
		e.charCode.should.equal(97)
		
		var e = events.key('up', 'a')
		e.keyCode.should.equal(65)
		e.charCode.should.equal(97)
	})
})

describe('mouse event', function() {
	run('mouse', ['click', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout'])
})

describe('.custom(type, options)', function () {
	run('custom', ['login', 'logout', 'mousedown', 'keypress'])
	it('should mix in all properties passed', function (done) {
		test(events.custom('test', {data:'no other'}), function (e) {
			e.data.should.equal('no other')
			done()
		})
	})
})
