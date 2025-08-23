<template>
  <nav class="relative bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        
        <!-- Logo kiri -->
         <router-link to="/">
        <div class="flex items-center">
          <img src="/images/masjid-uika-logo.png" alt="MASJID UIKA" class="h-10 w-auto" />
          <h1 class="ml-2 text-xl font-bold">MASJID UIKA</h1>
        </div>
        </router-link>

        <!-- Menu tengah (desktop) -->
        <div class="hidden sm:flex flex-1 justify-center space-x-4">
          <a href="#beranda" @click.prevent="$parent.scrollToSection('beranda')" 
             class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-100 hover:text-green-600">Beranda</a>
          <a href="#kampanye" @click.prevent="$parent.scrollToSection('kampanye')" 
             class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-100 hover:text-green-600">Kampanye</a>
          <a href="#tentang-kami" @click.prevent="$parent.scrollToSection('tentang-kami')" 
             class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-100 hover:text-green-600">Tentang Kami</a>
          <a href="#kontak" @click.prevent="$parent.scrollToSection('kontak')" 
             class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-100 hover:text-green-600">Kontak</a>
        </div>

        <!-- CTA kanan (desktop) -->
        <div class="hidden sm:flex">
          <router-link to="/kampanye" 
             class="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700">
            Donasi Sekarang
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="sm:hidden">
          <button @click="menuOpen = !menuOpen" type="button" 
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
            <span class="sr-only">Open main menu</span>
            <svg v-if="!menuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="menuOpen" class="sm:hidden bg-white shadow">
      <div class="space-y-1 px-4 pt-4 pb-4">
        <a href="#beranda" @click.prevent="scrollAndClose('beranda')" 
           class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-100 hover:text-green-600">Beranda</a>
        <a href="#kampanye" @click.prevent="scrollAndClose('kampanye')" 
           class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-100 hover:text-green-600">Kampanye</a>
        <a href="#tentang-kami" @click.prevent="scrollAndClose('tentang-kami')" 
           class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-100 hover:text-green-600">Tentang Kami</a>
        <a href="#kontak" @click.prevent="scrollAndClose('kontak')" 
           class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-100 hover:text-green-600">Kontak</a>
        <router-link @click="menuOpen=false" to="/kampanye" 
           class="block px-3 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700">Donasi Sekarang</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    scrollAndClose(section) {
      this.$parent.scrollToSection(section);
      this.menuOpen = false;
    }
  }
}
</script>
