import type { DefaultTheme } from 'vitepress'
import nav from './nav'
import sidebar from './sidebar'

const themeConfig: DefaultTheme.Config = {
  // https://vitepress.dev/reference/default-theme-config
  nav,
  sidebar,
  search: {
    provider: 'local',
  },
  socialLinks: [{ icon: 'github', link: 'https://github.com/IFreeOvO' }],
  lastUpdatedText: '最后更新',
  sidebarMenuLabel: '目录',
  returnToTopLabel: '返回顶部',
  darkModeSwitchLabel: "切换暗黑模式",
  outline: {
    level: 'deep', // 将显示从 `<h2>` 到 `<h6>` 的所有标题
    label: '目录'
  },
  docFooter: {
    prev: '上一篇',
    next: '下一篇',
  },
  footer: {
    message: '苏ICP备20040768号', // ICP备案号
    copyright: `Copyright © ${new Date().getFullYear()} ifreeOvO`, // 版权信息
  },
}

export default themeConfig
