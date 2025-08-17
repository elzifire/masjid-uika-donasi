import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CampaignList from '../components/donation/CampaignList.vue';
import CampaignDetail from '../components/donation/CampaignDetail.vue';
import DonationForm from '../components/donation/DonationForm.vue';
import DonationList from '../components/donation/DonationList.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/kampanye', name: 'CampaignList', component: CampaignList },
  { path: '/kampanye/:id', name: 'CampaignDetail', component: CampaignDetail },
  { path: '/donasi', name: 'DonationForm', component: DonationForm },
  { path: '/list-donasi', name: 'DonationList', component: DonationList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;