import axios from "axios";
import { useTokenStore } from "../stores/token";
import { refreshToken } from "../apis/token";

const request = axios.create({
  baseURL: "http://localhost:3000",
});

const white_urls = ["/login", "/refresh_token"];

request.interceptors.request.use(
  (config) => {
    if (!white_urls.includes(config.url as string)) {
      config.headers.Authorization =
        "Bearer " + useTokenStore().tokenInfo?.access_token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const { data } = await refreshToken();

      if (data) {
        // 保存新的token
        useTokenStore().saveToken(JSON.stringify(data));
        // 重新请求之前的接口，并且把结果返回
        return request(error.config);
      } else {
        // 跳转登录
        console.log("跳转登录");
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default request;
