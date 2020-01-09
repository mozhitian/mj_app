<template>
	<view class="content">
		<websocket></websocket>
		<chooseImage :rwfj="rwfj" :disabled="disabled" @getBase="getBase64"></chooseImage>
		<view class="form_submit">
			<button class="submit" hover-class="submit_cli" @click="done">关闭</button>
			<button class="submit" hover-class="submit_cli" @click="submitValue" :disabled="disabled">保存</button>
		</view>
	</view>
</template>

<script>
	import chooseImage from "../../../components/chooseImage.vue";
	export default {
		data() {
			return {
				id: '',//委托单id
				rwfj:'',//传给自组件的图片名字字符串
				base64: '',//接收自组件传递的base64;
				disabled:false
			}
		},
		components: {
			chooseImage
		},
		methods: {
			// 接收组件chooseImage发送的base64
			getBase64([sign, base]) {
				//只有新添加的
				if (sign == '') {
					base = base.substr(1);
					this.base64 = base;
					console.log(this.base64);
				} else if (base == '') { //只有本地的
					this.base64 = sign;
					console.log(this.base64);
				} else { //本地和新添加都有
					this.base64 = sign + '~**~' + base
				}
			},
			done() {
				uni.navigateBack({
					delta: 1
				})
			},
			submitValue() {
				uni.request({
					url: this.apiServer + '/basicdata/tpsc.php',
					data: {
						flag: 'upDatePictrue',
						img: this.base64,
						id: this.id
					},
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //POST头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.result == "success") {
							// console.log(11);
							uni.showToast({
								icon: 'none',
								title: '保存成功'
							})
						}
					},
					fail: (error) => {
						console.log(error);
					}
				});
			}

		},
		onLoad: function(option) {
			this.id = option.id;
			//如果是由禁用状态的试验单界面进入的话，启用禁用状态
			if(option.disabled=='true'){
				console.log(234);
				this.disabled=option.disabled;
				console.log(this.disabled);
			}
			
			uni.request({
				url: this.apiServer + '/basicdata/jcxm.php',
				data: {
					flag: 'getPictrue',
					id: option.id,
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					res = res.data;
					console.log(res);
					this.rwfj = res.rwfj;
				},
				fail: (error) => {
					console.log(error);
				}
			});

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		background-color: #F1F1F1;
	}

	.form_submit {
		width: 80%;
		height: 45px;
		margin: 35px 10% 35px 10%;
		display: flex;
		flex-direction: row;
	}

	.submit_cli {
		background-color: #F1F1F1;
		color: #FFFFFF;

	}

	.submit {
		background-color: #007AFF;
		color: #FFFFFF;
		width: 40%;
	}
</style>
