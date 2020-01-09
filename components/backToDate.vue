<template>
	<view style="width: 100%;height: 100%;">
		<view class="button" @click="backToDate">返回</view>
	</view>
</template>

<script>
	export default {
		name:'backToDate',
		data() {
			return {
				
			};
		},
		methods:{
			backToDate(){
				this.$emit('backToDate');
			}
		}
	}
</script>

<style scoped>
.button{
	position: fixed;
	top: 3%;
	right: 5%;
	width: 30px;
	height: 30px;
	border-radius: 30upx;
	background-color: blue;
	color:white;
	z-index: 10;
	font-size: 14px;
}
</style>
