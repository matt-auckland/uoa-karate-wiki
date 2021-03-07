module.exports = {
  title: "UoA Karate Club Wiki",
  description:
    "A reference for University of Auckland Karate Club members. Contains information on things like techniques, Kata, history, vocabularly and more.",
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],
  themeConfig: {
    docsDir: "docs",
    editLinks: true,
    repo: "matt-auckland/uoa-karate-wiki",
    docsBranch: "master",
    logo: "/logo.png",
    // editLinkText: 'Help us improve this page!',

    nav: [
      { text: "Uoa Karate Club", link: "https://uoa-karate.club" },
      {
        text: "Wiki Pages",
        items: [
          {
            text: "About Goju Ryu",
            link: "/goju-ryu.md",
          },
          {
            text: "Beginner's Guide",
            link: "/beginner-guide.md",
          },
          { text: "Grading Info", link: "/grading.md" },
          { text: "Kobudo", link: "/kobudo.md" },
          {
            text: "Vocabulary",
            link: "/vocabulary.md",
          },
          {
            text: "Hojo Undo",
            link: "/hojo-undo/",
          },
          {
            text: "Kata and Bunkai",
            items: [
              {
                text: "Kata",
                link: "/kata/",
              },
              { text: "Bunkai", link: "/bunkai/" },
              { text: "Renzoku Bunkai", link: "/bunkai/renzokyu-bunkai.md" },
              { text: "Yakusoku Kumite", link: "/bunkai/yakusoku-kumite.md" },
            ],
          },

          {
            text: "Etiquette & Ceremonies",
            items: [
              {
                text: "Bowing, sitting, and other etiquette",
                link: "/etiquette.md",
              },
              {
                text: "Opening / Closing Ceremony ",
                link: "/ceremonies.md",
              },
              { text: "Dojo Kun ", link: "/ceremonies#dojo-kun.md" },
              {
                text: "Speaking Japanese",
                link: "/japanese.md",
              },
            ],
          },
        ],
      },
    ],

    sidebar: "auto",
  },
  plugins: ["check-md"],
};
