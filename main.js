import Vue from 'vue'
import App from './App'

import store from './store'

import MyClass from '@/common/com.js'
import websocket from "./pages/websocker/demo1";

Vue.component("websocket",websocket);
Vue.config.productionTip = false
Vue.prototype.MyClass=MyClass
Vue.prototype.$store = store
// Vue.prototype.apiServer='http://192.168.2.127:8081/my-projectphp/src'
Vue.prototype.pdf='http://192.168.2.127:8081/pdf.js/web/viewer.html?'
Vue.prototype.apiServer='http://192.168.2.106:8081/my-projectphp/src'
Vue.prototype.api='http://192.168.0.106:8081/dormphp/src'
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
