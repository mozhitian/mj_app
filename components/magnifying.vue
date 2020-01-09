<template name='magnifying'>
	<view class="floating">
		<movable-area :style="{width:mobilewid+'px',height:mobilehei+'px'}">
			<movable-view v-if="according" :x="x" :y="y" direction="all" @change="onChange" @touchend="remove" scale="false" >
				<image v-if="according" class="aaa" :style="{width:photowid*2+'px',height:photohei*2+'px',transform: 'rotateZ('+degree+'deg)'}" :src="photo" ></image>
			</movable-view>
			<movable-view v-if="!according&&(old.x||old.y)" :x="old.x" :y="old.y" direction="none"  scale="false" >
				<image v-if="!according" :style="{width:photowid*2+'px',height:photohei*2+'px',transform: 'rotateZ('+degree+'deg)'}" :src="photo" ></image>
			</movable-view>
		</movable-area>
		<button v-if="rotate" class="confirm1" @click="rotating">旋转</button>
		<button v-if="end" class="confirm" @click="mobile">固定</button>
		<button v-if="dynamic" class="confirm" @click="again">移动</button>
	</view>
</template>

<script>
	export default {
		name: "magnifying",
		data() {
			return {
				mobilewid: this.list.mobilewid,//可移动的区域宽
				mobilehei: this.list.mobilehei,//可移动的区域高
				photowid: this.list.imgwid,//图片宽
				photohei: this.list.imghei,//图片高
				photo:this.list.photo,//图片路径
				end:this.list.end,//启用固定按钮
				according:this.list.according,//启用可移动或不可移动图片
				dynamic:this.list.dynamic,//启用移动按钮
				rotate:this.list.rotate,//启用旋转按钮
				degree:this.list.degree,//图片旋转角度
				zt:this.list.zt,//启用旋转按钮
				x: this.list.oldx||'0',
				y: this.list.oldy||'0',
				old: {
					x:this.list.oldx||'0',
					y:this.list.oldy||'0'
				},
				fs:this.list.fs
			}
		},
		props: {
			list: {
				type: Object
			}
		},
		created:function(){
			//组件里面不能用onLoad，得用vue的created替代，效果一样。
			var point=this;
			if((point.old.x!=0||point.old.y!=0)&&point.zt=='look')
			{
				point.according=false;
			}
		},
		methods: {
			onChange: function(e) {
				//移动改变时
				this.old.x = e.detail.x
				this.old.y = e.detail.y
				// console.log(this.old.x+'||'+this.old.y)
			},
			remove:function(){
				//手指离开触摸屏
				this.end=true;
				this.dynamic=false;
			},
			mobile:function(){
				//固定签名
				if(this.old.x==0&&this.old.y==0)
				{
					uni.showToast({
						title: '请移动签名',
						icon: "none",
						duration: 1500,
						mask: true
					})
				}else{
					this.according=false;
					this.end=false;
					this.dynamic=true;
					this.rotate=false;
					// console.log(111111111111)
					if(this.fs!=1)
					uni.navigateTo({
						url: 'begin?oldx='+this.old.x+'&oldy='+this.old.y+'&photo='+this.photo+'&degree='+this.degree,
					});
				}
			},
			again:function(){
				//移动签名
				this.end=true;
				this.according=true;
				this.dynamic=false;
				this.rotate=true;
				this.x=this.old.x;
				this.y=this.old.y;
			},
			rotating:function(){
				//旋转签名
				console.log(this.degree)
				this.degree=parseInt(this.degree)+90;
			}
		},
		watch:{
			list:{
				handler(newval){
					console.log(JSON.stringify(newval));
				},
				immediate: true
			}
		}
	}
</script>

<style>
	.floating{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1001;
	}
	.confirm{
		position: absolute;
		top: 0;
		right: 0;
		background-color: #FF8F58;
		width: 30vw;
	}
	.confirm1{
		position: absolute;
		top: 0;
		right: 30vw;
		background-color: #FF8F58;
		width: 30vw;
	}
</style>
