import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'AI 每日资讯速递',
  description: '每天 AI 领域热点新闻、GitHub Trending 和 arXiv 前沿论文',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap', rel: 'stylesheet' }],
  ],

  // Markdown files are in the project root, posts are under /posts
  srcDir: '.',
  cleanUrls: true,

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'AI 资讯速递',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索日报', buttonAriaLabel: '搜索日报' },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除',
            backButtonTitle: '返回',
            noResultsText: '没有找到相关内容',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        },
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
          }
        }
      }
    },

    nav: [
      { text: '首页', link: '/' },
      { text: '标签', link: '/tags' },
      { text: '归档', link: '/archive' },
    ],

    sidebar: false,

    outline: {
      level: [2, 3],
      label: '目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '浅色模式',
    darkModeSwitchTitle: '深色模式',
    returnToTopLabel: '回到顶部',
  },

  // Exclude old date folders and legacy files from VitePress
  srcExclude: [
    '2026-*/**',           // Old date-based folders
    'scripts/**',
    'node_modules/**',
  ],

  vite: {
    css: {
      preprocessorOptions: {}
    }
  }
})
