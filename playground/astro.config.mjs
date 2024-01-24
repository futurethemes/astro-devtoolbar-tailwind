import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import AstroDevtoolbarTailwind from 'astro-devtoolbar-tailwind';


// https://astro.build/config
export default defineConfig({
  integrations: [
	tailwind(),
	AstroDevtoolbarTailwind()
  ],
});