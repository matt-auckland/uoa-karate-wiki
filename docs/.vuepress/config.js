module.exports = {
  title: "UoA Karate Wiki",
  description:
    "A reference for University of Auckland Karate Club members. Contains information on things like techniques, Kata, history, vocabularly and more.",

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
            link: "/goju-ryu",
          },
          {
            text: "Beginner's Guide",
            link: "/beginner-guide",
          },
          { text: "Grading Info", link: "/grading" },
          { text: "Kobudo", link: "/kobudo" },
          {
            text: "Vocabulary",
            link: "/vocabulary",
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
                link: "/kata",
              },
              { text: "Bunkai", link: "/bunkai" },
              { text: "Renzoku Bunkai", link: "/bunkai/renzokyu-bunkai" },
              { text: "Yakusoku Kumite", link: "/bunkai/yakusoku-kumite" },
            ],
          },

          {
            text: "Etiquette & Ceremonies",
            items: [
              {
                text: "Bowing, sitting, and other etiquette",
                link: "/etiquette",
              },
              {
                text: "Opening / Closing Ceremony ",
                link: "/ceremonies",
              },
              { text: "Dojo Kun ", link: "/ceremonies#dojo-kun" },
              {
                text: "Speaking Japanese",
                link: "/japanese",
              },
            ],
          },
        ],
      },
    ],

    sidebar: "auto",
  },
};
