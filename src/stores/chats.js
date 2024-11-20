import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({
    messages: [], // Array of chat messages
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message);
    },
    resetChat() {
      this.messages = [];
    },
  },
});
