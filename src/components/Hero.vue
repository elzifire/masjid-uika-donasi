<template>
  <section 
    class="relative bg-cover bg-center h-[800px]" 
    style="background-image: url('/donasi-staging/images/hero.jpg');"
  >
    <!-- Overlay gelap supaya teks terbaca -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <div class="relative container mx-auto px-4 text-center text-white flex flex-col justify-center h-full">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Berbagi Kebaikan untuk Masa Depan yang Lebih Baik</h2>
      <p class="text-lg md:text-xl mb-6">Bergabunglah dengan ribuan orang yang telah memberikan dampak positif melalui donasi untuk berbagai kampanye kemanusiaan.</p>
      <div class="space-x-4">
        <router-link to="/donasi" class="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">Donasi Sekarang</router-link>
        <a href="#kampanye" @click.prevent="$parent.scrollToSection('kampanye')" class="border border-white text-white px-6 py-3 rounded hover:bg-green-600 hover:border-green-600 hover:text-white">Lihat Kampanye</a>
      </div>
    </div>
  </section>
</template>
