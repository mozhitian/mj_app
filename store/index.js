
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        login: false,
        token: '',
        avatarUrl: '',
        userName: '',
		values:[],
		count : [],//存储WebSocket推送回来的消息
		zt : "",//判断WebSocket连接已打开
		network:"",//存储用户网络状态（true或false）
		xmcx:null,//项目查询时存储项目名称
		jccs:'市政工程-路面检测-弯沉',
		id:'',//委托单id
		disabledt:'',//试验数据页面的按钮是否禁用
		state:'',//委托单状态
		sjc:'',//工程时间戳,
	    process:'收样',//若为收样则为收样环节，若为试验则为试验环节
		userDate:'',
		projectName:'',//工程名称
		wtbh:'',//委托单编号
    },
    mutations: {
        login(state, provider) {
            console.log(state)
            console.log(provider)
            state.login = true;
            state.token = provider.token;
            state.userName = provider.userName;
            state.avatarUrl = provider.avatarUrl;
        },
        logout(state) {
            state.login = false;
            state.token = '';
            state.userName = '';
            state.avatarUrl = '';
        },
		change : function(state, nickname){
		 state.count = nickname;
		},
		setUserData(state,value){
			state.userDate=value;
		}
    },
	actions:{
		setUserData(content,value){
			content.commit('setUserData',value);
			// console.log(value);
		}
	}
})
export default store