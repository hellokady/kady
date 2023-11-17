import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTokenStore = defineStore("token-store", () => {
  // 类似于state
  const tokenJSON = ref("");
  // 类似于getters
  const tokenInfo = computed(() => {
    try {
      return JSON.parse(
        tokenJSON.value || localStorage.getItem("tokenInfo") || "{}"
      );
    } catch (error) {
      console.error("tokenInfo error>>>", error);
      localStorage.setItem("tokenInfo", JSON.stringify({}));
    }
  });
  // 类似于actions
  function saveToken(tokenInfo: string) {
    tokenJSON.value = tokenInfo;
    localStorage.setItem("tokenInfo", tokenInfo);
  }

  return {
    tokenInfo,
    saveToken,
  };
});
