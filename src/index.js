(window => {
  if (window.requestAnimationFrame) {
    return;
  }

  ['moz', 'ms', 'o', 'webkit'].forEach(vendor => {
    window.requestAnimationFrame = window[`${vendor}RequestAnimationFrame`];
    window.cancelAnimationFrame =
      window[`${vendor}CancelAnimationFrame`] || window[`${vendor}CancelRequestAnimationFrame`];
  });

  if (!window.requestAnimationFrame) {
    let lastTime = 0;

    window.requestAnimationFrame = callback => {
      const now = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (now - lastTime));
      return window.setTimeout(() => {
        callback((lastTime = now + timeToCall));
      }, timeToCall);
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = window.clearTimeout;
  }
})(window);
