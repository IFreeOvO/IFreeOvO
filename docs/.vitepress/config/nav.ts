import type { DefaultTheme } from 'vitepress'

const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  {
    text: '前端',
    items: [
      {
        text: 'js',
        link: '/frontend/js/index',
        activeMatch: '/frontend/js/',
      },
      {
        text: 'css',
        link: '/frontend/css/index',
        activeMatch: '/frontend/css/',
      },
      {
        text: 'nodejs',
        link: '/frontend/nodejs/index',
        activeMatch: '/frontend/nodejs/',
      },
      {
        text: 'typescript',
        link: '/frontend/typescript/index',
        activeMatch: '/frontend/typescript/',
      },
      {
        text: 'vue',
        link: '/frontend/vue/index',
        activeMatch: '/frontend/vue/',
      },
      {
        text: 'react',
        link: '/frontend/react/index',
        activeMatch: '/frontend/react/',
      },
      {
        text: 'flutter',
        link: '/frontend/flutter/index',
        activeMatch: '/frontend/flutter/',
      },
      {
        text: '前端工程化',
        link: '/frontend/engineering/index',
        activeMatch: '/frontend/engineering/',
      },
    ],
    activeMatch: '/frontend/',
  },
  {
    text: '后端',
    items: [
      {
        text: 'java',
        link: '/backend/java/index',
        activeMatch: '/backend/java/',
      },
      {
        text: 'python',
        link: '/backend/python/index',
        activeMatch: '/backend/python/',
      },
      {
        text: 'redis',
        link: '/backend/redis/index',
        activeMatch: '/backend/redis/',
      },
      {
        text: 'mongo',
        link: '/backend/mongo/index',
        activeMatch: '/backend/mongo/',
      },
      {
        text: 'mysql',
        link: '/backend/mysql',
        activeMatch: '/backend/mysql/',
      },
      {
        text: 'flask',
        link: '/backend/flask/index',
        activeMatch: '/backend/flask/',
      },
    ],
    activeMatch: '/backend/',
  },
  {
    text: '其他&工具',
    items: [
      {
        text: 'docker',
        link: '/other/docker/index',
        activeMatch: '/other/docker/',
      },
      {
        text: 'linux',
        link: '/other/linux/index',
        activeMatch: '/other/linux/',
      },
      {
        text: 'git',
        link: '/other/git/index',
        activeMatch: '/other/git/',
      },
      {
        text: 'nginx',
        link: '/other/nginx/index',
        activeMatch: '/other/nginx/',
      },
      {
        text: '其他',
        link: '/other/other/index',
        activeMatch: '/other/other/',
      },
    ],
    activeMatch: '/other/',
  },
  {
    text: '问题归纳',
    items: [
      {
        text: 'web开发',
        link: '/issues/web/index',
        activeMatch: '/issues/web/',
      },
      {
        text: '数据库',
        link: '/issues/db/index',
        activeMatch: '/issues/db/',
      },
      {
        text: '微信小程序',
        link: '/issues/miniapp/index',
        activeMatch: '/issues/miniapp/',
      },
      {
        text: '微信公众号',
        link: '/issues/official-accounts/index',
        activeMatch: '/issues/official-accounts/',
      },
      {
        text: '移动端开发',
        link: '/issues/app/index',
        activeMatch: '/issues/app/',
      },
      {
        text: '运维',
        link: '/issues/ops/index',
        activeMatch: '/issues/ops/',
      },
    ],
    activeMatch: '/issues/',
  },
  {
    text: '技术总结',
    link: '/technique/index',
    activeMatch: '/technique/',
  },
]

export default nav
