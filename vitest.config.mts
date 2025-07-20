import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    deps: {
      inline: ["@vue", "@vueuse", "vue-demi", "@vue/composition-api"],
    },
    setupFiles: [resolve(__dirname, "__test__/setup.ts")],
    reporters: "dot",
  },
});
