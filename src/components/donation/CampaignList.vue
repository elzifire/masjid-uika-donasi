<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-center mb-8">Daftar Kampanye</h2>

      <!-- Filter -->
      <div class="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari kampanye..."
          class="w-full md:flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          v-model="selectedCategory"
          class="w-full md:w-48 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Semua Kategori</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.name"
          >{{ category.name }}</option>
        </select>
      </div>

      <!-- Campaign Grid -->
      <div v-if="loading" class="text-center py-8">Memuat kampanye...</div>
      <div v-else-if="error" class="text-center text-red-600 py-8">{{ error }}</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="campaign in filteredCampaigns"
          :key="campaign.id"
          class="bg-white border rounded-lg shadow hover:shadow-lg transition duration-300"
        >
          <img
            :src="campaign.image ? 'https://masjid.uika-bogor.ac.id/backend' + campaign.image : 'https://via.placeholder.com/300x200'"
            alt="Gambar Kampanye"
            class="w-full h-48 object-cover rounded-t-lg"
          />
          <div class="p-4">
            <div v-if="campaign.urgent" class="bg-red-600 text-white inline-block px-2 py-1 rounded mb-2 text-xs font-semibold">
              Mendesak
            </div>
            <span class="inline-block bg-gray-200 text-sm px-2 py-1 rounded mr-2 mb-2">
              {{ campaign.category }}
            </span>
            <h3 class="text-lg font-semibold mt-1 truncate">{{ campaign.title }}</h3>
            <div class="mt-4">
              <p class="text-sm font-medium">
                Rp {{ campaign.total_collected_formatted }} dari Rp {{ campaign.goal_amount_formatted }}
              </p>
              <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div
                  :style="{ width: campaign.progress + '%' }"
                  class="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">{{ campaign.progress }}% Terkumpul</p>
              <p class="text-xs text-gray-500">{{ campaign.donors }} Donatur</p>
              <p class="text-xs text-gray-500">{{ campaign.daysLeft }} Hari Lagi</p>
            </div>
            <router-link
              :to="{ name: 'CampaignDetail', params: { id: campaign.id } }"
              class="block mt-4 bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700 transition"
            >
              Lihat Detail
            </router-link>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        <span>Halaman {{ currentPage }} dari {{ lastPage }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === lastPage"
          class="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script>
// import CampaignController from './CampaignController.js';
import CampaignListController from '../../controllers/CampaignListController';

export default {
  ...CampaignListController,
};
</script>