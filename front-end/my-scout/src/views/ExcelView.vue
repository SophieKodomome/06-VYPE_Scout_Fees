<script setup lang="ts">
import MyButton from "@/components/MyButton.vue";
import * as XLSX from "xlsx";
import { ref } from "vue";

const requiredHeaders = ["year", "id", "name", "role", "dioseze", "district", "church", "paid"];
const fileError = ref<string | null>(null);
const isFileValid = ref(false);
const uploadedFile = ref<File | null>(null); // Store the uploaded file reference
const parsedData = ref<any[]>([]); // Store parsed sheet data

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) {
    fileError.value = "No file selected.";
    isFileValid.value = false;
    uploadedFile.value = null;
    return;
  }

  uploadedFile.value = file; // Store the file for later use

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Parse the headers
      const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0] as string[];

      // Validate headers
      const isValid = requiredHeaders.every((header) => headers.includes(header));
      if (isValid) {
        fileError.value = null;
        isFileValid.value = true;
        parsedData.value = XLSX.utils.sheet_to_json(sheet); // Parse entire sheet data
      } else {
        fileError.value = `Invalid headers. Expected: ${requiredHeaders.join(", ")}`;
        isFileValid.value = false;
      }
    } catch (error) {
      fileError.value = "Error reading the file.";
      isFileValid.value = false;
    }
  };

  reader.onerror = () => {
    fileError.value = "Error uploading the file.";
    isFileValid.value = false;
  };

  reader.readAsBinaryString(file);
}

function handleSubmit() {
  if (!isFileValid.value) {
    fileError.value = "Please upload a valid file before submitting.";
    return;
  }

  if (!uploadedFile.value) {
    fileError.value = "No file uploaded.";
    return;
  }

  // Display parsed data (already parsed in `handleFileUpload`)
  console.log("Parsed Data:", parsedData.value);
}
</script>

<template>
  <main class="mt-16">
    <div class="bg-gray-100 rounded-lg shadow-lg px-16 py-16 flex flex-col space-y-8">
      <h1 class="uppercase font-bold text-2xl text-blue-600">Upload Excel File</h1>

      <!-- File Input -->
      <input type="file" accept=".xlsx, .xls" @change="handleFileUpload" />
      <p v-if="fileError" class="text-red-500">{{ fileError }}</p>
      <p v-if="isFileValid" class="text-green-500">File is valid!</p>

      <!-- Display Sheet Data -->
      <div v-if="parsedData.length > 0" class="mt-4">
        <h2 class="font-bold text-lg text-gray-700">Sheet Data:</h2>
        <table class="table-auto border-collapse border border-gray-400 w-full mt-2">
          <thead>
            <tr>
              <th v-for="(header, index) in Object.keys(parsedData[0])" :key="index" class="border border-gray-300 px-4 py-2 text-left">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in parsedData" :key="rowIndex">
              <td
                v-for="(value, key) in row"
                :key="key"
                class="border border-gray-300 px-4 py-2"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Submit Button -->
      <section class="justify-items-end">
        <MyButton v-on:click="handleSubmit" />
      </section>
    </div>
  </main>
</template>
