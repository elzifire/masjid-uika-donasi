<template>
  <section 
    class="relative bg-cover bg-center min-h-[500px] md:h-[800px] flex items-center" 
    style="background-image: url('/donasi-staging/images/hero.jpg');"
  >
    <!-- Overlay gelap -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <div class="relative container mx-auto px-4 text-center text-white flex flex-col items-center justify-center">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug">
        Berbagi Kebaikan untuk Masa Depan yang Lebih Baik
      </h2>
      <p class="text-base sm:text-lg md:text-xl mb-6 max-w-2xl">
        Bergabunglah dengan ribuan orang yang telah memberikan dampak positif melalui donasi untuk berbagai kampanye kemanusiaan.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <router-link 
          to="/donasi" 
          class="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 text-sm sm:text-base text-center">
          Donasi Sekarang
        </router-link>
        <a 
          href="#kampanye" 
          @click.prevent="$parent.scrollToSection('kampanye')" 
          class="border border-white text-white px-6 py-3 rounded hover:bg-green-600 hover:border-green-600 text-sm sm:text-base text-center">
          Lihat Kampanye
        </a>
      </div>
    </div>
  </section>
</template>
