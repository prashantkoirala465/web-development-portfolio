// packages/vue/nuxt/runtime/lenis.ts
import vuePlugin from "lenis/vue";
import { defineNuxtPlugin } from "#imports";
var plugin = defineNuxtPlugin({
  name: "lenis",
  setup(nuxtApp) {
    nuxtApp.vueApp.use(vuePlugin);
  }
});
var lenis_default = plugin;
export {
  lenis_default as default
};
