<script setup>
import { GoogleGenerativeAI } from '@google/generative-ai' // Correct ES module import
import { marked } from 'marked';
import { ref } from 'vue'
import DOMPurify from "dompurify";

const answer = ref('')

const typeResponse = async (fullText, delay = 10) => {
  answer.value = ''; // Reset the displayed answer
  for (let i = 0; i < fullText.length; i++) {
    answer.value += fullText[i]; // Append one character at a time
    await new Promise((resolve) => setTimeout(resolve, delay)); // Add delay
  }
};
// Access the API key securely from environment variables
// const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY

const genAI = new GoogleGenerativeAI(apiKey)

// Asynchronous function to handle AI response generation
const generateResponse = async (prompt) => {
  try {
    // Load the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Generate content based on the prompt
    const result = await model.generateContent(prompt)

    // Log the response for debugging
    console.log(result.response.text())
    answer.value =  DOMPurify.sanitize(marked(result.response.text()));
    typeResponse(answer.value)
    return result.response.text() // Return the generated text
  } catch (error) {
    console.error('Error generating AI response:', error)
    return 'An error occurred while generating the response.'
  }
}

// Example usage (you can tie this to a button or UI event)
const prompt = ref()
const question = ref('')
// generateResponse(prompt)

// set question when prompt is set so that it can be shown before the answer is shown using computed
const questionDown =()=>{
  question.value = prompt.value
  prompt.value = ''
}

generateResponse(prompt)

</script>

<template>
  <main>
    <!-- AI Chat Output Placeholder -->
    <div class="m-2">
      <h1 class="text-2xl font-semibold text-center my-2">How can I help you😇?</h1>
      <div class="flex items-center justify-between">
        <input
          type="text"
          v-model="prompt"
          @keyup.enter="generateResponse(prompt) && questionDown()"
          class="w-full mx-2 p-2 border border-gray-300 text-gray-700 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="How can I help you..."
        />
        <button
          @click="generateResponse(prompt)"
          class="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold m-2 rounded-full"
        >
          send
        </button>

      </div>
      <p v-show="{prompt:true}" class="mx-8 mt-4 text-md prose max-w-none"><span class="font-semibold" >Q:</span> <span class="px-2 py-1 bg-green-100 border border-green-200 rounded-md">{{ question }}</span></p>
      <p v-html="answer" class="blink mx-8 mt-4 text-md prose max-w-none"></p>
    </div>
  </main>
</template>
<style scoped >
.blink::after {
  content: "|"; /* Simulate typing cursor */
  display: inline-block;
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
/* General styles for the response container */

</style>

