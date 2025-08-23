// import CampaignDetailModel from './CampaignDetailModel.js';
import CampaignDetailModel from "../models/CampaignDetailModel";

export default {
  data() {
    return {
      campaign: {
        id: null,
        image: null,
        urgent: false,
        tags: [],
        title: "",
        description: "",
        goal_amount: 0,
        total_collected: 0,
        goal_amount_formatted: "0",
        total_collected_formatted: "0",
        progress: 0,
        donors: 0,
        daysLeft: 0,
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchCampaignDetail() {
      this.loading = true;
      this.error = null;
      try {
        const campaignId = this.$route.params.id;
        this.campaign = await CampaignDetailModel.fetchCampaignDetail(campaignId);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchCampaignDetail();
  },
};