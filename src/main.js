// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入初始化样式文件
import '@/styles/common.scss' 
// 懒加载指令插件
import { lazyPlugin } from '@/directives';
// 引入全局组件插件
import { componentPlugin } from './components'
// 导入pinia插件 https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')