<template name="latestudent">
	<view class="container">
		<view class="project_card">
			<view class="card_secound">
				<view class="img1">
					<image class="first_img1" src='../../../static/jg.png'></image>
				</view>
				<view>{{list.username}}</view><text>晚归记录</text>
				<button class="home_button" @tap="options">点击查看</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "latestudent",
		props: {
			list: {
				type: Object
			}
		},
		methods: {
			options: function() {
				 // console.log(this.list.username)
				uni.navigateTo({
					url: '../../my_project/late_record/late_record?username='+this.list.username
				})
			}
		}

	}
</script>

<style>
	.container {
		height: 50px;
		width: 100vw;
	}

	.project_card {
		margin-top: 4%;
		height: 110%;
		width: 90%;
		margin-left: 5%;
		border: 1px solid #8F8F94;
		border-radius: 4%;
		overflow: hidden;
	}

	.card_first {
		/* height: 72px; */
		display: flex;
		flex-direction: row;
		background-color: #007AFF;
	}

	.first_text {
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
		color: #FFFFFF;
		margin-left: 10px;
	}

	.img {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.first_img {
		width: 40%;
		height: 55%;
	}

	.textword_1 {
		font-size: 15px;
		width: 100%;
	}


	.textword_2 {
		font-size: 13px;
		width: 100%;
		margin-top: 4px;
	}

	

	.textword_3 {
		font-size: 12px;
		text-decoration: underline;
	}

	.card_secound {
		height: 53px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-top: 1px solid #8F8F94;
	}
	
	.img1 {
		width: 14%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.first_img1 {
		width: 56%;
		height: 50%;
	}

	.textword_4 {
		width: 54%;
		font-size: 14px;
	}

	.home_button {
		width: 30%;
		height: 60%;
		background-color: orange;
		color: #FFFFFF;
		font-size: 14px;
        margin: auto;
        margin-right: 40px;
	}
</style>
