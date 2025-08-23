<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-center mb-8">Kampanye Pilihan</h2>

      <div v-if="loading" class="text-center text-gray-500">Memuat kampanye...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="campaign in campaigns" :key="campaign.id" class="border rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col min-h-[550px]">

          <!-- Gambar Kampanye -->
          <div class="relative h-64 md:h-72">
            <img 
              v-if="campaign.image" 
              :src="campaign.image" 
              alt="Gambar Kampanye" 
              class="w-full h-full object-cover"
            />
            <div v-if="campaign.urgent" class="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">Mendesak</div>
          </div>

          <!-- Konten -->
          <div class="p-4 flex-1 flex flex-col">
            <div class="mb-2">
              <span v-for="tag in campaign.tags" :key="tag" class="inline-block bg-gray-200 text-xs px-2 py-1 rounded mr-2">{{ tag }}</span>
            </div>

            <h3 class="text-lg font-semibold mb-2">{{ campaign.title }}</h3>
            <p class="text-gray-600 mb-4 flex-1">{{ campaign.description || '-' }}</p>

            <!-- Progress Donasi -->
            <div class="mb-4 text-sm">
              <p>Rp {{ campaign.total_collected_formatted }} dari Rp {{ campaign.goal_amount_formatted }}</p>
              <div class="w-full bg-gray-200 rounded-full h-3 mt-1">
                <div :style="{ width: campaign.progress + '%' }" class="bg-green-600 h-3 rounded-full"></div>
              </div>
              <div class="flex justify-between mt-1 text-xs">
                <span>{{ campaign.progress }}% Terkumpul</span>
                <span>{{ campaign.daysLeft }} Hari Lagi</span>
              </div>
              <p class="mt-1 text-xs">{{ campaign.donors }} Donatur</p>
            </div>

            <router-link 
              :to="{ name: 'CampaignDetail', params: { id: campaign.id } }" 
              class="mt-auto bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700"
            >
              Lihat Detail
            </router-link>
          </div>

        </div>
      </div>

      <div class="text-center mt-8">
        <router-link to="/kampanye" class="text-green-600 hover:underline">Lihat Semua Kampanye</router-link>
      </div>
    </div>
  </section>
</template>

<script>
// import FeaturedCampaignController from './FeaturedCampaignController.js';
import CampaignController from '../../controllers/CampaignController';

export default {
  ...CampaignController,
};
</script>