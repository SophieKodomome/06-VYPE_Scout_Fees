<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

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

// Computed properties for summaries
const totalPaymentByYear = computed(() => {
  if (!data.value) return {};
  return data.value.people.reduce((acc, person) => {
    if (person.year && person.payment) {
      acc[person.year] = (acc[person.year] || 0) + person.payment;
    }
    return acc;
  }, {} as Record<number, number>);
});

const totalPaymentByDistrictAndYear = computed(() => {
  if (!data.value) return {};
  return data.value.people.reduce((acc, person) => {
    if (person.year && person.district && person.payment) {
      const key = `${person.district}-${person.year}`;
      acc[key] = (acc[key] || 0) + person.payment;
    }
    return acc;
  }, {} as Record<string, number>);
});

const totalPaymentByChurchAndYear = computed(() => {
  if (!data.value) return {};
  return data.value.people.reduce((acc, person) => {
    if (person.year && person.church && person.payment) {
      const key = `${person.church}-${person.year}`;
      acc[key] = (acc[key] || 0) + person.payment;
    }
    return acc;
  }, {} as Record<string, number>);
});
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
        <!-- Scrollable table -->
        <div class="border rounded-md">
          <div class="flex flex-col space-y-4">
            <!-- Table header -->
            <section class="flex flex-row py-4 bg-blue-800 rounded-md min-w-max">
              <span class="w-32 ml-4"><h3 class="text-gray-100 font-semibold">ID String</h3></span>
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
            <div class="bg-gray-300 flex flex-col rounded-md overflow-x-auto max-h-[400px] overflow-y-auto ">
              <section
                v-for="person in data.people"
                :key="person.id"
                class="flex flex-row py-4 bg-gray-200 rounded-md min-w-max"
              >
                <span class="w-32 ml-4"><h3 class="text-gray-800">{{ person.id_string}}</h3></span>
                <span class="w-32"><h3 class="text-gray-800">{{ person.role}}</h3></span>
                <span class="w-48"><h3 class="text-gray-800">{{ person.dioseze}}</h3></span>
                <span class="w-48"><h3 class="text-gray-800">{{ person.district}}</h3></span>
                <span class="w-64"><h3 class="text-gray-800">{{ person.church}}</h3></span>
                <span class="w-32"><h3 class="text-gray-800">{{ person.subscription}}</h3></span>
                <span class="w-32"><h3 class="text-gray-800">{{ person.payment}}</h3></span>
                <span class="w-32"><h3 class="text-gray-800">{{ person.year}}</h3></span>
                <span class="w-48"><h3 class="text-gray-800">{{ person.birth_date}}</h3></span>
                <span class="w-32"><h3 class="text-gray-800">{{ person.age_limitation}}</h3></span>
              </section>
            </div>
          </div>
        </div>

        <!-- Summary tables -->
        <div class="mt-8">
          <!-- Total Payment by Year -->
          <h3 class="font-semibold text-lg">Total Payment by Year</h3>
          <div class="overflow-y-auto max-h-[200px] border rounded-md p-4">
            <ul>
              <li
                v-for="(total, year) in totalPaymentByYear"
                :key="year"
              >
                Year {{ year }}: {{ total }}
              </li>
            </ul>
          </div>

          <!-- Total Payment by District per Year -->
          <h3 class="font-semibold text-lg mt-4">Total Payment by District per Year</h3>
          <div class="overflow-y-auto max-h-[200px] border rounded-md p-4">
            <ul>
              <li
                v-for="(total, key) in totalPaymentByDistrictAndYear"
                :key="key"
              >
                {{ key.split('-')[0] }} (Year {{ key.split('-')[1] }}): {{ total }}
              </li>
            </ul>
          </div>

          <!-- Total Payment by Church per Year -->
          <h3 class="font-semibold text-lg mt-4">Total Payment by Church per Year</h3>
          <div class="overflow-y-auto max-h-[200px] border rounded-md p-4">
            <ul>
              <li
                v-for="(total, key) in totalPaymentByChurchAndYear"
                :key="key"
              >
                {{ key.split('-')[0] }} (Year {{ key.split('-')[1] }}): {{ total }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

