<template>
  <footer class="bg-[#0b593b] text-white py-12 mt-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Logo & Deskripsi -->
        <div>
          <img src="../../public/images/masjid-uika-logo.png" alt="Logo MASJID UIKA" class="h-12 mb-4" />
          <p class="text-gray-200 text-sm">
            Platform donasi online yang menghubungkan para donatur dengan berbagai kampanye sosial dan kemanusiaan di seluruh Indonesia.
          </p>
        </div>

        <!-- Tautan Cepat -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Tautan Cepat</h3>
          <ul class="space-y-2 text-gray-200 text-sm">
            <li><a href="#beranda" class="hover:text-green-300 transition">Beranda</a></li>
            <li><a href="#kampanye" class="hover:text-green-300 transition">Kampanye</a></li>
            <li><a href="#tentang-kami" class="hover:text-green-300 transition">Tentang Kami</a></li>
            <li><a href="#kontak" class="hover:text-green-300 transition">Kontak</a></li>
            <li><a href="/list-donasi" class="hover:text-green-300 transition">List Donasi</a></li>
          </ul>
        </div>

        <!-- Kategori -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Kategori</h3>
          <ul class="space-y-2 text-gray-200 text-sm">
            <li v-for="category in categoriesFromParent" :key="category.id">
              <a :href="`/kampanye?category=${category.name}`" class="hover:text-green-300 transition">{{ category.name }}</a>
            </li>
          </ul>
        </div>

        <!-- Hubungi Kami -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Hubungi Kami</h3>
          <p class="text-gray-200 text-sm"><strong>Alamat:</strong> Jl. Kebaikan No. 123, Jakarta Selatan, Indonesia</p>
          <p class="text-gray-200 text-sm"><strong>Email:</strong> info@masjiduika.id</p>
          <p class="text-gray-200 text-sm"><strong>Telepon:</strong> +62 21 1234 5678</p>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="mt-8 border-t border-green-700 pt-4 text-center text-gray-300 text-sm">
        <p>&copy; 2023 MASJID UIKA. Hak Cipta Dilindungi.</p>
        <div class="mt-2 space-x-4">
          <a href="#syarat-ketentuan" class="hover:text-green-300 transition">Syarat & Ketentuan</a>
          <a href="#kebijakan-privasi" class="hover:text-green-300 transition">Kebijakan Privasi</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    categoriesFromParent: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
