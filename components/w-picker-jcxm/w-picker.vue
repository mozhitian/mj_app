<template>
	<view class="w-picker">
		<view class="mask" :class="{'show':showPicker}" @tap="maskTap" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="w-picker-cnt" :class="{'show':showPicker}">
			<view class="w-picker-hd" @touchmove.stop.prevent catchtouchmove="true">
				<view class="w-picker-btn" @tap="pickerCancel">取消</view>
				<view class="w-picker-btn" :style="{'color':themeColor}" @tap="pickerConfirm">确定</view>
			</view>
			<view class="w-picker-view" v-if="mode=='region'">
				<picker-view :indicator-style="itemHeight" :value="pickVal" @change="bindChange">
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.provinces" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.citys" :key="index" :class="item.label=='路面检测'||item.label=='试件检测'?'':'greey'">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.areas" :key="index">{{item.label}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	// import provinces from './city-data/province.js';
	// import citys from './city-data/city.js';
	// import areas from './city-data/area.js';
	// import initPicker from "@/components/w-picker-jcxm/w-picker.js";
	import store from "../../store/index.js";
	import Bus from '../../bus.js';
	var provinces = [{
			"label": "市政工程"
		},
		{
			"label": "房建工程"
		}
	];
	var citys = [
		[
			{
				"label": "压实度"
			}
		],[
			{
				"label": "压实度"
			}
		]
	];
	var areas = [
		[
			
			[{
				"label": "压实度"
			},{
				"label": "上面层厚度"
			},{
				"label": "总厚度"
			},{
				"label": "芯样试验"
			},{
				"label": "弯沉"
			},{
				"label": "回弹模量"
			},{
				"label": "平整度"
			},{
				"label": "构造深度"
			},{
				"label": "摩擦系数"
			},{
				"label": "渗水系数"
			}]	
		]
	];
	export default {
		data() {
			return {
				result: [],
				data: {},
				checkArr: [],
				checkValue: [],
				pickVal: [],
				showPicker: false,
				resultStr: "",
				itemHeight: `height: ${uni.upx2px(88)}px;`,
				// provinces:'go'
				arr:[0,0,4]

			};
		},
		computed: {

		},
		props: {
			jclxselt:{
				type:String
			},
			mode: {
				type: String,
				default () {
					return "date"
				}
			},
			themeColor: {
				type: String,
				default () {
					return "#f00"
				}
			},
			startYear: {
				type: String,
				default () {
					return "1970"
				}
			},
			endYear: {
				type: String,
				default () {
					return new Date().getFullYear() + ''
				}
			},
			defaultVal: {
				type: Array,
				default () {
					return [0, 0, 0, 0, 0, 0, 0]
				}
			},
			step: {
				type: [String, Number],
				default: 1
			},
			current: {
				type: Boolean,
				default: false
			},
			selectList: {
				type: Array,
				default () {
					return [];
				}
			},
			//以下参数仅对mode==disabledBefore有效
			dayStep: {
				type: [String, Number],
				default: 7
			},
			startHour: {
				type: [String, Number],
				default: 8
			},
			endHour: {
				type: [String, Number],
				default: 20
			},
			minuteStep: {
				type: [String, Number],
				default: 10
			},
			afterStep: {
				type: [String, Number],
				default: 30
			}
		},
		watch: {
			mode() {
				this.initData();
			}
		},
		methods: {
			useCurrent() {
				let aToday = new Date();
				let tYear = aToday.getFullYear().toString();
				let tMonth = this.formatNum(aToday.getMonth() + 1).toString();
				let tDay = this.formatNum(aToday.getDate()).toString();
				let tHours = this.formatNum(aToday.getHours()).toString();
				let tMinutes = this.formatNum(aToday.getMinutes()).toString();
				let tSeconds = this.formatNum(aToday.getSeconds()).toString();
				if (this.current) {
					return [tYear, tMonth, tDay, tHours, (Math.floor(tMinutes / this.step) * this.step).toString(), tSeconds];
				} else {
					return this.defaultVal;
				}
			},
			formatNum(num) {
				return num < 10 ? '0' + num : num + '';
			},
			maskTap() {
				this.showPicker = false;
			},
			show() {
				this.showPicker = true;
			},
			hide() {
				this.showPicker = false;
			},
			pickerCancel() {
				this.$emit("cancel", {
					checkArr: this.checkArr,
					defaultVal: this.pickVal
				});
				this.showPicker = false;
			},
			pickerConfirm(e) {
				switch (this.mode) {
					case "range":
						let checkArr = this.checkArr;
						let fDateTime = new Date(checkArr[0], checkArr[1], checkArr[2]);
						let tDateTime = new Date(checkArr[3], checkArr[4], checkArr[5]);
						if (fDateTime > tDateTime) {
							uni.showModal({
								title: "提示",
								content: "结束日期不能小于开始时间",
								confirmColor: this.themeColor
							});
							return;
						}
						this.$emit("confirm", {
							checkArr: this.checkArr,
							from: checkArr[0] + "-" + checkArr[1] + "-" + checkArr[2],
							to: checkArr[3] + "-" + checkArr[4] + "-" + checkArr[5],
							defaultVal: this.pickVal,
							result: this.resultStr
						});
						break;
					case "limit":
						let aTime = new Date().getTime();
						let bTime = new Date(this.resultStr.replace(/-/g, '/')).getTime();
						if (aTime > bTime) {
							uni.showModal({
								title: "提示",
								content: "选择时间必须大于当前时间",
								confirmColor: this.themeColor
							});
							return;
						}
						this.$emit("confirm", {
							checkArr: this.checkArr,
							defaultVal: this.pickVal,
							result: this.resultStr
						});
						break;
					case "region":
						this.$emit("confirm", {
							checkArr: this.checkArr,
							checkValue: this.checkValue,
							defaultVal: this.pickVal,
							result: this.resultStr
						});
						break;
					default:
						this.$emit("confirm", {
							checkArr: this.checkArr,
							defaultVal: this.pickVal,
							result: this.resultStr
						});
						break;
				}
				this.showPicker = false;
			},
			bindChange(val) {
				
				let _this = this;
				let arr = val.detail.value;
				console.log(arr);
				let year = "",
					month = "",
					day = "",
					hour = "",
					minute = "",
					second = "",
					province, city, area;
				let checkArr = _this.checkArr;
				let days = [];
				let mode = _this.mode;
				console.log(_this.checkArr+' '+val.detail.value);
				switch (mode) {
					case "limit":
						let col1, col2;
						col1 = _this.data.date[arr[0]];

						//col2=_this.data.hours[arr[1]];
						if (col1.flag) {
							col2 = _this.data.hours[arr[1]];
							_this.data = initPicker.limit(_this.dayStep, _this.starHour, _this.endHour, _this.minuteStep, _this.afterStep);
							if (!col2.flag) {
								let minutes = initPicker.initLimitMinutes(_this.minuteStep);
								_this.data.minutes = minutes;
							} else {
								_this.data = initPicker.limit(_this.dayStep, _this.starHour, _this.endHour, _this.minuteStep, _this.afterStep);
							};
						} else {
							let hours = initPicker.initLimitHours(_this.startHour, _this.endHour);
							let minutes = initPicker.initLimitMinutes(_this.minuteStep);
							_this.data.hours = hours;
							_this.data.minutes = minutes;
						}
						let d = _this.data.date[arr[0]];
						let h = _this.data.hours[arr[1]];
						let m = _this.data.minutes[arr[2]];
						_this.checkArr = [d, h, m];
						_this.resultStr = `${d.value+' '+((h&&h.value)||'')+':'+((m&&m.value)||'')+":"+"00"}`;
						break;
					case "range":
					
					
						let fyear = _this.data.fyears[arr[0]];
						let fmonth = _this.data.fmonths[arr[1]];
						let fday = _this.data.fdays[arr[2]];
						let tyear = _this.data.tyears[arr[4]];
						let tmonth = _this.data.tmonths[arr[5]];
						let tday = _this.data.tdays[arr[6]];
						if (fyear != checkArr[0]) {
							days = initPicker.initRangeDays(fyear, fmonth);
							_this.data.fdays = days;
						};
						if (fmonth != checkArr[1]) {
							days = initPicker.initRangeDays(fyear, fmonth);
							_this.data.fdays = days;
						};
						if (tyear != checkArr[3]) {
							days = initPicker.initRangeDays(tyear, tmonth);
							_this.data.tdays = days;
						};
						if (tmonth != checkArr[4]) {
							days = initPicker.initRangeDays(tyear, tmonth);
							_this.data.tdays = days;
						};
						_this.checkArr = [fyear, fmonth, fday, tyear, tmonth, tday];
						_this.resultStr = `${fyear+'-'+fmonth+'-'+fday+'至'+tyear+'-'+tmonth+'-'+tday}`;
						break;
					case "date":
						year = _this.data.years[arr[0]];
						month = _this.data.months[arr[1]];
						day = _this.data.days[arr[2]];
						if (year != checkArr[0]) {
							days = initPicker.initDays(year, month);
							_this.data.days = days;
						};
						if (month != checkArr[1]) {
							days = initPicker.initDays(year, month);
							_this.data.days = days;
						};
						_this.checkArr = [year, month, day];
						_this.resultStr = `${year+'-'+month+'-'+day}`;
						break;
					case "yearMonth":
						year = _this.data.years[arr[0]];
						month = _this.data.months[arr[1]];
						_this.checkArr = [year, month];
						_this.resultStr = `${year+'-'+month}`;
						break;
					case "dateTime":
						year = _this.data.years[arr[0]];
						month = _this.data.months[arr[1]];
						day = _this.data.days[arr[2]];
						hour = _this.data.hours[arr[3]];
						minute = _this.data.minutes[arr[4]];
						second = _this.data.seconds[arr[5]];
						if (year != checkArr[0]) {
							days = initPicker.initDays(year, month);
							_this.data.days = days;
						};
						if (month != checkArr[1]) {
							days = initPicker.initDays(year, month);
							_this.data.days = days;
						};
						_this.checkArr = [year, month, day, hour, minute, second];
						_this.resultStr = `${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`;
						break;
					case "time":
						hour = _this.data.hours[arr[0]];
						minute = _this.data.minutes[arr[1]];
						second = _this.data.seconds[arr[2]];
						_this.checkArr = [hour, minute, second];
						_this.resultStr = `${hour+':'+minute+':'+second}`;
						break;
					case "region":
						province = _this.data.provinces[arr[0]].label;
						city = _this.data.citys[arr[1]].label;
						area = _this.data.areas[arr[2]].label;
						if (province != checkArr[0]) {
							_this.data.citys = citys[arr[0]];
							// _this.data.areas = areas[arr[0]][0];
							arr[1] = 0;
							arr[2] = 0;
							city = _this.data.citys[arr[1]].label;
							// area = _this.data.areas[arr[2]].label;
						};
						if (city != checkArr[1]) {
							uni.request({
								// url: this.apiServer + '/basicdata/components/testData.php',
								url: _this.apiServer+'/basicdata/jcxm.php',
								data: {
									jclx: province+'-'+city,
									flag: 'getJcxm',
									xmmk:''
								},
								method: 'POST',
								dataType: 'json',
								header: {
									'content-type': 'application/x-www-form-urlencoded', //POST头信息
								},
								success: (res) => {
									console.log(111);
									res = res.data;
									// var ob=JSON.parse(res.jcxm);
									console.log(typeof(res.jcxm[0]));
									for (var i = 0; i < res.jcxm.length; i++) {
										res.jcxm[i]=JSON.parse(res.jcxm[i]);
									}
									_this.data.areas = res.jcxm;
									console.log(333);
									arr[2] = 0;
									area = _this.data.areas[arr[2]].label;
									_this.checkArr = [province, city, area];
									_this.checkValue = [_this.data.provinces[arr[0]].value, _this.data.citys[arr[1]].value, _this.data.areas[arr[2]].value];
									_this.resultStr = province +'-'+ city +'-'+ area;
								}
							});
						};
						_this.checkArr = [province, city, area];
						_this.checkValue = [_this.data.provinces[arr[0]].value, _this.data.citys[arr[1]].value, _this.data.areas[arr[2]].value];
						_this.resultStr = province +'-'+ city +'-'+ area;
						break;
					case "selector":
						_this.checkArr = _this.data[arr[0]];
						_this.resultStr = _this.data[arr[0]].label;
						break;
				}
				_this.$nextTick(() => {
					_this.pickVal = arr;
				})
			},
			initData() {
				let _this = this;
				let data = {};
				let mode = _this.mode;
				let year, month, day, hour, minute, second, province, city, area;
				if (mode == "region") {
					data = {
						provinces: provinces,
						citys: citys[_this.defaultVal[0]],
						areas: areas[_this.defaultVal[0]][_this.defaultVal[1]]
					};
				} else if (mode == "selector") {
					data = _this.selectList;
				} else if (mode == "limit") {
					data = initPicker.limit(_this.dayStep, _this.starHour, _this.endHour, _this.minuteStep, _this.afterStep);
				} else if (mode == "range") {
					data = initPicker.range(_this.startYear, _this.endYear, _this.useCurrent(), _this.current);
				} else {
					data = initPicker.date(_this.startYear, _this.endYear, _this.mode, _this.step, _this.useCurrent(), _this.current);
				};
				_this.data = data;
				let dVal = (data.defaultVal && _this.current) ? data.defaultVal : _this.defaultVal;
				switch (mode) {
					case "limit":
						let col1, col2, col3;
						col1 = data.date[dVal[0]];
						col2 = data.hours[dVal[1]];
						col3 = data.minutes[dVal[2]];
						_this.checkArr = [col1, col2, col3];
						_this.resultStr = `${col1.value+' '+col2.value+':'+col3.value+":"+"00"}`;
						break;
					case "range":
						let fYear = data.fyears[dVal[0]];
						let fmonth = data.fmonths[dVal[1]];
						let fday = data.fdays[dVal[2]];
						let tYear = data.tyears[dVal[4]];
						let tmonth = data.tmonths[dVal[5]];
						let tday = data.tdays[dVal[6]];
						_this.checkArr = [fYear, fmonth, fday, tYear, tmonth, tday];
						_this.resultStr = `${fYear+'-'+fmonth+'-'+fday+'至'+tYear+'-'+tmonth+'-'+tday}`;
						break;
					case "date":
						year = data.years[dVal[0]];
						month = data.months[dVal[1]];
						day = data.days[dVal[2]];
						_this.checkArr = [year, month, day];
						_this.resultStr = `${year+'-'+month+'-'+day}`;
						break;
					case "yearMonth":
						year = data.years[dVal[0]];
						month = data.months[dVal[1]];
						_this.checkArr = [year, month];
						_this.resultStr = `${year+'-'+month}`;
						break;
					case "dateTime":
						year = data.years[dVal[0]];
						month = data.months[dVal[1]];
						day = data.days[dVal[2]];
						hour = data.hours[dVal[3]];
						minute = data.minutes[dVal[4]];
						second = data.seconds[dVal[5]];
						_this.resultStr = `${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`;
						_this.checkArr = [year, month, day, hour, minute];
						break;
					case "time":
						hour = data.hours[dVal[0]];
						minute = data.minutes[dVal[1]];
						second = data.seconds[dVal[2]];
						_this.checkArr = [hour, minute, second];
						_this.resultStr = `${hour+':'+minute+':'+second}`;
						break;
					case "region":
					console.log(_this.arr);
						province = data.provinces[_this.arr[0]];
						city = data.citys[_this.arr[1]];
						area = data.areas[_this.arr[2]];
						_this.checkArr = [province.label, city.label, area.label];
						_this.resultStr = province.label + '-' + city.label + '-' + area.label;
						break;
					case "selector":
						_this.checkArr = data[dVal[0]];
						_this.resultStr = data[dVal[0]].label;
						break;
				}
				_this.$nextTick(() => {
					if (data.defaultVal && _this.current) {
						_this.pickVal = data.defaultVal;
					} else {
						_this.pickVal = _this.defaultVal;
					}
				})
			}
		},
		created() {
			// uni.request({
			// 	// url: this.apiServer + '/basicdata/components/testData.php',
			// 	url: this.apiServer+'/basicdata/jcxm.php',
			// 	data: {
			// 		xmmk: this.$store.state.projectOf,
			// 		flag: 'getXmmk'
			// 	},
			// 	method: 'POST',
			// 	dataType: 'json',
			// 	header: {
			// 		'content-type': 'application/x-www-form-urlencoded', //POST头信息
			// 	},
			// 	success: (res) => {
			// 		console.log(111);
			// 		res = res.data;
			// 		console.log(res);
			// 		// for (var i = 0; i < res.jcxm.length; i++) {
			// 		// 	res.jcxm[i]=JSON.parse(res.jcxm[i]);
			// 		// }
			// 		// _this.data.areas = res.jcxm;
			// 		// console.log(333);
			// 		// for(var j=0;j<res.jcxm.length;j++){
			// 		// 	if(jcxm==res.jcxm[j].label){
			// 		// 		arr[2]=j;
			// 		// 		console.log(j);
			// 		// 	}
			// 		// }
			// 		// 
			// 		// array[2] = _this.data.areas[arr[2]].label;
			// 		// _this.checkArr = [array[0], array[1], array[2]];
			// 		// 
			// 		// _this.resultStr = array[0] +'-'+ array[1] +'-'+ array[2];
			// 		// _this.$emit("confirm", {
			// 		// 	checkArr: _this.checkArr,
			// 		// 	
			// 		// 	result: _this.resultStr
			// 		// });
			// 		// _this.arr=arr;
			// 		// _this.initData();
			// 	}
			// });
		},
		mounted() {
			var _this = this;
			console.log(22);
			Bus.$on("postJccs",function([msgf,msgt,msgs]){
				var jcxm=msgt;
				_this.jclx=msgf;
				console.log(_this.jclx);
				var array=(_this.jclx||'').split('-');
				var arr=[];
				arr[0]=_this.MyClass.findIndex(provinces,array[0]);
				console.log(arr);
				uni.request({
					// url: this.apiServer + '/basicdata/components/testData.php',
					url: _this.apiServer+'/basicdata/jcxm.php',
					data: {
						jclx: _this.jclx,
						flag: 'getJcxm',
						xmmk:msgs
					},
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //POST头信息
					},
					success: (res) => {
						console.log(111);
						res = res.data;
						console.log(res);
						for (var i = 0; i < res.jcxm.length; i++) {
							res.jcxm[i]=JSON.parse(res.jcxm[i]);
						}
						console.log(citys);
						citys[0]=_this.MyClass.toObj(res.szgc);
						citys[1]=_this.MyClass.toObj(res.fjgc);
						arr[1]=_this.MyClass.findIndexDeep(citys,array[1]);
						arr[2]=_this.MyClass.findIndex(res.jcxm,jcxm);
						array[2] = _this.data.areas[arr[2]].label;
						_this.checkArr = [array[0], array[1], array[2]];
						_this.resultStr = array[0] +'-'+ array[1] +'-'+ array[2];
						_this.$emit("confirm", {
							checkArr: _this.checkArr,
							result: _this.resultStr,
							default:arr
						});
						_this.arr=arr;
						_this.initData();
					}
				});
			});
			_this.initData();
			
		},
		watch:{
		
		}
	}
</script>

<style lang="scss">
	.w-picker {
		position: relative;
		z-index: 888;

		.mask {
			position: fixed;
			z-index: 1000;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.6);
			visibility: hidden;
			opacity: 0;
			transition: all 0.3s ease;
		}

		.mask.show {
			visibility: visible;
			opacity: 1;
		}

		.w-picker-cnt {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			transition: all 0.3s ease;
			transform: translateY(100%);
			z-index: 3000;
		}

		.w-picker-cnt.show {
			transform: translateY(0);
		}

		.w-picker-hd {
			display: flex;
			align-items: center;
			padding: 0 30upx;
			height: 88upx;
			background-color: #fff;
			position: relative;
			text-align: center;
			font-size: 32upx;
			justify-content: space-between;

			.w-picker-btn {
				font-size: 30upx;
			}
		}

		.w-picker-hd:after {
			content: ' ';
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-bottom: 1px solid #e5e5e5;
			color: #e5e5e5;
			transform-origin: 0 100%;
			transform: scaleY(0.5);
		}

		.w-picker-item {
			text-align: center;
			width: 100%;
			height: 88upx;
			line-height: 88upx;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 30upx;
		}

		.w-picker-view {
			width: 100%;
			height: 476upx;
			overflow: hidden;
			background-color: rgba(255, 255, 255, 1);
			z-index: 666;
		}

		picker-view {
			height: 100%;
		}
	}
	.greey{
		background-color: red
	}
</style>
