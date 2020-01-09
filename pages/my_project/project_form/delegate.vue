<template>
	<view>
		<view class="content">
			<websocket></websocket>
			<view class="text">
				<label class="label">委托单编号:</label>
				<input type="text" placeholder="" class="input" />
			</view>
			<view class="text">
				<label class="label">委托单位:</label>
				<input placeholder="" class="input" />
			</view>
			<view class="text">
				<label class="label">委托日期:</label>
				<input placeholder="" class="input" />
			</view>
			<view class="text">
				<label class="label">联系电话:</label>
				<input placeholder="" class="input" />
			</view>
			<view class="text">
				<label class="label">检测类型:</label>
				<input placeholder="" class="input" />
			</view>
			<view class="text">
				<label class="label">待扩展字段:</label>
				<input placeholder="" class="input" />
			</view>
			<view class="text">
				<label class="label">待扩展字段:</label>
				<input placeholder="" class="input" />
			</view>
			<view class="text">
				<label class="label">待扩展字段:</label>
				<input placeholder="" class="input" />
			</view>
			<view class="text">
				<label class="label">待扩展字段:</label>
				<input placeholder="" class="input" />
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
			
		}
	}
</script>

<style>
   .content {
   	display: flex;
   	flex-direction: column;
   	width: 100%;
   	height: 352px;
   	
   	background-color: #FFFFFF;
   }
   
   .text {
   	display: flex;
   	flex-direction: row;
   	width: 95%;
   	height: 80upx;
   	margin-left: 5%;
   	align-items: center;
   	border-bottom: 1px solid #e8e8e8;
   }
   .label{
	   font-size: 12px;
   }
   .input {
	margin-left: 10%;
   }
   .btn{
	   margin-top: 75px;
	   
   }
   .button{
	   width: 90%;
	   margin-left: 5%;
	   height: 35px;
	   background-color: #007AFF;
	   color: #FFFFFF;
	   font-family: '宋体';
	   border-radius: 3px;
	   font-size: 16px;
	   
   }
   
   
   
</style>
