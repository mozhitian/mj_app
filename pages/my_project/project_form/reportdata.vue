<template>
	<view class="content">
		<websocket></websocket>
		<movable-area scale-area :style="{height:height+'px'}">
			<movable-view direction="all" @scale="onScale" scale scale-min="0.5" scale-max="4" :scale-value="scale" :style="{height:height*0.5+'px'}">
				<image :src="pathArr[page]" style="width: 100%;height: 100%;"></image>
			</movable-view>
		</movable-area>
		<view class="pull-left" :style="{height:height+'px'}" @click="jian">
			
		</view>
		<view class="pull-right" :style="{height:height+'px'}" @click="add">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scale: 2,
				old: {
					x: 0,
					y: 0,
					scale: 2
				},
				height:600,
				pathArr:[],
				page:0
			}
		},
		components: {
			
		},
		methods: {
			onScale: function(e) {
				this.old.scale = e.detail.scale
			},
			jian(){
				console.log('jian');
				if(this.page!=0){
					this.page--;
				}
			},
			add(){
				console.log('add');
				if(this.page!=this.pathArr.length-1){
					this.page++;
				}
			}
		},
		onLoad: function(option) {
			console.log(option.id);
			const res = uni.getSystemInfoSync();
			console.log(res.windowHeight);
			this.height = res.windowHeight;
			uni.request({
				url: this.apiServer + '/basicdata/repPic.php',
				data: {
					id: option.id
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					console.log(res.data);
					res=res.data;
					var arr=(res.jcbg||'').split("||");
					arr.splice(0,1);
					for(var i=0;i<arr.length;i++){
						var path=this.apiServer+'/uploads/'+arr[i];
						console.log(path);
						this.pathArr.push(path);
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
	image {
		width: 380px;
		height: 550px;
	}
	.content{
		width: 100%;
		height: 100%;
	}

	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50%;
		/* background-color: #007AFF; */
		/* color: #fff; */
	}

	movable-area {
		width: 100%;
		background-color: #D8D8D8;
		overflow: hidden;
	}

	.max {
		width: 500upx;
		height: 500upx;
	}
	.pull-left{
		position: fixed;
		top: 0px;
		left: 0px;
		width: 10%;
		/* background-color: #007AFF; */
		z-index: 10;
	}
	.pull-right{
		position: fixed;
		top: 0px;
		right: 0px;
		width: 10%;
		/* background-color: #007AFF; */
		z-index: 10;
	}
</style>
