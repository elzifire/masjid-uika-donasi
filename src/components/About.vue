<template>
  <section class="py-12 bg-gray-50 fade-in">
    <div class="container mx-auto px-4">
      <!-- Judul -->
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8 slide-up">
        Tentang MASJID UIKA
      </h2>
      
      <!-- Deskripsi -->
      <div class="max-w-3xl mx-auto text-center text-lg md:text-xl text-gray-700 space-y-4 fade-in delay-200">
        <p class="desc">MASJID UIKA adalah platform donasi online yang menghubungkan para donatur dengan berbagai kampanye sosial dan kemanusiaan di seluruh Indonesia.</p>
        <p class="desc">Kami berkomitmen untuk menjadi platform yang transparan, aman, dan terpercaya dalam menyalurkan donasi Anda kepada mereka yang membutuhkan.</p>
      </div>

      <!-- Fitur -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div class="card-animate flex flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <div class="text-5xl mb-3">📊</div>
          <h3 class="text-xl font-semibold mb-2">Transparan</h3>
          <p class="text-gray-600">Laporan penggunaan dana secara detail</p>
        </div>
        <div class="card-animate flex flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition delay-100">
          <div class="text-5xl mb-3">🔒</div>
          <h3 class="text-xl font-semibold mb-2">Aman</h3>
          <p class="text-gray-600">Transaksi terjamin keamanannya</p>
        </div>
        <div class="card-animate flex flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition delay-200">
          <div class="text-5xl mb-3">🚀</div>
          <h3 class="text-xl font-semibold mb-2">Cepat</h3>
          <p class="text-gray-600">Penyaluran donasi tepat waktu</p>
        </div>
        <div class="card-animate flex flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition delay-300">
          <div class="text-5xl mb-3">✅</div>
          <h3 class="text-xl font-semibold mb-2">Terpercaya</h3>
          <p class="text-gray-600">Diawasi oleh dewan pengawas</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Fade-in umum */
.fade-in {
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
}

/* Slide-up judul */
.slide-up {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 1s ease-out forwards;
}

/* Card animasi */
.card-animate {
  opacity: 0;
  transform: translateY(30px);
  animation: slideUp 1s ease-out forwards;
}

/* Tambah delay */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

/* Keyframes */
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
