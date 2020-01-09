<template>
	<view>
		<websocket></websocket>
		<view class="content">
			<view class="total">
				<view class="navigation_position">
					<view class="navigation">
						<view class="text" :class="{ active: checked.first }" @click="replace(1)">草稿({{num[0]}})</view>
						<view class="text" :class="{ active: checked.second }" @click="replace(2)">未完成({{num[1]}})</view>
						<view class="text" :class="{ active: checked.thrid }" @click="replace(3)">已完成({{num[2]}})</view>
					</view>
				</view>
				<view :class="[{hidden:revealChecked.first},'card_content']">
					<myformCard v-for="item in actlistCao" :key="item.id" :list="item" @openPopup="openPopupAff"></myformCard>
				</view>
				<view :class="[{hidden: revealChecked.second},'card_content']">
					<myformCard v-for="item in actlistDai" :key="item.id" :list="item" @openPopup="openPopupAff"></myformCard>
				</view>
				<view :class="[{hidden: revealChecked.thrid},'card_content']">
					<myformCard v-for="item in actlistYi" :key="item.id" :list="item" @openPopup="openPopupAff"></myformCard>
				</view>
				<!-- <view class="add" :class="{ hidden: checked.four }" @click="add">+</view> -->
			</view>
		</view>

		<!-- <view :class="{ cover: reveal.second }" @click="add">
		</view> -->

		<popup ref="popup" @openCtd="openCtd" @reload="reload"></popup>
		<changeTestDate ref="ctd" @reload="reload"></changeTestDate>
		<mulcheck :labelList="tsObj" :values="tsSectArr" :num="'0'" ref="mulcheck" @val="getVal"></mulcheck>
		<!-- <uni-popup type="center" ref="popup">
			<view style="background-color:#FFFFFF;padding: 20px 20px 20px 20px;">
				<label class="label">请选择绑定的委托单编号:</label>
				<picker mode="selector" :value="idx" :range="wtbh" @change="getIdx" class="input" :disabled="disabled">
					<view class="[uni-input,input]" style="margin-left: 0;width:100%;height: 35px ;display: flex;align-items: center">
						<span v-if="indexss!=0">{{wthb[idx]}}</span>
						<span v-if="indexss==0" style="color: #999;font-size: 14px;">请选择绑定的委托单编号</span>
					</view>
				</picker>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	import myformCard from "../../../components/myformCard.vue"
	import popup from "../../../components/popup.vue"
	import changeTestDate from "../../../components/changeTestDate.vue"
	import mulcheck from "@/components/mulcheck.vue";
	// import uniPopup from "../../../components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				//显示或者选中的变量
				checked: {
					first: true,
					second: false,
					thrid: false,
					four: false
				},
				reveal: {
					first: true,
					second: false,
				},
				revealChecked: {
					first: false,
					second: true,
					thrid: true
				},
				//各个状态的数量
				num:[0,0,0],
				//时间戳
				sjc: '',
				//
				jclx: '',
				wtrq: '',
				//草稿箱的表单卡
				actlistCao: [],
				//待结算的表单卡
				actlistDai: [],
				//已结算的表单卡
				actlistYi: [],
				//表单卡的状态
				state: '',
				//表单卡头标的颜色
				titleColor: '',
				idx: 0,
				wthb:[],
				tsObj: [], //提示选择人
				tsSectArr: [], //已选择人
				message:'2'
			}
		},
		components: {
			myformCard,
			popup,
			changeTestDate,
			mulcheck
		},
		//加载时获取order页面传递的sjc，根据时间戳获取送检委托所有的表单数据
		onLoad: function(option) {
			this.sjc = option.sjc;
			this.wtrq = option.wtrq;
			this.$store.state.process = '试验';
			uni.request({
				url: this.apiServer + '/account_regulate/accredit.php',
				data: {
					unit: '试验部'
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					console.log(res.data);
					res = res.data;
					if (res[res.length - 1].result == "success") {
						res.splice(res.length - 1, 1);
						this.tsObj = res;
						console.log(res);
					} else {
						console.log('无授权数据');
					}
				},
				fail: (error) => {
					console.log(error);
				}
			});
		},
		methods: {
			open(e) {
				this.$refs.mulcheck.openPopup(e);
			},
			getVal([val, zt]) {
				var type=this.message;
				var peo=val;
				uni.request({
					url: this.apiServer + '/basicdata/components/message.php',
					data: {
						flag:"insert",
						type:type,
						peo:peo,
						wtbh:this.$store.state.wtbh,
						gcmc:this.$store.state.projectName
					},
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //POST头信息
					},
					success: (res) => {
						console.log(res.data);
						if(res.data.result=="success"){
							var point = this;
							uni.sendSocketMessage({
								data: point.message+'|'+val+'|'+this.$store.state.projectName+'|'+this.$store.state.wtbh
							})
						}
					},
					fail: (error) => {
						console.log(error);
					}
				});
			},
			//跳转至新建委托页面
			tiaozhuan(e) {
				if (e == 2) {
					uni.navigateTo({
						url: '../project_form/add_card?jclx=' + this.jclx + '&sjc=' + this.sjc
					});
				}
			},
			//三个状态按钮选中的切换
			replace(e) {
				if (e == 1) {
					this.checked = {
							first: true,
							second: false,
							thrid: false,
							four: false
						},
						this.revealChecked = {
							first: false,
							second: true,
							thrid: true,
						}

				} else if (e == 2) {
					this.open(1);
					this.checked = {
							first: false,
							second: true,
							thrid: false,
							four: true
						},
						this.revealChecked = {
							first: true,
							second: false,
							thrid: true,
						}

				} else {
					this.checked = {
							first: false,
							second: false,
							thrid: true,
							four: true
						},
						this.revealChecked = {
							first: true,
							second: true,
							thrid: false,
						}
				}
			},
			//新建按钮点击的的状态切换
			add() {
				this.reveal.first = !this.reveal.first;
				this.reveal.second = !this.reveal.second;
				this.$refs.popup.open();
				uni.request({
					url: this.apiServer + '/basicdata/getWtbh.php',
					data: {
						flag: 'getWtbh',
						sjc: this.sjc
					},
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //POST头信息
					},
					success: (res) => {
						res = res.data;
						console.log(res);
						res=['111','222']
						for(var i=0;i<res.length;i++){
							this.wthb.push(res[i])
						}
						console.log(typeof(this.wthb));
						console.log(this.wthb);

					},
					fail: (error) => {
						console.log(error);
					}
				});

			},
			//由myformCard子组件长按选项卡触发的父组件事件，这个事件触发的是popup子组件的openPopup方法
			openPopupAff([id, state]) {
				console.log(2222);
				// location.reload();

				this.$refs.popup.openPopup([id, state]);
			},
			openCtd() {
				this.$refs.ctd.openPopupAff();
			},
			reload([id, state, e]) {
				console.log(state);
				switch (state) {
					case 'a3&g':
						for (var i = 0; i < this.actlistCao.length; i++) {
							if (this.actlistCao[i].id == id) {
								console.log(this.actlistCao[i]);
								console.log(this.actlistCao[i].titleColor);
								if (e == '1') {

								} else {
									this.actlistCao[i]['titleColor'] = 'g';
									this.actlistCao[i]['state'] = 'a5&g';
									this.actlistDai.push(this.actlistCao[i]);
									this.num[1]++;
								}
								this.actlistCao.splice(i, 1);
								this.num[0]--;
							}
						}
						break;
					case 'a3&b':
						for (var i = 0; i < this.actlistCao.length; i++) {
							if (this.actlistCao[i].id == id) {
								console.log(this.actlistCao[i]);
								console.log(this.actlistCao[i].titleColor);
								if (e == '1') {

								} else {
									this.actlistCao[i]['titleColor'] = 'b';
									this.actlistCao[i]['state'] = 'a5&b';
									this.actlistDai.push(this.actlistCao[i]);
									this.num[1]++;
								}
								this.actlistCao.splice(i, 1);
								this.num[0]--;
							}
						}
						break;
					case 'a5&g':
						for (var i = 0; i < this.actlistDai.length; i++) {
							if (this.actlistDai[i].id == id) {
								if (e == '1') {
									this.actlistDai[i]['state'] = 'a3&g';
									this.actlistCao.push(this.actlistDai[i]);
									this.actlistDai.splice(i, 1);
									this.num[0]++;
									this.num[1]--;
								} else {

								}
							}
						}
						break;
					case 'a5&b':
						for (var i = 0; i < this.actlistDai.length; i++) {
							if (this.actlistDai[i].id == id) {
								if (e == '1') {
									this.$refs.ctd.getTestDate();
									// this.jiaZai();
								} else {
									this.actlistDai[i]['state'] = 'a6&b';
									this.actlistYi.push(this.actlistDai[i]);
									this.actlistDai.splice(i, 1);
									this.num[1]--;
									this.num[2]++;
								}
								
							}
						}
						break;
					case 'a6&b':
					    this.jiaZai();
						this.open(1);
// 						for (var i = 0; i < this.actlistYi.length; i++) {
// 							if (this.actlistYi[i].id == id) {
// 								if (e == '1') {
// 									this.$refs.ctd.getTestDate();
// 								} else if (e == '2') {
// 									this.actlistYi[i]['titleColor'] = 'l';
// 								} else {
// 									this.jiaZai();
// 									this.actlistYi[i]['state'] = 'a3&r';
// 									this.actlistYi[i]['titleColor'] = 'r';
// 									this.actlistCao.push(this.actlistYi[i]);
// 									this.actlistYi.splice(i, 1);
// 								}
// 
// 							}
// 						}
						break;
				}
			},
			jiaZai() {
				this.actlistCao = [];
				this.actlistDai = [];
				this.actlistYi = [];
				this.num=[0,0,0];
				uni.request({
					url: this.apiServer + '/basicdata/getmyformcard.php',
					data: {
						flag: 'test',
						sjc: this.sjc,
						wtrq: this.wtrq,
						jccs:this.$store.state.jccs
					},
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //POST头信息
					},
					success: (res) => {
						res = res.data;
						console.log(res);
						for (var i = 0; i < res.length; i++) {
							var l = "a7||a8||a9||a10||a11||a12";
							this.state = (res[i].state || ' ').split('&')[0];
							this.titleColor = (res[i].state || ' ').split('&')[1];
							res[i]['firstTitle'] = '检测类型';
							res[i]['secondTitle'] = '试验开始日期';
							res[i]['thridTitle'] = '试验完成日期';
							res[i]['fourTitle'] = '试验结论';
							if (this.state == 'a3') {
								this.num[0]++;
								res[i]['titleColor'] = this.titleColor;
								this.actlistCao.push(res[i]);
							} else if (this.state == 'a5') {
								this.num[1]++;
								res[i]['titleColor'] = this.titleColor;
								this.actlistDai.push(res[i]);
							} else if (this.state == 'a6') {
								this.num[2]++;
								res[i]['titleColor'] = this.titleColor;
								this.actlistYi.push(res[i]);
							} else if (l.indexOf(this.state) > -1 && this.state != 'a1') {
								this.num[2]++;
								res[i]['titleColor'] = 'l';
								res[i]['state'] = 'a6&l';
								this.actlistYi.push(res[i]);
							}
						}
					},
					fail: (error) => {
						console.log(error);
					}
				});
			}

		},
		//页面加载或页面返回初始化状态
		onShow: function() {
			this.reveal = {
					first: true,
					second: false,
				},
				this.jiaZai();
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		background-color: #efeff4;
		height: 100vh;
		width: 100vw;
		overflow: hidden;

	}

	.total {
		height: 100%;
		width: 100%;
	}

	.navigation {
		display: flex;
		flex-direction: row;
		justify-content: center;


	}

	.navigation_position {
		width: 100%;
		position: fixed;
		top: 14px;

	}

	.text {
		font-size: 16px;
		width: 32%;
		height: 35px;
		background-color: #FFFFFF;
		color: #000000;
		border: 1px solid #8F8F94;
		border-radius: 4px;
		overflow: hidden;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.active {
		color: #FFFFFF;
		background-color: #007AFF;
	}

	.card_content {
		position: fixed;
		top: 50px;
		width: 100%;
		height: 90%;
		overflow: auto;
	}

	.add {
		width: 50px;
		height: 50px;
		background-color: red;
		border-radius: 50%;
		font-size: 35px;
		display: flex;
		color: #FFFFFF;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 10%;
		right: 10%;


	}

	.hidden {
		visibility: hidden
	}

	.modal {
		width: 80%;
		height: 100px;
		background-color: #FFFFFF;
		border: 1px solid #000000;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		font-size: 18px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -40%;
		margin-top: -50px;
		z-index: 11;
	}

	.cover {
		background-color: #000000;
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		opacity: 0.8;
	}

	.text2 {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.button {
		width: 40%;
		height: 40px;
		margin-bottom: 10px;
		background-color: #007AFF;
		color: #FFFFFF;
	}
</style>
<style lang='css' scoped>
	.card_content>>>.card {
		margin-top: 4%;
	}
</style>
