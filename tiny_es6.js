// This is a collecton of some shims from https://developer.mozilla.org
// As these by necessity would have been created after 2010, this page:
//   https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
// says they would be in the public domain.
// I have modified them lightly.
// I release these modifications to the public domain.


if (!String.prototype.repeat) {
	String.prototype.repeat = function(count) {
		'use strict';
		if (this === null) {
			throw new TypeError('can\'t convert ' + this + ' to object');
		}
		var str = '' + this;
		count = +count;
		if (count != count) {
			count = 0;
		}
		if (count < 0) {
			throw new RangeError('repeat count must be non-negative');
		}
		if (count == Infinity) {
			throw new RangeError('repeat count must be less than infinity');
		}
		count = Math.floor(count);
		if (str.length === 0 || count === 0) {
			return '';
		}
		// Ensuring count is a 31-bit integer allows us to heavily optimize the
		// main part. But anyway, most current (august 2014) browsers can't handle
		// strings 1 << 28 chars or longer, so:
		if (str.length * count >= 1 << 28) {
			throw new RangeError('repeat count must not overflow maximum string size');
		}
		var rpt = '';
		for (;;) {
			if ((count & 1) == 1) {
				rpt += str;
			}
			count >>>= 1;
			if (count === 0) {
				break;
			}
			str += str;
		}
		return rpt;
	};
}

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		'use strict';
		position = position || 0;
		return this.lastIndexOf(searchString, position) === position;
	};
}

if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(searchString, position) {
		'use strict';
		var subjectString = this.toString();
		if (position === undefined || position > subjectString.length) {
			position = subjectString.length;
		}
		position -= searchString.length;
		var lastIndex = subjectString.indexOf(searchString, position);
		return lastIndex !== -1 && lastIndex === position;
	};
}

if (!String.prototype.includes) {
	String.prototype.includes = function() {
		'use strict';
		return String.prototype.indexOf.apply(this, arguments) !== -1;
	};
}

Number.isFinite = Number.isFinite || function(value) {
	return typeof value === "number" && isFinite(value);
};

Number.isInteger = Number.isInteger || function(value) {
	return typeof value === "number" && 
	isFinite(value) && 
	Math.floor(value) === value;
};

Number.isNaN = Number.isNaN || function(value) {
	return typeof value === "number" && isNaN(value);
};

