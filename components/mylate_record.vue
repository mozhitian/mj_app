<template>
	<view class="container">
		<view class="project_card">
			<view class="card_secound">
				<view class="first_text">
					<view class="textword_4">
						姓名:<text class="textword_4">{{username}}</text>
					</view>
					<view class="textword_4">
						宿舍楼:<text class="textword_4">{{list.dorm_floor}}</text>
					</view>
					<view class="textword_4">
						宿舍号:<text class="textword_4">{{list.dorm_num}}</text>
					</view>
					<view class="textword_4">
						晚归时间:<text class="textword_1">{{list.CREATE_TIME}}</text>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				new:'',
				
			}
		},
		props: {
			list: {
				type: Object
			},
			username:String
		},
		methods: {
			
		},
		mounted:function(){
		}
	}
</script>

<style>
.container {
		height: 135px;
		width: 100vw;
	}

	.project_card {
		margin-top: 4%;
		height: 110%;
		width: 95%;
		margin-left: 2%;
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
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		color: #FFFFFF;
		margin-left: 10px;
	}
	
	.first_img {
		width: 40%;
		height: 55%;
	}
	
	.textword_3 {
		font-size: 12px;
		text-decoration: underline;
	}

	.card_secound {
		height: 53px;
		display: flex;
		flex-direction: row;
		/* align-items: center;
		justify-content: center; */
		border-top: 1px solid #8F8F94;
	}
	
	.textword_4 {
		padding-top: 10px;
		/* width: 54%; */
		/* font-size: 14px; */
		color: #000000;
	},
	
	.textword_1{
		padding-top: 10px;
		color: #EB5248;
	}

	.home_button {
		width: 30%;
		height: 60%;
		background-color: orange;
		color: #FFFFFF;
		font-size: 14px;
        /* margin: auto;	    */
	}
</style>
