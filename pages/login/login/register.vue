<template>
	<view class="register">

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
				<view class="input-row border">
					<text class="title">确认：</text>
					<view class="m-input-view">
						<input class="m-input-input" type="password" v-model="comfire" placeholder="请再次输入密码" maxlength="11" />
					</view>
				</view>
				<view class="input-row border">
					<text class="title">姓名：</text>
					<view class="m-input-view">
						<input class="m-input-input" type="text" v-model="m_name" placeholder="请输入姓名" maxlength="6" />
					</view>
				</view>
				<view class="input-row border">
					<text class="title">手机：</text>
					<view class="m-input-view">
						<input class="m-input-input" type="text" v-model="phone" placeholder="请输入手机号(用于找回密码)" maxlength="11" @blur="checkPhone" />
					</view>
				</view>
				<view class="input-row border">
					<text class="title">邮箱：</text>
					<view class="m-input-view">
						<input class="m-input-input" type="text" v-model="email" placeholder="请输入邮箱" maxlength="25" @blur="checkEmail" />
					</view>
				</view>
				<!-- <view class="input-row border">
					<text class="title">单位：</text>
					<view class="m-input-view">
						<pick :type="'picker'" :array="['市场部','试验部','技术部','财务部']" :size="'14'" :num="[0,0]" :disabled="false" style="margin-left: -10%;"></pick>
						<input class="m-input-input" type="text" v-model="unit" placeholder="请选择单位" maxlength="11" />
					</view>
				</view> -->
				<view class="input-row border" @click="openPopop(1)" v-if="showAgree">
					<text class="title">授权：</text>
					<view class="m-input-view">
						<input class="m-input-input" type="text" v-model="sqSect" placeholder="请选择被授权签名的人员" disabled="true" />
					</view>
				</view>
			</view>
			<wButton text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton>
			<mulcheck :labelList="sqObj" :values="sqSectArr" :num="'0'" ref="mulcheck" @postVal="getVal"></mulcheck>
		</view>
	</view>
</template>

<script>
	var _this;
	import Bus from "../../../bus.js"
	import pick from "@/components/pick.vue";
	import mulcheck from "@/components/mulcheck.vue";
	import wButton from '../../../components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				account: '', // 用户名
				password: '', //密码
				comfire: '', //确定密码
				m_name: '', //姓名
				phone: '', //手机
				email: '', //邮箱
				// unit: '市场部', //单位
				flag: false, //判断信息对错
				phoneFlag: false, //判断手机号格式对错
				emailFlag: false, //判断邮箱格式对错
				// verCode: "", //验证码
				showAgree: false, //协议是否选择
				isRotate: false, //是否加载旋转
				// sqObj:[],//授权人员，子元素为对象
				// sqSectArr:[],//已选择的被授权人员，格式为[选项a,选项b]
				// sqSect:'',//被授权人员，格式为'选项a;选项b;'
			}
		},
		components: {
			wButton,
			mulcheck,
			pick,
		},
		methods: {
			getVal([val,zt]){
				this.sqSect=val
			},
			openPopop(e) {
				this.$refs.mulcheck.openPopup(e);
			},
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
			checkEmail() {
				var email = this.email;
				var emreg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
				if (!email.length) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: "邮箱为空！"
					});
				} else if (emreg.test(email) == false) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: "请输入有效的邮箱号码！"
					});
				} else {
					this.emailFlag = true;
				}
			},
			startReg() {
				//注册
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				var password = this.password;
				var comfire = this.comfire;
				var message = '';
				if (!this.account.length) {
					message = "账号为空";
					//判断账号是否包含中文
				} else if (this.account.length < 6) {
					message = "账号位数不能少于6位";
					//判断账号是否包含中文
				} else if (/.*[\u4e00-\u9fa5]+.*$/.test(this.account)) {
					message = "对不起，您输入的账号格式不正确(不可中文)!";
					//密码为空或密码输入不一致
				} else if (!password.length || !comfire.length) {
					message = "密码为空";
					//判断密码输入是否一致
				} else if (password.length < 6) {
					message = "密码不能少于6位";
					//判断账号是否包含中文
				} else if (password != comfire) {
					message = "密码两次输入不一致";
					//判断姓名是否输入	
				} else if (!this.m_name.length) {
					message = "请输入姓名";
					//判断手机号	
				} else if (!this.phoneFlag) {
					this.checkPhone();
					this.flag = true;
				} else if (!this.emialFlag) {
					this.checkEmail();
					this.flag = true;
					//单位未选择''
				} else {
					this.flag = true;
				}
				//信息不正确
				if (!this.flag) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: message
					});
					//正确，开始注册
					// else if(this.phoneFlag&&this.emailFlag&&this.flag)
				} else if(this.flag){
					console.log('1');
					// var regData = {
					// 	account: this.account, // 用户名
					// 	mima: this.password, //密码
					// 	m_name: this.m_name, //姓名
					// 	phone: this.phone, //手机
					// 	email: this.email, //邮箱
					// };
					// var _that = this;
					uni.request({
						url: _that.api + '/account_regulate/res.php',
						data: {
							account: this.account, // 用户名
							password: this.password, //密码
							m_name: this.m_name, //姓名
							phone: this.phone, //手机
							email: this.email, //邮箱
						},
						dataType: 'json',
						header: {
							'Content-type': 'application/x-www-form-urlencoded',
						},
						method: 'POST',
						success: (res) => {
							res = res.data;
							console.log(res);
							if (res.result == "success") {
								console.log('success');
								// var value = res;
								// _that.$store.dispatch("setUserData", regData);
								// try {
								// 	uni.setStorageSync('setUserData', regData); //存入缓存
								// } catch (e) {
								// 	// error
								// }
								uni.showToast({
									icon: 'error',
									position: 'bottom',
									title: '注册成功'
								});
								setTimeout(function() {
									uni.reLaunch({
										url: '../../../pages/home_page/home/home',
									});
								}, 500);
							} else {
								console.log('error');
								uni.showToast({
									icon: 'error',
									position: 'bottom',
									title: res.result
								});
							}
						},
										
						fail: (err) => {
							console.log(err);
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

	.my-sxqm-view {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		height: 90px;
		width: 100%;
	}
	.my-picture-view{
		width: 30%;
	}

	.pic-button {
		margin-left: 5%;
		font-size: 14px;
	}
</style>
