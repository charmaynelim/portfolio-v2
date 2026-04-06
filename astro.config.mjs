// @ts-check
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import remarkVideo from './src/plugins/remark-video.mjs';
import remarkAnnotations from './src/plugins/remark-annotations.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkDirective, remarkVideo, remarkAnnotations],
  },
});
