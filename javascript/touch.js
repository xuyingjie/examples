// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events

// Be similar `Tap`, No `touchmove` judgment.
var buttonTap = (el, callback) => {

  if ("ontouchend" in document) {
    let time = 0;
    let len = 0;

    el.addEventListener('touchstart', event => {
      event.preventDefault();
      time = Date.now();
      len = event.changedTouches.length;
    }, false);
    // el.addEventListener('touchmove', event => {}, false);
    el.addEventListener('touchend', event => {
      event.preventDefault();
      let diff = Date.now() - time;
      if (diff < 250 && len === 1) {
        el.style['box-shadow'] = 'inset 1px 1px 5px rgba(0, 0, 0, 0.2)';
        _e = event;
        callback();
      }
    }, false);

  } else {
    el.addEventListener('click', event => {
      event.preventDefault();
      el.style['box-shadow'] = 'inset 1px 1px 5px rgba(0, 0, 0, 0.2)';
      _e = event;
      callback();
    }, false);
  }

};