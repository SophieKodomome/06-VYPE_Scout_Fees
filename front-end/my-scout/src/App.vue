<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MyHeader from './components/MyHeader.vue';
import HomeView from './views/HomeView.vue';
</script>

<template>
  <MyHeader/>
  <RouterView/>
</template>
