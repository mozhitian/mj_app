<template>
	<view class="content">
		<view class="mess_card1" @click="tiaozhaun()">
			<view class="mess_img">
				<image src="../../static/message.png" style="width: 50upx;height: 50upx;"></image>
			</view>
			<view class="mess_dectecion">
				<navigator>派工信息</navigator>
			</view>
		</view>
		<view class="mess_card" @click="tiaozhaun()">
			<view class="mess_img">
				<image src="../../static/message.png" style="width: 50upx;height: 50upx;"></image>
			</view>
			<view class="mess_dectecion">
				<navigator>相关签名信息</navigator>
			</view>
		</view>
		<view class="mess_card" @click="tiaozhaun()">
			<view class="mess_img">
				<image src="../../static/message.png" style="width: 50upx;height: 50upx;"></image>
			</view>
			<view class="mess_dectecion">
				<navigator>进程提醒</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			tiaozhaun:function(){
				uni.navigateTo({
					url: 'message_details',
					success:function(res){
						console.log(res)
					}
				});
			}
			
		}
	}
</script>

<style>
	page{
		background-color: #efeff4;
	}
    .content{
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #efeff4;
	}
	.mess_card1{
		margin-top: 20upx;
		background-color: #FFFFFF;
		width: 100%;
		height: 140upx;
		display: flex;
		flex-direction: row;
		align-items:center;
	}
	.mess_card{
		margin-top: 4upx;
		background-color: #FFFFFF;
		width: 100%;
		height: 140upx;
		display: flex;
		flex-direction: row;
		align-items:center;
	}
	.mess_img{
		margin-left: 10%;
		margin-top: 30upx;
		width: 80upx;
		height: 80upx;
	}
	.mess_dectecion{
		font-size: 28upx;
		width: 200upx;
	}
	
</style>
