function isIntersectRect(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2) {
	return isIntersectLines(ax1, ax2, bx1, bx2)
		&& isIntersectLines(ay1, ay2, by1, by2);
}

function isIntersectLines(a1, a2, b1, b2) {
	if (a1 < b1) return b1 < a2;
	else return a1 < b2;
}

(function (global) {
	var keysPress = {};

	global.addEventListener('keydown', (event) => {
		keysPress[event.keyCode] = true;
	});

	global.addEventListener('keyup', (event) => {
		keysPress[event.keyCode] = false;
	});

	global.keysPress = keysPress;

}(window));

(function (global) {
	var isTouches = 'ontouchstart' in window;

	function touchUp(el, handler, className) {
		el.addEventListener('touchend', function(event) {
			event.preventDefault();
			handler(event.target);
		});

		el.addEventListener('mouseup', (event) => { 
			handler(event.target);
		});
	}

	function touchDown(el, handler) {
		el.addEventListener('touchstart', function(event) {
			event.preventDefault();
			handler(event.target);
		});

		el.addEventListener('mousedown', (event) => { 
			handler(event.target);
		});
	}

	global.touchDown = touchDown;
	global.touchUp = touchUp;

}(window));

/**
 * Cлияние свойств всех переданных объектов в первый
 * @param {bool} deep (необязательный) если true, то глубокое слияние
 * @param {object} obj любое колличество объектов
 * Пример использования:
 * options = extend(true, {}, DEF, options)
 */
var extend = function () {
	var extended = {};
	var deep = false;
	var i = 0;
	var length = arguments.length;

	if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
		deep = arguments[0];
		i++;
   }
   
	var merge = function (obj) {
		for ( var prop in obj ) {
			if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
				if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
					extended[prop] = extend( true, extended[prop], obj[prop] );
				} else {
					extended[prop] = obj[prop];
				}
			}
		}
	};

	for ( ; i < length; i++ ) {
		var obj = arguments[i];
		merge(obj);
	}

	return extended;
};