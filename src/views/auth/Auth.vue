<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12"
  >
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden">
      <!-- Toggle Tabs -->
      <div class="flex">
        <button
          @click="activeTab = 'login'"
          :class="[
            'flex-1 py-3 text-center font-semibold transition',
            activeTab === 'login'
              ? 'bg-green-600 text-white border-b-4 border-green-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          Login
        </button>
        <button
          @click="activeTab = 'register'"
          :class="[
            'flex-1 py-3 text-center font-semibold transition',
            activeTab === 'register'
              ? 'bg-green-600 text-white border-b-4 border-green-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          Register
        </button>
      </div>

      <!-- Card Content -->
      <div class="p-8">
        <!-- LOGIN FORM -->
        <form
          v-if="activeTab === 'login'"
          @submit.prevent="handleLogin"
          class="space-y-5"
        >
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              v-model="login.email"
              class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              v-model="login.password"
              class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="••••••••"
            />
            <!-- 🔑 Link lupa password -->
            <div class="text-right mt-1">
              <span
                @click="goToForgotPassword"
                class="text-sm text-green-600 cursor-pointer hover:underline"
              >
                Lupa password?
              </span>
            </div>
          </div>

          <button
            type="submit"
            class="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>

          <p class="text-sm text-gray-500 text-center">
            Belum punya akun?
            <span
              @click="activeTab = 'register'"
              class="text-green-600 cursor-pointer hover:underline"
            >
              Daftar
            </span>
          </p>
        </form>

        <!-- REGISTER FORM -->
        <form
          v-if="activeTab === 'register'"
          @submit.prevent="handleRegister"
          class="space-y-5"
        >
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nama Lengkap</label
            >
            <input
              type="text"
              v-model="register.name"
              class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Nama Anda"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              v-model="register.email"
              class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              v-model="register.password"
              class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
          <p class="text-sm text-gray-500 text-center">
            Sudah punya akun?
            <span
              @click="activeTab = 'login'"
              class="text-green-600 cursor-pointer hover:underline"
              >Login</span
            >
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "login",
      login: {
        email: "",
        password: "",
      },
      register: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin() {
      console.log("Login data:", this.login);
      // tambahin logic login di sini
    },
    handleRegister() {
      console.log("Register data:", this.register);
      // tambahin logic register di sini
    },
    goToForgotPassword() {
    //   this.$router.push("/forgot-password");
    console.log("Go to forgot password page");
    },
  },
};
</script>
