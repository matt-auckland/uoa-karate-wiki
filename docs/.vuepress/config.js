import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { linksCheckPlugin } from '@vuepress/plugin-links-check'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { searchPlugin } from '@vuepress/plugin-search'

const footerLinksPlugin = (app) => {
  const buildFooter = (app) => {
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
    const footerCategoriesObj = { 'Important Pages': {}, important: {}, 'karate club': {}, techniques: {}, kata: {}, bunkai: {} };
    const miscPages = { pages: [] };

    // We don't want to display these categories right now, put their pages under "misc"
    const ignoredCategories = ["hojo undo", "kobudo", "yakusoku kumite", "judo"];

    trimmedPageObjs.forEach((page) => {
      const putInMisc = page?.categories?.every(cat => {
        cat = cat.toLowerCase();
        return ignoredCategories.includes(cat)
      })
      // Put the page in misc if we don't want to display the category
      if (putInMisc) {
        miscPages.pages.push(page);
        return
      }

      if (page?.categories?.length) {
        page.categories.forEach((cat) => {
          cat = cat.toLowerCase();

          if (ignoredCategories.includes(cat)) {
            return // Ignore certain catergories
          }

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

  return {
    name: 'footerLinksPlugin',
    onInitialized: buildFooter,
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
    searchPlugin({
      // options
      locales: {
        '/': {
          placeholder: 'Search',
        },
      }
    }),
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
        text: 'Browse',
        children: [
          {
            text: 'Home',
            link: '/',
          },
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
            text: 'Techniques',
            children: [
              {
                text: 'Sparring',
                link: '/sparring',
              },
              {
                text: 'Stances & Footwork',
                link: '/stances-and-footwork',
              },
              {
                text: 'Kakie',
                link: '/kakie',
              },
              {
                text: 'Throws and Takedowns',
                link: '/throws-and-takedowns',
              },
              {
                text: 'Judo Techniques',
                link: '/judo',
              },
            ]
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
          {
            text: 'Other'
            , children: [
              {
                text: 'Vocabulary',
                link: '/vocabulary',
              },
              {
                text: 'Conditioning',
                link: '/conditioning',
              },
              {
                text: 'Hojo Undo',
                link: '/hojo-undo/',
              },
              {
                text: 'Kobudo (Weapons)',
                link: '/kobudo-weapons',
              },
              {
                text: 'Japanese',
                link: '/japanese',
              },
              {
                text: 'Training By Kata',
                link: '/training-by-kata',
              },
            ],

          },
        ],
      },
      {
        text: "Club Info",
        children: [
          {
            text: "Club main website",
            link: 'https://uoa-karate.club'
          },
          {
            text: "About the club",
            link: 'https://uoa-karate.club/#/about',
          },
          {
            text: "Tournament Results",
            link: '/uoa-karate/tournament-results',
          },
          {
            text: "Black Belt Register",
            link: '/uoa-karate/black-belt-register',
          },
          {
            text: "Related Clubs",
            link: '/uoa-karate/related-clubs',
          },
        ]
      },
      {
        text: "Beginner's Guide",
        link: '/beginner-guide.md',
      },
    ],
  }),
})