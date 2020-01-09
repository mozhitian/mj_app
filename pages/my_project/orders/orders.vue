<template>
	<view class="content">
		<websocket></websocket>
		<view class="total">
			<!-- <navigator url="../../dataSelect/uni-calendar" open-type="navigate"> -->
			<view class="palace" @tap="options1">
				<image class="img1" src='../../../static/u329.png' ></image>
				<text class="text1" >派工收样</text>
			</view>
			<!-- </navigator>
			<navigator url="../../dataSelect/uni-calendar" open-type="navigate"> -->
			<view class="palace" @tap="options2">
				<image class="img2" src='../../../static/u336.png' ></image>
				<text class="text1" >试验检测</text>
			</view>
			<!-- </navigator> -->
			
		</view>
	</view>
</template>

<script>
	import store from "../../../store/index.js"
	export default {
		data() {
			return {
				sjc:''
			}
		},
		methods: {
			options1(){
				this.$store.state.option=1;
				uni.navigateTo({
					url:"../../dataSelect/uni-calendar?state=1&sjc="+this.sjc
					// url:"../../dataSelect/uni-calendar?state=1&sjc=1563441140202"
				});
			},
			options2(){
				this.$store.state.option=2;
				uni.navigateTo({
					url:"../../dataSelect/uni-calendar?state=2&sjc="+this.sjc
					// url:"../../dataSelect/uni-calendar?state=2&sjc=1563441140202"
				});
			}
			
		},
		onLoad: function(option){
			// console.log(option);
			this.sjc=option.sjc;
			this.$store.state.sjc=option.sjc;
			// console.log(this.sjc);
			uni.setNavigationBarTitle({
			title: '检测测试'
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
		height: 19%;
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
	
	
	
	.text1{
		width: 100%;
		height: 20%;
		margin-top: -5%;
		text-align: center;
		font-size: 12px;
	}

</style>
