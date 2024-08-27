import fg from 'fast-glob'

const prefixDir = 'docs'

interface Dir {
  menu: string
  path: string
}

// 获取需要扫描的目录
export function getScanDir(nav) {
  const res: Dir[] = []
  nav.forEach((menu) => {
    if (menu.link && menu.activeMatch) {
      res.push({
        menu: menu.text,
        path: `${prefixDir}${menu.activeMatch}`
      })
    }
    if (menu.items) {
      menu.items.forEach((menuItem) => {
        if (menuItem.link && menuItem.activeMatch) {
          res.push({
            menu: `${menu.text}-${menuItem.text}`,
            path: `${prefixDir}${menuItem.activeMatch}`
          })
        }
      })
    }
  })
  return res
}

// 获取文章名
function getName(path, dir) {
  const name = path.replace(`${dir}`, '').replace('.md', '')
  return name
}

// 根据目录获取侧边栏
export function getSidebar(dirs: Dir[]) {
  const sidebar = {}
  dirs.forEach((dir) => {
    // 生成一级目录
    const route = `/${dir.path}`.replace(`/${prefixDir}`, '')
    sidebar[route] = [
      {
        text: dir.menu,
        items: [],
        // collapsed: false,
      },
    ]
    const subdirectory = sidebar[route][0].items
    const files = fg.sync(`${dir.path}*.md`, {
      onlyFiles: true,
      objectMode: true,
    })
    files.forEach((file) => {
      if (file.name !== 'index.md') {
        // 生成二级目录
        
        subdirectory.unshift({
          text: getName(file.path, dir.path),
          link: `${route}${file.name}`,
        })
      }
    })
  })

  return sidebar
}
