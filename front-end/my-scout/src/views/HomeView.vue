<script setup lang="ts">
import MyHeader from "@/components/MyHeader.vue";
import { computed } from "@vue/reactivity";
import { ref, onMounted } from "vue";

// State variables
const data = ref<{ people: any[] } | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const totalPaid = computed(() => {
  return data.value?.people.reduce((sum, person) => sum + person.paid, 0) ?? 0;
});

const totalDue = computed(() => {
  return data.value?.people.reduce((sum, person) => sum + person.due, 0) ?? 0;
});
onMounted(async () => {
  try {
    const response = await fetch("http://localhost:8000/getData");
    if (!response.ok) throw new Error("Failed to fetch data");

    const result = await response.json();
    data.value = result.data; // Assume the API sends the data in `result.data`
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = String(err);
    }
  } finally {
    isLoading.value = false;
  }
});

</script>
<template>
  <main>
    <MyHeader />
    <div class="mx-24 my-12 flex flex-col space-y-4">
      <!-- Loading state -->
      <div v-if="isLoading" class="text-center text-gray-700">Loading...</div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center text-red-600">
        {{ error }}
      </div>

      <!-- Data display -->
      <div v-else class="flex flex-col space-y-4">
        <section class="flex flex-row py-4 bg-blue-800 rounded-md">
          <span class="w-14">
            <h3 class="text-gray-100 font-semibold justify-self-center">ID</h3>
          </span>
          <span class="w-64">
            <h3 class="text-gray-100 font-semibold">Name</h3>
          </span>
          <span class="w-48">
            <h3 class="text-gray-100 font-semibold">Somme pay&eacute;</h3>
          </span>
          <span class="w-48">
            <h3 class="text-gray-100 font-semibold">Somme demand&eacute;</h3>
          </span>
        </section>

        <div class="bg-gray-300 flex flex-col rounded-md">
          <section v-for="person in data.people" :key="person.id" class="flex flex-row py-4 bg-gray-200 rounded-md">
            <span class="w-14">
              <h3 class="text-gray-800 justify-self-center">{{ person.id }}</h3>
            </span>
            <span class="w-64">
              <h3 class="text-gray-800">{{ person.name }}</h3>
            </span>
            <span class="w-48">
              <h3 class="text-gray-800">{{ person.paid }}</h3>
            </span>
            <span class="w-48">
              <h3 class="text-gray-800">{{ person.due }}</h3>
            </span>
          </section>
        </div>
        <div class="flex flex-row py-4 bg-green-200 rounded-md mt-4">
          <span class="w-14"></span>
          <span class="w-64 font-semibold">Totals:</span>
          <span class="w-48 font-semibold">{{ totalPaid }}</span>
          <span class="w-48 font-semibold">{{ totalDue }}</span>
        </div>
      </div>
    </div>
  </main>
</template>
