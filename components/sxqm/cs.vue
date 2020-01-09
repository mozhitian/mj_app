<template name="move">
	<view>
		<magnifying v-if="judge" :list="item"></magnifying>
	</view>
</template>

<script>
	import magnifying from "@/components/magnifying.vue";
	export default{
		name:"move",
		data() {
			return {
				judge:false,
				item:{
					imgwid:30,//图片宽
					imghei:60,//图片高
					mobilewid:'',//可移动的区域宽
					mobilehei:'',//可移动的区域高
					photo:'',//图片路径
					end:false,//启用可移动或不可移动按钮
					according:true,//启用可移动或不可移动图片，进来可移动为true，不可移动为false
					dynamic:true,//启用移动按钮
					rotate:true,//启用旋转按钮
					oldx:false,//签名的绝对定位top值，如是已固定的展示，according也设为true。false默认从0开始。
					oldy:false,//签名的绝对定位left值，如是已固定的展示，according应为true。false默认从0开始。
					degree:0,//图片旋转的角度
					zt:'',//查看或修改的状态
					//oldx与oldy都传0等同于都为false。
					fs:''
				},
				
			}
		},
		components:{
			magnifying
		},
		methods: {
		},
		beforeCreate:function(){
			
		},
		onLoad: function(option) {
			this.item.fs=option.fs;
			console.log(this.item.fs+' '+11111);
			this.item.photo=option.photo;
			var point=this;
			uni.getSystemInfo({
				success: function (res) {
					point.item.mobilewid=res.windowWidth-point.item.imgwid/3;//自动获取设备的宽减去部分
					point.item.mobilehei=res.windowHeight-point.item.imghei/2;//自动获取设备的高减去部分
				}
			});
			if((option.oldx!=undefined)&&(option.oldy!=undefined))
			{
				
				point.item.oldx=option.oldx;
				point.item.oldy=option.oldy;
				point.item.degree=option.degree;
				
			}
			if(option.zt=='look')
			{
				point.item.dynamic=false;
				point.item.rotate=false;
				point.item.zt='look';
			}
			point.judge=true;//数据全部加载完再渲染组件
		},
	}
</script>

<style>
</style>
