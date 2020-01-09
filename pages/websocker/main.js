import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store;
Vue.config.productionTip = false

 // Vue.prototype.apiServer='http://192.168.43.203:8081/my-projectphp/src'
Vue.prototype.apiServer='http://192.168.2.106:8081/my-projectphp/src'
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
