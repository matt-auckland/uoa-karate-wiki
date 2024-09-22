import { defineClientConfig } from 'vuepress/client'
import AttackDefense from './components/Attack-Defense.vue'
import AttackDefenseContainer from './components/Attack-Defense-Container.vue'
import Infobox from './components/Infobox.vue'
import WikiImg from './components/Wiki-Img.vue'
import FooterNav from './components/Footer-Nav.vue'
import WikiVideo from './components/Wiki-Video.vue'
import Homepage from './components/Homepage.vue'
import Layout from './layouts/Layout.vue'


export default defineClientConfig({
  layouts: {
    Layout,
  },
  enhance({ app }) {
    app.component('AttackDefense', AttackDefense)
    app.component('AttackDefenseContainer', AttackDefenseContainer)
    app.component('Infobox', Infobox)
    app.component('WikiImg', WikiImg)
    app.component('FooterNav', FooterNav)
    app.component('WikiVideo', WikiVideo)
    app.component('Homepage', Homepage)
  },
})
