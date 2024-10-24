import { defineConfig } from 'vitepress'
import themeConfig from './config/theme-config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ifreeOvO的博客",
  description: "",
  head: [
    ['link', { rel: 'icon', href: '/images/icon.svg' }], // 指向你的图标文件
    ['link', { rel: 'stylesheet', href: '/styles/vars.css' }],
    ['link', { rel: 'stylesheet', href: '/styles/custom.css' }],
  ],
  lastUpdated: true,
  themeConfig,
})
