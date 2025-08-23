import axios from 'axios';

export default {
  async fetchCategories() {
    try {
      const response = await axios.get('https://masjid.uika-bogor.ac.id/backend/api/categories/donations');
      if (response.data.status === 'success') {
        return response.data.data;
      }
      throw new Error('Gagal memuat kategori');
    } catch (error) {
      throw new Error('Gagal memuat kategori: ' + error.message);
    }
  },
};