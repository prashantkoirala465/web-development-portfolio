// packages/vue/src/provider.ts
import Lenis from "lenis";
import {
  defineComponent,
  h,
  onWatcherCleanup,
  provide,
  reactive,
  ref,
  shallowRef as shallowRef2,
  watch
} from "vue";

// packages/vue/src/store.ts
import { shallowRef } from "vue";
var globalLenis = shallowRef();
var globalAddCallback = shallowRef();
var globalRemoveCallback = shallowRef();

// packages/vue/src/provider.ts
var LenisSymbol = Symbol("LenisContext");
var AddCallbackSymbol = Symbol("AddCallback");
var RemoveCallbackSymbol = Symbol("RemoveCallback");
var VueLenisImpl = defineComponent({
  name: "VueLenis",
  props: {
    root: {
      type: Boolean,
      default: false
    },
    autoRaf: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => ({})
    },
    props: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots, expose }) {
    const lenisRef = shallowRef2();
    const wrapper = ref();
    const content = ref();
    expose({
      lenis: lenisRef,
      wrapper,
      content
    });
    watch(
      [() => props.options, wrapper, content],
      () => {
        const isClient = typeof window !== "undefined";
        if (!isClient) return;
        if (!props.root && (!wrapper.value || !content.value)) return;
        lenisRef.value = new Lenis({
          ...props.options,
          ...!props.root ? {
            wrapper: wrapper.value,
            content: content.value
          } : {},
          autoRaf: props.options?.autoRaf ?? props.autoRaf
        });
        onWatcherCleanup(() => {
          lenisRef.value?.destroy();
          lenisRef.value = void 0;
        });
      },
      { deep: true, immediate: true }
    );
    const callbacks = reactive([]);
    function addCallback(callback, priority) {
      callbacks.push({ callback, priority });
      callbacks.sort((a, b) => a.priority - b.priority);
    }
    function removeCallback(callback) {
      callbacks.splice(
        callbacks.findIndex((cb) => cb.callback === callback),
        1
      );
    }
    const onScroll = (data) => {
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i]?.callback(data);
      }
    };
    watch(
      [lenisRef, () => props.root],
      ([lenis, root]) => {
        lenis?.on("scroll", onScroll);
        if (root) {
          globalLenis.value = lenis;
          globalAddCallback.value = addCallback;
          globalRemoveCallback.value = removeCallback;
          onWatcherCleanup(() => {
            globalLenis.value = void 0;
            globalAddCallback.value = void 0;
            globalRemoveCallback.value = void 0;
          });
        }
      },
      { immediate: true }
    );
    if (!props.root) {
      provide(LenisSymbol, lenisRef);
      provide(AddCallbackSymbol, addCallback);
      provide(RemoveCallbackSymbol, removeCallback);
    }
    return () => {
      if (props.root) {
        return slots.default?.();
      } else {
        return h("div", { ref: wrapper, ...props?.props }, [
          h("div", { ref: content }, slots.default?.())
        ]);
      }
    };
  }
});
var VueLenis = VueLenisImpl;
var vueLenisPlugin = (app) => {
  app.component("vue-lenis", VueLenis);
  app.provide(LenisSymbol, shallowRef2(void 0));
  app.provide(AddCallbackSymbol, void 0);
  app.provide(RemoveCallbackSymbol, void 0);
};

// packages/vue/src/use-lenis.ts
import { computed, inject, nextTick, onWatcherCleanup as onWatcherCleanup2, watch as watch2 } from "vue";
function useLenis(callback, priority = 0) {
  const lenisInjection = inject(LenisSymbol);
  const addCallbackInjection = inject(AddCallbackSymbol);
  const removeCallbackInjection = inject(RemoveCallbackSymbol);
  const addCallback = computed(
    () => addCallbackInjection ? addCallbackInjection : globalAddCallback.value
  );
  const removeCallback = computed(
    () => removeCallbackInjection ? removeCallbackInjection : globalRemoveCallback.value
  );
  const lenis = computed(
    () => lenisInjection?.value ? lenisInjection.value : globalLenis.value
  );
  if (typeof window !== "undefined") {
    nextTick(() => {
      nextTick(() => {
        if (!lenis.value) {
          console.warn(
            "No lenis instance found, either mount a root lenis instance or wrap your component in a lenis provider"
          );
        }
      });
    });
  }
  watch2(
    [lenis, addCallback, removeCallback],
    ([lenis2, addCallback2, removeCallback2]) => {
      if (!lenis2 || !addCallback2 || !removeCallback2 || !callback) return;
      addCallback2?.(callback, priority);
      callback?.(lenis2);
      onWatcherCleanup2(() => {
        removeCallback2?.(callback);
      });
    },
    {
      immediate: true
    }
  );
  return lenis;
}
export {
  VueLenis as Lenis,
  VueLenis,
  vueLenisPlugin as default,
  useLenis
};
//# sourceMappingURL=lenis-vue.mjs.map