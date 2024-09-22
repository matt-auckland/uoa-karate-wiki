import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { linksCheckPlugin } from '@vuepress/plugin-links-check'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'

const footerLinksPlugin = (app) => {
  return {
    name: 'footerLinksPlugin',
    onInitialized: (app) => {
      let footerlinksContent = {}
      const trimmedPageObjs = app.pages.filter(
        (page) => !page.frontmatter.isDraft && !page.frontmatter.noFooter
      ).map((page) => {
        return {
          categories: page.frontmatter?.categories,
          title: page.title,
          path: page.path,
          categoryParent: page.frontmatter?.isCategoryParent,
        };
      });

      // we add Important here so it's the first category to show in the footer
      const footerCategoriesObj = { 'Important Pages': {}, important: {}, 'karate club': {} };
      const miscPages = { pages: [] };
      const ignoredCategories = ["hojo undo", "kobudo", "yakusoku kumite"];
      // console.log(trimmedPageObjs)
      trimmedPageObjs.forEach((page) => {
        if (page?.categories?.length) {
          page.categories.forEach((cat) => {
            cat = cat.toLowerCase();

            // We don't want to display these categories right now
            if (ignoredCategories.includes(cat)) {
              // Put the page in misc if we don't want to display the category
              miscPages.pages.push(page);
            } else {
              if (!page.categoryParent) {
                if (
                  footerCategoriesObj[cat] &&
                  footerCategoriesObj[cat].pages
                ) {
                  footerCategoriesObj[cat].pages.push(page);
                } else {
                  footerCategoriesObj[cat] = { pages: [page] };
                }
              }

              if (page.categoryParent) {
                if (!footerCategoriesObj[cat]) {
                  footerCategoriesObj[cat] = { pages: [] };
                }
                footerCategoriesObj[cat].path = page.path;
              }
            }
          });
        } else {
          // If the page doesn't have a category, throw it in misc
          miscPages.pages.push(page);
        }
      });
      footerCategoriesObj.misc = miscPages;
      footerCategoriesObj['Important Pages'] = footerCategoriesObj.important
      delete footerCategoriesObj.important

      app.writeTemp('footerLinks.js',
        `export const footerLinksContent = ${JSON.stringify(footerCategoriesObj)}`
      )
    }
  }
}
export default defineUserConfig({
  bundler: viteBundler(),

  lang: 'en-NZ',
  title: 'UoA Karate Club Wiki',
  description:
    'A reference for University of Auckland Goju Ryu Karate Club members. Contains information on things like techniques, Kata, history, vocabularly and more.',
  head: [
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    [
      'script',
      { src: "//gc.zgo.at/count.js", 'data-goatcounter': "https://karate-wiki.goatcounter.com/count", async: "async" },
    ],
  ],
  plugins: [
    footerLinksPlugin(),
    linksCheckPlugin({}),
    markdownImagePlugin({
      // Enable figure
      figure: true,
      // Enable image lazyload
      lazyload: true,
      // Enable image mark
      mark: true,
      // Enable image size
      size: true,
    }),
  ],
  theme: defaultTheme({
    docsDir: 'docs',
    docsRepo: 'matt-auckland/uoa-karate-wiki',
    docsBranch: 'master',
    editLinkPattern: ':repo/edit/:branch/:path',

    logo: '/logo.png',

    hostname: 'https://wiki.uoa-karate.club',
    home: '/',
    sidebar: 'heading', // Use headings to generate
    navbar: [
      {
        text: 'Wiki Pages',
        children: [
          {
            text: 'About Goju Ryu',
            link: '/goju-ryu.md',
          },
          { text: 'Kobudo', link: '/kobudo.md' },
          {
            text: 'Vocabulary',
            link: '/vocabulary.md',
          },
          {
            text: 'Hojo Undo',
            link: '/hojo-undo/',
          },
          {
            text: 'Kata and Bunkai',
            children: [
              {
                text: 'Kata',
                link: '/kata/',
              },
              { text: 'Bunkai', link: '/bunkai/' },
              { text: 'Renzoku Bunkai', link: '/bunkai/renzokyu-bunkai.md' },
              { text: 'Yakusoku Kumite', link: '/bunkai/yakusoku-kumite.md' },
            ],
          },

          {
            text: 'Etiquette & Ceremonies',
            children: [
              {
                text: 'Bowing, sitting, and other etiquette',
                link: '/etiquette.md',
              },
              {
                text: 'Opening / Closing Ceremony ',
                link: '/ceremonies.md',
              },
              { text: 'Dojo Kun ', link: '/ceremonies#dojo-kun.md' },
              {
                text: 'Speaking Japanese',
                link: '/japanese.md',
              },
            ],
          },
        ],
      },
      {
        text: "About the club",
        link: '/uoa-karate/',
      },
      {
        text: "Beginner's Guide",
        link: '/beginner-guide.md',
      },
      { text: 'Grading Info', link: '/grading.md' },
      { text: 'Main club website', link: 'https://uoa-karate.club' },
    ],
  }),
})