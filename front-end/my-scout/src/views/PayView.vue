<script setup lang="ts">
import MyButton from "@/components/MyButton.vue";
import MyHeader from "@/components/MyHeader.vue";
import MyLargeButton from "@/components/MyLargeButton.vue";
import { ref, onMounted } from "vue";

const payment = ref("");

</script>
<template>
    <main class="justify-items-center mt-16">
        <div class="bg-gray-100 rounded-lg shadow-lg px-16 py-16 flex flex-col space-y-8">
            <h1 class="uppercase font-bold text-2xl text-blue-600">Paiement des frais de participation</h1>
            <section class="flex flex-col space-y-8">
                <section class="flex flex-col space-y-2">
                    <label for="individual" class="text-xl hover:text-blue-400">Individu</label>
                    <input class="input" placeholder="Name" id="individual" v-model="payment">
                </section>
                <section class="flex flex-col space-y-2">
                    <label for="payment" class="text-xl hover:text-blue-400">Somme</label>
                    <input class="input" placeholder="..." id="payment" v-model="payment">
                </section>
                <MyLargeButton/>
                <section class=" justify-items-end">
                    <MyButton/>
                </section>
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