<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Judul -->
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-10">Hubungi Kami</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Informasi Kontak -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-xl font-semibold mb-4">Informasi Kontak</h3>
          <p class="mb-2"><strong>Alamat:</strong> Jl. Kebaikan No. 123, Jakarta Selatan, Indonesia</p>
          <p class="mb-2"><strong>Email:</strong> info@masjiduika.id</p>
          <p class="mb-2"><strong>Telepon:</strong> +62 21 1234 5678</p>
        </div>

        <!-- Form Kirim Pesan -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-xl font-semibold mb-4">Kirim Pesan</h3>
          <div class="space-y-4">
            <input 
              type="text" 
              placeholder="Nama" 
              class="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input 
              type="email" 
              placeholder="Email" 
              class="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input 
              type="tel" 
              placeholder="Nomor Telepon" 
              class="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea 
              placeholder="Pesan" 
              class="w-full border border-gray-300 rounded p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
            <button 
              type="button" 
              class="bg-green-600 text-white px-6 py-3 rounded w-full hover:bg-green-700 transition"
            >
              Kirim Pesan
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
