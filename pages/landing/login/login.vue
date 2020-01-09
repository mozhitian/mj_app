<template>
	<view class="content">
		<view class="login-view top">
			<text class=" login-text title">账号：</text>
			<input class="login-input" id="username" placeholder="请输入账号" type="text" v-model="username">
		</view>
		<view class="login-hr"></view>
		<view class="login-view">
			<text class=" login-text title">密码：</text>
			<input class="login-input" id="password" placeholder="请输入密码" type="text" v-model="password">
		</view>
		<button class="login-button" @tap="landing">登陆</button>
		<view class="login-label">
			<text>注册账号</text>
			<view class="shaft">|</view>
			<text>忘记密码</text>
		</view>
		<input v-model="message">
		<button @tap="send">发送</button>
		<websocket></websocket>
		<pdf :list="item"></pdf>
	</view>
</template>

<script>
	import websocket from "../../../components/demo1.vue";
	import pdf from "../../../components/pdf.vue";
	export default {
		name: 'worker-test',
		data() {
			return {
				account: '',
				username: '',
				password: '',
				message: 'hello word!',
				item:{
						name: "点击预览",//按钮名称
						url: "123.pdf",//文件名称
					}
			}
		},
		components:{
				websocket,
				pdf
			},
		methods: {
			send() {
				var point = this;
				uni.sendSocketMessage({
					data: point.message
				});
				// this.$store.commit('change','')
				// console.log(point.$store.state.count)
			},
			landing() {
				
				//  uni.showToast({
				//      icon: 'none',
				//      title: '账号最短为 5 个字符'
				//  });
				
				// uni.request({  
    //                 url: 'http://192.168.2.197:8081/uni-jmjlPC/php/login.php',
    //                 data:{  
    //                     username:this.username,  
    //                     password:this.password  
    //                 },
				// 	header: {
				// 		'Content-type': 'application/x-www-form-urlencoded', 
				// 	},
    //                 method:'POST',
    //                 success: (res) => {
				// 	   var data=res.data;
    //                    if(data.手机){
	   //              	  console.log(111);
				// 		  
		                  uni.navigateTo({
		                  	// url:"../../home-page/home_page/home_page"
							url:'../../websocker/demo1'
		                  })
	    //             	}else if(data==1){
					// 		
					// 		uni.showToast({
					// 			title:"账号或密码错误",
					// 			icon:"none"
					// 		})
					// 		
	    //             	}else{
					// 		
					// 		uni.showToast({
					// 			title:"账号密码不能为空",
					// 			icon:"none"
					// 		})
					// 		// uni.showModal({
					// 		// 	title:'账号密码不能为空',
					// 		// 	
					// 		// });
	    //             	
	    //             	}
     //                },  
					// 
     //                fail: (err) => {  
     //                    console.log(111);  
     //                }  
     //            });  
// 
						  // uni.redirectTo({
						  // 	url: '../../home-page/home_page/home_page?id=1&name=uniapp',
						  // });
			}
		},
		watch: {
			//监听vuex数据
		    '$store.state.network': {
				handler: function (val, oldVal) {
					//如果不为空
					if(!val)
					{
						uni.setStorage({
						    key: 'username',
						    data: this.username,
						    success: function () {
						        console.log('success');
						    }
						});
						// uni.setStorage({
						//     key: 'password',
						//     data: this.password,
						//     success: function () {
						//         console.log('success');
						//     }
						// });
					}
					if(val)
					{
						uni.getStorage({
						    key: 'username',
						    success: function (res) {
						        console.log(res.data);
						    }
						});
					}
				},
			    deep: true
		    }
		}
		
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #efeff4;
		height: 100vh;
		width: 100vw;
	}

	.login-view {
		display: flex;
		flex-direction: row;
		background-color: #ffffff;
		width: 90%;
		border-bottom: 1px solid #e8e8e8;
	}

	.top {
		margin-top: 10%;
	}

	.login-text {
		width: 20vw;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 38px;
	}

	.login-input {
		width: 70vw;
		height: 38px;

	}

	.login-input::placeholder {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-hr {
		border: 0.4px solid #e1e1e1;
		width: 86vw;
		margin-left: 7%;
	}

	.login-button {
		margin-top: 8%;
		width: 86vw;
		font-family: '宋体';
		border-radius: 3px;
		font-size: 16px;
		height: 35px;
		background-color: #007AFF;
		color: #ffffff;
	}
	.login-button:hover{
		background-color: #FD2E32;
	}

	.login-label {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 200px;
		margin-top: 15px;
		color: #007AFF;
		/* font-family: '宋体'; */
	}

	.shaft {
		margin-left: 5px;
		margin-right: 5px;
		height: 80%;
	}
</style>
