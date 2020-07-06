import Vue from 'vue'
import Index from './App.vue'
console.log('home')
console.log(process.env.NODE_ENV)

new Vue({
  render: h => h(Index)
}).$mount('#home')

