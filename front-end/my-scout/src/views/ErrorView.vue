<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ref, onMounted } from "vue";
import * as XLSX from "xlsx"; // Import XLSX library

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

// Function to export data to Excel
const exportToExcel = () => {
  if (!data.value?.error || data.value.error.length === 0) {
    alert("No data to export");
    return;
  }

  // Prepare data for Excel
  const worksheet = XLSX.utils.json_to_sheet(data.value.error);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Errors");

  // Trigger download
  XLSX.writeFile(workbook, "Error_List.xlsx");
};
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
        <!-- Button to export to Excel -->
        <button
          class="bg-green-500 text-white px-4 py-2 rounded-lg"
          @click="exportToExcel"
        >
          Download Error List as Excel
        </button>

        <div class="flex flex-col space-y-4 mt-4">
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
