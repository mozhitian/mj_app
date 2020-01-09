<template>
	<view class="login">
		<view class="content" style="padding: 20rpx;">
			<view class="input-group">
				<view class="input-row border">
					<text class="title">账号：</text>
					<view class="m-input-view">
						<input class="m-input-input" type="text" v-model="account" placeholder="请输入账号" maxlength="11" />
					</view>
				</view>
				<view class="input-row border">
					<text class="title">密码：</text>
					<view class="m-input-view">
						<input class="m-input-input" type="password" v-model="password" placeholder="请输入密码" maxlength="11" />
					</view>
				</view>
			</view>
			<view class="input-row border" style="margin-top: 30px;background-color: #FFFFFF;padding: 5px;display: flex;align-items: center;">
				<text class="title" style="width: 30%;flex: 1;">自动登录</text>
				<switch class="switch" :checked="autoLogin" @change="auto"></switch>
			</view>
			<wButton text="登 录" :rotate="isRotate" @click.native="startLogin()"></wButton>
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
			<!-- <view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-friendaddfill" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-filter" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-vip" @tap="login_github"></view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	var _this;
	import wButton from '../../../components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				account: '', //用户/电话
				password: '', //密码
				isRotate: false, //是否加载旋转
				autoLogin:false,//是否自动登录
			};
		},
		components: {
			wButton,
		},
		mounted() {
			_this = this;
		},
		onLoad() {
			var d1 = new Date();
			var d2 = new Date('2019/10/29 23:59:59');
			console.log(parseInt(d2 - d1)); //两个时间相差的毫秒数
			console.log(parseInt(d2 - d1) / 1000); //两个时间相差的秒数
			console.log(parseInt(d2 - d1) / 1000 / 60); //两个时间相差的分钟数
			console.log(parseInt(d2 - d1) / 1000 / 60 / 60); //两个时间相差的小时数\
			this.isLogin();

		},
		methods: {
			auto(e){
				this.autoLogin=e.detail.value;
			},
			navigator() {
				uni.navigateTo({
					url: "../../../pages/home_page/home/home"
				})
			},
			isLogin() {
				// 判断缓存中是否登录过，直接登录
				try {
					const value = uni.getStorageSync('setUserData');
					if (value) {
						//有登录信息
						console.log("已登录用户:", value);
						this.account = value.account;
						this.password = value.mima;
						// this.$store.dispatch("setUserData", value); //存入状态
						if(value.autoLogin==true){
							this.autoLogin=true;
							this.isRotate = true;
							value.dlzt=true;
							try {
								uni.setStorageSync('setUserData', value); //存入缓存
							} catch (e) {
								// error
							}
							setTimeout(function() {
								uni.reLaunch({
									url: '../../../pages/home_page/home/home',
								});
							}, 2000);
						}
					}
				} catch (e) {
					// error
				};
				// console.log(JSON.stringify(this.$store.state.userDate)+' '+this.$store.state.userDate+' '+1111);
			},
			startLogin() {
				// 登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.account.length == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '账号不能为空'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确'
					});
					return;
				}
				uni.request({
					url: this.api + '/account_regulate/login.php',
					data: {
						account: this.account,
						password: this.password
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
							_this.isRotate = true;
							var value = res.data;
							value['autoLogin']=this.autoLogin;
							value['dlzt']=true;
							// _this.$store.dispatch("setUserData", value);
							try {
								uni.setStorageSync('setUserData', value); //存入缓存
							} catch (e) {
								// error
							}
							uni.showToast({
								icon: 'success',
								position: 'bottom',
								title: '登录成功'
							});
							_this.isRotate = true;
							setTimeout(function() {
								uni.reLaunch({
									url: '../../../pages/home_page/home/home',
								});
							}, 2000);

						} else {
							_this.password = ""
							uni.showToast({
								icon: 'error',
								position: 'bottom',
								title: '账号或密码错误'
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
</script>

<style>
	@import url("../../../components/watch-login/css/icon.css");
	@import url("./../css/main.css");
	.switch{
		display: block;
		float: right;
	}
</style>
