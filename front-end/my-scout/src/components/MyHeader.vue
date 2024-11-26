<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header>
    <div class="flex flex-row bg-blue-600">
      <RouterLink class=" text-gray-100 hover:text-blue-600 hover:bg-blue-100  ease-out duration-300" to="/">
        <h1 class="py-6 px-10 uppercase text-1xl font-bold justify-items-center">
          Accueil
        </h1>
      </RouterLink>
      <RouterLink class=" text-gray-100 hover:text-blue-600 hover:bg-blue-100  ease-out duration-300" to="/Pay">
        <h1 class="py-6 px-10 uppercase text-1xl font-bold justify-items-center">
          Paiement
        </h1>
      </RouterLink>
      <RouterLink class=" text-gray-100 hover:text-blue-600 hover:bg-blue-100  ease-out duration-300" to="/Excel">
        <h1 class="py-6 px-10 uppercase text-1xl font-bold justify-items-center">
          Excel
        </h1>
      </RouterLink>
    </div>
  </header>
</template>