<template>
	<view class='content'>
		<view id="first">
			<view id="home_first" class="home_card" @tap="project">
				<view class='home_img_total'>
					<image class='home_img' src='../../../static/file.png'></image>
				</view>
				<view class='home_text'>
					<text>晚归记录</text>
					<text>{{count}}个班级</text>
				</view>
				<view class='home_greater'>></view>
			</view>
			<view class="home_card" @tap="message">
				<view class='home_img_total'>
					<image class='home_img' src='../../../static/file.png'></image>
				</view>
				<view class='home_text'>
					<text>我的消息</text>
					<text>与“我”相关的审核签名提醒</text>
				</view>
				<view class='home_greater'>></view>
			</view>
			<view class="home_card">
				<view class='home_img_total'>
					<image class='home_img' src='../../../static/file.png'></image>
				</view>
				<view class='home_text'>
					<text>统计分析</text>
					<text>汇总统计本单位检测数据相关统计报告</text>
				</view>
				<view class='home_greater'>></view>
			</view>
			<view id="home_middle" class="home_card" @tap="setting">
				<view class='home_img_total'>
					<image class='home_img' src='../../../static/Set.png'></image>
				</view>
				<view class='home_text'>
					<text>更多设置</text>
					<text>个人信息，系统设置等</text>
				</view>
				<view class='home_greater'>></view>
			</view>
		</view>
		<!-- <view class="home_last">
			<view class='home_img_total1'>
				<image class='home_img1' src='../../../static/set.png'></image>
				<text class="last_text">主页</text>
			</view>
		</view> -->
		<view class="my_home">
			<view class="home">
				<image src="../../../static/home.png" style="width: 40px;height: 40px;display: block;margin: 0 auto;"></image>
				<text style="margin: 0 auto;font-size: 14px;">主页</text>
			</view>
		</view>
		<websocket></websocket>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:0
			}
		},
		methods: {
			project() {
				uni.navigateTo({
					url: '../../my_project/project/project',
				});
			},
			message() {
				uni.navigateTo({
					url: '../../messagepush/messagepush',
				});
			},
			setting(){
				uni.navigateTo({
					url: '../../setting/setting',
				});
			},

		},
		created() {
			const value = uni.getStorageSync('setUserData');
			if (value) {
				uni.request({
					url: this.apiServer + '/basicdata/components/message.php',
					data: {
						flag:'getMessage',
						peo:value.my_name
					},
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //POST头信息
					},
					success: (res) => {
						res=res.data;
						console.log(JSON.stringify(res));
						if(res.length&&typeof(res)==Object){
							for(var i=0;i<res.length;i++){
								uni.sendSocketMessage({
									data: res[i]
								})
							}
						}
					},
					fail: (error) => {
						console.log(error);
					}
				});
			}
		},
		onLoad: function (option) {
			uni.request({
				url: this.api + '/basicdata/getmyclass.php',
				data: {
					flag:'classNum',
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					console.log(res);
					res=res.data;
					this.count=res.count;
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
		align-items: center;
		background-color: #efeff4;
		height: 89vh;
		width: 100vw;
		justify-content: space-between;
	}

	#first {
		width: 100%;
	}

	#home_first {
		margin-top: 14px;
	}

	.home_card {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 70px;
		background-color: #FFFFFF;
		width: 100%;
		margin-top: 3px;
	}

	.home_img_total {
		height: 70px;
		width: 70px;
	}

	.home_img_total1 {
		/* display: flex; */
		height: 70px;
		width: 20%;
		text-align: center;
		/* justify-content: center; */
	}

	.home_img {
		height: 70%;
		width: 70%;
		margin-left: 20%;
		margin-top: 10%;
	}

	.home_text {
		height: 70px;
		width: 70%;
		font-size: 16px;
		/* margin-left: -50%; */
		display: flex;
		flex-direction: column;
		margin-top: 12px;
	}

	.home_text text:last-child {
		font-size: 12px;
		display: flex;
		justify-content: flex-start;
	}

	.home_greater {
		display: flex;
		align-items: center;
		margin-right: 5%;
		color: #8F8F94;
		font-size: 22px;
		width: 10%;
	}

	#home_middle {
		margin-top: 15px;
	}

	.my_home {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
		height: 70px;
		width: 100%;
		position: absolute;
		left: 0px;
		bottom: 0px;
	}
	
	.home{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 30%;
	}

	.home_img1 {
		height: 60%;
		width: 50%;
		margin-top: 5%;
		display: flex;
		align-items: center;
		margin-left: 25%;
	}

	.last_text {
		display: block;
		font-size: 14px;
		margin-left: 6px;
	}
</style>
