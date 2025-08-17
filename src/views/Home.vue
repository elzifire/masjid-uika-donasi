<template>
  <div>
    <section id="beranda"><Hero /></section>
    <section id="kampanye"><Campaigns /></section>
    <section id="tentang-kami"><About /></section>
    <section id="kontak"><Contact /></section>
  </div>
</template>

<script>
import Hero from '../components/Hero.vue';
import Campaigns from '../components/donation/Campaigns.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';

export default {
  components: {
    Hero,
    Campaigns,
    About,
    Contact,
  },
};
</script>