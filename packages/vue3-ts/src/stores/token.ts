import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTokenStore = defineStore("token-store", () => {
  // 类似于state
  const tokenJSON = ref("");
  // 类似于getters
  const token = computed(() => {
    return JSON.parse(tokenJSON.value || "{}");
  });
  // 类似于actions
  function saveToken(token: string) {
    tokenJSON.value = token;
  }

  return {
    token,
    saveToken,
  };
});
