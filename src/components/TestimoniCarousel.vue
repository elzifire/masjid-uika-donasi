<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">Testimoni</h2>

      <swiper
        class="testi-swiper relative"
        :modules="modules"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="showNavigation"
        :breakpoints="{
          0: { slidesPerView: 1, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 24 },
        }"
      >
        <!-- Card -->
        <swiper-slide v-for="(item, index) in testimoni" :key="index">
          <div
            class="bg-white shadow rounded-2xl p-6 h-full flex flex-col items-center text-center"
          >
            <!-- Avatar -->
            <img
              class="w-16 h-16 rounded-full mb-4"
              :src="getAvatar(item)"
              :alt="item.nama"
            />
            <h4 class="font-semibold text-gray-800">{{ item.nama }}</h4>
            <p class="text-sm text-gray-500 mb-2">{{ item.role }}</p>
            <p class="text-gray-600 text-sm leading-relaxed">
              "{{ item.pesan }}"
            </p>
          </div>
        </swiper-slide>

        <!-- Navigasi hanya tampil di mobile -->
        <div class="swiper-button-prev block md:hidden"></div>
        <div class="swiper-button-next block md:hidden"></div>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  components: { Swiper, SwiperSlide },
  setup() {
    return {
      modules: [Navigation, Pagination, Autoplay],
    };
  },
  data() {
    return {
      showNavigation: window.innerWidth < 768,
      testimoni: [
        {
          nama: "Aminatun",
          gender: "female",
          role: "Donatur",
          pesan: "Alhamdulillah sangat membantu.",
        },
        {
          nama: "Budi",
          gender: "male",
          role: "Donatur",
          pesan: "Website ini mempermudah saya untuk berdonasi.",
        },
        {
          nama: "Siti",
          gender: "female",
          role: "Donatur",
          pesan: "Transparan dan jelas, semoga makin banyak yang terbantu.",
        },
        {
          nama: "Ahmad",
          gender: "male",
          role: "Donatur",
          pesan: "Prosesnya cepat, insyaAllah berkah.",
        },
        {
          nama: "Rahma",
          gender: "female",
          role: "Donatur",
          pesan: "Donasi jadi lebih gampang, barakallah.",
        },
        {
          nama: "Joko",
          gender: "male",
          role: "Donatur",
          pesan: "UI jelas dan mudah dipakai, mantap!",
        },
      ],
    };
  },
  mounted() {
    window.addEventListener("resize", this.checkDevice);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkDevice);
  },
  methods: {
    checkDevice() {
      this.showNavigation = window.innerWidth < 768;
    },
    getAvatar(user) {
      return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        user.nama
      )}&backgroundColor=16a34a,2563eb,f59e0b,dc2626,9333ea&fontSize=40&bold=true`;
    },
  },
};
</script>

<style>
/* Pagination ikut layout normal, bisa dikasih margin-top */
.testi-swiper .swiper-pagination {
  position: static !important;
  margin-top: 12px;
  text-align: center;
}

/* Warna navigasi */
.swiper-button-next,
.swiper-button-prev {
  color: #16a34a;
  display: flex !important;
}
.swiper-pagination-bullet {
  position: relative !important;
  background: #d1d5db;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: #16a34a;
}

/* kalau >=768px (md), hidden */
@media (min-width: 768px) {
  .swiper-button-prev,
  .swiper-button-next {
    display: none !important;
  }
}
</style>
