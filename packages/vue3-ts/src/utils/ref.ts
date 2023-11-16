import { customRef } from "vue";
import { debounce } from "@kady/lib";
import type { Ref } from "vue";

const debounceRef = <T>(
  value: T,
  delay: number,
  immediate?: boolean
): Ref<T> => {
  return customRef((track, trigger) => ({
    get() {
      track();
      return value;
    },
    set: debounce(
      (newValue: T) => {
        value = newValue;
        trigger();
      },
      delay,
      immediate
    ),
  }));
};

export { debounceRef };
