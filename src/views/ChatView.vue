<script setup>
import { ref, reactive } from 'vue'
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

const chat = model.startChat({
  history: [
    {
      role: 'user',
      parts: [{ text: 'Hello' }],
    },
    {
      role: 'model',
      parts: [{ text: 'Great to meet you. What would you like to know?' }],
    },
  ],
})

const userInput = ref('')
const conversation = reactive([
  { role: 'model', text: 'Great to meet you. What would you like to know?' },
])
const isLoading = ref(false)

const sendMessage = async () => {
  if (!userInput.value.trim()) return

  // Add user's input to the conversation
  conversation.push({ role: 'user', text: userInput.value })
  const userMessage = userInput.value
  userInput.value = ''

  // Show loading state
  isLoading.value = true

  try {
    const result = await chat.sendMessage(userMessage)
    conversation.push({ role: 'model', text: result.response.text() })
  } catch (error) {
    conversation.push({ role: 'model', text: 'Oops! Something went wrong. Please try again.' }, error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="bg-gray-100 min-h-screen flex flex-col items-center p-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">AI Chat Assistant</h1>

    <div
      class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 space-y-4 overflow-y-auto h-[60vh]"
    >
      <template v-for="(message, index) in conversation" :key="index">
        <div
          v-if="message.role === 'user'"
          class="bg-blue-100 text-blue-800 p-3 rounded-lg self-end w-fit animate-fade-in"
        >
          {{ message.text }}
        </div>
        <div
          v-else
          class="bg-gray-100 text-gray-800 p-3 rounded-lg self-start w-fit animate-fade-in"
        >
          {{ message.text }}
        </div>
      </template>
      <div v-if="isLoading" class="text-gray-500 italic animate-pulse">Thinking...</div>
    </div>

    <div class="w-full max-w-2xl mt-4 flex space-x-4">
      <input
        v-model="userInput"
        type="text"
        placeholder="Type your message..."
        class="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        @keyup.enter="sendMessage"
      />
      <button
        @click="sendMessage"
        class="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
      >
        Send
      </button>
    </div>
  </main>
</template>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
