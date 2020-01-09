<template name="changeTestDate">
	<view>
		<uni-popup ref="popupAff" type="center">
			<view style="background-color: #FFFFFF;">
				<view style="display: flex;flex-direction: row;justify-content: center;padding: 30px 10px 30px 10px;">
					<button @click="openPopupAf" style="padding: 5px 10px 5px 10px;margin: 0px 20px 0px 20px;font-size: 12px;background-color: #007AFF;color: #FFFFFF;">基本参数</button>
					<button @click="openPopupAt" style="padding: 5px 10px 5px 10px;margin: 0px 20px 0px 20px;font-size: 12px;background-color: #007AFF;color: #FFFFFF;">重复参数</button>
				</view>
				<view style="display: flex;flex-direction: row;justify-content: center;">
					<button @click="submitValue" style="width: 30%;line-height: 40px;margin: 0px 20px 10px 20px;font-size: 14px;">保存</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupAf" type="center">
			<view style="background-color: #FFFFFF;">
				<checkbox-group @change="checkboxChangef">
					<label v-for="(item,index) in jbcs" :key="index">
						<view>
							<checkbox :value="index" :checked="item.checked" style="margin:4% 0px 0px 5%;" />
						</view>
						<field :index="index" :width="width.jbcs" :syyj="syyjSect" :css="css" :list="item"></field>
					</label>
				</checkbox-group>
				<view style="display: flex;flex-direction: row;justify-content: center;">
					<button @click="closePopup" style="width: 30%;line-height: 40px;margin: 20px 20px 0px 20px;font-size: 14px;">关闭</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupAt" type="center">
			<!-- <movable-area :style="{height:height+'px',width:wid+'px'}" style="background-color: #FFFFFF;">
				<movable-view :x="x" :y="y" direction="all" style="width: 100%;height: 75%;"> -->
			<view style="background-color: #FFFFFF;">
				<view class="text" v-for="n in 100" :key="n" v-if="n==current">
					<checkbox-group @change="checkboxChanget">
						<label v-for="(item,index) in cfcss" :key="index">
							<view>
								<checkbox :value="index" :checked="item.checked" style="margin:4% 0px 0px 5%;" v-if="index>=current*10&&index<=fix" />
							</view>
							<field :index="index" :width="width.cfcs" :css="css" :list="item" v-if="index>=current*10&&index<=fix"></field>

						</label>
					</checkbox-group>
				</view>
				<uni-pagination :total="total" @change="getCurrent"></uni-pagination>
				<view style="display: flex;flex-direction: row;justify-content: center;">
					<button @click="closePopup" style="width: 30%;line-height: 40px;margin: 10px 20px 0px 0px;font-size: 14px;">关闭</button>
				</view>
			</view>
			<!-- </movable-view>
			</movable-area> -->
		</uni-popup>
	</view>
</template>
<script>
	import uniPagination from "@/components/uni-pagination/uni-pagination.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import field from "@/components/field.vue"
	import store from '../store/index.js'
	export default {
		name: "changeTestDate",
		data() {
			return {
				total: 10, //重复字段的页码,默认为10为1页
				current: 0, //默认第一页
				jbcs: [], //试验基本字段
				cfcss: [], //试验重复字段总
				zdcs: [], //根据计算规则字段计算的字段		

				width: {
					jbcs: 60,
					cfcs: 100,
					zdcs: 40
				},
				css: {
					textMargin: 14,
					textWidth: 85
				},
				dataAll: '',
				x: 0,
				y: 0,
				height: '',
				wid: '',
				title: 'checkbox 复选框',
				valuesf: [],
				valuest: [],
				syyjSect:''
			}
		},
		components: {
			uniPagination,
			uniPopup,
			field
		},
		methods: {
			getCurrent(a) {
				console.log(a);
				this.current = a.current - 1;
				console.log(this.current);
			},
			checkboxChangef: function(e) {
				this.valuesf = e.detail.value;
				console.log(this.valuesf);
			},
			checkboxChanget: function(e) {
				console.log(e);
				var items = this.cfcss,
					values = e.detail.value;
				if (this.valuest.length == values.length + 1) {
					for (var j = 0; j < this.valuest.length; j++) {
						if (values.indexOf(this.valuest[j]) <= -1) {
							var wz = j
						}
					}
				}
				console.log(this.valuest[wz] + ' ' + this.valuest);
				console.log(this.$store.state.changeText);//this.$store.state.changeText变量用于判断是否点击了下一页或者下一页，是的话为true,否则为false
				if (this.$store.state.values == undefined) {
					this.$store.state.values = values;
					// console.log(11);
				} else {
					// console.log(22);
					if (this.$store.state.values.indexOf(this.valuest[wz]) <= -1 || this.$store.state.changeText == true) {
						this.$store.state.values = this.$store.state.values.concat(values[values.length - 1]);
						// console.log(33);
					} else {
						// console.log(44);
						for (var n = 0; n < this.$store.state.values.length; n++) {
							if (Number(this.$store.state.values[n]) == this.valuest[wz]) {
								this.$store.state.values.splice(n, 1);
								// console.log(55);
							}
						}
					}
				}
				this.valuest = values;
				console.log(this.$store.state.values);
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i];
					// var hh="i";
					var hh = '"' + i + '"';
					if (JSON.stringify(this.$store.state.values).indexOf(hh) > -1) {
						this.$set(item, 'checked', true)

					} else {
						this.$set(item, 'checked', false)
						// console.log(JSON.stringify(this.$store.state.values)+' '+hh);	
						// console.log(222111);
					}
				}
				this.$store.state.changeText = false;
			},
			openPopupAff: function() {
				this.$refs.popupAff.open();
			},
			openPopupAf: function() {
				this.$refs.popupAf.open();
			},
			openPopupAt: function() {
				this.$refs.popupAt.open();
			},
			closePopup: function() {
				this.$refs.popupAf.close();
				this.$refs.popupAt.close();
			},
			submitValue() {

				this.dataAll = '';
				for (var i = 0; i < this.jbcs.length; i++) {
					var hh = '"' + i + '"';
					if (JSON.stringify(this.valuesf).indexOf(hh) > -1) {
						this.dataAll += this.jbcs[i].content + '^^|';
					} else {
						this.dataAll += this.jbcs[i].content + '|';
					}
				}
				this.dataAll += '&&';
				console.log(this.cfcss.length);
				for (var i = 0; i < this.cfcss.length; i++) {
					var hh = '"' + i + '"';
					console.log(this.$store.state.values);
					// if(this.$store.state.values==undefined){
					// 	this.$store.state.values=[];
					// }
					if (JSON.stringify(this.$store.state.values).indexOf(hh) > -1) {
						this.dataAll += this.cfcss[i].content + '^^|';
					} else {
						this.dataAll += this.cfcss[i].content + '|';
					}
				}
				console.log(this.dataAll);
				this.dataAll += '&&';
				for (var i = 0; i < this.zdcs.length; i++) {
					this.dataAll += this.zdcs[i].content + '|'
				}

				// console.log(this.dataAll);
				if ((this.valuesf == undefined || this.valuesf.length == 0) && this.$store.state.values.length == 0 ){
					// console.log(this.dataAll);
					uni.showToast({
						icon: 'none',
						title: '至少选择一个错误信息'
					})
				} else {
					this.state = 'a3&r';
					// console.log(this.state);
					
                    this.dataAll += '^~^' + this.state;
					// console.log(this.dataAll);
					uni.request({
						// url: this.apiServer + '/basicdata/components/testData.php',
						url: this.apiServer + '/basicdata/components/testData.php',
						data: {
							flag: 'updateTestDate',
							id: this.$store.state.id,
							content: this.dataAll
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
									title: '驳回成功'
								});
								var state='a6&b';
								var e='3';
								this.$refs.popupAff.close();
								this.$emit('reload', [this.$store.state.id,state,e]);
							}
							console.log(res);

						}
					});
				}

			},
			getTestDate() {
				this.jbcs=[];
				this.cfcss=[];
				this.zdcs=[];
				console.log(this.$store.state.id);
				const res = uni.getSystemInfoSync();
				console.log(res.windowHeight);
				console.log(res.windowWidth);
				this.height = res.windowHeight;
				this.wid = res.windowWidth * 0.7;
				console.log(this.height + ' ' + this.wid);
				uni.request({
					// url: this.apiServer + '/basicdata/components/testData.php',
					url: this.apiServer + '/basicdata/components/testData.php',
					data: {
						flag: 'getTestDate',
						id: this.$store.state.id,
						jclx:this.$store.state.jclx
					},
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //POST头信息
					},
					success: (res) => {
						res = res.data;
						console.log(res);
						console.log(res.sygcjl + ' ' + res.syms + ' ' + res.syzrr);
						if (res.sygcjl != '' && res.sygcjl != null && res.sygcjl != undefined && res.syms != '' && res.syms != null &&
							res.syms != undefined && res.syzrr != '' && res.syzrr != null && res.syzrr != undefined) {
							this.disabled = true;
						}
						for (var i = 0; i < res.jbcs.length; i++) {
							var obj = JSON.parse(res.jbcs[i]);
							obj['disabled'] = true;
							this.jbcs.push(obj);
						}
						for (var j = 0; j < res.cfcs.length; j++) {
							var obj = JSON.parse(res.cfcs[j]);
							obj['disabled'] = true;
							this.cfcss.push(obj);
						}
						for (var m = 0; m < res.zdcs.length; m++) {
							var obj = JSON.parse(res.zdcs[m]);
							obj['disabled'] = true;
							this.zdcs.push(obj);
							console.log(2222);
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
									"placeholder": "",
									"disabled": true
								},
								{
									"title": "路表温度",
									"content": "",
									"placeholder": "",
									"disabled": true
								},
								{
									"title": "加载读数（1/100mm）左轮",
									"content": "",
									"placeholder": "",
									"disabled": true
								},
								{
									"title": "加载读数（1/100mm）右轮",
									"content": "",
									"placeholder": "",
									"disabled": true
								},
								{
									"title": "卸载读数（1/100mm）左轮",
									"content": "",
									"placeholder": "",
									"disabled": true
								},
								{
									"title": "卸载读数（1/100mm）右轮",
									"content": "",
									"placeholder": "",
									"disabled": true
								},
								{
									"title": "左沉值（1车道）（1/100mm）修正前",
									"content": "",
									"placeholder": "",
									"disabled": true
								},
								{
									"title": "左沉值（1车道）（1/100mm）修正后",
									"content": "",
									"placeholder": "",
									"disabled": true
								},
								{
									"title": "右沉值（2车道）（1/100mm）修正前",
									"content": "",
									"placeholder": "",
									"disabled": true
								},
								{
									"title": "右沉值（2车道）（1/100mm）修正后",
									"content": "",
									"placeholder": "",
									"disabled": true
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
									if(l==5){
										console.log(this.jbcs[l].content);
										this.syyjSect=this.jbcs[l].content;
									}
								} else if (n == 1) {
									this.cfcss[l].content = arr[l];
								} else {
									this.zdcs[l].content = arr[l];
								}
							}
						}
						console.log(this.cfcss);
			
					},
					fail: (error) => {
						console.log(error);
					}
				});
			},
		},
		computed: {
			fix: function() {
				return this.current * 10 + 9;
			}

		}
	}
</script>

<style lang="scss">
	.uni-list-cell {
		justify-content: flex-start
	}

	.uni-popup {
		&__wrapper {
			position: absolute;
			z-index: 999;
			box-sizing: border-box;


		}
	}
</style>
