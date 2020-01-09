<template>
	<view class='contents'>
		<canvas class='firstCanvas' :class="{ aa: draft }" canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)'
		 @touchend='end' @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
		</canvas>
		<image class="ccc" :src="signImage" mode="aspectFill"></image>
		<view class="caozuo">
			<view class="chongqian" @tap='clearClick'>
				<text style="width: 40px;height: 40px; transform:rotate(90deg);display: block;position: fixed;left: 20%;bottom: 0px;">重签</text>
			</view>
			<!-- <view class="returnback" @tap='returnclick' :style="{background:buttoncolor}">
				上一步
			</view> -->
			<view class="over" @tap="overSign">
				<!-- {{name}} -->
				<text style="width: 40px;height: 40px; transform:rotate(90deg);display: block;position: fixed;bottom: 0px;right: 10%;">完成签名</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Bus from "../../bus.js"
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	var _that;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvasw = res.windowWidth;
			canvash = res.windowHeight;
		},
	})
	export default {
		data() {
			return {
				name: '完成签名',
				signImage: "",
				returnphoto: '',
				isEnd: false, // 是否签名
				draft: false,
				returnx: 0,
				returny: 0,
				nowx: 0,
				nowy: 0,
				number: 0,
				buttoncolor: '#ef4343',
				fs: ''
			}
		},
		methods: {
			overSign: function() {
				uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',
					success: function(res) {
						_that.draft = true
						//打印图片路径
						console.log(res)
						console.log('完成签名')
						//设置图片
						_that.signImage = res.tempFilePath
					},
				});
				setTimeout(function(){
					Bus.$emit("getTemPath",_that.signImage);
					uni.navigateBack({
						delta: '2'
					})
				},1000)
				
// 				if (this.isEnd == true && this.name == '完成签名') {
// 					this.name = '保存签名';
// 					uni.canvasToTempFilePath({
// 						canvasId: 'firstCanvas',
// 						success: function(res) {
// 							_that.draft = true
// 							//打印图片路径
// 							console.log(res)
// 							console.log('完成签名')
// 							//设置图片
// 							_that.signImage = res.tempFilePath
// 							// console.log(res.tempFilePath)
// 							// var savedFilePath = res.tempFilePath; //相对路径
// 							// // console.log(savedFilePath);
// 							// var path = plus.io.convertLocalFileSystemURL(savedFilePath); //绝对路径
// 							// // console.log(savedFilePath);
// 							// var fileReader = new plus.io.FileReader();
// 							// fileReader.readAsDataURL(path);
// 							// fileReader.onloadend = function(evt) { //读取文件成功完成的回调函数
// 							// 	console.log(evt.target.result); //输出base64内容
// 							// }
// 
// 						}
// 					})
// 				} else {
// 					if (this.signImage == '' || !this.isEnd) {
// 						uni.showToast({
// 							title: '请先完成签名',
// 							icon: "none",
// 							duration: 1500,
// 							mask: true
// 						})
// 					} else {
// 						//这里将图片存进数据库（php base64转图片，保存图片路径）
// 						// uni.request({
// 						// 	url: 'http://127.0.0.1:8081/huabu/sxqm.php',
// 						// 	data: {
// 						// 		text: savedFilePath,
// 						// 	},
// 						// 	mothod:'POST',
// 						// 	header: {
// 						// 		'content-type': 'application/x-www-form-urlencoded', 
// 						// 	},
// 						// 	success: (res) => {
// 						// 		console.log(res.data);
// 						// 	},
// 						// 	fail: (res) => {
// 						// 		console.log('request fail');
// 						// 		console.log(res.data);
// 						// 		console.log(res.statusCode);
// 						// 	},
// 						// });
// 
// 						//在ajax成功里面加
// 						// var pages = getCurrentPages();
// 						// var currPage = pages[pages.length - 1]; //当前页面
// 						// var prevPage = pages[pages.length - 2]; //上一个页面
// 						// //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
// 						// prevPage.setData({
// 						// 	photo: this.signImage
// 						// })
// 						Bus.$emit("getTemPath",this.signImage);
// 
// 						uni.navigateBack({
// 							delta: '2'
// 						})
// 						// uni.navigateTo({
// 						// 	url: 'cs?photo='+this.signImage+'&sjc='+this.sjc+'&fs='+this.fs,
// 						// });
// 					}
// 
// 				}

			},

			// 画布的触摸移动开始手势响应
			start: function(event) {
				// console.log(event)
				console.log("触摸开始" + event.changedTouches[0].x)
				console.log("触摸开始" + event.changedTouches[0].y)
				this.returnx = event.changedTouches[0].x;
				this.returny = event.changedTouches[0].y;
				//获取触摸开始的 x,y
				let point = {
					x: event.changedTouches[0].x,
					y: event.changedTouches[0].y
				}
				// console.log(point)
				touchs.push(point);

				uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',
					// destWidth: drawImage,
					// destHeight: canvash,
					success: function(res) {
						// _that.draft = true
						//打印图片路径
						// console.log(res)
						// console.log('完成签名')
						//设置图片
						_that.returnphoto = res.tempFilePath
						_that.buttoncolor = '#ef4343';
						_that.number++;
					}
				})

			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				// console.log(point)
				this.nowx = e.touches[0].x;
				this.nowy = e.touches[0].y;
				touchs.push(point);
				console.log(this.returnx, this.returny)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},

			// 画布的触摸移动结束手势响应
			end: function(e) {
				console.log("触摸结束" + e)
				// 设置为已经签名
				this.isEnd = true
				// 清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}
			},

			// 画布的触摸取消响应
			cancel: function(e) {
				console.log("触摸取消" + e)
			},

			// 画布的长按手势响应
			tap: function(e) {
				console.log("长按手势" + e)
			},

			error: function(e) {
				console.log("画布触摸错误" + e)
			},

			//绘制
			draw: function(touchs) {
				console.log(touchs[0], touchs[1])
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				content.setLineWidth(5)
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
			},
			//清除操作
			clearClick: function() {
				this.name = '完成签名';
				// 设置为未签名
				this.isEnd = false
				this.draft = false
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
			},
			returnclick: function() {
				if (this.number > 0) {
					console.log(this.returnphoto)
					content.drawImage(this.returnphoto, 0, 0, canvasw * 14 / 15, canvash - 11 / 25 * canvasw);
					content.draw();
					this.buttoncolor = '#e5e2e2';
				}
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			uni.showModal({
				title:'请使用横屏签名'
			});
			_that = this;
			this.fs = options.fs
			// console.log(this.fs);
			//获得Canvas的上下文
			content = wx.createCanvasContext('firstCanvas')
			//设置线的颜色
			content.setStrokeStyle("#000")
			//设置线的宽度
			content.setLineWidth(5)
			//设置线两端端点样式更加圆润
			content.setLineCap('round')
			//设置两条线连接处更加圆润
			content.setLineJoin('round')
		},



	}
</script>

<style>
	.ts {
		color: #FF485D;
		font-size: 30upx;
		height: 100upx;
		line-height: 100upx;
		padding-left: 20upx;
	}

	canvas {
		background-color: #DDDDDD;
		width: 700upx;
		margin: 0 25upx;
		height: calc(100vh - 180upx);
		overflow: hidden;
		margin-bottom: 40px;
	}

	.ccc {
		width: 700upx;
		margin: 0 25upx;
		height: calc(100vh - 180upx);
	}

	.aa {
		/* background-color: #DDDDDD; */
		display: none;
		/* width: 700upx; */
		/* height: calc(100vh - 140upx); */
	}

	.contents {
		padding-top: 20upx;
		padding-bottom: 100upx;
		box-sizing: border-box;
	}

	#signatureImg {
		background-color: #EEEEEE;
	}

	.caozuo {
		display: flex;
		height: 100upx;
		width: 750upx;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.caozuo view {
		width: 375upx;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		color: #FFFFFF;
	}

	.caozuo view:active {
		background-color: #CCCCCC;
		color: #333333;
	}

	.chongqian {
		background-color: #FF8F58;
	}

	.over {
		background-color: #0599D7;
	}
</style>
