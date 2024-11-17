<script setup lang="ts">
import MyButton from "@/components/MyButton.vue";
import MyHeader from "@/components/MyHeader.vue";
import MyLargeButton from "@/components/MyLargeButton.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

const payments = ref<any[]>([]); // Array to store payment objects

const data = ref<{ people: any[] } | null>(null);
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

function handleAddPayment() {
  payments.value.push({ id: "", payment: null }); // Add empty object to array
}

async function handleSubmit() {
  for (const payment of payments.value) {
    if (!payment.id || payment.payment === null) {
      console.error("Missing data in payment form. Skipping...");
      continue; // Skip sending if data is missing
    }

    try {
      const response = await axios.post("http://localhost:8000/updatePayment", payment);
      console.log("Payment submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  }
  // Clear payments after successful submission (optional)
  payments.value = [];
}
</script>

<template>
  <main class="justify-items-center mt-16">
    <div v-if="isLoading" class="text-center text-gray-700">Loading...</div>

    <div v-else-if="error" class="text-center text-red-600">
      {{ error }}
    </div>

    <div v-else class="bg-gray-100 rounded-lg shadow-lg px-16 py-16 flex flex-col space-y-8">
      <h1 class="uppercase font-bold text-2xl text-blue-600">Paiement des frais de participation</h1>
      <template v-for="(payment, index) in payments" :key="index">
        <section class="flex flex-col space-y-8">
          <section class="flex flex-col space-y-2">
            <label for="individual" class="text-xl hover:text-blue-400">Individu</label>
            <select class="input" id="individual" v-model="payment.id">
              <option class="bg-gray-100" value="">La personne</option>
              <option class="bg-gray-100" v-for="person in data?.people" :value="person.id">
                {{ person.name }}
              </option>
            </select>
          </section>
          <section class="flex flex-col space-y-2">
            <label for="payment" class="text-xl hover:text-blue-400">Somme</label>
            <input class="input" placeholder="..." id="payment" v-model.number="payment.payment">
          </section>
          <span class="border-b-2 border-blue-600"></span>
        </section>
      </template>

      <MyLargeButton @click="handleAddPayment" />
      <section class="justify-items-end">
        <MyButton v-on:click="handleSubmit" />
      </section>
    </div>
  </main>
</template>
<style>
.input {
    border: 2px solid transparent;
    height: 40px;
    padding-left: 0.8em;
    outline: none;
    overflow: hidden;
    background-color: #dcdcdc;
    border-radius: 10px;
    transition: all 0.5s;
}

.input:hover,
.input:focus {
    border: 2px solid #4A9DEC;
    box-shadow: 0px 0px 0px 7px rgb(74, 157, 236, 20%);
    background-color: white;
}
</style>