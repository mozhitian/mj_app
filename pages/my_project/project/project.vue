<template>
	<view>
		<websocket></websocket>
		<myProject v-for="(item,index) in actlist" :key="index" :list="item"></myProject>
	</view>
</template>

<script>
	import myProject from "../../../components/myProject.vue";
	// import ff from "../../../common/com.js";
	// var oUseTool = new oFuncs();
	
	export default {
		data() {
			return {
				actlist: []
			}
		},
		components:{
			myProject
		},
		onLoad: function() {
			uni.request({
				url: this.api + '/basicdata/getmyclass.php',
				data: {
					flag:'classMes',
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					console.log(res.data);
					res=res.data;
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
		},
		methods: {
			options(){
					  //  uni.showToast({
					  //      icon: 'none',
					  //      title: '账号最短为 5 个字符'
					  //  });
					  uni.navigateTo({
					  	url: '../../my_project/department/department',
					  });
			}
		},
	}
</script>

<style>
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		
		height: 100vh;
		width: 100vw;
	}
	
	.pjoject_card{
		margin-top: 4%;
		height:30%;
		width: 90%;
		border: 1px solid #8F8F94;
		border-radius: 4%;
		overflow:hidden;
	}
	
	.card_first{
		height: 40%;
		display: flex;
		flex-direction: row;
		background-color: #007AFF;
		padding-top: 2%;
	}
	
	.first_text{
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
		color: #FFFFFF;
		margin-left: 10px;
	}
	
	.img{
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.first_img{
		width: 40%;
		height: 55%;
	}
	
	.textword_1{
		font-size: 15px;
		width: 100%;
	}
	
	
	.textword_2{
		font-size: 13px;
		width: 100%;
		margin-top: 4px;
	}
    
	.textword_2 :first-child{
		margin-right: 8px;
	}
	
	.textword_3{
		font-size: 12px;
		text-decoration: underline;
	}
	
	.card_secound{
		height: 29%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-top:1px solid #8F8F94 ;
	}
	
	.img1{
		width: 14%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.first_img1{
		width: 56%;
		height: 50%;
	}
	
	.textword_4{
		width: 54%;
		font-size: 14px;
	}
	
	.home_button{
		width: 30%;
		height:60%;
		background-color: orange;
		color: #FFFFFF;
		font-size: 14px;
		margin-right: 2%;
	}
</style>
