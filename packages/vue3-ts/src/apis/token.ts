import { useTokenStore } from "../stores/token";
import request from "../utils/request";

let promiseRT: Promise<any>;
let isRefreshing = false;

function refreshToken() {
  // 解决多次请求401时候，多次刷新token
  if (isRefreshing) {
    return promiseRT;
  }
  isRefreshing = true;
  promiseRT = request({
    method: "POST",
    url: "/refresh_token",
    data: {
      refresh_token: useTokenStore().tokenInfo?.refresh_token,
    },
  }).finally(() => {
    isRefreshing = false;
  });

  return promiseRT;
}

export { refreshToken };
