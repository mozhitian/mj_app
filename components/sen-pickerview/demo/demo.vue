<template>
	<view>
		<view class="set">
			<!-- <button type="primary" >选择日期</button> -->
			<input type="text" class="input" @click="name" v-model="inputValue" :disabled="'true'" />
		</view>


		<!-- 放入页面调用 -->
		<sen-set-picker ref="setpicker" :shixian="shixian" @quxiaoButton="quxiaobutton" @quedingButton="quedingbutton"></sen-set-picker>

	</view>
</template>

<script>
	// 引入组件

	import Bus from '../../../bus.js'
	import senSetPicker from '../picker-view-set.vue'
	export default {
		components: {
			senSetPicker
		},
		props: {
			wtrq: {
				type: String
			},
			index: {
				type: Number
			},
			disabled: {
				type: Boolean
			},
			disabledt: {
				type: Boolean
			}
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				inputValue: this.wtrq || currentDate,
				shixian: false
			}
		},
		// mounted() {
		// 	Bus.$emit('change', [this.inputValue, this.index]);
		// },
		methods: {
			name: function() {
				console.log(this.wtrq);
				// if (this.wtrq == '' || this.wtrq == null || this.wtrq == undefined) {
				// 	const currentDate = this.getDate({
				// 		format: true
				// 	});
				// 	console.log(currentDate);
				// 	this.inputValue=currentDate;
				// }
				if ((this.disabled || this.disabledt) != true) {
					this.$refs.setpicker.confirm(this.inputValue);
					this.shixian = true;
				}
				
			},
			quxiaobutton: function() {
				this.shixian = false;
			},
			quedingbutton: function(bangdingyear, bangdingmonth, bangdingday) {
				this.shixian = false;
				if (bangdingmonth < 10) {
					bangdingmonth = '0' + bangdingmonth;
				}
				this.inputValue = bangdingyear + "-" + bangdingmonth + "-" + bangdingday;
				Bus.$emit('change', [this.inputValue, this.index]);
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
				} else if (type === 'now') {
					year = year;
				}

				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			}
		},
		watch: {
			wtrq: function() {
				this.inputValue = this.wtrq;
			}
		}
	}
</script>

<style scoped>
	.set {
		width: 100%;
	}

	.set button {
		width: 50%;
		float: right;
		line-height: 60upx;
	}

	.zhi {
		width: 50%;
		float: left;
		line-height: 60upx;
	}

	.input {
		margin-left: 20%;
		text-align: left;
		font-size: 14px;
		width: 65%;
	}
</style>
