'use strict';

/*!
* requestAnimationFrame Polyfill
*
* @version 0.1.0
* @overview A polyfill for requestAnimationFrame written in ES6.
* @author Jacob Müller [jacob.mueller.elz@gmail.com]
* @see {@link https://github.com/jackmu95/request-animation-frame-polyfill-es6|GitHub}
*/

(function (window) {
  if (window.requestAnimationFrame) {
    return;
  }

  var lastTime = 0;
  var vendors = ['moz', 'ms', 'o', 'webkit'];
  for (var i = 0; i < vendors.length; i++) {
    window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
  }

  window.requestAnimationFrame = function (callback, element) {
    var now = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (now - lastTime));
    return window.setTimeout(function () {
      callback(lastTime = now + timeToCall);
    }, timeToCall);
  };

  window.cancelAnimationFrame = window.clearTimeout;
})(window);