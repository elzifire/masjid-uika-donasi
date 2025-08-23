import axios from "axios";

export default {
  async fetchCampaignDetail(campaignId) {
    try {
      const response = await axios.get(
        `https://masjid.uika-bogor.ac.id/backend/api/donation/${campaignId}`
      );
      if (response.data.status === "success" && response.data.data) {
        const data = response.data.data;
        return {
          id: data.id,
          title: data.title,
          file_qr: data.file_qr || null,
        };
      }
      throw new Error("Kampanye tidak ditemukan atau data tidak valid.");
    } catch (error) {
      throw new Error(
        "Gagal memuat kampanye: " + (error.response?.data?.message || error.message)
      );
    }
  },
  async submitDonation(formData) {
    try {
      const response = await axios.post(
        "https://masjid.uika-bogor.ac.id/backend/api/donations",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.status === "success") {
        return response.data.message || "Donasi berhasil dikirim!";
      }
      throw new Error(response.data.message || "Gagal mengirim donasi");
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengirim donasi: " + error.message
      );
    }
  },
};