<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-center mb-8">Daftar Donasi</h2>
      <router-link to="/" class="text-green-600 hover:underline mb-4 inline-block">&larr; Kembali</router-link>
      <div class="border rounded-lg p-6 shadow">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b">
              <th class="py-2">Nama Donatur</th>
              <th class="py-2">Kampanye</th>
              <th class="py-2">Jumlah</th>
              <th class="py-2">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="donation in donations" :key="donation.id" class="border-b">
              <td class="py-2">{{ donation.name || 'Anonim' }}</td>
              <td class="py-2">{{ donation.campaign }}</td>
              <td class="py-2">Rp {{ donation.amount.toLocaleString() }}</td>
              <td class="py-2">{{ donation.date }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="!donations.length" class="text-center py-4">
          <p>Belum ada donasi.</p>
        </div>
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
        {
          id: 1,
          name: 'Budi Santoso',
          campaign: 'Bangun Perpustakaan untuk Desa Terpencil',
          amount: 500000,
          date: '2025-08-15',
        },
        {
          id: 2,
          name: '',
          campaign: 'Pengobatan Gratis untuk Lansia',
          amount: 250000,
          date: '2025-08-14',
        },
        {
          id: 3,
          name: 'Ahmad Fauzi',
          campaign: 'Bantuan Korban Banjir Bandang',
          amount: 1000000,
          date: '2025-08-13',
        },
      ],
    };
  },
  mounted() {
    // Contoh panggilan Axios (ganti dengan API asli)
    axios.get('https://api.example.com/donations').then(response => {
      // this.donations = response.data;
    }).catch(error => {
      console.error('Gagal ambil data donasi:', error);
    });
  },
};
</script>