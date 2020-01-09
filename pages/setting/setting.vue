<template>
	<view>
		<websocket></websocket>
		<view class="uni-list" style="margin-top: 15px;">
			<view class="uni-list-cell uni-list-cell-pd" style="background-color: #efeff4;font-size: 14px;line-height: 0.6;">账号信息</view>
			<view class="uni-list-cell uni-list-cell-pd">
				我的账号
				<text style="float: right;">></text>
			</view>
			<view class="uni-list-cell uni-list-cell-pd" style="background-color: #efeff4;font-size: 14px;line-height: 0.6;">登陆设置</view>
			<view class="uni-list-cell uni-list-cell-pd">
				自动登录
				<switch :checked="autoLogin" @change="auto"></switch>
			</view>
			<view class="uni-list-cell uni-list-cell-pd" style="background-color: #efeff4;font-size: 14px;line-height: 0.6;">版本信息</view>
			<view class="uni-list-cell uni-list-cell-pd">当前版本：</view>
			<view class="uni-list-cell uni-list-cell-pd">自动侦测升级</view>
			<view class="uni-list-cell uni-list-cell-pd">检测新版本下载</view>
		</view>
		
		<button @click="zhuxiao" style="margin-top: 30px;">退出</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				autoLogin:false
			}
		},
		methods: {
			zhuxiao() {
				uni.reLaunch({
					url: "../../pages/login/login/login"
				});
				const value = uni.getStorageSync('setUserData');
				value.dlzt=false;
				try {
					uni.setStorageSync('setUserData', value); //存入缓存
				} catch (e) {
					// error
				}
			},
			auto(e){
				this.autoLogin=e.detail.value;
				const value = uni.getStorageSync('setUserData');
				value['autoLogin']=e.detail.value;
				try {
					uni.setStorageSync('setUserData', value); //存入缓存
				} catch (e) {
					// error
				}
			}
		},
		created() {
			const value = uni.getStorageSync('setUserData');
			if (value) {
				//有登录信息
				this.$store.dispatch("setUserData", value); //存入状态
				if(value.autoLogin==true){
					this.autoLogin=true;
				}
			}
		}
	}
</script>

<style>
	@import url("../../common/uni.css");
</style>
