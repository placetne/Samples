var util = require('util');
var events = require('events');

function setValue() {
    events.EventEmitter.call(this);
}

util.inherits(setValue, events.EventEmitter);

setValue.prototype.command = function(object, value) {
	const self = this;
	const api = this.client.api;
	
	var selector = object;
	
	if (typeof object === 'string') {
		selector = object;
	} else {
		var element = object[object.length - 1];
		selector = element.selector;

		var container = element.parent;
		while (container != null && container.selector != null && typeof container.selector == 'string' && container.selector != '')
		{
			selector = container.selector + ' ' + selector;
			container = container.parent;
		}
	}
	
    api.elements('css selector', selector, function (elems) {
        elems.value.forEach(function (element) {
            for (var c of value.split('')) {
                api.elementIdValue(element.ELEMENT, c);
            }
			self.emit('complete');
        });
    });
	
    return this;
};

module.exports = setValue;
