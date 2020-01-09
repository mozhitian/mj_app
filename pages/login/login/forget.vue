<template>
	<view class="forget">
		
		<view class="content" style="padding: 20rpx;">
			<view class="input-group">
				<view class="input-row border">
					<text class="title">手机：</text>
					<view class="m-input-view">
						<input class="m-input-input" type="text" v-model="phone" placeholder="请输入手机号" maxlength="11" @blur="checkPhone" />
					</view>
				</view>
				<view class="input-row border" v-if="password!=''">
					<text class="title">密码：</text>
					<view class="m-input-view">
						<input class="m-input-input" type="text" v-model="password" placeholder="请输入密码" maxlength="11" disabled="true" />
					</view>
				</view>
				
			</view>
			<wButton text="找回密码" :rotate="isRotate" @click.native="startRePass()"></wButton>
		</view>
	</view>
</template>

<script>
	var _this;
	import wButton from '../../../components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				phone: "", //电话
				password: "", //密码
				isRotate: false, //是否加载旋转
			}
		},
		components:{
			wButton
		},
		mounted() {
			_this= this;
		},
		methods: {
			checkPhone() {
				var phone = this.phone;
				var message = "";
				var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
				if (phone == '') {
					message = "手机号码不能为空！";
				} else if (phone.length != 11) {
					message = "请输入11位手机号码！";
				} else if (!myreg.test(phone)) {
					message = "请输入有效的手机号码！";
				} else {
					this.phoneFlag = true;
				}
				if (!this.phoneFlag) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: message
					});
				}
			},
			startRePass() {
				//重置密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				this.checkPhone();
				if(this.phoneFlag){
					uni.request({
						url: this.api + '/account_regulate/forget.php',
						data: {
							phone: this.phone,
						},
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded', //POST头信息
						},
						success: (res) => {
							console.log(res.data);
							if (res.data.result == "success") {
								console.log(res.data);
								this.password=res.data.password;
								uni.showToast({
									icon: 'success',
									position: 'bottom',
									title: '找回密码成功'
								});
								// setTimeout(function() {
								// 	uni.reLaunch({
								// 		url: '../../../pages/home_page/home/home',
								// 	});
								// }, 2000);
					
							} else {
								_this.password = ""
								uni.showToast({
									icon: 'error',
									position: 'bottom',
									title: '该手机号尚未注册'
								});
							}
						},
						fail: (error) => {
							console.log(error);
						}
					});
				}
			}
		}
	}
</script>

<style>
	@import url("../../../components/watch-login/css/icon.css");
	@import url("./../css/main.css");
</style>

