<template>
	<view class="content">
		<view class="mess_card1">
			<view class="mess_1">
				<view class="message">
					<label>项目名称</label>
				</view>
				<label class="details" @click="btn" v-show="fold">
					展开
				</label>
				<label class="details" @click="btn" v-show="!fold">
					收起
				</label>
			</view>
		</view>
		<view class="mess_card2"  :class="fold?'fold':'unfold'">
			<view class="mess_2">
				<view class="message">
					<textarea>该项目中你已经被委任此工程试验人员</textarea>
				</view>
			</view>
		</view>
		<view class="mess_card1">
			<view class="mess_1">
				<view class="message">
					<label>项目名称</label>
				</view>
				<view class="details" @click="btn" v-show="fold">
					展开
				</view>
				<view class="details" @click="btn" v-show="!fold">
					收起
				</view>
			</view>
		</view>
		<view class="mess_card2" :class="fold?'fold':'unfold'">
			<view class="mess_2">
				<view class="message">
					<textarea>该项目中你已经被委任此工程试验人员</textarea>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
                onoff:true,
				onNo:false,
				fold:true,
				
			}
		},
		methods: {
            btn:function(){
				this.fold=!this.fold;
			}
		}
	}
	
</script>

<style>
	page {
		background-color: #efeff4;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #efeff4;
		margin-top: 16upx;
	}

	.mess_card1 {
		margin-top: 4upx;
		background-color: #FFFFFF;
		width: 100%;
		height: 70upx;
	}
    .mess_card2 {
    	margin-top: 4upx;
		padding-top: 20upx;
    	background-color: #FFFFFF;
    	width: 100%;
    	height: 100upx;
    }
	.mess_1 {
		margin-left: 10%;
		width: 90%;
		height: 70upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1px solid #E8E8E8;
	}
    .mess_2{
		margin-top: 4upx;
		margin-left: 5%;
		width: 90%;
		height: 100upx;
	}
	.message {
		margin-left: 0upx;
		font-size: 28upx;
	}

	.details {
		margin-left: 60%;
		font-size: 28upx;
	}
	.fold{
		display: none;
	}
	.unfold{
		display:block ;
	}
	
</style>
