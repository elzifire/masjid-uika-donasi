<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-center mb-8">Daftar Donasi</h2>
      <div v-if="loading" class="text-center">Memuat daftar donasi...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-200">
              <th class="border p-4 text-left">Nama Donatur</th>
              <th class="border p-4 text-left">Kampanye</th>
              <th class="border p-4 text-left">Jumlah Donasi</th>
              <th class="border p-4 text-left">Tanggal</th>
              <th class="border p-4 text-left">Metode Pembayaran</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="donation in donations" :key="donation.id" class="hover:bg-gray-100">
              <td class="border p-4">{{ donation.name }}</td>
              <td class="border p-4">{{ donation.campaign }}</td>
              <td class="border p-4">Rp {{ donation.amount.toLocaleString() }}</td>
              <td class="border p-4">{{ donation.date }}</td>
              <td class="border p-4">{{ donation.paymentMethod }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      donations: [
        // Data statis karena API belum nyediain endpoint daftar donasi
        {
          id: 1,
          name: 'Budi Santoso',
          campaign: 'Bangun Perpustakaan untuk Desa Terpencil',
          amount: 500000,
          date: '2025-08-15',
          paymentMethod: 'Transfer Bank',
        },
        {
          id: 2,
          name: 'Siti Rahayu (Anonim)',
          campaign: 'Pengobatan Gratis untuk Lansia',
          amount: 250000,
          date: '2025-08-14',
          paymentMethod: 'E-Wallet',
        },
        {
          id: 3,
          name: 'Ahmad Fauzi',
          campaign: 'Bantuan Korban Banjir Bandang',
          amount: 1000000,
          date: '2025-08-13',
          paymentMethod: 'QRIS',
        },
      ],
      loading: false,
      error: null,
    };
  },
  mounted() {
    // Kalo ada endpoint API daftar donasi, uncomment dan ganti URL
    
    this.loading = true;
    axios.get('http://127.0.0.1:8001/api/donations/list').then(response => {
      if (response.data.status === 'success') {
        this.donations = response.data.data;
      } else {
        this.error = 'Gagal memuat daftar donasi';
      }
    }).catch(error => {
      this.error = 'Gagal memuat daftar donasi: ' + error.message;
    }).finally(() => {
      this.loading = false;
    });
    
  },
};
</script>