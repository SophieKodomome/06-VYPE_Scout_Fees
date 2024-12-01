<script setup lang="ts">
import { ref, onMounted } from "vue";

// State variables
const data =
  ref<{
    people: {
      id: number;
      id_string: string | null;
      id_role: number | null;
      role: string | null;
      church: string | null;
      district: string | null;
      dioseze: string | null;
      subscription: number | null;
      payment: number | null;
      year: number | null;
      birth_date: string | null; // Assuming ISO date format
      age_limitation: number | null;
    }[];
  } | null>(null);

const isLoading = ref(true);
const error = ref<string | null>(null);

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

console.log(data);
</script>

<template>
  <main>
    <div class="mx-24 my-12 flex flex-col space-y-4">
      <!-- Loading state -->
      <div v-if="isLoading" class="text-center text-gray-700">Loading...</div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center text-red-600">
        {{ error }}
      </div>

      <!-- Data display -->
      <div v-else>
        <div class="flex flex-col space-y-4">
          <!-- Table header -->
          <section class="flex flex-row py-4 bg-blue-800 rounded-md">
            <span class="w-14"><h3 class="text-gray-100 font-semibold">ID</h3></span>
            <span class="w-32"><h3 class="text-gray-100 font-semibold">ID String</h3></span>
            <span class="w-32"><h3 class="text-gray-100 font-semibold">Role</h3></span>
            <span class="w-48"><h3 class="text-gray-100 font-semibold">Diocese</h3></span>
            <span class="w-48"><h3 class="text-gray-100 font-semibold">District</h3></span>
            <span class="w-64"><h3 class="text-gray-100 font-semibold">Church</h3></span>
            <span class="w-32"><h3 class="text-gray-100 font-semibold">Subscription</h3></span>
            <span class="w-32"><h3 class="text-gray-100 font-semibold">Payment</h3></span>
            <span class="w-32"><h3 class="text-gray-100 font-semibold">Year</h3></span>
            <span class="w-48"><h3 class="text-gray-100 font-semibold">Birth Date</h3></span>
            <span class="w-32"><h3 class="text-gray-100 font-semibold">Age Limit</h3></span>
          </section>

          <!-- Table rows -->
          <div class="bg-gray-300 flex flex-col rounded-md">
            <section v-for="person in data.people" :key="person.id" class="flex flex-row py-4 bg-gray-200 rounded-md">
              <span class="w-14"><h3 class="text-gray-800">{{ person.id }}</h3></span>
              <span class="w-32"><h3 class="text-gray-800">{{ person.id_string || 'N/A' }}</h3></span>
              <span class="w-32"><h3 class="text-gray-800">{{ person.role || 'N/A' }}</h3></span>
              <span class="w-48"><h3 class="text-gray-800">{{ person.dioseze || 'N/A' }}</h3></span>
              <span class="w-48"><h3 class="text-gray-800">{{ person.district || 'N/A' }}</h3></span>
              <span class="w-64"><h3 class="text-gray-800">{{ person.church || 'N/A' }}</h3></span>
              <span class="w-32"><h3 class="text-gray-800">{{ person.subscription || 'N/A' }}</h3></span>
              <span class="w-32"><h3 class="text-gray-800">{{ person.payment || 'N/A' }}</h3></span>
              <span class="w-32"><h3 class="text-gray-800">{{ person.year || 'N/A' }}</h3></span>
              <span class="w-48"><h3 class="text-gray-800">{{ person.birth_date || 'N/A' }}</h3></span>
              <span class="w-32"><h3 class="text-gray-800">{{ person.age_limitation || 'N/A' }}</h3></span>
            </section>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
