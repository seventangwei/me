import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const isCI = process.env.CI === 'true';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const config: Config = {
  title: 'Seven',
  customFields: {
    description: '',
  },
  tagline: 'Seven is cool',
  favicon: 'https://avatars.githubusercontent.com/u/107684428?s=400&u=8c465e9eab17f739e63f42e784808b5687954153&v=4',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://senventangwei.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'seventangwei', // Usually your GitHub org/user name.
  projectName: 'me', // Usually your repo name.

  onBrokenLinks: isCI ? 'warn' : 'throw',
  onBrokenMarkdownLinks: isCI ? 'warn' : 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Important for GitHub Pages deployment
  trailingSlash: false,

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/seventangwei/me',
        },
        // 禁用docusaurus默认的blog插件，因为useBlogPost也只能在Blog的Provider取到，所以我们在plugins自定义改造@docusaurus/plugin-content-blog并setGlobalData就能useGlobalData/usePluginData取到全局数据
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/tailwind.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    'docusaurus-plugin-image-zoom',
    '@docusaurus/plugin-ideal-image',
    // 显示定义没有setGlobalData也是拿不到全局数据
    // [
    //   '@docusaurus/plugin-content-blog',
    //   {
    //     /**
    //      * Required for any multi-instance plugin
    //      */
    //     id: 'default',
    //     /**
    //      * URL route for the blog section of your site.
    //      * *DO NOT* include a trailing slash.
    //      */
    //     routeBasePath: 'blog',
    //     /**
    //      * Path to data on filesystem relative to site dir.
    //      */
    //     path: './blog',
    //   },
    // ],
    [
      './src/plugins/docusaurus-content-blog', // 为了实现全局 blog 数据
      {
        path: './blog',
        editUrl: 'https://github.com/seventangwei/me',
        editLocalizedFiles: false,
        blogDescription: '',
        blogSidebarCount: 10,
        blogSidebarTitle: 'Blog',
        postsPerPage: 12,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'rss',
          title: 'Seven',
          description: '',
          copyright: `Copyright © ${new Date().getFullYear()} Seven Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">SevenTangWei</a></p>`,
        },
      },
    ],
  //   './src/plugins/tail',
  //   async function tailwindcssPlugin() {
  //     return {
  //       name: 'docusaurus-tailwindcss',
  //       configurePostCss(postcssOptions) {
  //         // Appends TailwindCSS and AutoPrefixer.
  //         postcssOptions.plugins.push([require('@tailwindcss/postcss'), {
  //           corePlugins: {
  //             preflight: false,
  //           },
  //           content: [
  //             "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
  //             "./docs/**/*.{md,mdx}",
  //             "./blog/**/*.{md,mdx}",
  //           ],
  //         }])
  //         // postcssOptions.plugins.push(require('tailwindcss'))
  //         postcssOptions.plugins.push(require('autoprefixer'))
  //         postcssOptions.plugins.push(require('postcss-nested'))
  //         console.log("*********************", postcssOptions)
  //         return postcssOptions
  //       },
  //     }
  //   },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'https://avatars.githubusercontent.com/u/107684428?s=400&u=8c465e9eab17f739e63f42e784808b5687954153&v=4',
    colorMode: {
      defaultMode: 'dark',
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: 'Seven',
      logo: {
        alt: 'Seven',
        src: 'https://avatars.githubusercontent.com/u/107684428?s=400&u=817549d20fa9de90fa8908158c1db2aa1e7abc3c&v=4',
      },
      hideOnScroll: true,
      items: [
        { to: '/blog', label: 'Blog', position: 'right' },
        {
          type: 'dropdown',
          label: 'Docs',
          position: 'right',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'knowledge',
              label: 'knowledge',
            },
            {
              type: 'docSidebar',
              sidebarId: 'tutorialSidebar',
              label: 'Docs-Eg',
            },
          ],
        },
      ],
    },
    footer: {},
    // footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'Docs',
    //       items: [
    //         {
    //           label: 'Tutorial',
    //           to: '/docs/intro',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'Discord',
    //           href: 'https://discordapp.com/invite/docusaurus',
    //         },
    //         {
    //           label: 'X',
    //           href: 'https://x.com/docusaurus',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'More',
    //       items: [
    //         {
    //           label: 'Blog',
    //           to: '/blog',
    //         },
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/seventangwei',
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `
    //     <p style="margin-bottom: 0;"><a href="http://beian.miit.gov.cn/">${beiAn}</a></p>
    //     <p style="display: inline-flex; align-items: center;"><img style="height:20px;margin-right: 0.5rem;" src="/img/police.png" alt="police" height="20"/><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${
    //       beiAn1.match(/\d+/)?.[0]
    //     }" >${beiAn1}</a></p>
    //     <p>Copyright © 2020 - ${new Date().getFullYear()} Seven. | Built with Docusaurus.</p>
    //     `,
    // },
    algolia: {
      appId: 'KIZC53G9JP',
      apiKey: '3a64d383361796a3891c1b33b3f6a6e6',
      indexName: 'seven',
      contextualSearch: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      defaultLanguage: 'javascript',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
