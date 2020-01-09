<template>
	<view class="qiun-columns">
		<websocket></websocket>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<!-- <view class="qiun-title-dot-light">饼状图</view> -->
			<view class="data-picker">
				<view class="data-picker-one">
					<view class="data-picker-name">
						开始时间:
					</view>
					<view class="data-picker-value">
						<picker mode="date" :value="begin" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{begin}}</view>
						</picker>
					</view>
				</view>
				<view class="data-picker-one">
					<view class="data-picker-name">
						结束时间:
					</view>
					<view class="data-picker-value">
						<picker mode="date" :value="end" :start="startDate" :end="endDate" @change="bindDateChange1">
							<view class="uni-input">{{end}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<button class="cx-button" @click="drawing">查询</button>
		<view v-if="according" class="qiun-charts">
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	import {
		isJSON
	} from '@/js_sdk/u-charts/u-charts/checker.js';
	var _self;
	var canvaPie = null;

	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				begin: currentDate,
				end: currentDate,
				according: false
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
		},
		methods: {
			//判断是否显示查询
			drawing(){
				this.according=false;
				this.getServerData();
			},
			//日期控件赋值
			bindDateChange: function(e) {
				this.begin=this.$options.methods.changdata(e.target.value);
				// this.begin = e.target.value;
			},
			//日期控件赋值
			bindDateChange1: function(e) {
				this.end=this.$options.methods.changdata(e.target.value);
			},
			//日期控件
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
				// month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//日期控件
			getServerData() {
				let point=this;
				if(this.end<this.begin)
				{
					console.log(this.$options.methods.changdata(point.begin))
					uni.request({
						url: this.apiServer + '/basicdata/pie.php',
						method:'POST',
						dataType: 'json',
						header: {
								'Content-type': 'application/x-www-form-urlencoded', 
							},
						data: {
							begin:this.$options.methods.changdata(point.begin),
							end:this.$options.methods.changdata(point.end)
						},
						success: function(res) {
							console.log(res.data)
							if(res.data.length>0)
							{
								let Pie = {
									series: []
								};
								Pie.series = res.data;
								_self.textarea = JSON.stringify(Pie);
								_self.showPie("canvasPie", Pie);
								point.according=true;
							}else{
								uni.showModal({
								    title: '提示',
								    content: '请重新选择时间,该时间段不重叠任何一个项目',
								    success: function (res) {
								        if (res.confirm) {
								            // console.log('用户点击确定');
								        } else if (res.cancel) {
								            // console.log('用户点击取消');
								        }
								    }
								});
							}
						},
						fail: () => {
							_self.tips = "网络错误，小程序端请检查合法域名"
						},
					});
				}else{
					uni.showModal({
					    title: '提示',
					    content: '请重新选择时间,开始时间不能大于或等于结束时间',
					    success: function (res) {
					        if (res.confirm) {
					            // console.log('用户点击确定');
					        } else if (res.cancel) {
					            // console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			//uCharts控件
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							border: true,
							borderColor: '#FFFFFF',
							borderWidth: 3
						}
					},
				});
			},
			//uCharts控件
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						console.log(item.name + ':' + item.data);
						return item.name + ':' + item.data
					}
				});
				canvaPie.touchLegend(e, {
					animation: true
				});
			},
			//日期控件
			changeData() {
				if (isJSON(_self.textarea)) {
					let newdata = JSON.parse(_self.textarea);
					canvaPie.updateData({
						series: newdata.series,
						categories: newdata.categories
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../../static/images/alert-warning.png'
					})
				}
			},
			//将日期格式更改，如2019-05-27变为2019-5-27
			changdata(e){
				var value;
				if(e.substring(5,7)>9)
				{
					value = e;
				}else{
					value = e.substring(0,5) + e.substring(6,10);
				}
				return value;
			}
		},
		watch: {
			//监听vuex数据
			'$store.state.xmcx': {
				handler: function(val, oldVal) {
					console.log(val)
					// uni.navigateTo({
					// 	url:"../../home-page/home_page/home_page"
					// })
				},
				deep: true
			}
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
		margin-top: 8%;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.data-picker {
		display: flex;
		flex-direction: column;
		background-color: white;
		margin-top: 10%;
		height: 80px;
	}

	.data-picker-one {
		display: flex;
		flex-direction: row;
		border-bottom: #ddd solid 1px;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.data-picker-name {
		width: 30%;
		display: flex;
		justify-content: center;
	}

	.data-picker-value {
		width: 70%;
	}

	.uni-input {
		margin-left: 30px;
	}

	.cx-button {
		display: flex;
		justify-content: center;
		background-color: #007AFF;
		color: white;
		width: 30%;
		margin-top: 8%;
	}
</style>
