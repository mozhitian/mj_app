<template>
	<view>
		<mylatestudent v-for="(item,index) in actlist" :key="index" :list="item"></mylatestudent>
	</view>
</template>

<script>
    import mylatestudent from "../../../components/mylate_student.vue";
	export default {
		data() {
			return {
				username:'',
				actlist: []
			}
		},
		components:{
			mylatestudent,
		},
		methods: {
			options: function() {
				// this.$store.state.projectName=this.list.gcmc;
				uni.navigateTo({
					url: '../../my_project/late_record/late_record'
				})
			}
		},
		onLoad: function(option){
			this.class=option.class;
			// this.username=option.username;
			// console.log(option.username);
			uni.setNavigationBarTitle({
				title: this.class
			});
			uni.request({
				url: this.api + '/basicdata/getmystudent.php',
				data: {
					flag:'latestudent',
					class:option.class,
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					// console.log(res.data.username);
					console.log(res);
					res=res.data;
					// this.username=res.username
					// this.actlist=res.data.username;
					if(res[res.length-1].result=='success'){
						res.splice(res.length-1,1);
						this.actlist=res;
					}else{
						uni.showToast({
							icon: 'error',
							position: 'bottom',
							title: '无数据'
						});
					}
				},
				fail: (error) => {
					console.log(error);
				}
			});
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
        /* margin: auto;	    */
	}
</style>
