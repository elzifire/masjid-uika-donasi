<template>
  <section class="py-12 bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-center mb-8">Formulir Donasi</h2>

      <div class="max-w-lg mx-auto space-y-6 bg-white p-6 rounded shadow">
        <!-- Success & Error Message -->
        <div v-if="success" class="text-green-600 text-center font-medium">{{ success }}</div>
        <div v-if="error" class="text-red-600 text-center font-medium">{{ error }}</div>

        <!-- Pilih Kampanye (Readonly / Prefill) -->
        <div>
          <label class="block text-sm font-medium mb-1">Kampanye</label>
          <input 
            type="text" 
            class="w-full border rounded p-2 bg-gray-100 cursor-not-allowed" 
            :value="campaign.title" 
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
              Rp {{ amount.toLocaleString('id-ID') }}
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
          <label class="block text-sm font-medium mb-1">Informasi Pribadi</label>
          <input v-model="form.name" type="text" placeholder="Nama" class="w-full border rounded p-2 mb-2" />
          <input v-model="form.phone_number" type="tel" placeholder="Nomor Telepon" class="w-full border rounded p-2 mb-2" />
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
          <input type="file" accept="image/*" @change="handleFileUpload" class="w-full border rounded p-2" />
        </div>

        <!-- Metode Pembayaran -->
        <div>
          <label class="block text-sm font-medium mb-1">Metode Pembayaran</label>
          <div class="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              v-for="method in paymentMethods"
              :key="method"
              @click="form.paymentMethod = method"
              class="border rounded px-4 py-2"
              :class="{ 'bg-green-600 text-white': form.paymentMethod === method }"
            >
              {{ method }}
            </button>
          </div>

          <!-- BankInfo untuk Transfer Bank -->
          <div v-if="form.paymentMethod === 'Transfer Bank'" class="bg-teal-50 rounded-lg p-4 border border-teal-200 mb-4">
            <div class="flex items-center mb-3">
              <i class="fas fa-wallet text-green-800 text-xl mr-2"></i>
              <span class="text-lg font-bold text-green-800">Silahkan transfer ke:</span>
            </div>
            <div class="mb-3">
              <div class="flex items-center mb-2">
                <i class="fas fa-credit-card text-gray-600 text-lg mr-2"></i>
                <div class="flex-1">
                  <div class="text-sm font-semibold text-gray-800">A/n Masjid Ibn Khaldun UIKA</div>
                  <div class="flex items-center">
                    <span class="text-sm text-gray-600 mr-2">BSI 7182-8454-28</span>
                    <button @click="copyToClipboard('7182845428')" class="text-green-800 hover:text-green-600">
                      <i class="fas fa-copy text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex items-center">
                <i class="fas fa-credit-card text-gray-600 text-lg mr-2"></i>
                <div class="flex-1">
                  <div class="text-sm font-semibold text-gray-800">A/n Masjid Ibn Khaldun Muslimah Center</div>
                  <div class="flex items-center">
                    <span class="text-sm text-gray-600 mr-2">BSI 7307-9787-97</span>
                    <button @click="copyToClipboard('7307978797')" class="text-green-800 hover:text-green-600">
                      <i class="fas fa-copy text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-xs text-gray-600 italic text-center">
              Pastikan Anda mentransfer ke salah satu rekening di atas dan menyertakan bukti pembayaran.
            </p>
          </div>

          <!-- QRIS Trigger -->
          <div v-if="form.paymentMethod === 'QRIS'" class="mb-4">
            <button
              @click="showQRISModal = true"
              class="flex items-center justify-center bg-teal-50 rounded-lg p-4 border border-teal-200 hover:bg-teal-100 transition"
            >
              <i class="fas fa-qrcode text-green-800 text-xl mr-2"></i>
              <span class="text-sm font-semibold text-green-800">Klik untuk melihat kode QRIS</span>
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
          <textarea v-model="form.message" class="w-full border rounded p-2"></textarea>
        </div>

        <!-- Submit -->
        <button
          type="button"
          @click="submitDonation"
          class="bg-green-600 text-white px-6 py-3 rounded w-full hover:bg-green-700 font-medium transition-colors"
          :disabled="loading"
        >
          {{ loading ? 'Mengirim...' : 'Lanjutkan Donasi' }}
        </button>
      </div>

      <!-- QRIS Modal -->
      <div v-if="showQRISModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-green-800">Scan Kode QRIS</h3>
            <button @click="showQRISModal = false" class="text-gray-600 hover:text-gray-800">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          <img
            src="/images/qris.jpg"
            alt="QRIS Code"
            class="w-full max-w-xs mx-auto rounded cursor-pointer hover:scale-105 transition-transform"
            @click="downloadQRIS"
          />
          <p class="text-xs text-gray-600 italic text-center mt-2">
            Klik gambar untuk memperbesar atau unduh kode QRIS di bawah.
          </p>
          <div class="flex justify-center gap-4 mt-4">
            <a
              href="/images/qris.jpg"
              download="qris.jpg"
              class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Unduh QRIS
            </a>
            <button
              @click="showQRISModal = false"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      campaign: {
        id: null,
        title: '',
      },
      form: {
        campaign_id: null,
        amount: 50000,
        customAmount: '',
        name: '',
        phone_number: '',
        showName: 'show',
        proof_image: null,
        paymentMethod: 'Transfer Bank',
        message: '',
      },
      amounts: [50000, 100000, 250000, 500000, 1000000],
      paymentMethods: ['Transfer Bank', 'QRIS'],
      loading: false,
      success: null,
      error: null,
      showQRISModal: false,
      recaptchaSiteKey: '6LcAOqsrAAAAAO3nW8_rsA5l5TXZOT0zCAm_5olT',
    };
  },
  computed: {
    formattedAmount: {
      get() {
        if (!this.form.amount) return '';
        return this.form.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace('IDR', '').trim();
      },
      set(value) {
        const cleaned = value.replace(/[^0-9]/g, '');
        this.form.amount = cleaned ? parseInt(cleaned, 10) : '';
        this.form.customAmount = cleaned;
      }
    }
  },
  mounted() {
    console.log('Component mounted, loading reCAPTCHA v2...');
    this.prefillCampaign();
    this.loadRecaptcha();
  },
  methods: {
    loadRecaptcha() {
      if (!window.grecaptcha) {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.onload = () => {
          console.log('reCAPTCHA v2 script loaded');
          // Ensure widget is rendered after script loads
          if (window.grecaptcha && window.grecaptcha.render) {
            window.grecaptcha.render(document.querySelector('.g-recaptcha'), {
              sitekey: this.recaptchaSiteKey,
            });
          }
        };
        script.onerror = () => {
          console.error('Failed to load reCAPTCHA v2 script');
          this.error = 'Gagal memuat reCAPTCHA. Silakan coba lagi nanti.';
          this.showErrorAlert(this.error);
        };
        document.head.appendChild(script);
      } else {
        // If grecaptcha is already loaded, render the widget
        if (window.grecaptcha.render) {
          window.grecaptcha.render(document.querySelector('.g-recaptcha'), {
            sitekey: this.recaptchaSiteKey,
          });
        }
      }
    },
    async prefillCampaign() {
      const campaignId = this.$route.query.campaign_id;
      if (!campaignId) {
        this.error = 'Kampanye tidak ditemukan';
        this.showErrorAlert('Kampanye tidak ditemukan');
        return;
      }

      try {
        const response = await axios.get(`https://masjid.uika-bogor.ac.id/backend/api/donation/${campaignId}`);
        if (response.data.status === 'success') {
          const data = response.data.data;
          this.campaign.id = data.id;
          this.campaign.title = data.title;
          this.form.campaign_id = data.id;
        } else {
          this.error = 'Kampanye tidak ditemukan';
          this.showErrorAlert('Kampanye tidak ditemukan');
        }
      } catch (err) {
        this.error = 'Gagal memuat kampanye: ' + err.message;
        this.showErrorAlert('Gagal memuat kampanye: ' + err.message);
      }
    },
    handleFileUpload(event) {
      this.form.proof_image = event.target.files[0];
    },
    setAmount(amount) {
      this.form.amount = amount;
      this.form.customAmount = '';
    },
    updateAmount(event) {
      this.formattedAmount = event.target.value;
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Nomor rekening berhasil disalin!',
          timer: 1500,
          showConfirmButton: false
        });
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Gagal menyalin nomor rekening',
          timer: 1500,
          showConfirmButton: false
        });
      });
    },
    showSuccessAlert(message) {
      Swal.fire({
        icon: 'success',
        title: 'Sukses!',
        text: message,
        confirmButtonColor: '#22c55e',
        confirmButtonText: 'OK'
      });
    },
    showErrorAlert(message) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: message,
        confirmButtonColor: '#22c55e',
        confirmButtonText: 'OK'
      });
    },
    downloadQRIS() {
      const link = document.createElement('a');
      link.href = '/images/qris.jpg';
      link.download = 'qris.jpg';
      link.click();
    },
    async submitDonation() {
      this.loading = true;
      this.success = null;
      this.error = null;

      if (!this.form.amount || this.form.amount < 10000) {
        this.error = 'Jumlah donasi minimal Rp 10.000';
        this.showErrorAlert(this.error);
        this.loading = false;
        return;
      }

      if (!window.grecaptcha) {
        this.error = 'reCAPTCHA tidak tersedia. Silakan refresh halaman atau cek koneksi internet Anda.';
        this.showErrorAlert(this.error);
        this.loading = false;
        return;
      }

      const recaptchaResponse = window.grecaptcha.getResponse();
      if (!recaptchaResponse) {
        this.error = 'Silakan centang "Saya bukan robot" untuk melanjutkan.';
        this.showErrorAlert(this.error);
        this.loading = false;
        return;
      }

      try {
        const formData = new FormData();
        formData.append('campaign_id', this.form.campaign_id);
        formData.append('amount', this.form.amount);
        formData.append('name', this.form.name);
        formData.append('phone_number', this.form.phone_number);
        formData.append('is_anonymous', this.form.showName === 'hide' ? 1 : 0);
        formData.append('proof_image', this.form.proof_image);
        if (this.form.message) formData.append('message', this.form.message);

        const response = await axios.post('https://masjid.uika-bogor.ac.id/backend/api/donations', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data.status === 'success') {
          this.success = response.data.message || 'Donasi berhasil dikirim!';
          this.showSuccessAlert(this.success);
          this.resetForm();
          window.grecaptcha.reset(); // Reset reCAPTCHA after successful submission
        } else {
          this.error = response.data.message || 'Gagal mengirim donasi';
          this.showErrorAlert(this.error);
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Gagal mengirim donasi: ' + err.message;
        this.showErrorAlert(this.error);
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.form = {
        campaign_id: this.campaign.id,
        amount: 50000,
        customAmount: '',
        name: '',
        phone_number: '',
        showName: 'show',
        proof_image: null,
        paymentMethod: 'Transfer Bank',
        message: '',
      };
      this.showQRISModal = false;
    },
  },
};
</script>

<style scoped>
input:focus, textarea:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
}
.g-recaptcha {
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>