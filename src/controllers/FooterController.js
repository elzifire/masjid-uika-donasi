// import FooterModel from './FooterModel.js';
import FooterModel from "../models/FooterModel";

export default {
  props: {
    categoriesFromParent: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      categories: this.categoriesFromParent,
      loadingCategories: false,
      errorCategories: null,
    };
  },
  methods: {
    async fetchCategories() {
      this.loadingCategories = true;
      try {
        this.categories = await FooterModel.fetchCategories();
      } catch (error) {
        this.errorCategories = error.message;
      } finally {
        this.loadingCategories = false;
      }
    },
  },
  mounted() {
    if (!this.categoriesFromParent.length) {
      this.fetchCategories();
    } else {
      this.categories = this.categoriesFromParent;
    }
  },
};