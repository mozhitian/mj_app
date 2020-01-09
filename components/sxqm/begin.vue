<template name="sxqm">
	<view>
		<button v-if="look" @tap="enter" style="font-size: 14px;line-height: 45px;">前往手写签名</button>
		<button v-if="!look" @tap="view">查看</button>
		<button v-if="!look" @tap="change">修改</button>
	</view>
</template>

<script>
	export default {
		name:"sxqm",
		data() {
			return {
				look: true,
				oldx:0,
				oldy:0,
				photo:'',
				degree:'',
				fs:'1'
			}
		},
		methods: {
			enter: function() {
				uni.navigateTo({
					url: '../../../components/sxqm/index?fs='+this.fs
				});
			},
			view: function(){
				uni.navigateTo({
					url:'cs?oldx='+this.oldx+'&oldy='+this.oldy+'&photo='+this.photo+'&zt=look'+'&degree='+this.degree,
				});
			},
			change:function(){
				uni.navigateTo({
					url:'cs?oldx='+this.oldx+'&oldy='+this.oldy+'&photo='+this.photo+'&zt=change'+'&degree='+this.degree,
				});
			}
		},
		onLoad:function(option){
			//下次进来时可从数据库直接拿图片的坐标，路径，旋转角度直接赋值。
			this.oldx=option.oldx;
			this.oldy=option.oldy;
			this.photo=option.photo;
			this.degree=option.degree;
			if((this.oldx!=undefined)||(this.oldy!=undefined))
			{
				this.look=false;
			}
			
			
		}

	}
</script>

<style>
</style>
