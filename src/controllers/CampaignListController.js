import CampaignListModel from "../models/CampaignListModel";

export default {
  data() {
    return {
      campaigns: [],
      categories: [],
      loading: false,
      error: null,
      searchQuery: "",
      selectedCategory: this.$route.query.category || "",
      currentPage: 1,
      lastPage: 1,
      perPage: 6,
    };
  },
  computed: {
    filteredCampaigns() {
      let filtered = this.campaigns;
      if (this.searchQuery) {
        filtered = filtered.filter((campaign) =>
          campaign.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.selectedCategory) {
        filtered = filtered.filter(
          (campaign) => campaign.category === this.selectedCategory
        );
      }
      return filtered;
    },
  },
  watch: {
    selectedCategory(newCategory) {
      this.$router.push({
        path: "/kampanye",
        query: { category: newCategory || undefined },
      });
      this.currentPage = 1;
      this.fetchCampaigns();
    },
    "$route.query.category"(newCategory) {
      this.selectedCategory = newCategory || "";
      this.currentPage = 1;
      this.fetchCampaigns();
    },
  },
  methods: {
    async fetchCategories() {
      this.loading = true;
      try {
        this.categories = await CampaignListModel.fetchCategories();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchCampaigns() {
      this.loading = true;
      try {
        const data = await CampaignListModel.fetchCampaigns(
          this.currentPage,
          this.perPage,
          this.selectedCategory
        );
        this.campaigns = data;
        this.currentPage = this.currentPage || 1;
        this.lastPage = this.lastPage || 1;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchCampaigns();
      }
    },
    nextPage() {
      if (this.currentPage < this.lastPage) {
        this.currentPage++;
        this.fetchCampaigns();
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchCampaigns();
  },
};