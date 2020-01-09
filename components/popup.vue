<template name="popup">
	<view>
		<!-- <move v-if="true"></move> -->
		<uni-popup ref="popupAff" type="bottom">
			<button class="popup_title" :disabled="true">提示</button>
			<view class="popup_content">
				<view class="popup_content_caution">{{popupContent}}</view>
			</view>
			<view class="popup_operation">
				<button class="popup_operation_one" v-if="popupSelect" @click="closePopupAff">{{popupOperation}}</button>
				<view class="popup_operation_two" v-if="!popupSelect">
					<button class="popup_operation_first" @click="closePopupAff(1)">{{popupOperationf}}</button>
					<button class="popup_operation_second" @click="closePopupAff(2)">{{popupOperationt}}</button>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="popupAft" type="bottom">
			<button v-if="img==''" class="popup_title" :disabled="true" style="margin-bottom: 89px;">提示</button>
			<button v-if="img!=''" class="popup_title" :disabled="true" style="margin-bottom: -5px;">提示</button>
			<image v-if="img!=''" :src="img" style="transform: rotateZ(270deg);width: 45px;height: 90px;position: relative;left: 30%;top: -15px;"></image>
			<view class="popup_content" style="margin-top: -89px;">
				<button class="popup_content_opration" style="margin-left: 70%;" @click="closePopupAft">提交</button>
			</view>

			<view class="popup_operation">
				<sxqm class="popup_operation_first"></sxqm>
				<button class="popup_operation_second" @click="openqmtp()">选择已有的手写签名</button>
			</view>
		</uni-popup>
		<uni-popup ref="qmtp" type="center">
			<view style="display: flex;flex-direction: row;flex-flow: wrap; background-color: #FFFFFF;border: 1px solid;width: 300px;max-height: 200px;overflow: scroll;">
				<view v-for="item in pathArr" :key="item" style="width: 90px;height: 45px;border: 1px solid;" @click="getImgVal(item)">
					<image :src="item" style="transform: rotateZ(270deg);width: 45px;height: 90px;position: relative;left: 23px;top: -23px;"></image>
				</view>
			</view>
		</uni-popup>



	</view>
</template>

<script>
	import Bus from '../bus.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import sxqm from "../components/sxqm/begin.vue";
	import store from "../store/index.js"
	// import move from "../components/sxqm/cs.vue"
	export default {
		name: "popup",
		data: function() {
			return {
				//内容
				popupContent: '',
				popupSelect: true,
				popupOperation: '提交',
				popupOperationf: '',
				popupOperationt: '',
				//委托id
				id: '',
				state: '', //所处状态
				img: '', //签名后的base64
				base: '',
				e: '', //记录点击的是第几个
				pathArr: [], //授权手写签名地址
			}
		},
		components: {
			uniPopup,
			sxqm,
			// move
		},
		props: {

		},
		methods: {
			getImgVal(e) {
				// console.log(e);
				this.img = e;
				this.$refs.qmtp.close();
			},
			openqmtp() {
				this.$refs.qmtp.open();
			},
			openPopup([id, state]) {
				this.$store.state.state = state;
				console.log(333);
				this.id = id;
				this.state = state;
				console.log(this.state + ' ' + this.id);
				if (this.state == 'a1&b' || this.state == 'a7&b' || this.state == 'a10&b' || this.state == 'a11&b' || this.state ==
					'a12&b') {
					this.$refs.popupAff.open();
					this.popupContent = "请选择操作";
					this.popupSelect = true;
				} else if (this.state == 'a2&b' || this.state == 'a4&b') {
					this.$refs.popupAff.open();
					this.popupContent = "请选择任务状态";
					this.popupOperationf = '提交派工';
					this.popupOperationt = "提交延期"
					this.popupSelect = false;
				} else if (this.state == 'a4&r') {
					this.$refs.popupAff.open();
					this.popupContent = "提交派工";
					this.popupSelect = true;
				} else if (this.state == 'a3&g' || this.state == 'a3&b') {
					if (this.$store.state.process == '试验') {
						this.$refs.popupAff.open();
						this.popupContent = "请选择任务状态";
						this.popupOperationf = '删除';
						this.popupOperationt = "提交"
						this.popupSelect = false;
					}
					console.log(this.$store.state.option);

				} else if (this.state == 'a5&b' || this.state == 'a5&g' || this.state == 'a6&b' || this.state == 'a8&b' || this.state ==
					'a9&b') {
					this.$refs.popupAff.open();
					this.popupContent = "请选择任务状态";
					this.popupOperationf = '驳回';
					this.popupOperationt = "提交";
					this.popupSelect = false;
				} else if (this.state == 'a3&r' || this.state == 'a5&r' || this.state == 'a7&r') {
					this.$refs.popupAff.open();
					this.popupContent = "请先修改完错误的信息";
					this.popupOperation = "取消";
					this.popupSelect = true;
				}
			},
			closePopupAff(e) {
				//手写签名
				if (this.state == 'a1&b' || this.state == 'a3&g' || this.state == 'a3&b' || this.state == 'a5&g' || this.state ==
					'a5&b' || this.state == 'a6&b' || this.state == 'a8&b' || this.state == 'a9&b') {
					if (this.state == 'a3&g' || this.state == 'a3&b') {
						if (this.$store.state.process == '试验') {
							this.$refs.popupAft.open();
							this.e = e;
						} else {

						}
					} else {
						this.$refs.popupAft.open();
						this.e = e;
					}
				} else if (this.state == 'a2&b' || this.state == 'a4&b' || this.state == 'a4&r' || this.state == 'a7&b' || this.state ==
					'a10&b' || this.state == 'a11&b' || this.state == 'a12&b') { //不需要手写签名
					console.log(e + ' ' + 222);
					uni.request({
						url: this.apiServer + '/basicdata/upState.php',
						data: {
							flag: this.state,
							flage: e,
							id: this.id
						},
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded', //POST头信息
						},
						success: (res) => {
							res = res.data;
							console.log(res.result);
							if (res.result == 'success') {
								this.$refs.popupAff.close();
								this.$emit('reload', [this.id, this.state, e]);
								uni.showToast({
									icon: 'none',
									title: '提交成功'
								});
							}
						},
						fail: (error) => {
							console.log(error);
						}
					});
				} else if (this.state == 'a3&r' || this.state == 'a5&r') { //需要修改

				}
				this.$refs.popupAff.close();
			},
			//手写签名
			closePopupAft() {
				// console.log(this.id);
				if (this.img == '') {
					uni.showToast({
						icon: 'none',
						title: '请先选择手写签名图片'
					})
				} else if (this.e != '') {
					var _that = this;
					if (this.img.indexOf('tmp') == -1) {
						_that.img=_that.img.split("/uploads/")[1]+"~*^*~";
						console.log(_that.img);
						uni.request({
							url: _that.apiServer + '/basicdata/tpsc.php',
							data: {
								img: _that.img,
								flag: _that.state,
								flage: _that.e,
								id: _that.id,
							},
							dataType: 'json',
							header: {
								'Content-type': 'application/x-www-form-urlencoded',
							},
							method: 'POST',
							success: (res) => {
								if (res.data.result == 'success') {
									_that.img = '';
									_that.$refs.popupAft.close();
									_that.$emit('reload', [_that.id, _that.state, _that.e]);
									if (_that.state == 'a1&b') {
										uni.showToast({
											icon: 'none',
											title: '提交成功'
										});
									} else if (_that.state == 'a3&b' && _that.e == 1) {
										uni.showToast({
											icon: 'none',
											title: '删除成功'
										});
									} else if (_that.state == 'a3&g' && _that.e == 1) {
										uni.showToast({
											icon: 'none',
											title: '删除成功'
										});
									} else if (_that.state == 'a3&b' && _that.e == 2) {
										uni.showToast({
											icon: 'none',
											title: '提交成功'
										});
									} else if (_that.state == 'a3&g' && _that.e == 2) {
										uni.showToast({
											icon: 'none',
											title: '提交成功,本次试验数据填写未完成'
										});
									} else if (_that.state == 'a5&g' && _that.e == 2) {
										uni.showToast({
											icon: 'none',
											title: '提交失败,本次试验数据填写未完成'
										});
									} else if (_that.state == 'a5&b' && _that.e == 2) {
										uni.showToast({
											icon: 'none',
											title: '提交成功'
										});
									} else if (_that.state == 'a3&g') {
										uni.showToast({
											icon: 'none',
											title: '删除成功'
										});
									} else if (_that.state == 'a5&b' && _that.e == 1) {
										_that.$emit("openCtd");
									} else if (_that.state == 'a5&g' && _that.e == 1) {
										_that.$emit("openCtd");
									} else if (_that.state == 'a6&b' && _that.e == 1) {
										// uni.showToast({
										// 	icon: 'none',
										// 	title: '驳回成功'
										// });
										_that.$emit("openCtd");
									} else if (_that.state == 'a6&b' && _that.e == 2) {
										uni.showToast({
											icon: 'none',
											title: '提交成功'
										});
									} else if (_that.state == 'a8&b' && _that.e == 1) {
										uni.showToast({
											icon: 'none',
											title: '驳回成功'
										});
									} else if (_that.state == 'a8&b' && _that.e == 2) {
										uni.showToast({
											icon: 'none',
											title: '审核成功'
										});
									} else if (_that.state == 'a9&b' && _that.e == 1) {
										uni.showToast({
											icon: 'none',
											title: '驳回成功'
										});
									} else if (_that.state == 'a9&b' && _that.e == 2) {
										uni.showToast({
											icon: 'none',
											title: '批准成功'
										});
									}
								}
								console.log(res.data);
							},
						
							fail: (err) => {
								console.log(err);
							}
						});

					} else {
						var savedFilePath = this.img; //相对路径
						// console.log(savedFilePath);
						var path = plus.io.convertLocalFileSystemURL(savedFilePath); //绝对路径
						// console.log(savedFilePath);
						var fileReader = new plus.io.FileReader();
						fileReader.readAsDataURL(path);
						console.log(this.apiServer);
						fileReader.onloadend = function(evt) { //读取文件成功完成的回调函数
							// console.log(evt.target.result); //输出base64内容					
							_that.base = evt.target.result;
							uni.request({
								url: _that.apiServer + '/basicdata/tpsc.php',
								data: {
									img: _that.base,
									flag: _that.state,
									flage: _that.e,
									id: _that.id
								},
								dataType: 'json',
								header: {
									'Content-type': 'application/x-www-form-urlencoded',
								},
								method: 'POST',
								success: (res) => {
									if (res.data.result == 'success') {
										_that.img = '';
										_that.$refs.popupAft.close();
										_that.$emit('reload', [_that.id, _that.state, _that.e]);
										if (_that.state == 'a1&b') {
											uni.showToast({
												icon: 'none',
												title: '提交成功'
											});
										} else if (_that.state == 'a3&b' && _that.e == 1) {
											uni.showToast({
												icon: 'none',
												title: '删除成功'
											});
										} else if (_that.state == 'a3&g' && _that.e == 1) {
											uni.showToast({
												icon: 'none',
												title: '删除成功'
											});
										} else if (_that.state == 'a3&b' && _that.e == 2) {
											uni.showToast({
												icon: 'none',
												title: '提交成功'
											});
										} else if (_that.state == 'a3&g' && _that.e == 2) {
											uni.showToast({
												icon: 'none',
												title: '提交成功,本次试验数据填写未完成'
											});
										} else if (_that.state == 'a5&g' && _that.e == 2) {
											uni.showToast({
												icon: 'none',
												title: '提交失败,本次试验数据填写未完成'
											});
										} else if (_that.state == 'a5&b' && _that.e == 2) {
											uni.showToast({
												icon: 'none',
												title: '提交成功'
											});
										} else if (_that.state == 'a3&g') {
											uni.showToast({
												icon: 'none',
												title: '删除成功'
											});
										} else if (_that.state == 'a5&b' && _that.e == 1) {
											_that.$emit("openCtd");
										} else if (_that.state == 'a5&g' && _that.e == 1) {
											_that.$emit("openCtd");
										} else if (_that.state == 'a6&b' && _that.e == 1) {
											// uni.showToast({
											// 	icon: 'none',
											// 	title: '驳回成功'
											// });
											_that.$emit("openCtd");
										} else if (_that.state == 'a6&b' && _that.e == 2) {
											uni.showToast({
												icon: 'none',
												title: '提交成功'
											});
										} else if (_that.state == 'a8&b' && _that.e == 1) {
											uni.showToast({
												icon: 'none',
												title: '驳回成功'
											});
										} else if (_that.state == 'a8&b' && _that.e == 2) {
											uni.showToast({
												icon: 'none',
												title: '审核成功'
											});
										} else if (_that.state == 'a9&b' && _that.e == 1) {
											uni.showToast({
												icon: 'none',
												title: '驳回成功'
											});
										} else if (_that.state == 'a9&b' && _that.e == 2) {
											uni.showToast({
												icon: 'none',
												title: '批准成功'
											});
										}
									}
									console.log(res.data);
								},

								fail: (err) => {
									console.log(err);
								}
							});
						}
					}

				} else {
					var _that = this;
					var savedFilePath = this.img; //相对路径
					// console.log(savedFilePath);
					var path = plus.io.convertLocalFileSystemURL(savedFilePath); //绝对路径
					// console.log(savedFilePath);
					var fileReader = new plus.io.FileReader();
					fileReader.readAsDataURL(path);
					console.log(this.apiServer);
					fileReader.onloadend = function(evt) { //读取文件成功完成的回调函数
						// console.log(evt.target.result); //输出base64内容					
						_that.base = evt.target.result;
						uni.request({
							url: _that.apiServer + '/basicdata/tpsc.php',
							data: {
								img: _that.base,
								flag: _that.state,
								id: _that.id
							},
							dataType: 'json',
							header: {
								'Content-type': 'application/x-www-form-urlencoded',
							},
							method: 'POST',
							success: (res) => {
								if (res.data.result == 'success') {
									_that.$refs.popupAft.close();
									_that.$emit('reload', [_that.id, _that.state])
									uni.showToast({
										icon: 'none',
										title: '提交成功'
									});
								}
								console.log(res.data);
							},

							fail: (err) => {
								console.log(err);
							}
						});
					}
				}

			}


		},
		created() {
			this.e = '';
			const value = uni.getStorageSync('setUserData');
			if (value) {
				// console.log("已登录用户:", value);
				uni.request({
					url: this.apiServer + '/account_regulate/otherPic.php',
					data: {
						phone: value.shji
					},
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //POST头信息
					},
					success: (res) => {
						console.log(res.data);
						res = res.data;
						var arr = (res.qmtp || '').split("||");
						arr.splice(0, 1);
						for (var i = 0; i < arr.length; i++) {
							arr[i] = arr[i].split("~*^*~")[0];
							var path = this.apiServer + '/uploads/' + arr[i];
							console.log(path);
							this.pathArr.push(path);
						}
					},
					fail: (error) => {
						console.log(error);
					}
				});
			}
		},
		mounted: function() {
			var this_ = this;
			Bus.$on('getTemPath', function(e) {
				this_.img = e;
			})

		},
		watch: {

		},
		computed: {

		}

	}
</script>

<style>
	.popup_title {
		line-height: 45px;
		font-size: 14px;
		border-radius: 5px 5px 0px 0px;
	}

	.popup_content {
		margin-bottom: 15px;
		background-color: #FFFFFF;
		border-radius: 0px 0px 5px 5px;
		display: flex;
		flex-direction: row;
		overflow: hidden;
	}

	.popup_content_caution {
		line-height: 45px;
		width: 100%;
		font-size: 14px;
		background-color: #FFFFFF;
		text-align: center;
	}

	.popup_content_img {
		height: 100%;
		width: 70%;
		display: flex;
		justify-content: center;
	}

	.popup_content_opration {
		font-size: 14px;
		line-height: 45px;
		background-color: red;
		color: #FFFFFF;
		width: 30%;
	}

	.popup_operation {
		line-height: 45px;
		background-color: #FFFFFF;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
	}

	.popup_operation_one {
		width: 100%;
		line-height: 45px;
		font-size: 14px;
	}

	.popup_operation_two {
		display: flex;
		flex-direction: row;
		line-height: 45px;
		width: 100%;
	}

	.popup_operation_first {
		width: 50%;
		line-height: 45px;
		font-size: 14px;
	}

	.popup_operation_second {
		width: 50%;
		line-height: 45px;
		font-size: 14px;
	}
</style>
