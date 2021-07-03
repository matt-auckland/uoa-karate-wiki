<template>
  <div>
    <h1>Welcome to the UoA Karate Wiki</h1>

    <blockquote>
      Practise Daily and Protect Traditional Karate.
    </blockquote>

    <p>
      This is intended to be a reference resource for the study of Goju Ryu Karate and Karate in general. It's not an authoritative source (though it does strive to be as accurate as possible) and as such everything should be taken with a grain of salt. When in doubt, consult an instructor or senior member.
    </p>

    <p>Click the boxes below to visit the various sections of the site, or use the search bar to explore.</p>

    <h2>Useful Pages</h2>
    <nav class="grid-cont">
      <router-link
        v-for="link in pageLinks"
        :key="link.url"
        class="page-link"
        :to="link.url"
      >
        <span
          class="icon"
          :class="shouldLimitWidth(link.icon) ? 'two-wide' : ''"
        >{{link.icon}}</span>
        <h2>{{link.title}}</h2>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    shouldLimitWidth(icon) {
      return icon.length % 2 == 0 && icon.length % 3 != 0;
    },
  },
  data() {
    return {
      pageLinks: [
        {
          url: "/beginner-guide",
          title: "Beginner's Guide",
          icon: "初心者ガイド",
        },
        {
          url: "/goju-ryu",
          title: "Goju Ryu Karate",
          icon: "剛柔流空手道",
        },
        {
          url: "/kata/",
          title: "Kata",
          icon: "型",
        },
        {
          url: "/bunkai/",
          title: "Bunkai",
          icon: "分解",
        },
        {
          url: "/vocabulary",
          title: "Vocabulary",
          icon: "単語",
        },
        {
          url: "/bunkai/renzoku-bunkai",
          title: "Renzoku Bunkai",
          icon: "連続分解",
        },
        {
          url: "/yakusoku-kumite/",
          title: "Yakusoku Kumite",
          icon: "約束組手",
        },
        // {
        //     url: "/junbi-undo/", title: "Junbi Undo (Warm Up Exercises) "
        // icon: '準備運動',
        // },
        {
          url: "/hojo-undo/",
          title: "Hojo Undo (Supplementary Exercises)",
          icon: "幇助運動",
        },
        // {
        // url: "/kiai", title: "Kiai"
        // icon: '気合い',
        // },
        // {
        //  url: "/kakie", title: "Kakie"
        // icon: ''カキエ,
        // },
        // {
        // url: "/stances-and-footwork", title: "Footwork and Stances"
        // icon: '立ち',
        // },
        // {
        //     title: "Kumite (Sparring)" , url: "/kumite"/
        // icon: '組手',
        // },
        // {
        //   title: "Conditioning",
        //   icon: "鍛え",
        //   url: "/conditioning",
        // },
        {
          url: "/etiquette",
          title: "Bowing, sitting, and etiquette",
          icon: "礼",
        },
        {
          url: "ceremonies#opening-ceremony",
          title: "Opening/Closing Ceremony",
          icon: "儀式",
        },
        {
          url: "ceremonies#dojo-kun",
          title: "Dojo Kun",
          icon: "道場訓",
        },
        {
          url: "/grading",
          title: "Grading Info",
          icon: "帯試験",
        },
        {
          url: "/kobudo",
          title: "Weapons (Kobudo)",
          icon: "古武道",
        },
        // {
        //   url: "/training-tips",
        //   title: "Training Tips",
        //   icon: "",
        // },
        {
          url: "/japanese",
          title: "Learning Japanese",
          icon: "日本語",
        },
        {
          url: "/japanese#pronunciation",
          title: "Japanese Pronunciation",
          icon: "発音",
        },
      ],
    };
  },
};
</script>

<style scoped>
.grid-cont {
  --size: 175px;
  display: grid;
  justify-content: center;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, var(--size));
  grid-auto-rows: var(--size);
  list-style: none;
}

.page-link {
  line-height: 1.3;
  box-sizing: border-box;
  border: 4px solid grey;
  border-radius: 10px;
  padding: 8px;
  text-align: center;
  text-decoration: none !important;
  color: var(--text-color) !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
}
.page-link:hover {
  border-color: var(--accentColor);
}

.page-link h2 {
  margin: 0;
  font-size: 1.2em;
  border: none;
  text-decoration: underline;
}

.page-link .icon {
  text-decoration: none;
  font-size: 2em;
  display: block;
  width: 3em;
  margin: 0 auto;
  text-align: center;
}
.page-link .icon.two-wide {
  width: 2em;
}

@media (max-width: 768px) {
  .grid-cont {
    --size: 150px;
    gap: 15px;
    font-size: 14px;
    justify-content: space-between;
    line-height: 1.2;
  }

  .page-link .icon {
    font-size: 1.8em;
  }
}
</style>