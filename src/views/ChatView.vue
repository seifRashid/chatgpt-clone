<script setup>
import { ref, reactive } from 'vue'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { marked } from 'marked';
import DOMPurify from "dompurify";


const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })


const chat = model.startChat({
  history: [
    {
      role: 'user',
      parts: [{ text: 'Who created this app?' }],
    },
    {
      role: 'model',
      parts: [
        {
          text: 'This app was created by Rashid, with assistance from the Gemini API for its AI capabilities. It’s designed to provide a seamless and helpful user experience! Rashid is an aspiring software engineer and has done a bachelor of science in information technology and is very apassionate about softwares in general.He comes from a humble village called Amani that is in Mikindani, Mombasa, Kenya'
        },
      ],
    },
  ],
});


const userInput = ref('')
const conversation = reactive([
  { role: 'model', text: 'Great to meet you 😇. What would you like to know?' },
])
const isLoading = ref(false)

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  // Add user's input to the conversation
  conversation.push({ role: 'user', text: userInput.value });
  const userMessage = userInput.value;
  userInput.value = '';

  // Show loading state
  isLoading.value = true

  try {
    const result = await chat.sendMessage(userMessage)
    conversation.push({ role: 'model', text: DOMPurify.sanitize(marked(result.response.text())) })
  } catch (error) {
    conversation.push({ role: 'model', text: 'Oops! Something went wrong🤯. Please try again.' }, error)
  } finally {
    isLoading.value = false
  }
}

const supriseMe = async ()=> {
  // userInput.value = 'suprise me'
  try {
    const result = await chat.sendMessage('provide me with a short suprise for this user')
    conversation.push({ role: 'model', text: DOMPurify.sanitize(marked(result.response.text())) })
  } catch (error) {
    conversation.push({ role: 'model', text: 'Oops! Something went wrong. Please try again.' }, error)
  } finally {
    isLoading.value = false
  }
    }


</script>

<template>
  <main class="bg-gray-100 min-h-screen flex flex-col items-center justify-between p-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">AI Chat Assistant</h1>
    <div
    class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 space-y-4 overflow-y-auto overflow-x-auto"
    >
    <button class="text-blue-800 bg-blue-200 p-1 rounded-md font-semibold shadow-sm hover:bg-blue-300" @click="supriseMe" >Suprise me✨</button>
      <template v-for="(message, index) in conversation" :key="index">
        <div
          v-if="message.role === 'user'"
          class="bg-blue-100 text-blue-800 p-3 rounded-lg self-end w-fit animate-fade-in prose max-w-none"
        >
          {{ message.text }}
        </div>
        <div
          v-else
          class="bg-gray-100 text-gray-800 p-3 rounded-lg self-start w-fit animate-fade-in prose max-w-none"
          v-html="message.text"
        >

        </div>
      </template>
      <div v-if="isLoading" class="text-gray-500 italic animate-pulse">Thinking...</div>
    </div>

    <div class="w-full max-w-2xl mt-4 flex space-x-4 sticky bottom-1">
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
"
