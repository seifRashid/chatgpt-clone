<script setup>
// import { ref } from 'vue'

</script>

<template>
  <main>
    <div class="flex items-center justify-center">
      <div class="max-w-sm w-full h-screen bg-gray-200">
        <div class="flex flex-col h-screen bg-[url(/public/images/raining.jpg)] bg-cover bg-center">
          <div class="p-4">
            <input
            type="text"
            v-model="txtinput"
            class="bg-gray-100 py-3 px-5 w-full outline-none round"
            placeholder="search..."
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped >
.round {
  border-radius:0px 24px 0px 24px;
  box-shadow:1px 1px 20px rgba(0, 0, 0, 0.678);
  transition: border-radius 1s;
}

.round:focus {
  border-radius:24px 0px 24px 0px;
}
</style>

