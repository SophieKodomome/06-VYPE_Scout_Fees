<script setup lang="ts">
import MyButton from "@/components/MyButton.vue";
import * as XLSX from "xlsx";
import { ref } from "vue";
import axios from "axios";

const requiredHeaders = ["year", "birthday", "id", "name", "role", "dioseze", "district", "church", "paid"];
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

  uploadedFile.value = file;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Parse the headers and normalize them
      const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0] as string[];
      console.log("Parsed Headers:", headers);
      const normalizedHeaders = headers.map((header) => header.trim().toLowerCase());

      // Validate headers
      const isValid = requiredHeaders.every((header) =>
        normalizedHeaders.includes(header.toLowerCase())
      );
      if (isValid) {
        fileError.value = null;
        isFileValid.value = true;

        // Parse the sheet data and handle dates/empty values
        const rawData = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
        parsedData.value = rawData.map((row: any) => {
          const formattedRow: any = {};

          // Map headers and normalize empty columns
          for (const [key, value] of Object.entries(row)) {
            const normalizedKey = key.trim().toLowerCase();

            // Handle date fields
            if (normalizedKey === "birthday" && value) {
              const dateValue = new Date(value);
              if (!isNaN(dateValue.getTime())) {
                formattedRow[normalizedKey] = XLSX.SSF.format("yyyy/mm/dd", dateValue);
              } else {
                formattedRow[normalizedKey] = ""; // Handle invalid dates
              }
            } else {
              formattedRow[normalizedKey] = value || ""; // Default empty values
            }
          }

          // Ensure required fields are included
          requiredHeaders.forEach((header) => {
            if (!(header in formattedRow)) {
              formattedRow[header] = ""; // Fill missing columns with empty strings
            }
          });

          return formattedRow;
        });

      } else {
        fileError.value = `Invalid headers. Expected: ${requiredHeaders.join(", ")}`;
        isFileValid.value = false;
      }
    } catch (error) {
      console.error("Error parsing the file:", error);
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


async function handleSubmit() {
  if (!isFileValid.value) {
    fileError.value = "Please upload a valid file before submitting.";
    return;
  }

  if (!uploadedFile.value) {
    fileError.value = "No file uploaded.";
    return;
  }

  console.log("Parsed Data:", parsedData.value);

  try {
    const response = await axios.post("http://localhost:8000/insertPayment", parsedData.value);
    console.log("Payment submitted successfully:", response.data);
  } catch (error) {
    console.error("Error submitting payment:", error);
  }
}

function formatExcelDate(value: number | string): string {
  // Check if value is a valid number (Excel serial date)
  if (typeof value === "number") {
    // Convert Excel serial date to JavaScript Date
    const jsDate = new Date(Math.round((value - 25569) * 864e5)); // Adjust from Excel epoch
    return jsDate.toISOString().split("T")[0].replace(/-/g, "/"); // Format as yyyy/mm/dd
  }

  // If value is already a string or invalid, return as-is or handle separately
  return String(value);
}

</script>

<template>
  <main class="justify-items-center mt-16">
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
              <th v-for="(header, index) in Object.keys(parsedData[0])" :key="index"
                class="border border-gray-300 px-4 py-2 text-left">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in parsedData" :key="rowIndex">
              <td v-for="(value, key) in row" :key="key" class="border border-gray-300 px-4 py-2">
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
