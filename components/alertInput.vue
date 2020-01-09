<template>
	<view class="a_mask">
		<form class="a_box" @submit="formSubmit" @reset="formReset">
			<view class="a_head">
				{{title}}
			</view>
			<view class="a_input">
				<view v-if="type=='text'">
					<input type="text" :value="value" :placeholder="placeholder" :name="name" />
				</view>
				<view v-if="type=='text-area'">
					<textarea type="text" :value="value" :placeholder="placeholder" cols="20" :name="name" style="width: 100%;height: 120px;"></textarea>
				</view>
				<view v-if="type=='mul'">
					<view>
						<label class="radio">
							<radio value="单向" :checked="h1" @click="change(1)" />单向
						</label>
						<label class="radio">
							<radio value="双向" :checked="h2" @click="change(2)" />双向
						</label>
					</view>
					<input type="text" :value="value" :placeholder="placeholder" :name="name" style="margin-top: 20px;height: 30px;" />
				</view>
			</view>
			<view class="a_btn">
				<button form-type="reset" :style="{color:cancelColor}">{{cancelText}}</button>
				<button form-type="submit" :style="{color:confirmColor}">{{confirmText}}</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		name: 'alertInput',
		props: {
			title: {
				type: String,
				default: '提示'
			},
			placeholder: {
				type: String,
				default: '请点击输入'
			},
			name: {
				type: String,
				default: 'text'
			},
			type: {
				type: String,
				default: 'text'
			},
			value: {
				type: String,
				default: ''
			},
			cancelColor: {
				type: String,
				default: '#999999'
			},
			confirmColor: {
				type: String,
				default: '#333333'
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			confirmText: {
				type: String,
				default: '确定'
			},
		},
		data() {
			return {
				h1:true,
				h2:false

			};
		},
		methods: {
			formSubmit: function(e) {
				console.log(e)
				let _formdata = e.detail.value
				console.log(_formdata);
				if(_formdata.content==''){
					uni.showToast({
						title:'请先填写内容'
					});
				}else{
					if(this.type=='mul'){
						if(this.h1==true){
							var xz='单向';
						}else if(this.h2==true){
							var xz='双向';
						}
						this.$emit('confirm',[ _formdata.content,xz]);
					}else{
						this.$emit('confirm', _formdata.content);
					}
				}
				
			},
			formReset: function(e) {
				this.$emit('cancel')
			},
			change(e){
				console.log(e);
				if(e==1){
					if(this.h1==true){
						this.h1=false
					}else{
						this.h1=true;
						this.h2=false;
					}
				}else{
					if(this.h2==true){
						this.h2=false
					}else{
						this.h2=true;
						this.h1=false;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.a_mask {
		position: fixed;
		z-index: 99999;
		background-color: rgba(0, 0, 0, 0.5);
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		.a_box {
			width: 500upx;
			overflow: hidden;

			background-color: #fff;
			border-radius: 10upx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.a_head {
				text-align: center;
				font-size: 30upx;
				line-height: 88upx;
				background-color: #f5f5f5
			}

			.a_input {
				padding: 30upx 20upx;
				font-size: 28upx;

				input {
					text-align: center;
					border: 1px solid #f1f1f1
				}

			}

			.a_btn {
				text-align: center;
				font-size: 30upx;
				line-height: 88upx;
				display: flex;
				justify-content: space-between;
				border-top: 1upx solid #f5f5f5;

				button {
					width: 50%;
					background-color: #fff;
					font-size: 30upx;
					border-radius: 0upx;
					padding: 0;

					&::after {
						border: none
					}

					&:first-child {
						border-right: 1upx solid #f5f5f5;
						color: #999999;
						box-sizing: border-box;
					}

					&:last-child {
						color: #333;
					}
				}

			}
		}
	}
</style>
