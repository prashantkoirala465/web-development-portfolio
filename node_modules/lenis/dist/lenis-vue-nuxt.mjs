// packages/vue/nuxt/module.ts
import {
  addComponent,
  addImports,
  addPlugin,
  createResolver,
  defineNuxtModule
} from "@nuxt/kit";
export * from "lenis/vue";
var nuxtModule = defineNuxtModule({
  meta: {
    name: "lenis/nuxt",
    configKey: "lenis"
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url);
    addPlugin({
      src: resolve("./nuxt/runtime/lenis.mjs"),
      name: "lenis"
    });
    addImports({ name: "useLenis", from: "lenis/vue" });
    addComponent({
      name: "VueLenis",
      filePath: "lenis/vue",
      global: true,
      export: "VueLenis"
    });
  }
});
var module_default = nuxtModule;
export {
  module_default as default
};
