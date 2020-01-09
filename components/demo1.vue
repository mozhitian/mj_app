<template name='websocket'>
	<view>
		<!-- <input v-model="message">//发送消息的input框 -->
			<!-- <button @tap="send">发送</button> //发送按钮 -->
		<uni-popup ref="popup" type="top">
			<button @click="closePopup">{{value}}</button>
		</uni-popup>
	</view>
</template>


<script>
	// import {
	//   mapState,
	//   mapMutations
	//  } from 'vuex';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		name:"websocket",
		props:{
			list:{},
			// message: '',//双向绑定input框
		},
		data() {
			return {
				value: '',
			}
		},
		methods: {
			//发送函数
			// send() {
			// 	var point = this;
			//  发送函数
			// 	uni.sendSocketMessage({
			// 		data: point.message
			// 	});
			// 	// this.$store.commit('change','')
			// 	// console.log(point.$store.state.count)
			// },
			closePopup() {
				this.$refs.popup.close()
			}
		},
		components: {
			uniPopup
		},
		watch: {
			//监听vuex数据
		    '$store.state.count': {
				handler: function (val, oldVal) {
					//如果不为空
					if(val)
					{
						this.value = val;//赋值
						this.$refs.popup.open();//开启按钮
						this.$store.commit('change','')//触发vuex
					}
				},
			    deep: true
		    }
		}
		
	}
</script>

<style>
</style>
