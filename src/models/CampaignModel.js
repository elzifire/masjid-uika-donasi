import axios from 'axios';

export default {
  async fetchCampaigns() {
    try {
      const response = await axios.get('https://masjid.uika-bogor.ac.id/backend/api/homepage/donations');
      if (response.data.status === 'success') {
        return response.data.data.map(campaign => ({
          ...campaign,
          tags: campaign.category ? [campaign.category] : [],
          description: campaign.description || campaign.title,
          image: campaign.image?.startsWith('http') ? campaign.image : campaign.image ? `https://masjid.uika-bogor.ac.id/backend/${campaign.image}` : null
        }));
      }
      return [];
    } catch (error) {
      throw new Error('Gagal memuat kampanye: ' + error.message);
    }
  },
};