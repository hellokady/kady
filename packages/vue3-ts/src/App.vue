<script setup lang="ts">
import { reactive } from "vue";

import { debounce } from "@kady/lib";
import { useTokenStore } from "./stores/token";
import { debounceRef } from "./utils/ref";
import request from "./utils/request";

const ref = debounceRef("hello", 1000);
const userInfo = reactive({
  name: "",
  avatar: "",
});
const store = useTokenStore();

async function login() {
  const { data } = await request({
    method: "POST",
    url: "/login",
  });

  store.saveToken(JSON.stringify(data));
}

async function getUserInfo() {
  const { data } = await request({
    method: "GET",
    url: "/info",
  });

  userInfo.name = data?.name;
  userInfo.avatar = data?.avatar;
}

const debounceLogin = debounce(login, 300);
const debounceUserInfo = debounce(getUserInfo, 300);
const getUsersInfo = () => {
  Promise.all([
    request({
      method: "GET",
      url: "/info",
    }),
    request({
      method: "GET",
      url: "/info",
    }),
  ]).then((res) => {
    console.log(res, "多次getUserInfo");
  });
};
</script>

<template>
  <div>
    <p>debounceRef：{{ ref }}</p>
    <input type="text" v-model="ref" />
    <hr />
    <div>store token: {{ store.tokenInfo }}</div>
    <hr />
    <button @click="debounceLogin">login</button>
    <hr />
    <div>
      <p>
        <span>登录后的用户名称：</span>
        <span>{{ userInfo.name }}</span>
      </p>
      <p>
        <span>登录后的用户头像：</span>
        <img :src="userInfo.avatar" />
      </p>
    </div>
    <button @click="debounceUserInfo">getUserInfo</button>
    <button @click="getUsersInfo">多次getUserInfo</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
