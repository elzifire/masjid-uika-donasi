import axios from "axios";

const baseUrl = "https://masjid.uika-bogor.ac.id/backend";

export default {
  async fetchCategories() {
    try {
      const res = await axios.get(`${baseUrl}/api/categories/donations`);
      return res.data.status === "success" ? res.data.data : [];
    } catch (error) {
      throw new Error("Gagal memuat kategori: " + error.message);
    }
  },
  async fetchCampaigns(page = 1, perPage = 6, category = "") {
    try {
      const params = { page, per_page: perPage };
      if (category) params.category = category;

      const res = await axios.get(`${baseUrl}/api/donations`, { params });
      if (res.data.status === "success") {
        return res.data.data.map((campaign) => ({
          ...campaign,
          progress: campaign.goal_amount
            ? (
                (parseFloat(campaign.total_collected) /
                  parseFloat(campaign.goal_amount)) *
                100
              ).toFixed(2)
            : 0,
          daysLeft: campaign.expired
            ? Math.max(
                0,
                Math.ceil(
                  (new Date(campaign.expired) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )
              )
            : 0,
          urgent:
            (campaign.expired &&
              Math.ceil(
                (new Date(campaign.expired) - new Date()) /
                  (1000 * 60 * 60 * 24)
              ) <= 7) ||
            (campaign.goal_amount &&
              (parseFloat(campaign.total_collected) /
                parseFloat(campaign.goal_amount)) *
                100 >=
                80),
        }));
      }
      return [];
    } catch (error) {
      throw new Error("Gagal memuat kampanye: " + error.message);
    }
  },
};