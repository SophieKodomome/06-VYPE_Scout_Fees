<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header>
    <div class="flex flex-row bg-blue-600">
      <span class="text-gray-100 px-10 py-6 hover:text-blue-600 hover:bg-blue-100  ease-out duration-300">
        <RouterLink class=" uppercase text-1xl font-bold " to="/">Accueil</RouterLink>
      </span>
      <span class="text-gray-100 px-10 py-6 hover:text-blue-600 hover:bg-blue-100  ease-out duration-300">
        <RouterLink class=" uppercase text-1xl font-bold " to="/">Paiement</RouterLink>
      </span>
    </div>
  </header>
</template>