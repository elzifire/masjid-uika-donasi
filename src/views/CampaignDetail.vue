<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <router-link to="/" class="text-green-600 hover:underline mb-4 inline-block">&larr; Kembali</router-link>
      <div v-if="campaign" class="border rounded-lg p-6 shadow">
        <img :src="campaign.image" alt="Gambar Kampanye" class="w-full h-64 object-cover rounded mb-4" />
        <div v-if="campaign.urgent" class="bg-red-600 text-white inline-block px-2 py-1 rounded mb-4">Mendesak</div>
        <div class="mb-4">
          <span v-for="tag in campaign.tags" :key="tag" class="inline-block bg-gray-200 text-sm px-2 py-1 rounded mr-2">{{ tag }}</span>
        </div>
        <h2 class="text-2xl font-bold mb-4">{{ campaign.title }}</h2>
        <p class="text-gray-600 mb-4">{{ campaign.description }}</p>
        <div class="mb-4">
          <p>Rp {{ campaign.raised.toLocaleString() }} dari Rp {{ campaign.goal.toLocaleString() }}</p>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div :style="{ width: campaign.progress + '%' }" class="bg-green-600 h-2.5 rounded-full"></div>
          </div>
          <p>{{ campaign.progress }}% Terkumpul</p>
          <p>{{ campaign.donors }} Donatur</p>
          <p>{{ campaign.daysLeft }} Hari Lagi</p>
        </div>
        <router-link to="/donasi" class="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">Donasi Sekarang</router-link>
      </div>
      <div v-else class="text-center">
        <p>Kampanye tidak ditemukan.</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      campaign: null,
    };
  },
  mounted() {
    const campaignId = this.$route.params.id;
    // Contoh data statis, ganti dengan API asli
    this.campaign = campaigns.find(c => c.id == campaignId);
    // Contoh panggilan Axios (ganti dengan API asli)
    axios.get(`https://api.example.com/campaigns/${campaignId}`).then(response => {
      // this.campaign = response.data;
    }).catch(error => {
      console.error('Gagal ambil detail kampanye:', error);
    });
  },
};
</script>