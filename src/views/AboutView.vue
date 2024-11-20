<script setup>
import { GoogleGenerativeAI } from '@google/generative-ai'; // Correct ES module import
// import { marked } from 'marked';
import { ref } from 'vue';

const answer = ref(''); // Stores the displayed answer (with typing effect)
const prompt = ref(''); // Stores the user's prompt input

// Access the API key securely from environment variables
const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

// Typing effect function
const typeResponse = async (fullText, delay = 50) => {
  answer.value = ''; // Reset the displayed answer
  for (let i = 0; i < fullText.length; i++) {
    answer.value += fullText[i]; // Append one character at a time
    await new Promise((resolve) => setTimeout(resolve, delay)); // Add delay
  }
};

// Asynchronous function to handle AI response generation
const generateResponse = async () => {
  try {
    if (!prompt.value.trim()) {
      answer.value = 'Please enter a valid prompt.';
      return;
    }

    // Load the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate content based on the prompt
    const result = await model.generateContent(prompt.value);

    // Log the response for debugging
    const fullResponse = result.response.text();
    console.log(fullResponse);

    // Use the typing effect to display the response
    await typeResponse(fullResponse);
  } catch (error) {
    console.error('Error generating AI response:', error);
    answer.value = 'An error occurred while generating the response.';
  }
};
</script>

<template>
  <main>
    <!-- Input section -->
    <div class="m-2">
      <h1 class="text-2xl font-semibold text-center">What do you want to look for?</h1>
      <div class="flex items-center justify-between">
        <input
          type="text"
          v-model="prompt"
          @keyup.enter="generateResponse"
          class="w-full mx-2 p-2 border border-gray-500"
          placeholder="How can I help you..."
        />
        <button
          @click="generateResponse"
          class="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold m-2 rounded-full"
        >
          Send
        </button>
      </div>

      <!-- AI Response with typing effect -->
      <p class="mt-4 text-lg whitespace-pre-wrap">{{ answer }}</p>
    </div>
  </main>
</template>

<style>
/* Optional CSS for blinking cursor */
p::after {
  content: "|"; /* Simulate typing cursor */
  display: inline-block;
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
