// import FeaturedCampaignModel from './FeaturedCampaignModel.js';
import CampaignModel from "../models/CampaignModel";

export default {
  data() {
    return {
      campaigns: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchCampaigns() {
      this.loading = true;
      this.error = null;
      try {
        this.campaigns = await CampaignModel.fetchCampaigns();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchCampaigns();
  },
};