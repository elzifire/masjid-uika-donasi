import axios from "axios";

export default {
  async fetchCampaignDetail(campaignId) {
    try {
      const response = await axios.get(
        `https://masjid.uika-bogor.ac.id/backend/api/donation/${campaignId}`
      );
      if (response.data.status === "success") {
        const data = response.data.data;
        const totalCollected = parseFloat(data.total_collected);
        const goalAmount = parseFloat(data.goal_amount);
        const progress = goalAmount
          ? ((totalCollected / goalAmount) * 100).toFixed(2)
          : 0;
        const daysLeft = data.expired
          ? Math.max(
              0,
              Math.ceil(
                (new Date(data.expired) - new Date()) / (1000 * 60 * 60 * 24)
              )
            )
          : 0;

        return {
          ...data,
          tags: data.category_id ? [data.category_id] : [],
          total_collected: totalCollected,
          goal_amount: goalAmount,
          progress,
          daysLeft,
          donors: data.donors || 0,
          urgent: data.urgent || daysLeft <= 7 || progress >= 80,
        };
      }
      throw new Error("Kampanye tidak ditemukan");
    } catch (error) {
      throw new Error("Gagal memuat detail kampanye: " + error.message);
    }
  },
};