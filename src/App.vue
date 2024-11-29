<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="px-2 pt-1">
      <div class="flex items-center justify-between">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />

        <div>
          <nav>
            <div class="flex gap-4 mr-8 font-semibold">
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/about">About</RouterLink>
              <RouterLink to="/chat">Chat with AI</RouterLink>
              <RouterLink to="/weather-app">Weather App</RouterLink>
            </div>
          </nav>
        </div>
        <div class=""></div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
