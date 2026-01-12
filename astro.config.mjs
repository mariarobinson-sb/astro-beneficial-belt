import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert'
import vercel from '@astrojs/vercel';
const env = loadEnv('', process.cwd(), 'STORYBLOK');
const { STORYBLOK_DELIVERY_API_TOKEN } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  '',
);

export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_DELIVERY_API_TOKEN,
      // Only required when using the live preview functionality:
      livePreview: true,
      bridge: {
        resolveRelations: ['featured-articles.articles'],
      },
      apiOptions: {
        region: 'eu',
      },
      components: {
        page: "storyblok/Page",
        grid: "storyblok/Grid",
        feature: "storyblok/Feature",
        teaser: "storyblok/Teaser",
        ['article-overview']: 'storyblok/ArticleOverview',
        article: 'storyblok/Article',
        ['featured-articles']: 'storyblok/FeaturedArticles',
      },
    }),
  ],

  output: 'server',

  vite: {
    plugins: [ mkcert() ]
  },

  i18n: {
    locales: ["es", "en", "pt-br"],
    defaultLocale: "en",
  },

  adapter: vercel()
});