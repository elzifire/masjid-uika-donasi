<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <div v-if="loading" class="text-center text-gray-500">
        Memuat detail kampanye...
      </div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
      <div v-else>
        <h2 class="text-3xl font-bold mb-8 text-center">
          {{ campaign.title }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <!-- Gambar Kampanye -->
          <div
            class="w-full max-h-[500px] overflow-hidden rounded-lg flex justify-center items-center bg-gray-100"
          >
            <img
              v-if="campaign.image"
              :src="
                campaign.image.startsWith('http')
                  ? campaign.image
                  : `https://masjid.uika-bogor.ac.id/backend/${campaign.image}`
              "
              alt="Gambar Kampanye"
              class="max-h-[500px] w-auto object-contain transition-transform hover:scale-105"
            />
          </div>

          <!-- Konten Kampanye -->
          <div class="flex flex-col">
            <div
              v-if="campaign.urgent"
              class="bg-red-600 text-white inline-block px-3 py-1 rounded mb-4 font-semibold"
            >
              Mendesak
            </div>

            <div class="mb-4">
              <span
                v-for="tag in campaign.tags"
                :key="tag"
                class="inline-block bg-gray-200 text-sm px-2 py-1 rounded mr-2"
                >{{ tag }}</span
              >
            </div>

            <div class="text-gray-700 mb-6" v-html="campaign.description"></div>

            <div class="mb-6">
              <p class="text-gray-600 font-medium">
                Rp {{ campaign.total_collected_formatted }} dari Rp
                {{ campaign.goal_amount_formatted }}
              </p>
              <div class="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  :style="{ width: campaign.progress + '%' }"
                  class="bg-green-600 h-3 rounded-full transition-all"
                ></div>
              </div>
              <div class="flex justify-between text-sm mt-1 text-gray-500">
                <span>{{ campaign.progress }}% Terkumpul</span>
                <span>{{ campaign.daysLeft }} Hari Lagi</span>
              </div>
              <p class="text-sm text-gray-500 mt-1">
                {{ campaign.donors }} Donatur
              </p>
            </div>

            <router-link
              :to="{
                name: 'DonationForm',
                query: { campaign_id: campaign.id },
              }"
              class="mt-auto bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 text-center font-medium transition-colors"
            >
              Donasi Sekarang
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CampaignDetailController from '../../controllers/CampaignDetailController';

export default {
  ...CampaignDetailController,
};
</script>