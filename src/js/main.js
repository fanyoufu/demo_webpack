// // nodejs中的模块化
// const { updateDom } = require('./tool')
// // es6中的模块化
// import {log} from './tooles6'

// // import '../css/style.css'
import '../css/index.less'
// updateDom ('app','index.html-webpack!')
// log('test')

import Vue from "vue"
import App from '../vuecomponents/app.vue'
new Vue({
  render(h) {
    return h(App)
  },
}).$mount("#app")