import Vue from 'vue'
import Home from './App.vue'
import '../../common/css/base.css'
import {tianlog} from '../../common/js/log'
console.log('home')
tianlog()
console.log(process.env.NODE_ENV)

new Vue({
  render: h => h(Home)
}).$mount('#home')

