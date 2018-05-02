(function (global) {
    global.setCanvasSmoothing = function(ctx, val = false) { 
        ctx.mozImageSmoothingEnabled = val;
        ctx.webkitImageSmoothingEnabled = val;
        ctx.msImageSmoothingEnabled = val;
        ctx.imageSmoothingEnabled = val;
    }
}(window));

//Date.now
(function (global) { 
    Date.now = function () {
        return new Date().getTime();
    }
}(window));

// - - - -

(function (global) { 
    if (!global.performance) { 
        global.performance = {};
    }

    performance.now = performance.now || Date.now;
}(window));
// - - - -

var Promise;
!function n(t,e,r){function o(u,f){if(!e[u]){if(!t[u]){var c="function"==typeof require&&require;if(!f&&c)return c(u,!0);if(i)return i(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var l=e[u]={exports:{}};t[u][0].call(l.exports,function(n){var e=t[u][1][n];return o(e?e:n)},l,l.exports,n,t,e,r)}return e[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(n,t,e){"use strict";function r(){}function o(n){try{return n.then}catch(t){return d=t,w}}function i(n,t){try{return n(t)}catch(e){return d=e,w}}function u(n,t,e){try{n(t,e)}catch(r){return d=r,w}}function f(n){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof n)throw new TypeError("not a function");this._37=0,this._12=null,this._59=[],n!==r&&v(n,this)}function c(n,t,e){return new n.constructor(function(o,i){var u=new f(r);u.then(o,i),s(n,new p(t,e,u))})}function s(n,t){for(;3===n._37;)n=n._12;return 0===n._37?void n._59.push(t):void y(function(){var e=1===n._37?t.onFulfilled:t.onRejected;if(null===e)return void(1===n._37?l(t.promise,n._12):a(t.promise,n._12));var r=i(e,n._12);r===w?a(t.promise,d):l(t.promise,r)})}function l(n,t){if(t===n)return a(n,new TypeError("A promise cannot be resolved with itself."));if(t&&("object"==typeof t||"function"==typeof t)){var e=o(t);if(e===w)return a(n,d);if(e===n.then&&t instanceof f)return n._37=3,n._12=t,void h(n);if("function"==typeof e)return void v(e.bind(t),n)}n._37=1,n._12=t,h(n)}function a(n,t){n._37=2,n._12=t,h(n)}function h(n){for(var t=0;t<n._59.length;t++)s(n,n._59[t]);n._59=null}function p(n,t,e){this.onFulfilled="function"==typeof n?n:null,this.onRejected="function"==typeof t?t:null,this.promise=e}function v(n,t){var e=!1,r=u(n,function(n){e||(e=!0,l(t,n))},function(n){e||(e=!0,a(t,n))});e||r!==w||(e=!0,a(t,d))}var y=n("asap/raw"),d=null,w={};t.exports=f,f._99=r,f.prototype.then=function(n,t){if(this.constructor!==f)return c(this,n,t);var e=new f(r);return s(this,new p(n,t,e)),e}},{"asap/raw":4}],2:[function(n,t,e){"use strict";function r(n){var t=new o(o._99);return t._37=1,t._12=n,t}var o=n("./core.js");t.exports=o;var i=r(!0),u=r(!1),f=r(null),c=r(void 0),s=r(0),l=r("");o.resolve=function(n){if(n instanceof o)return n;if(null===n)return f;if(void 0===n)return c;if(n===!0)return i;if(n===!1)return u;if(0===n)return s;if(""===n)return l;if("object"==typeof n||"function"==typeof n)try{var t=n.then;if("function"==typeof t)return new o(t.bind(n))}catch(e){return new o(function(n,t){t(e)})}return r(n)},o.all=function(n){var t=Array.prototype.slice.call(n);return new o(function(n,e){function r(u,f){if(f&&("object"==typeof f||"function"==typeof f)){if(f instanceof o&&f.then===o.prototype.then){for(;3===f._37;)f=f._12;return 1===f._37?r(u,f._12):(2===f._37&&e(f._12),void f.then(function(n){r(u,n)},e))}var c=f.then;if("function"==typeof c){var s=new o(c.bind(f));return void s.then(function(n){r(u,n)},e)}}t[u]=f,0===--i&&n(t)}if(0===t.length)return n([]);for(var i=t.length,u=0;u<t.length;u++)r(u,t[u])})},o.reject=function(n){return new o(function(t,e){e(n)})},o.race=function(n){return new o(function(t,e){n.forEach(function(n){o.resolve(n).then(t,e)})})},o.prototype["catch"]=function(n){return this.then(null,n)}},{"./core.js":1}],3:[function(n,t,e){"use strict";function r(){if(c.length)throw c.shift()}function o(n){var t;t=f.length?f.pop():new i,t.task=n,u(t)}function i(){this.task=null}var u=n("./raw"),f=[],c=[],s=u.makeRequestCallFromTimer(r);t.exports=o,i.prototype.call=function(){try{this.task.call()}catch(n){o.onerror?o.onerror(n):(c.push(n),s())}finally{this.task=null,f[f.length]=this}}},{"./raw":4}],4:[function(n,t,e){(function(n){"use strict";function e(n){f.length||(u(),c=!0),f[f.length]=n}function r(){for(;s<f.length;){var n=s;if(s+=1,f[n].call(),s>l){for(var t=0,e=f.length-s;e>t;t++)f[t]=f[t+s];f.length-=s,s=0}}f.length=0,s=0,c=!1}function o(n){var t=1,e=new a(n),r=document.createTextNode("");return e.observe(r,{characterData:!0}),function(){t=-t,r.data=t}}function i(n){return function(){function t(){clearTimeout(e),clearInterval(r),n()}var e=setTimeout(t,0),r=setInterval(t,50)}}t.exports=e;var u,f=[],c=!1,s=0,l=1024,a=n.MutationObserver||n.WebKitMutationObserver;u="function"==typeof a?o(r):i(r),e.requestFlush=u,e.makeRequestCallFromTimer=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],5:[function(n,t,e){"function"!=typeof Promise.prototype.done&&(Promise.prototype.done=function(n,t){var e=arguments.length?this.then.apply(this,arguments):this;e.then(null,function(n){setTimeout(function(){throw n},0)})})},{}],6:[function(n,t,e){n("asap");"undefined"==typeof Promise&&(Promise=n("./lib/core.js"),n("./lib/es6-extensions.js")),n("./polyfill-done.js")},{"./lib/core.js":1,"./lib/es6-extensions.js":2,"./polyfill-done.js":5,asap:3}]},{},[6]);

// - - - -


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
   var lastTime = 0;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
       window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
       window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                  || window[vendors[x]+'CancelRequestAnimationFrame'];
   }

   if (!window.requestAnimationFrame)
       window.requestAnimationFrame = function(callback, element) {
           var currTime = new Date().getTime();
           var timeToCall = Math.max(0, 16 - (currTime - lastTime));
           var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
             timeToCall);
           lastTime = currTime + timeToCall;
           return id;
       };

   if (!window.cancelAnimationFrame)
       window.cancelAnimationFrame = function(id) {
           clearTimeout(id);
       };
}());   

// - - - -
      

// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
    Array.from = (function () {
      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) { return 0; }
        if (number === 0 || !isFinite(number)) { return number; }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };
  
      // The length property of the from method is 1.
      return function from(arrayLike/*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;
  
        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);
  
        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }
  
        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }
  
          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }
  
        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);
  
        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method 
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);
  
        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }());
}
  
// - - - -

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.2.20171210
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

    // Full polyfill for browsers with no classList support
    // Including IE < Edge missing SVGElement.classList
    if (
           !("classList" in document.createElement("_")) 
        || document.createElementNS
        && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))
    ) {
    
    (function (view) {
    
    "use strict";
    
    if (!('Element' in view)) return;
    
    var
          classListProp = "classList"
        , protoProp = "prototype"
        , elemCtrProto = view.Element[protoProp]
        , objCtr = Object
        , strTrim = String[protoProp].trim || function () {
            return this.replace(/^\s+|\s+$/g, "");
        }
        , arrIndexOf = Array[protoProp].indexOf || function (item) {
            var
                  i = 0
                , len = this.length
            ;
            for (; i < len; i++) {
                if (i in this && this[i] === item) {
                    return i;
                }
            }
            return -1;
        }
        // Vendors: please allow content code to instantiate DOMExceptions
        , DOMEx = function (type, message) {
            this.name = type;
            this.code = DOMException[type];
            this.message = message;
        }
        , checkTokenAndGetIndex = function (classList, token) {
            if (token === "") {
                throw new DOMEx(
                      "SYNTAX_ERR"
                    , "The token must not be empty."
                );
            }
            if (/\s/.test(token)) {
                throw new DOMEx(
                      "INVALID_CHARACTER_ERR"
                    , "The token must not contain space characters."
                );
            }
            return arrIndexOf.call(classList, token);
        }
        , ClassList = function (elem) {
            var
                  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
                , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
                , i = 0
                , len = classes.length
            ;
            for (; i < len; i++) {
                this.push(classes[i]);
            }
            this._updateClassName = function () {
                elem.setAttribute("class", this.toString());
            };
        }
        , classListProto = ClassList[protoProp] = []
        , classListGetter = function () {
            return new ClassList(this);
        }
    ;
    // Most DOMException implementations don't allow calling DOMException's toString()
    // on non-DOMExceptions. Error's toString() is sufficient here.
    DOMEx[protoProp] = Error[protoProp];
    classListProto.item = function (i) {
        return this[i] || null;
    };
    classListProto.contains = function (token) {
        return ~checkTokenAndGetIndex(this, token + "");
    };
    classListProto.add = function () {
        var
              tokens = arguments
            , i = 0
            , l = tokens.length
            , token
            , updated = false
        ;
        do {
            token = tokens[i] + "";
            if (!~checkTokenAndGetIndex(this, token)) {
                this.push(token);
                updated = true;
            }
        }
        while (++i < l);
    
        if (updated) {
            this._updateClassName();
        }
    };
    classListProto.remove = function () {
        var
              tokens = arguments
            , i = 0
            , l = tokens.length
            , token
            , updated = false
            , index
        ;
        do {
            token = tokens[i] + "";
            index = checkTokenAndGetIndex(this, token);
            while (~index) {
                this.splice(index, 1);
                updated = true;
                index = checkTokenAndGetIndex(this, token);
            }
        }
        while (++i < l);
    
        if (updated) {
            this._updateClassName();
        }
    };
    classListProto.toggle = function (token, force) {
        var
              result = this.contains(token)
            , method = result ?
                force !== true && "remove"
            :
                force !== false && "add"
        ;
    
        if (method) {
            this[method](token);
        }
    
        if (force === true || force === false) {
            return force;
        } else {
            return !result;
        }
    };
    classListProto.replace = function (token, replacement_token) {
        var index = checkTokenAndGetIndex(token + "");
        if (~index) {
            this.splice(index, 1, replacement_token);
            this._updateClassName();
        }
    }
    classListProto.toString = function () {
        return this.join(" ");
    };
    
    if (objCtr.defineProperty) {
        var classListPropDesc = {
              get: classListGetter
            , enumerable: true
            , configurable: true
        };
        try {
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        } catch (ex) { // IE 8 doesn't support enumerable:true
            // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
            // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
            if (ex.number === undefined || ex.number === -0x7FF5EC54) {
                classListPropDesc.enumerable = false;
                objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
            }
        }
    } else if (objCtr[protoProp].__defineGetter__) {
        elemCtrProto.__defineGetter__(classListProp, classListGetter);
    }
    
    }(self));
    
    }
    
    // There is full or partial native classList support, so just check if we need
    // to normalize the add/remove and toggle APIs.
    
    (function () {
        "use strict";
    
        var testElement = document.createElement("_");
    
        testElement.classList.add("c1", "c2");
    
        // Polyfill for IE 10/11 and Firefox <26, where classList.add and
        // classList.remove exist but support only one argument at a time.
        if (!testElement.classList.contains("c2")) {
            var createMethod = function(method) {
                var original = DOMTokenList.prototype[method];
    
                DOMTokenList.prototype[method] = function(token) {
                    var i, len = arguments.length;
    
                    for (i = 0; i < len; i++) {
                        token = arguments[i];
                        original.call(this, token);
                    }
                };
            };
            createMethod('add');
            createMethod('remove');
        }
    
        testElement.classList.toggle("c3", false);
    
        // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
        // support the second argument.
        if (testElement.classList.contains("c3")) {
            var _toggle = DOMTokenList.prototype.toggle;
    
            DOMTokenList.prototype.toggle = function(token, force) {
                if (1 in arguments && !this.contains(token) === !force) {
                    return force;
                } else {
                    return _toggle.call(this, token);
                }
            };
    
        }
    
        // replace() polyfill
        if (!("replace" in document.createElement("_").classList)) {
            DOMTokenList.prototype.replace = function (token, replacement_token) {
                var
                      tokens = this.toString().split(" ")
                    , index = tokens.indexOf(token + "")
                ;
                if (~index) {
                    tokens = tokens.slice(index);
                    this.remove.apply(this, tokens);
                    this.add(replacement_token);
                    this.add.apply(this, tokens.slice(1));
                }
            }
        }
    
        testElement = null;
    }());
    
    }