<template>
  <section class="py-12 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-center mb-8">Formulir Donasi</h2>
      <div class="max-w-lg mx-auto space-y-6">
        <div>
          <label class="block text-sm font-medium">Pilih Kampanye</label>
          <select v-model="form.campaign" class="w-full border rounded p-2">
            <option>Bangun Perpustakaan untuk Desa Terpencil</option>
            <option>Pengobatan Gratis untuk Lansia</option>
            <option>Bantuan Korban Banjir Bandang</option>
            <option>Donasi Umum - Disalurkan sesuai kebutuhan</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium">Jumlah Donasi</label>
          <div class="flex flex-wrap gap-2">
            <button type="button" v-for="amount in amounts" :key="amount" @click="form.amount = amount" class="border rounded px-4 py-2" :class="{ 'bg-green-600 text-white': form.amount === amount }">Rp {{ amount.toLocaleString() }}</button>
          </div>
          <input v-model="form.customAmount" type="number" placeholder="Rp" class="w-full border rounded p-2 mt-2" />
        </div>
        <div>
          <label class="block text-sm font-medium">Informasi Pribadi</label>
          <input v-model="form.name" type="text" placeholder="Nama" class="w-full border rounded p-2 mb-2" />
          <input v-model="form.email" type="email" placeholder="Email" class="w-full border rounded p-2 mb-2" />
          <input v-model="form.phone" type="tel" placeholder="Nomor Telepon" class="w-full border rounded p-2 mb-2" />
          <div class="flex items-center">
            <input v-model="form.showName" type="radio" value="show" id="showName" />
            <label for="showName" class="ml-2">Tampilkan nama saya</label>
            <input v-model="form.showName" type="radio" value="hide" id="hideName" class="ml-4" />
            <label for="hideName" class="ml-2">Sembunyikan nama (Anonim)</label>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium">Metode Pembayaran</label>
          <div class="flex flex-wrap gap-2">
            <button type="button" v-for="method in paymentMethods" :key="method" @click="form.paymentMethod = method" class="border rounded px-4 py-2" :class="{ 'bg-green-600 text-white': form.paymentMethod === method }">{{ method }}</button>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium">Pesan (Opsional)</label>
          <textarea v-model="form.message" class="w-full border rounded p-2"></textarea>
        </div>
        <div class="flex items-center">
          <input v-model="form.subscribe" type="checkbox" id="subscribe" />
          <label for="subscribe" class="ml-2">Saya ingin menerima update tentang kampanye ini dan kampanye lainnya</label>
        </div>
        <button type="button" class="bg-green-600 text-white px-6 py-3 rounded w-full hover:bg-green-700">Lanjutkan Donasi</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        campaign: '',
        amount: 50000,
        customAmount: '',
        name: '',
        email: '',
        phone: '',
        showName: 'show',
        paymentMethod: 'Transfer Bank',
        message: '',
        subscribe: false,
      },
      amounts: [50000, 100000, 250000, 500000, 1000000],
      paymentMethods: ['Transfer Bank', 'E-Wallet', 'QRIS'],
    };
  },
};
</script>