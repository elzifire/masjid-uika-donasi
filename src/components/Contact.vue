<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Judul -->
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-10">
        Hubungi Kami
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Informasi Kontak -->
        <div
          class="bg-white p-6 rounded-lg shadow flex flex-col justify-between"
        >
          <div>
            <h3 class="text-xl font-semibold mb-4">Informasi Kontak</h3>

            <p class="mb-2 flex items-start gap-2">
              <strong class="shrink-0 w-20">Alamat</strong>
              <span>
                :&nbsp;Jl. Sholeh Iskandar No.KM.2, RT.01/RW.10, Kedungbadak,
                Kec. Tanah Sereal, Kota Bogor, Jawa Barat 16164
              </span>
            </p>

            <div
              v-for="(contact, index) in contacts"
              :key="index"
              class="mb-2 flex items-center gap-2"
            >
              <strong class="shrink-0 w-20">{{ contact.name }}</strong
              >:
              <a
                :href="`https://wa.me/62${contact.phone}`"
                target="_blank"
                class="text-green-600 hover:underline"
              >
                {{ formatPhone(contact.phone) }}
              </a>
            </div>
          </div>

          <!-- Embed Map -->
          <div class="mt-6">
            <iframe
              class="w-full h-64 rounded-lg border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.6869213033633!2d106.78983687480624!3d-6.561146293432051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c46c9a3721e9%3A0x270b284c8a1f7e49!2sUniversitas%20Ibn%20Khaldun%20Bogor!5e0!3m2!1sid!2sid!4v1755869987661!5m2!1sid!2sid"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <!-- Form Kirim Pesan -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-xl font-semibold mb-4">Kirim Pesan</h3>

          <form @submit.prevent="sendToWhatsApp" class="space-y-4">
            <input
              v-model="form.nama"
              type="text"
              placeholder="Nama"
              class="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            <textarea
              v-model="form.pesan"
              placeholder="Pesan"
              class="w-full border border-gray-300 rounded p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>

            <select
              v-model="selectedPhone"
              class="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option disabled value="">Pilih Admin</option>
              <option v-for="(c, i) in contacts" :key="i" :value="c.phone">
                {{ c.name }} ({{ formatPhone(c.phone) }})
              </option>
            </select>

            <button
              type="submit"
              class="bg-green-600 text-white px-6 py-3 rounded w-full hover:bg-green-700 transition"
            >
              Kirim via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      contacts: [],
      selectedPhone: "",
      form: {
        nama: "",
        pesan: "",
      },
    };
  },
  mounted() {
    this.fetchContacts();
  },
  methods: {
    async fetchContacts() {
      try {
        const res = await axios.get(
          "https://masjid.uika-bogor.ac.id/backend/api/contact"
        );
        this.contacts = res.data.data || [];

        // default pilih admin pertama kalau ada
        if (this.contacts.length) {
          this.selectedPhone = this.contacts[0].phone;
        }
      } catch (error) {
        console.error("Gagal ambil kontak:", error);
      }
    },

    sendToWhatsApp() {
      if (!this.selectedPhone) {
        alert("Pilih admin terlebih dahulu.");
        return;
      }

      const text = `Halo, saya ingin menghubungi:\n\nNama: ${this.form.nama}\nPesan: ${this.form.pesan}`;
      const url = `https://api.whatsapp.com/send/?phone=62${
        this.selectedPhone
      }&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;

      window.open(url, "_blank");
    },

    formatPhone(phone) {
      return `0${phone}`;
    },
  },
};
</script>
