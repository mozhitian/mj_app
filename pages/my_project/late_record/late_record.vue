<template>
	<view>
		<view class="select">
        <view class="uni-list ">
            <view class="uni-list-cell">
                <view class=" uni-title uni-common-pl">
                    时间选择:
                </view>
                <view class="uni-list-cell-db">
                    <picker @change="bindPickerChange" :value="index" :range="array">
                        <view class="uni-input">{{array[index]}}</view>
                    </picker>
                </view>
            </view>
        </view>
		</view>
		
		<view>
		<mylaterecord v-for="(item,index) in actlist" :key="index" :list="item" :username="username"></mylaterecord>
		</view>
	</view>
</template>

<script>
	import mylaterecord from "../../../components/mylate_record.vue";
	export default {
		data() {
			return {
				actlist:{},
				username:'',
				array: ['23:30:00', '23:35:00', '23:45:00', '23:50:00'],
				index: 0,
				lastTime: '05:30:00',
				startTime:'23:30:00'
			}
		},
		components:{
			mylaterecord
		},
		methods: {
			bindPickerChange: function(e) {
            this.index = e.target.value;
			this.startTime = this.array[e.target.value];
			// console.log(this.array[e.target.value]);
			// console.log(this.startTime);
			// console.log(this.username);
			// console.log(this.lastTime);
			uni.request({
				url: this.api + '/basicdata/late_record.php',
				data: {
					flag:'laterecord',
					username:this.username,
					startTime:this.startTime,
					lastTime:this.lastTime
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
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
        },
		onLoad: function(option){
			this.username=option.username;
			// uni.request({
			// 	url: this.api + '/basicdata/late_record.php',
			// 	data: {
			// 		flag:'laterecord',
			// 		username:this.username,
			// 	},
			// 	method: 'POST',
			// 	dataType: 'json',
			// 	header: {
			// 		'content-type': 'application/x-www-form-urlencoded', //POST头信息
			// 	},
			// 	success: (res) => {
			// 		res=res.data;
			// 		if(res[res.length-1].result=='success'){
			// 			res.splice(res.length-1,1);
			// 			this.actlist=res;
			// 		}else{
			// 			uni.showToast({
			// 				icon: 'error',
			// 				position: 'bottom',
			// 				title: '无数据'
			// 			});
			// 		}
			// 	},
			// 	fail: (error) => {
			// 		console.log(error);
			// 	}
			// });
		},
	}
</script>

<style>
	.select{
		padding-top: 10px;
	}
</style>
