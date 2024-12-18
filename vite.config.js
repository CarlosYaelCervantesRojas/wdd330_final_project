import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        album: resolve(__dirname, "src/album/index.html"),
        artists: resolve(__dirname, "src/artist/index.html"),
        track: resolve(__dirname, "src/track/index.html")
      },
    },
  },
});