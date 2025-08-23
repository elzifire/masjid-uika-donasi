<template>
  <div>
    <section id="beranda"><Hero /></section>
    <section id="kampanye"><Campaigns /></section>
    <section id="testimoni"><TestimoniCarousel /></section>
    <section id="tentang-kami"><About /></section>
    <section id="kontak"><Contact /></section>
  </div>
</template>

<script>
import Hero from '../components/Hero.vue';
import Campaigns from '../components/donation/Campaigns.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';
import TestimoniCarousel from '../components/TestimoniCarousel.vue';

export default {
  components: {
    Hero,
    Campaigns,
    TestimoniCarousel,
    About,
    Contact,
  },
};
</script>