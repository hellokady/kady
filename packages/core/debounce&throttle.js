import { throttle, debounce } from "@kady/lib";

const testThrottle = throttle(() => {
  console.log(1);
}, 10);

const testDebounce = debounce(() => {
  console.log(2);
}, 3000);

testThrottle();
testDebounce();

