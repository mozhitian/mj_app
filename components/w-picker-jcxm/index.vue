<template>
	<view>
		<view class="[tab,input]" v-if="resultInfo==''" :class="[{'active':index==tabIndex}]" @tap="toggleTab(item,index)"
		 v-for="(item,index) in tabList" :key="index" :disabled="'true'" style="width: 150%;margin-left: 30%;color: #999;">{{item.name}}</view>
		<input :class="['input',type]" type="text" v-model="resultInfo" v-if="resultInfo!=''" :disabled="'true'" @tap="changeTab" style="margin-left: 20%;"></input>
		<w-picker mode="region" :defaultVal="defaultVal" @confirm="onConfirm" ref="region" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker-jcxm/w-picker.vue";
	import Bus from '../../bus.js';
	import store from '../../store/index.js';
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				title: 'Hello',
				mode: "range",
				defaultVal: [0, 0, 0, 0, 0, 0, 0],
				tabList: [{
					mode: "region",
					name: "请选择检测项目"
				}],
				resultInfo: '',
				jclx: ''
			}
		},
		props: {
			disabled: {
				type: Boolean
			},
			disabledt: {
				type: Boolean
			},
			type:{
				type:String
			}
		},
		computed: {

		},
		mounted() {

		},
		methods: {
			toggleTab(item, index) {
				if (!this.disabled && !this.disabledt) {
					this.tabIndex = index;
					this.mode = item.mode;
					this.defaultVal = item.value;
					this.$refs[item.mode].show();
				}

			},
			changeTab() {
				if (!this.disabled && !this.disabledt) {
					this.$refs['region'].show();
				}
			},
			onConfirm(val) {
				console.log(val+' '+val.default);
				this.defaultVal=val.default;
				
				//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
				// switch(this.mode){
				// 	case "date":
				// 		break;
				// }
				

				this.resultInfo = val.result;
				
				Bus.$emit('change', [this.resultInfo, 0]);
				uni.request({
					// url: this.apiServer + '/basicdata/components/testData.php',
					url: this.apiServer + '/basicdata/jcxm.php',
					data: {
						jcxm: val.checkArr[2],
						flag: 'getJcff'
					},
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //POST头信息
					},
					success: (res) => {
						console.log(111);
						res = res.data;
						console.log(res.jcff);
						this.$emit('postJcff', res.jcff);
					}
				});
			}
		},
		watch:{
			type: {
				handler(newval,oldval) {
					console.log(newval+' '+oldval);
					if(newval=='date'){
						this.$store.state.blo='block'
					}
				},
				immediate: true
			},
		}
	}
</script>

<style scoped>
	.content {
		text-align: center;
		height: 400upx;
	}

	.tab {
		padding: 20upx 0;
		font-size: 32upx;
	}

	.tab.active {
		color: #f00;
	}

	.result {
		margin-top: 200upx;
		font-size: 32upx;
	}
    
	.input {
		width: 150%;
		margin-left: 8%;
		text-align: left;
		font-size: 14px;
	}
	.date{
		position: absolute;
		top: 2%;
		left: 30%;
		width: 60%;
	}
</style>
