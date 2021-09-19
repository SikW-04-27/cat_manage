//引入的是一名为createApp的工厂函数
import { createApp } from 'vue'

// 引入全部组件库
import ElementPlus from 'element-plus';
import '../node_modules/element-plus/lib/theme-chalk/index.css';

import "animate.css"

// 引入日期库
import 'dayjs'

import App from './App.vue'

import router from './router/index'

import store from './store/index'
// 创建应用实例对象-app(类似于之前vue2中的vm，但app比vm更轻)
const app = createApp(App)

app.use(router)
app.use(store)

app.use(ElementPlus)
// 挂载
app.mount('#app')
