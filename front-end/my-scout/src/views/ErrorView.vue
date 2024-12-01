<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ref, onMounted } from "vue";

// State variables
const data =
  ref<{
    error: any[],
  } | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
onMounted(async () => {
  try {
    const response = await fetch("http://localhost:8000/getError");
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
        <!---<aside class="fixed top-2/4 w-96 px-4 h-80 right-8 bg-gray-100 pb-8 rounded-lg shadow-md overflow-scroll">
          <h2 class="fixed text-red-600 uppercase font-semibold border-b-2 bg-gray-100 rounded-t-lg w-96 py-4">Attention</h2>
          <section class=" mt-16 pb-4">
            <div class="flex flex-col bg-green-200 rounded-md mt-4 p-4" v-for="church in data?.totalByChurch">
              <span class="font-semibold">{{ church.church_name }}</span>
              <span class="font-semibold">Pay&eacute;: {{ church.total_paid }}</span>
              <span class="font-semibold">Cotisation: {{ church.total_due }}</span>
            </div>
          </section>
        </aside>-->
        <div class="flex flex-col space-y-4">
          <section class="flex flex-row py-4 bg-blue-800 rounded-md">
            <span class="w-14">
              <h3 class="text-gray-100 font-semibold justify-self-center">ID</h3>
            </span>
            <span class="w-4/5">
              <h3 class="text-gray-100 font-semibold">Motif</h3>
            </span>
            <span class="w-32">
              <h3 class="text-gray-100 font-semibold">Date</h3>
            </span>
          </section>

          <div class="bg-gray-300 flex flex-col rounded-md">
            <section v-for="error in data.error" :key="error.id" class="flex flex-row py-4 bg-gray-200 rounded-md">
              <span class="w-14">
                <h3 class="text-gray-800 justify-self-center">{{ error.id }}</h3>
              </span>
              <span class="w-4/5">
                <h3 class="text-gray-800">{{ error.motif }}</h3>
              </span> 
              <span class="w-32">
                <h3 class="text-gray-800">{{ error.date }}</h3>
              </span>
            </section>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
