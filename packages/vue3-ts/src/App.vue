<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { useTokenStore } from './stores/token';
import { debounceRef } from './utils/ref';

const ref = debounceRef('hello', 1000);

const store = useTokenStore();
</script>

<template>
  <div>
    <p>debounceRef：{{ ref }}</p>
    <input type="text" v-model="ref">
    <div>store: {{ store.token }}</div>
    <input type="text" @input="(e) => store.saveToken(JSON.stringify(e))" />
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
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
