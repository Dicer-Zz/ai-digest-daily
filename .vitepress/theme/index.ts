import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import PostList from './PostList.vue'
import TagPage from './TagPage.vue'
import ArchivePage from './ArchivePage.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostList', PostList)
    app.component('TagPage', TagPage)
    app.component('ArchivePage', ArchivePage)
  }
} satisfies Theme
