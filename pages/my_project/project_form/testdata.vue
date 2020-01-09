<template>
	<view>
		<websocket></websocket>
		<!-- 基本字段 -->
		<field v-for="(item,index) in jbcs" :disabled="disabledt" :key="index" :index="index" :width="width.jbcs"
		 :list="item" @inc="getjbFormContent" @openPopup="openPopop"></field>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 30px;">
			<button @click="openPopupAf" style="width: 40%;margin: 0px 20px 0px 20px;font-size: 14px;">检测试验数据</button>
			<button @click="openPopupAt" style="width: 40%;margin: 0px 20px 0px 20px;font-size: 14px;">点击查看试验结论</button>
		</view>
		<!-- 试验依据多选组件 -->
		<mulcheck :labelList="syyjObj" :values="syyjSectArr" :num="num" ref="mulcheck" @postVal="getVal"></mulcheck>
		<!-- 重复字段 -->
		<uni-popup ref="popupAf" type="bottom">
			<view :style="{height:height*0.5+'px'}" style="width: 100%;">
				<view style="width: 100%;height: 100%;">
					<view class="text" v-for="n in 100" :key="n" v-if="n==current" style="height: 70%;overflow: auto;">
						<field v-for="(item,index) in cfcss" :disabled="disabledt" :key="index" :index="index" :width="width.cfcs" :list="item"
						 @inc="getcfFormContent" v-if="index>=current*10&&index<=fix"></field>
					</view>
					<uni-pagination :total="total" @change="getCurrent" style="width: 100%;"></uni-pagination>
					<view style="display: flex;flex-direction: row;justify-content: center;">
						<button @click="closePopup" style="width: 30%;line-height: 40px;margin: 0px 20px 0px 20px;font-size: 14px;">关闭</button>
						<button @click="add" :disabled="disabledt" style="width: 30%;line-height: 40px;margin: 0px 20px 0px 20px;font-size: 14px;">增加记录</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 试验结论 -->
		<uni-popup ref="popupAt" type="bottom">
			<view :style="{height:height*0.8+'px'}" style="width: 100%;">
				<view class="text" v-for="n in 100" :key="n" v-if="n==current" style="height: 70%;overflow: auto;">
					<field v-for="(item,index) in zdcs" :disabled="disabledt" :key="index" :index="index" :width="width.zdcs" :list="item"
					 @inc="getzdFormContent"></field>
				</view>
				<!-- <uni-pagination :total="totalt" @change="getCurrent"></uni-pagination> -->
				<view style="display: flex;flex-direction: row;justify-content: center;">
					<button @click="closePopup" style="width: 30%;line-height: 40px;margin: 0px 20px 0px 20px;font-size: 14px;">关闭</button>
				</view>
			</view>
		</uni-popup>
		<view class="form_submit">
			<button class="submit" :disabled="disabledt" hover-class="submit_cli" @click="delay">保存</button>
		</view>
		<back-to-date @backToDate="backToDate"></back-to-date>
	</view>
</template>

<script>
	import uniPagination from "@/components/uni-pagination/uni-pagination.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import mulcheck from "@/components/mulcheck.vue";
	import field from "@/components/field.vue";
	// import store from "../../../store/index.js";
	import backToDate from "../../../components/backToDate.vue"
	
	export default {
		data() {
			return {
				total: 10, //重复字段的页码,默认为10为1页
				totalt: 10,
				current: 0, //默认第一页
				jbcs: [], //试验基本字段
				cfcss: [], //试验重复字段总
				zdcs: [], //根据计算规则字段计算的字段		
				gdcfcs: [{
						"title": "里程桩号及位置",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "路表温度",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "加载读数（1/100mm）左轮",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "加载读数（1/100mm）右轮",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "卸载读数（1/100mm）左轮",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "卸载读数（1/100mm）右轮",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "左沉值（1车道）（1/100mm）修正前",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "左沉值（1车道）（1/100mm）修正后",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "右沉值（2车道）（1/100mm）修正前",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "右沉值（2车道）（1/100mm）修正后",
						"content": "",
						"placeholder": ""
					}
				],
				width: {
					jbcs: 35,
					cfcs: 50,
					zdcs: 40
				},
				dataAll: '',
				disabled: false, //判断试验单数据填写是否完成
				disabledt: false, //判断操作按钮是否启用以及传递给filed自组件是否启用填写
				state: '', //委托单所处状态
				id: '', //委托单id
				height: '', //设备高度
				syyj: [], //检测类型所有试验评定依据
				syyjSect: '', //委托单试验评定依据
				syyjtSect: '', //修改的试验依据
				syyjSectArr:[],
				syyjtSectArr:[],
				syyjObj: [], //试验依据对象组
				css: {
					popup: 'transparent'
				}, //传递给uniPopup的背景颜色
				num: 0
			}
		},
		components: {
			uniPagination,
			uniPopup,
			field,
			mulcheck,
			backToDate
		},
		methods: {
			backToDate(){
				uni.navigateTo({
					url:"../../dataSelect/uni-calendar?state=2&sjc="+this.$store.state.sjc
				})
			},
			getVal([val,zt]){
				if(zt==0){
					this.syyjSect=val
				}else{
					this.syyjtSect=val
				}
			},
			getCurrent(a) {
				console.log(a);
				this.current = a.current - 1;
				console.log(this.current);
			},
			openPopop(e) {
				this.$refs.mulcheck.openPopup(e);
			},
			openPopupAf() {
				this.$refs.popupAf.open();
			},
			openPopupAt() {
				this.$refs.popupAt.open()
			},
			closePopup() {
				// this.$refs.popup.close();
				this.$refs.popupAf.close();
				this.$refs.popupAt.close();
			},
			getjbFormContent([data, i]) {
				if (this.jbcs[i]['contentt'] != null && this.jbcs[i]['contentt'] != undefined) {
					this.jbcs[i].contentt = data;
				} else {
					this.jbcs[i].content = data;
				}
				console.log(JSON.stringify(this.jbcs));
			},
			getcfFormContent([data, i]) {
				if (this.cfcss[i]['contentt'] != null || this.cfcss[i]['contentt'] != undefined) {
					this.cfcss[i].contentt = data;
				} else {
					this.cfcss[i].content = data;
				}
				console.log(this.cfcss);
			},
			getzdFormContent([data, i]) {
				if (this.zdcs[i]['contentt'] != null || this.zdcs[i]['contentt'] != undefined) {
					this.zdcs[i].contentt = data;
				} else {
					this.zdcs[i].content = data;
				}
				console.log(this.zdcs);
			},
			add() {
				this.total += 10;
				var gdcfcs = [{
						"title": "里程桩号及位置",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "路表温度",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "加载读数（1/100mm）左轮",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "加载读数（1/100mm）右轮",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "卸载读数（1/100mm）左轮",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "卸载读数（1/100mm）右轮",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "左沉值（1车道）（1/100mm）修正前",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "左沉值（1车道）（1/100mm）修正后",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "右沉值（2车道）（1/100mm）修正前",
						"content": "",
						"placeholder": ""
					},
					{
						"title": "右沉值（2车道）（1/100mm）修正后",
						"content": "",
						"placeholder": ""
					}
				];
				this.cfcss = this.cfcss.concat(gdcfcs);
			},
			//点击保存时是先将this.dataAll获取到后再获取到所填的内容，所以这个方法用于延迟submitValue函数，这样就可以先获取好所填的内容，再执行submitValue()
			delay() {
				var this_ = this;
				setTimeout(function() {
					this_.submitValue();
				}, 1000);
			},
			submitValue() {
				// if (this.setTimeout == true) {
				this.dataAll = '';
				for (var i = 0; i < this.jbcs.length; i++) {
					if (this.jbcs[i]['contentt'] != null && this.jbcs[i]['contentt'] != undefined) {
						if (i == 4) {
							this.dataAll += this.syyjtSect + '|';
						} else {
							this.dataAll += this.jbcs[i].contentt + '|';
						}

						console.log(this.jbcs[i].contentt);
					} else {
						if (i == 4) {
							this.dataAll += this.syyjSect + '|';
						} else {
							this.dataAll += this.jbcs[i].content + '|';
						}

						console.log(this.jbcs[i].contentt);
					}

				}
				this.dataAll += '&&';
				console.log(this.cfcss.length);
				for (var i = 0; i < this.cfcss.length; i++) {
					if (this.cfcss[i]['contentt'] != null || this.cfcss[i]['contentt'] != undefined) {
						this.dataAll += this.cfcss[i].contentt + '|'
					} else {
						this.dataAll += this.cfcss[i].content + '|'
					}
				}
				console.log(this.dataAll);
				this.dataAll += '&&';
				for (var i = 0; i < this.zdcs.length; i++) {
					if (this.zdcs[i]['contentt'] != null || this.zdcs[i]['contentt'] != undefined) {
						this.dataAll += this.zdcs[i].contentt + '|'
					} else {
						this.dataAll += this.zdcs[i].content + '|'
					}
				}
				// console.log(this.dataAll);
				if (this.dataAll.indexOf(null) > -1 || this.dataAll.indexOf(undefined) > -1 || this.dataAll.indexOf('|//') > -1 ||
					this.dataAll.indexOf('||') > -1 || this.dataAll.indexOf('&&|') > -1 || this.dataAll.substr(0, 1) == '|') {
					// console.log(this.dataAll);
					uni.showToast({
						icon: 'none',
						title: '请将信息填写完整'
					})
				} else {
					this.state = this.$store.state.state; //this.$store.state.state变量用于存储委托单状态
					if (this.disabled == true) {

						switch (this.state) {
							case 'a3&g':
								this.state = 'a3&b'

								break;
							case 'a3&r':
								this.state = 'a3&b'

								break;
							case 'a5&g':
								this.state = 'a5&b'

								break;
							default:
								break;
						}
						this.dataAll += '^~^' + this.state;
					}
					console.log(this.dataAll);
					uni.request({
						// url: this.apiServer + '/basicdata/components/testData.php',
						url: this.apiServer + '/basicdata/components/testData.php',
						data: {
							flag: 'updateTestDate',
							id: this.id,
							content: this.dataAll,
							jclx: this.$store.state.jclx
						},
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded', //POST头信息
						},
						success: (res) => {
							res = res.data;
							if (res.result == "success") {
								// console.log(11);
								uni.showToast({
									icon: 'none',
									title: '保存成功'
								})
							}
							console.log(res);

						}
					});
				}
			}

		},
		onLoad: function() {
			this.id = this.$store.state.id; //this.$store.state.id变量用于存储委托单id
			this.disabledt = this.$store.state.disabledt; //this.$store.state.disabledt变量用于判断按钮是否禁用，由上一个页面设置的值
			const res = uni.getSystemInfoSync();
			console.log(res.windowHeight);
			this.height = res.windowHeight;
			// this.$store.state.jclx='市政工程-路面检测';
			uni.request({
				// url: this.apiServer + '/basicdata/components/testData.php',
				url: this.apiServer + '/basicdata/components/testData.php',
				data: {
					flag: 'getTestDate',
					id: this.id,
					jclx: this.$store.state.jclx
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					res = res.data;
					console.log(res);
					console.log(res.sygcjl + ' ' + res.syms + ' ' + res.syzrr + ' ' + res.sypdyj);
					this.syyj = (res.sypdyj || '').split(';');
					for (var u = 0; u < this.syyj.length; u++) {
						var obj = {
							"content": this.syyj[u],
							"checked":false
						};
						console.log(obj);
						this.syyjObj.push(obj);
					}
					// console.log(JSON.stringify(this.syyjObj) );
					if (res.sygcjl != '' && res.sygcjl != null && res.sygcjl != undefined && res.syms != '' && res.syms != null &&
						res.syms != undefined && res.syzrr != '' && res.syzrr != null && res.syzrr != undefined) {
						this.disabled = true;
					}
					for (var i = 0; i < res.jbcs.length; i++) {
						var obj = JSON.parse(res.jbcs[i]);
						this.jbcs.push(obj);
					}
					for (var j = 0; j < res.cfcs.length; j++) {
						var obj = JSON.parse(res.cfcs[j]);
						this.cfcss.push(obj);
					}
					for (var m = 0; m < res.zdcs.length; m++) {
						var obj = JSON.parse(res.zdcs[m]);
						this.zdcs.push(obj);
					}
					var content = res.synr;
					var array = (content || '').split('&&');
					console.log(array);
					var arr = array[1].split('|');
					this.total = arr.length - 1;
					var c = this.total / 10 - 1;
					for (var p = 0; p < c; p++) {
						var gdcfcs = [{
								"title": "里程桩号及位置",
								"content": "",
								"placeholder": ""
							},
							{
								"title": "路表温度",
								"content": "",
								"placeholder": ""
							},
							{
								"title": "加载读数（1/100mm）左轮",
								"content": "",
								"placeholder": ""
							},
							{
								"title": "加载读数（1/100mm）右轮",
								"content": "",
								"placeholder": ""
							},
							{
								"title": "卸载读数（1/100mm）左轮",
								"content": "",
								"placeholder": ""
							},
							{
								"title": "卸载读数（1/100mm）右轮",
								"content": "",
								"placeholder": ""
							},
							{
								"title": "左沉值（1车道）（1/100mm）修正前",
								"content": "",
								"placeholder": ""
							},
							{
								"title": "左沉值（1车道）（1/100mm）修正后",
								"content": "",
								"placeholder": ""
							},
							{
								"title": "右沉值（2车道）（1/100mm）修正前",
								"content": "",
								"placeholder": ""
							},
							{
								"title": "右沉值（2车道）（1/100mm）修正后",
								"content": "",
								"placeholder": ""
							}
						];
						this.cfcss = this.cfcss.concat(gdcfcs);
					}
					console.log(this.cfcss.length);
					for (var n = 0; n < array.length; n++) {
						var arr = array[n].split('|');
						for (var l = 0; l < arr.length - 1; l++) {
							if (n == 0) {
								this.jbcs[l].content = arr[l];
								if (l == 4) {
									console.log(this.jbcs[l].content);
									this.syyjSect=this.jbcs[l].content;
									this.syyjSectArr = (this.jbcs[l].content||' ').split(";");
								}

								if (arr[l].indexOf('^^') > -1) {
									if (l == 4) {
										this.syyjSect = this.syyjSect.replace("^^", "");
										this.syyjSectArr = (this.syyjSect ||' ').split(";");
										this.syyjtSectArr = this.syyjSectArr;
										console.log(this.syyjtSectArr);
										this.syyjtSect = this.syyjSect;
										this.num=1;
									}
									this.jbcs[l]['disableds'] = true;
									this.jbcs[l]['contentt'] = '';
									this.jbcs[l]['content'] = arr[l].replace("^^", "")
								}
							} else if (n == 1) {
								this.cfcss[l].content = arr[l];
								if (arr[l].indexOf('^^') > -1) {
									this.cfcss[l]['disableds'] = true;
									this.cfcss[l]['contentt'] = '';
									this.cfcss[l]['content'] = arr[l].replace("^^", "")
								}
							} else {
								this.zdcs[l].content = arr[l];
								// if(arr[l].indexOf('^^')>-1){
								// 	this.zdcs[l]['disableds'] = true;
								// 	this.zdcs[l]['contentt'] = '';
								// 	this.zdcs[l]['content']=arr[l].replace("^^","")
								// }
							}
						}
					}

				},
				fail: (error) => {
					console.log(error);
				}
			});
		},
		computed: {
			fix: function() {
				return this.current * 10 + 9;
			}

		},
		watch: {
			
		}
	}
</script>
<style lang="scss">
	// @import url("../../../common/uni.css");

	.uni-popup {
		&__wrapper {
			position: absolute;
			z-index: 999;
			box-sizing: border-box;
			background-color: #FFFFFF
		}
	}

	.form_submit {
		width: 80%;
		margin: 35px 10% 35px 10%;
	}

	.submit {
		background-color: #007AFF;
		color: #FFFFFF;
	}

	.submit_cli {
		background-color: #F1F1F1;
		color: #FFFFFF;
	}
</style>
