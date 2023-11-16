function debounce(fn: Function, delay: number, immediate?: boolean) {
  let timer: number;

  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    if (!timer && immediate) {
      fn.call(this, ...args);
    }

    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
}

function throttle(fn: Function, delay: number) {
  let pre: number;

  return function (...args: any[]) {
    let now = Date.now();
    if (now - pre >= delay) {
      fn.call(this, ...args);
      pre = now;
    }
  };
}

export { debounce, throttle };
