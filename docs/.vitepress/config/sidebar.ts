import type { DefaultTheme } from 'vitepress'
import nav from './nav'
import { getScanDir, getSidebar} from './utils'

const dirs = getScanDir(nav)
const sidebar: DefaultTheme.Config['sidebar'] = getSidebar(dirs)
export default sidebar





