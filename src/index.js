/*!
* requestAnimationFrame Polyfill
*
* @version 0.1.0
* @overview A polyfill for requestAnimationFrame written in ES6.
* @author Jacob Müller [jacob.mueller.elz@gmail.com]
* @see {@link https://github.com/jackmu95/request-animation-frame-polyfill-es6|GitHub}
*/

(window => {
  if (window.requestAnimationFrame) {
    return;
  }

  let lastTime = 0;
  const vendors = ['moz', 'ms', 'o', 'webkit'];
  for (let i = 0; i < vendors.length; i++) {
    window.requestAnimationFrame =
        window[`${vendors[i]}RequestAnimationFrame`];
    window.cancelAnimationFrame =
        window[`${vendors[i]}CancelAnimationFrame`] ||
        window[`${vendors[i]}CancelRequestAnimationFrame`];
  }

  window.requestAnimationFrame = (callback, element) => {
    const now = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (now - lastTime));
    return window.setTimeout(() => {
      callback(lastTime = now + timeToCall);
    }, timeToCall);
  };

  window.cancelAnimationFrame = window.clearTimeout;
})(window);
