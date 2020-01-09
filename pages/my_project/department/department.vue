<template>
	<view class="content">
		<websocket></websocket>
		<view class="total">
			<view class="palace" @tap="options1">
				<image class="img1" src='../../../static/u329.png' ></image>
				<text class="text1" >送检委托</text>
			</view>
			<view class="palace" @tap="options2">
				<image class="img2" src='../../../static/u336.png' ></image>
				<text class="text1" >检测测试</text>
			</view>
			<view class="palace" @tap="options3">
				<image class="img3" src='../../../static/u357.png' ></image>
				<text class="text1" >检测报告</text>
			</view><br>
			<view class="palace" @tap="options4">
				<image class="img4" src='../../../static/u343.png' ></image>
				<text class="text1" >项目结算</text>
			</view>
			<view class="palace" @tap="options5">
				<image class="img5" src='../../../static/u350.png' ></image>
				<text class="text1" >项目查询</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gcmc:'',
				sjc:'',
				jclx:''
			}
		},
		methods: {
			options1(){
					  //  uni.showToast({
					  //      icon: 'none',
					  //      title: '账号最短为 5 个字符'
					  //  });
					  uni.navigateTo({
					  	url: '../project_process/delegate_process?gcmc='+this.gcmc+'&sjc='+this.sjc
					  });
			},
			options2(){
				uni.navigateTo({
					url:'../orders/orders?gcmc='+this.gcmc+'&sjc='+this.sjc
				})
			},
			options3(){
				uni.navigateTo({
					url:'../project_process/report_process?gcmc='+this.gcmc+'&sjc='+this.sjc
				})
			},
			options4(){
				uni.navigateTo({
					url:'../project_process/settlement_process?gcmc='+this.gcmc+'&sjc='+this.sjc
				})
			},
			options5(){
				uni.navigateTo({
					url:'../project_process/project_query?gcmc='+this.gcmc+'&sjc='+this.sjc
				})
			}
			
		},
		onLoad: function(option){
			this.gcmc=option.gcmc;
			this.sjc=option.sjc;
			this.jclx=option.jclx;
			// console.log(this.gcmc+' '+this.sjc);
			// console.log(new Date().getTime()) //时间戳
			uni.setNavigationBarTitle({
				title: this.gcmc
			});
		}
	}
</script>

<style>
	.content{
		display: flex;
		flex-direction: row;
		background-color: #efeff4;
		height: 100vh;
		width: 100vw;
	}
	
	.total{
		height: 38%;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 5%;
	}
	
	.palace{
		width: 32.4%;
		/* height: 20%; */
		background-color: #FFFFFF;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		border: 1px solid #E1E1E1;
	}
	
	.img1{
		width: 38%;
		height: 34%;
		margin-top: 5%;
	}
	
	.img2{
		width: 36%;
		height: 28%;
		margin-top: 5%;
	}
	
	.img3{
		width: 38%;
		height: 34%;
		margin-top: 5%;
	}
	
	.img4{
		width: 40%;
		height: 34%;
		margin-top: 5%;
	}
	
	.img5{
		width: 33%;
		height: 28%;
		margin-top: 5%;
	}
	
	.text1{
		width: 100%;
		height: 20%;
		margin-top: -5%;
		text-align: center;
		font-size: 12px;
	}

</style>
