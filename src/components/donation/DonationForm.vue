<template>
  <section class="py-12 bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-center mb-8">Formulir Donasi</h2>

      <div class="max-w-lg mx-auto space-y-6 bg-white p-6 rounded shadow">
        <!-- Success & Error Message -->
        <div v-if="success" class="text-green-600 text-center font-medium">
          {{ success }}
        </div>
        <div v-if="error" class="text-red-600 text-center font-medium">
          {{ error }}
        </div>

        <!-- Pilih Kampanye -->
        <div>
          <label class="block text-sm font-medium mb-1">Kampanye</label>
          <input
            type="text"
            class="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
            :value="campaign.title || 'Memuat kampanye...'"
            readonly
          />
        </div>

        <!-- Jumlah Donasi -->
        <div>
          <label class="block text-sm font-medium mb-1">Jumlah Donasi</label>
          <div class="flex flex-wrap gap-2 mb-2">
            <button
              type="button"
              v-for="amount in amounts"
              :key="amount"
              @click="setAmount(amount)"
              class="border rounded px-4 py-2"
              :class="{ 'bg-green-600 text-white': form.amount === amount }"
            >
              Rp {{ amount.toLocaleString("id-ID") }}
            </button>
          </div>
          <input
            v-model="formattedAmount"
            type="text"
            placeholder="Rp custom (misal: 1.000.000)"
            class="w-full border rounded p-2"
            @input="updateAmount"
          />
        </div>

        <!-- Informasi Pribadi -->
        <div>
          <label class="block text-sm font-medium mb-1"
            >Informasi Pribadi</label
          >

          <input
            v-if="form.showName === 'show'"
            v-model="form.name"
            type="text"
            placeholder="Nama"
            class="w-full border rounded p-2 mb-2"
          />

          <input
            v-model="form.phone_number"
            type="tel"
            placeholder="Nomor Telepon"
            class="w-full border rounded p-2 mb-2"
          />

          <div class="flex items-center gap-4 mt-2">
            <label class="flex items-center gap-2">
              <input v-model="form.showName" type="radio" value="show" />
              Tampilkan nama saya
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.showName" type="radio" value="hide" />
              Sembunyikan nama (Anonim)
            </label>
          </div>
        </div>

        <!-- Bukti Transfer -->
        <div>
          <label class="block text-sm font-medium mb-1">Bukti Transfer</label>
          <input
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            class="w-full border rounded p-2"
          />
        </div>

        <!-- Metode Pembayaran -->
        <div>
          <label class="block text-sm font-medium mb-1"
            >Metode Pembayaran</label
          >
          <div class="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              v-for="method in paymentMethods"
              :key="method"
              @click="form.paymentMethod = method"
              class="border rounded px-4 py-2"
              :class="{
                'bg-green-600 text-white': form.paymentMethod === method,
              }"
            >
              {{ method }}
            </button>
          </div>

          <!-- BankInfo untuk Transfer Bank -->
          <div
            v-if="form.paymentMethod === 'Transfer Bank'"
            class="bg-teal-50 rounded-lg p-4 border border-teal-200 mb-4"
          >
            <div class="flex items-center mb-3">
              <i class="bx bx-wallet text-green-800 text-xl mr-2"></i>
              <span class="text-lg font-bold text-green-800"
                >Silahkan transfer ke:</span
              >
            </div>
            <div class="mb-3">
              <div class="flex items-center mb-2">
                <i class="bx bx-credit-card text-gray-600 text-lg mr-2"></i>
                <div class="flex-1">
                  <div class="text-sm font-semibold text-gray-800">
                    A/n Masjid Ibn Khaldun UIKA
                  </div>
                  <div class="flex items-center">
                    <span class="text-sm text-gray-600 mr-2"
                      >BSI 7182-8454-28</span
                    >
                    <button
                      @click="copyToClipboard('7182845428')"
                      class="text-green-800 hover:text-green-600"
                    >
                      <i class="bx bx-copy text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex items-center">
                <i class="bx bx-credit-card text-gray-600 text-lg mr-2"></i>
                <div class="flex-1">
                  <div class="text-sm font-semibold text-gray-800">
                    A/n Masjid Ibn Khaldun Muslimah Center
                  </div>
                  <div class="flex items-center">
                    <span class="text-sm text-gray-600 mr-2"
                      >BSI 7307-9787-97</span
                    >
                    <button
                      @click="copyToClipboard('7307978797')"
                      class="text-green-800 hover:text-green-600"
                    >
                      <i class="bx bx-copy text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-xs text-gray-600 italic text-center">
              Pastikan Anda mentransfer ke salah satu rekening di atas dan
              menyertakan bukti pembayaran.
            </p>
          </div>

          <!-- QRIS Trigger -->
          <div v-if="form.paymentMethod === 'QRIS'" class="mb-4">
            <button
              @click="showQRISModal = true"
              class="flex items-center justify-center bg-teal-50 rounded-lg p-4 border border-teal-200 hover:bg-teal-100 transition"
            >
              <i class="bx bx-qr text-green-800 text-xl mr-2"></i>
              <span class="text-sm font-semibold text-green-800"
                >Klik untuk melihat kode QRIS</span
              >
            </button>
          </div>
        </div>

        <!-- reCAPTCHA v2 Widget -->
        <div>
          <label class="block text-sm font-medium mb-1">Verifikasi</label>
          <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey"></div>
        </div>

        <!-- Pesan Opsional -->
        <div>
          <label class="block text-sm font-medium mb-1">Pesan (Opsional)</label>
          <textarea
            v-model="form.message"
            class="w-full border rounded p-2"
          ></textarea>
        </div>

        <!-- Submit -->
        <button
          type="button"
          @click="submitDonation"
          class="bg-green-600 text-white px-6 py-3 rounded w-full hover:bg-green-700 font-medium transition-colors"
          :disabled="loading || !campaign.id"
        >
          {{ loading ? "Mengirim..." : "Kirim Donasi" }}
        </button>
      </div>

      <!-- QRIS Modal -->
      <div
        v-if="showQRISModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-green-800">Scan Kode QRIS</h3>
            <button
              @click="showQRISModal = false"
              class="text-gray-600 hover:text-gray-800"
            >
              <i class="bx bx-x text-lg"></i>
            </button>
          </div>
          <img
            :src="'images/qris.jpg'"
            alt="QRIS Code"
            class="w-full max-w-xs mx-auto"
          />
          <button
            @click="downloadQRIS"
            class="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 font-medium transition-colors"
          >
            Unduh QRIS
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import DonationFormController from './DonationFormController.js';
import DonationFormController from '../../controllers/DonationFormController';

export default {
  ...DonationFormController,
};
</script>

<style scoped>
input:focus,
textarea:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
}
.g-recaptcha {
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>