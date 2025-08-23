// import DonationFormModel from './DonationFormModel.js';
import DonationFormModel from "../models/DonationFormModel";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      campaign: {
        id: null,
        title: "",
        file_qr: null,
      },
      form: {
        campaign_id: null,
        amount: 50000,
        customAmount: "",
        name: "",
        phone_number: "",
        showName: "show",
        proof_image: null,
        paymentMethod: "Transfer Bank",
        message: "",
      },
      amounts: [50000, 100000, 200000, 500000, 1000000],
      paymentMethods: ["Transfer Bank", "QRIS"],
      loading: false,
      success: null,
      error: null,
      showQRISModal: false,
      recaptchaSiteKey: "6LcAOqsrAAAAAO3nW8_rsA5l5TXZOT0zCAm_5olT",
    };
  },
  computed: {
    formattedAmount: {
      get() {
        if (!this.form.amount) return "";
        return this.form.amount
          .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
          .replace("IDR", "")
          .trim();
      },
      set(value) {
        const cleaned = value.replace(/[^0-9]/g, "");
        this.form.amount = cleaned ? parseInt(cleaned, 10) : "";
        this.form.customAmount = cleaned;
      },
    },
  },
  methods: {
    loadRecaptcha() {
      if (!window.grecaptcha) {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.onload = () => {
          if (window.grecaptcha && window.grecaptcha.render) {
            window.grecaptcha.render(document.querySelector(".g-recaptcha"), {
              sitekey: this.recaptchaSiteKey,
            });
          }
        };
        script.onerror = () => {
          this.error = "Gagal memuat reCAPTCHA. Silakan coba lagi nanti.";
          this.showErrorAlert(this.error);
        };
        document.head.appendChild(script);
      } else if (window.grecaptcha.render) {
        window.grecaptcha.render(document.querySelector(".g-recaptcha"), {
          sitekey: this.recaptchaSiteKey,
        });
      }
    },
    async prefillCampaign() {
      const campaignId = this.$route.query.campaign_id;
      if (!campaignId) {
        this.error = "Kampanye tidak ditemukan. Silakan pilih kampanye yang valid.";
        this.showErrorAlert(this.error);
        return;
      }
      try {
        this.campaign = await DonationFormModel.fetchCampaignDetail(campaignId);
        this.form.campaign_id = this.campaign.id;
      } catch (error) {
        this.error = error.message;
        this.showErrorAlert(this.error);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type)) {
        this.form.proof_image = file;
      } else {
        this.error = "File harus berupa gambar (jpeg, png, jpg, gif).";
        this.showErrorAlert(this.error);
      }
    },
    setAmount(amount) {
      this.form.amount = amount;
      this.form.customAmount = "";
    },
    updateAmount(event) {
      this.formattedAmount = event.target.value;
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Nomor rekening berhasil disalin!",
            timer: 1500,
            showConfirmButton: false,
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Gagal menyalin nomor rekening",
            timer: 1500,
            showConfirmButton: false,
          });
        });
    },
    downloadQRIS() {
      const link = document.createElement("a");
      link.href = `${window.location.origin}/donasi-staging/images/qris.jpg`;
      link.download = "qris.jpg";
      link.click();
    },
    showSuccessAlert(message) {
      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: message,
        confirmButtonColor: "#22c55e",
        confirmButtonText: "OK",
      });
    },
    showErrorAlert(message) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: message,
        confirmButtonColor: "#22c55e",
        confirmButtonText: "OK",
      });
    },
    async submitDonation() {
      this.loading = true;
      this.success = null;
      this.error = null;

      if (!this.form.campaign_id || !this.campaign.id) {
        this.error = "Kampanye tidak valid. Silakan pilih kampanye terlebih dahulu.";
        this.showErrorAlert(this.error);
        this.loading = false;
        return;
      }

      if (!this.form.amount || this.form.amount < 10000) {
        this.error = "Jumlah donasi minimal Rp 10.000";
        this.showErrorAlert(this.error);
        this.loading = false;
        return;
      }

      if (!this.form.proof_image) {
        this.error = "Bukti transfer wajib diunggah.";
        this.showErrorAlert(this.error);
        this.loading = false;
        return;
      }

      if (this.form.showName === "show" && !this.form.name) {
        this.error = "Nama wajib diisi jika tidak anonim.";
        this.showErrorAlert(this.error);
        this.loading = false;
        return;
      }
      if (!this.form.phone_number) {
        this.error = "Nomor telepon wajib diisi.";
        this.showErrorAlert(this.error);
        this.loading = false;
        return;
      }

      if (!window.grecaptcha) {
        this.error = "reCAPTCHA tidak tersedia. Silakan refresh halaman atau cek koneksi internet Anda.";
        this.showErrorAlert(this.error);
        this.loading = false;
        return;
      }

      const recaptchaResponse = window.grecaptcha.getResponse();
      if (!recaptchaResponse) {
        this.error = 'Silakan centang "Saya bukan robot" untuk melanjutkan.';
        this.showErrorAlert(this.error);
        this.loading = false;
        return;
      }

      try {
        const formData = new FormData();
        formData.append("campaign_id", this.form.campaign_id);
        formData.append("amount", this.form.amount);
        formData.append("name", this.form.showName === "hide" ? "" : this.form.name);
        formData.append("phone_number", this.form.phone_number);
        formData.append("is_anonymous", this.form.showName === "hide" ? 1 : 0);
        formData.append("proof_image", this.form.proof_image);
        if (this.form.message) formData.append("message", this.form.message);

        this.success = await DonationFormModel.submitDonation(formData);
        this.showSuccessAlert(this.success);
        this.resetForm();
        window.grecaptcha.reset();
      } catch (error) {
        this.error = error.message;
        this.showErrorAlert(this.error);
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.form = {
        campaign_id: this.campaign.id,
        amount: 50000,
        customAmount: "",
        name: "",
        phone_number: "",
        showName: "show",
        proof_image: null,
        paymentMethod: "Transfer Bank",
        message: "",
      };
      this.showQRISModal = false;
    },
  },
  mounted() {
    this.loadRecaptcha();
    this.prefillCampaign();
  },
};