<template name="pick">
	<view>
		<!-- <view class="uni-title uni-common-pl">地区选择器</view> -->
		<!-- <view class="uni-list" v-if="type=='picker'">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view> -->
				<view class="uni-list-cell-db" v-if="type=='picker'" :style="{width: width+'px'}">
					<picker @change="bindPickerChange" :value="index" :range="array" :disabled="disabled">
						<view class="uni-input" style="margin-left: 12%;height: 35px ;display: flex;align-items: center" :style="{fontSize:size+'px'}">{{array[index]}}</view>
					</picker>
				</view>
			<!-- </view>
		</view> -->

		<!-- <view class="uni-title uni-common-pl">时间选择器</view> -->
<!-- 		<view class="uni-list" v-if="type=='localTime'">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view> -->
				<view class="uni-list-cell-db" v-if="type=='date'">
					<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
						<view class="uni-input">{{time}}</view>
					</picker>
				</view>
<!-- 			</view>
		</view> -->

		<!-- <view class="uni-title uni-common-pl">日期选择器</view> -->
<!-- 		<view class="uni-list" v-if="type=='date'">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view> -->
				<view class="uni-list-cell-db" v-if="type=='date'">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
<!-- 			</view>
		</view> -->
	</view>
</template>

<script>
	// export default {
	// 	name: "ddd",
	// 	data() {
	// 		return {
	// 			index:0,
	// 			array:['www','sss','ddd']
	// 		};
	// 	}
	// }
	import Bus from "../bus.js"
	export default {
		name: "pick",
		data() {
			
			const currentDate = this.getDate({
				format: true
			})
			return {
				title: 'picker',
				date: currentDate,
				time: '12:01',
				width:0,
				index:0,
				
			}
		},
		props:{
			type:{
				type:String,
				default:'picker'
			},
			array:{
				type:Array,
				default:[0,0]
			},
			num:{
				type:Array,
				default:[0,0]
			},
			disabled:{
				type:Boolean,
				default:false
			},
			size:{
				type:Number,
				default:14
			}
		},
		created() {
			const res = uni.getSystemInfoSync();
			console.log(res.windowHeight+' '+res.windowWidth);
			this.width=res.windowWidth*0.6;
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value;
				Bus.$emit('change', [this.array[this.index], this.num[1]]);
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
		watch:{
			
			num: {
				handler(old,newval) {
					console.log(old+'='+newval);
					if(old[0]!=undefined){
						
						this.index=old[0];
						// Bus.$emit('change', [this.array[this.index], old[1]]);
					}else{
						console.log(423);
						// Bus.$emit('change', [this.array[0], this.num[1]]);
					}
					
				},
				immediate: true
			},
			array: {
				handler(old,newval) {
					// console.log(old[this.index]+'='+newval+'='+this.array[this.index]+'='+this.index+'='+this.num);
					// console.log(old[this.index]+'?'+this.num[1]);
					var _this=this;
					setTimeout(function() {
						Bus.$emit('change', [old[_this.index], _this.num[1]]);
					}, 500);
				},
				immediate: true
			}
		}
	}
</script>

<style scoped>
	@import url("../common/uni.css");

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 352px;
	}

	.text {
		display: flex;
		flex-direction: row;
		width: 95%;
		height: 80upx;
		margin-left: 3%;
		align-items: center;
		border-bottom: 1px solid #B2B2B2;
	}

	.label {
		font-size: 14px;
		width: 30%;
		text-align: right;
	}

	.input {
		margin-left: 8%;
		text-align: left;
		font-size: 14px;
		width: 60%;
	}

	.select {
		margin-left: %;
	}

	.btn {
		margin-top: 75px;

	}

	.button {
		width: 90%;
		margin-left: 5%;
		height: 35px;
		background-color: #007AFF;
		color: #FFFFFF;
		font-family: '宋体';
		border-radius: 3px;
		font-size: 16px;

	}

	/*    .hidden{
		visibility: hidden;
	} */
	.hidden {
		visibility: hidden;
		width: 0px;
		height: 0px;
	}
</style>
