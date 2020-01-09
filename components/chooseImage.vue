<template>
	<view class="uploads">
		<!-- 图片上传 -->
		<view class='upload-image-view'>
			<!-- 标题已经省略 -->
			<!-- <view class='title'>上传xxxx图片</view> -->
			<block v-for="(image,index) in imageList" :key="index">
				<view class='image-view'>
					<image :src="image" :data-src="image" @tap="previewImage"></image>
					<view class='del-btn' :data-index="index" @tap='deleteImage'>
						<view class='baicha'></view>
					</view>
				</view>
			</block>
			<view class='add-view' v-if="imageList.length < imageLength" style="margin-top: 40px;" @tap="chooseImage">

				<!-- 相机 -->
				<!-- <view class="xiangji">
					<view class="tixing"></view>
					<view class='changfx'>
						<view class='yuan1'>
							<view class='yuan2'></view>
						</view>
					</view>
				</view> -->

				<!-- 十字架 -->
				<view class="cross">
					<view class="transverse-line"></view>
					<view class="vertical-line"></view>
				</view>

			</view>
			<view class='info'>上传图片，不超过{{imageLength}}张。</view>
		</view>
		<!-- 图片上传 -->
	</view>
</template>

<script>
	var sourceType = [
		['camera'], //拍照
		['album'], //相册
		['camera', 'album'] //拍照或相册
	]
	var sizeType = [
		['compressed'], //压缩
		['original'], //原图
		['compressed', 'original'] //压缩或原图
	]
	export default {
		data() {
			return {
				imageList: [], //保存图片路径集合
				imageLength: 9, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2, //图片尺寸限制
				xz1: false,
				xz2: true,
				signImage: '',//本地图片
				base64: '',//选择照片后保存进base64
				dis: false//有没有选择照片，选择了就是true
			}
		},
		props: {
			rwfj: {
				type: String
			},
			disabled:{
				type:Boolean
			}
		},

		methods: {
			//选择图片
			replace(e) {
				if (e == 1) {
					this.xz1 = true,
						this.xz2 = false
				}
				if (e == 2) {
					this.xz1 = false,
						this.xz2 = true
				}
			},
			chooseImage: async function() {
				console.log(this.disabled+' '+222);
				if (this.disabled == false) {
					var _that = this;
					uni.chooseImage({
						sourceType: sourceType[_that.sourceTypeIndex],
						// #ifdef MP-WEIXIN
						sizeType: sizeType[_that.sizeTypeIndex],
						// #endif
						count: _that.imageLength - _that.imageList.length,
						success: (res) => {
							_that.imageList = _that.imageList.concat(res.tempFilePaths);
							// console.log(res.tempFilePaths);
							// console.log(_that.imageList);
							//设置图片
							_that.base64 = '';
							_that.signImage = '';
							for (var i = 0; i < _that.imageList.length; i++) {

								console.log(_that.imageList[i]);
								console.log(_that.imageList.length + ' ' + i);
								if (_that.imageList[i].indexOf(_that.apiServer) > -1) {
									_that.signImage = _that.signImage + _that.imageList[i].substr(-15, 15) + '~*^*~';
								} else {
									_that.dis = true;
									console.log(2222);
									var savedFilePath = _that.imageList[i]; //相对路径
									// console.log(_that.imageList[i]);
									var path = plus.io.convertLocalFileSystemURL(savedFilePath); //绝对路径
									// console.log(path);
									var fileReader = new plus.io.FileReader();
									fileReader.readAsDataURL(path);
									fileReader.onloadend = function(evt) {
										_that.base64 = _that.base64 + '︴' + evt.target.result;
										_that.$emit("getBase", [_that.signImage, _that.base64])
									}
								}


							}
						}
					})
				}
			},
			//预览图片
			previewImage: function(e) {
				
					var current = e.target.dataset.src
					uni.previewImage({
						current: current,
						urls: this.imageList
					})
				

			},
			//删除图片
			deleteImage: function(e) {
				if (this.disabled == false) {
					var index = e.target.dataset.index;
					var that = this;
					var images = that.imageList;
					images.splice(index, 1);
					that.imageList = images;
					console.log(that.imageList);
					that.signImage='';
					for (var i = 0; i < that.imageList.length; i++) {
						if (that.imageList[i].indexOf(that.apiServer) > -1) {
							that.signImage = that.signImage + that.imageList[i].substr(-15, 15) + '~*^*~'
						}
					}
					console.log(that.signImage);
					if (that.dis == false) {
						that.$emit('getBase', [that.signImage, that.base64])
					}
				}
			}
		},
		watch: {
			rwfj: {
				handler(newval) {
					console.log(this.rwfj);
					var strShuZu = this.rwfj.split('~*^*~');
					for (var i = 0; i < strShuZu.length - 1; i++) {
						var path = this.apiServer + "/uploads/" + strShuZu[i];
						this.imageList.push(path);
					}
					
				},
				immediate: true
			},
			disabled:{
				handler(newval){
					console.log(newval);
				}
			},
			immediate: true
			
		}
	}
</script>

<style>
	@import "../static/css/upload-imgs.css";

	.content {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 560upx;

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

	.label {
		font-size: 12px;
	}

	.input {
		margin-left: 10%;
	}

	.btn {
		margin-top: 45px;

	}

	.active {
		display: none;
	}

	.button {
		width: 90%;
		margin-left: 5%;
		height: 35px;
		background-color: #007AFF;
		color: #FFFFFF;
		font-family: '宋体';
		border-radius: 3px;
		font-size: 16px;

	}

	.uploads {
		width: 100vw;
		margin-left: 6%;

	}
</style>
