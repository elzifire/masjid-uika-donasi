<template>
  <footer class="bg-sky-950 text-white py-12">
    <div class="container mx-auto px-4">
      <!-- Grid Footer -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Logo & Deskripsi -->
        <div>
          <img src="../../public/images/masjid-uika-logo.png" alt="Logo MASJID UIKA" class="h-12 mb-4" />
          <p class="text-[var(--color-accent)] text-sm">
            Platform donasi online yang menghubungkan para donatur dengan berbagai kampanye sosial dan kemanusiaan di seluruh Indonesia.
          </p>
        </div>

        <!-- Tautan Cepat -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[var(--color-primary)]">Tautan Cepat</h3>
          <ul class="space-y-2 text-[var(--color-accent)] text-sm">
            <li><a href="#beranda" @click.prevent="$parent.scrollToSection('beranda')" class="hover:text-[var(--color-primary)] transition">Beranda</a></li>
            <li><router-link to="/kampanye" class="hover:text-[var(--color-primary)] transition">Kampanye</router-link></li>
            <li><a href="#tentang-kami" @click.prevent="$parent.scrollToSection('tentang-kami')" class="hover:text-[var(--color-primary)] transition">Tentang Kami</a></li>
            <li><a href="#kontak" @click.prevent="$parent.scrollToSection('kontak')" class="hover:text-[var(--color-primary)] transition">Kontak</a></li>
            <li><router-link to="/list-donasi" class="hover:text-[var(--color-primary)] transition">List Donasi</router-link></li>
          </ul>
        </div>

        <!-- Kategori -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[var(--color-primary)]">Kategori</h3>
          <div v-if="loadingCategories" class="text-center text-[var(--color-accent)]">Memuat kategori...</div>
          <div v-else-if="errorCategories" class="text-center text-red-400">{{ errorCategories }}</div>
          <ul v-else class="space-y-2 text-[var(--color-accent)] text-sm">
            <li v-for="category in categories" :key="category.id">
              <router-link :to="{ path: '/kampanye', query: { category: category.name } }" class="hover:text-[var(--color-primary)] transition">
                {{ category.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Hubungi Kami -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[var(--color-primary)]">Hubungi Kami</h3>
          <p class="text-[var(--color-accent)] text-sm"><strong>Alamat:</strong> Jl. Kebaikan No. 123, Jakarta Selatan, Indonesia</p>
          <p class="text-[var(--color-accent)] text-sm"><strong>Email:</strong> info@masjiduika.id</p>
          <p class="text-[var(--color-accent)] text-sm"><strong>Telepon:</strong> +62 21 1234 5678</p>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="mt-8 border-t border-[var(--color-primary)] pt-4 text-center text-[var(--color-muted)] text-sm">
        <p>&copy; 2025 MASJID UIKA. Hak Cipta Dilindungi.</p>
        <div class="mt-2 space-x-4">
          <a href="#syarat-ketentuan" class="hover:text-[var(--color-primary)] transition">Syarat & Ketentuan</a>
          <a href="#kebijakan-privasi" class="hover:text-[var(--color-primary)] transition">Kebijakan Privasi</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    categoriesFromParent: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      categories: this.categoriesFromParent,
      loadingCategories: false,
      errorCategories: null,
    };
  },
  mounted() {
    if (!this.categoriesFromParent.length) {
      this.fetchCategories();
    } else {
      this.categories = this.categoriesFromParent;
    }
  },
  methods: {
    async fetchCategories() {
      this.loadingCategories = true;
      try {
        const response = await axios.get('https://masjid.uika-bogor.ac.id/backend/api/categories/donations');
        if (response.data.status === 'success') {
          this.categories = response.data.data;
        } else {
          this.errorCategories = 'Gagal memuat kategori';
        }
      } catch (error) {
        this.errorCategories = 'Gagal memuat kategori: ' + error.message;
      } finally {
        this.loadingCategories = false;
      }
    },
  },
};
</script>
