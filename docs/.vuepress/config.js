module.exports = {
  title: "UoA Karate Wiki",
  description:
    "A reference for University of Auckland Karate Club members. Contains information on things like techniques, Kata, history, vocabularly and more.",

  themeConfig: {
    docsDir: "docs",
    editLinks: true,
    repo: "vuejs/vuepress",
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
          { text: "About the Club", link: "/" },
          { text: "Grading Info", link: "/" },
          { text: "Kobudo", link: "/" },
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
              { text: "Renzoku Bunkai", link: "/bunkai" },
              { text: "Yakusoku Kumite", link: "/bunkai" },
            ],
          },

          {
            text: "Etiquette & Ceremonies",
            items: [
              {
                text: "Bowing, sitting, and other etiquette",
                link: "/dojo-etiquette-and-ceremonies",
              },
              {
                text: "Opening / Closing Ceremony ",
                link: "/dojo-etiquette-and-ceremonies",
              },
              { text: "Dojo Kun ", link: "/dojo-etiquette-and-ceremonies" },
              {
                text: "Speaking Japanese",
                link: "/dojo-etiquette-and-ceremonies",
              },
            ],
          },
        ],
      },
    ],

    sidebar: "auto",
  },
};
