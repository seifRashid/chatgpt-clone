<script setup>
import { GoogleGenerativeAI } from '@google/generative-ai'; // Correct ES module import
import { marked } from 'marked';
import { ref } from 'vue';
import DOMPurify from "dompurify";

const answer = ref('');
const prompt = ref('');
const question = ref('');
const imageFile = ref(null); // Ref to hold the uploaded image

// API key from environment variables
const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

// Initialize the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(apiKey);

// Function to type out the response with a delay
const typeResponse = async (fullText, delay = 10) => {
  answer.value = ''; // Reset the displayed answer
  for (let i = 0; i < fullText.length; i++) {
    answer.value += fullText[i]; // Append one character at a time
    await new Promise((resolve) => setTimeout(resolve, delay)); // Add delay
  }
};

// Function to handle file input changes
const handleImageInput = (event) => {
  const files = event.target.files;
  if (files && files[0]) {
    imageFile.value = files[0];
  }
};

// Function to handle AI response generation
const generateResponse = async () => {
  try {
    if (!prompt.value && !imageFile.value) {
      alert('Please provide a text prompt or an image.');
      return;
    }

    // Set the question to display the user's prompt
    question.value = prompt.value;

    // Create form data to send to the API
    const formData = new FormData();
    if (prompt.value) formData.append('prompt', prompt.value);
    if (imageFile.value) formData.append('image', imageFile.value);

    // Load the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    // Generate content based on the form data
    const result = await model.generateContent(formData);

    // Sanitize and display the response
    const responseText = result.response.text();
    answer.value = DOMPurify.sanitize(marked(responseText));
    await typeResponse(responseText);
  } catch (error) {
    console.error('Error generating AI response:', error);
    answer.value = 'An error occurred while generating the response.';
  } finally {
    // Reset inputs
    prompt.value = '';
    imageFile.value = null;
  }
};
</script>

<template>
  <main>
    <div class="m-2">
      <h1 class="text-2xl font-semibold text-center">How can I help you? 😇</h1>

      <!-- Input for text prompt -->
      <div class="flex items-center justify-between">
        <input
          type="text"
          v-model="prompt"
          @keyup.enter="generateResponse"
          class="w-full mx-2 p-2 border border-gray-300 text-gray-700 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Type your prompt here..."
        />
      </div>

      <!-- Input for image upload -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">
          Upload an image (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          @change="handleImageInput"
          class="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:border-gray-300 file:text-gray-700 hover:file:bg-gray-100"
        />
      </div>

      <!-- Button to send the request -->
      <button
        @click="generateResponse"
        class="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold m-2 rounded-full mt-4"
      >
        Send
      </button>

      <!-- Display the user's question -->
      <p v-if="question" class="mx-8 mt-4 text-md prose max-w-none">
        <span class="font-semibold">Q:</span>
        <span class="px-2 py-1 bg-green-100 border border-green-200 rounded-md">{{ question }}</span>
      </p>

      <!-- Display the AI's response -->
      <p v-html="answer" class="blink mx-8 mt-4 text-md prose max-w-none"></p>
    </div>
  </main>
</template>

<style scoped>
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
</style>
