<script>
	// import websocket from "pages/websocker/demo1.vue";
	export default {
		// components:{
		// 	websocket
		// },
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		created: function() {
			var point=this;
			this.lianjie();
			if(point.$store.state.zt)
			{
				setTimeout(this.lianjie(), 2000) 
			}else{
				console.log('未连接')
			}
		},
		mounted(){
			window.vue = this
		},
		methods:{
			send() {
				var point = this;
				uni.sendSocketMessage({
					data: point.message
				});
				// this.$store.commit('change','')
				// console.log(point.$store.state.count)
			},
			//建立WebSocket连接
			initwebsocket(){
				var point = this;
				uni.onSocketMessage(function(res) {
					console.log(res.data);
					var mes = JSON.parse(res.data);
					//如果消息是message类型，存入vuex值
					if (mes.type == 'message') {
						var obj={
							value:mes.data,
							display:true
						};
						// if(point.$store.state.count==undefined||point.$store.state.count==null){
						// 	point.$store.state.count=[];					
						// }
						point.$store.state.count.push(obj);//存入vuex值
					}
	
				});
				uni.onSocketClose(function (res) {
				  console.log('WebSocket 已关闭！');
				  point.initwebsocket()
				});
			},
			lianjie(){
				var point = this;
				//连接本地端口
				uni.connectSocket({
					url: 'ws://192.168.43.203:3000'
				});
				//监听握手
				uni.onSocketOpen(function(res) {
					console.log('WebSocket连接已打开！');
					point.$store.state.zt = 'websocket';
				});
			}
		},
		mounted(){
			var point = this;
			this.initwebsocket();
			//获取当前设备网络状态
			uni.getNetworkType({
			    success: function (res) {
					point.$store.state.network = res.networkType;
					console.log(point.$store.state.network);
			    }
			});
			uni.onNetworkStatusChange(function (res) {
			    // console.log(res.isConnected);
			    // console.log(res.networkType);
				point.$store.state.network = res.isConnected;
				console.log(point.$store.state.network);
			});
		}
	}
</script>



<style>
	/*每个页面公共css */
	@import url("common/uni.css");
	* {
		margin: 0;
		padding: 0;
		border: 0;
	}

	page {
		background-color: #efeff4;
	}
</style>
