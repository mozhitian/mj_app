<template>
	<view>
		
		<view class="content">
			<websocket></websocket>

			<view class="total">
				<view class="navigation_position">
					<view class="navigation">
						<view class="text" :class="{ active: checked.first }" @click="replace(1)">草稿箱({{num[0]}})</view>
						<view class="text" :class="{ active: checked.second }" @click="replace(2)">待结算({{num[1]}})</view>
						<view class="text" :class="{ active: checked.thrid }" @click="replace(3)">已结算({{num[2]}})</view>
					</view>
				</view>
				<view :class="[{hidden:revealChecked.first},'card_content']">
					<myformCard v-for="item in actlistCao" :key="item.id" :list="item" @openPopup="openPopupAff"></myformCard>
				</view>
				<view :class="[{hidden: revealChecked.second},'card_content']">
					<myformCard v-for="item in actlistDai" :key="item.id" :list="item"></myformCard>
				</view>
				<view :class="[{hidden: revealChecked.thrid},'card_content']">
					<myformCard v-for="item in actlistYi" :key="item.id" :list="item"></myformCard>
				</view>
			</view>
			<view class="add" :class="{ hidden: checked.four }" @click="add">+</view>
		</view>
		<view class="modal" :class="{ hidden: reveal.first }">
			<text class="text2">新增菜单</text>
			<button class="button" @tap="tiaozhuan(1)">材料检测</button>
			<button class="button" @tap="tiaozhuan(2)">实体检测</button>
		</view>
		<view :class="{ cover: reveal.second }" @click="add">
		</view>
		<popup ref="popup" @reload="reload"></popup>
		<mulcheck :labelList="tsObj" :values="tsSectArr" :num="'0'" ref="mulcheck" @val="getVal"></mulcheck>

	</view>
</template>

<script>
	import myformCard from "../../../components/myformCard.vue"
	import popup from "../../../components/popup.vue"
	import mulcheck from "@/components/mulcheck.vue";

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
				num: [0, 0, 0],
				//时间戳
				sjc: '',
				//
				jclx: '',
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
				photo: '', //手写签名保存后返回的临时路径
				date: '', //委托日期
				tsObj: [], //提示选择人
				tsSectArr: [], //已选择人
				message:'1'
			}
		},
		components: {
			myformCard,
			popup,
			mulcheck
		},
		//加载时获取order页面传递的sjc，根据时间戳获取送检委托所有的表单数据
		onLoad: function(option) {
			this.sjc = option.sjc;
			this.jclx = option.jclx;
			console.log(option.sjc);
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
				console.log(this.sjc);
				if (e == '2') {
					var projectOf = '实体检测';
				} else {
					var projectOf = '材料检测';
				}
				uni.navigateTo({
					url: '../project_form/add_card?projectOf=' + projectOf + '&sjc=' + this.sjc
				});
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
			},
			//由myformCard子组件长按选项卡触发的父组件事件，这个事件触发的是popup子组件的openPopup方法
			openPopupAff([id, state]) {
				// location.reload();
				this.$refs.popup.openPopup([id, state]);
			},
			reload([id, state]) {
				switch (state) {
					case 'a1&b':
						for (var i = 0; i < this.actlistCao.length; i++) {
							if (this.actlistCao[i].id == id) {
								this.actlistCao.splice(i, 1);
								this.num[0]--;
								this.open(1);
								// console.log(id);
							}
						}
						break;
					default:
						break;
				}
			},
			jiaZai() {
				this.actlistCao = [];
				this.actlistDai = [];
				this.actlistYi = [];
				this.num = [0, 0, 0];
				uni.request({
					url: this.apiServer + '/basicdata/getmyformcard.php',
					data: {
						flag: 'delegate',
						sjc: this.sjc
					},
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //POST头信息
					},
					success: (res) => {
						res = res.data;
						for (var i = 0; i < res.length; i++) {
							this.state = (res[i].state || ' ').split('&')[0];
							this.titleColor = (res[i].state || ' ').split('&')[1];
							// console.log(this.titleColor);

							if (this.state == 'a1') {
								this.num[0]++;
								res[i]['firstTitle'] = '委托单编号';
								res[i]['secondTitle'] = '委托日期';
								res[i]['thridTitle'] = '委托单位';
								res[i]['fourTitle'] = '经办人';
								res[i]['titleColor'] = this.titleColor;
								this.actlistCao.push(res[i]);
							} else if (this.state == 'a11') {
								this.num[1]++;
								res[i]['firstTitle'] = '委托单位';
								res[i]['secondTitle'] = '试验日期';
								res[i]['thridTitle'] = '委托费用';
								res[i]['fourTitle'] = '查看报告';
								res[i]['titleColor'] = this.titleColor;
								this.actlistDai.push(res[i]);
							} else if (this.state == 'a12') {
								this.num[2]++;
								res[i]['firstTitle'] = '委托单位';
								res[i]['secondTitle'] = '试验日期';
								res[i]['thridTitle'] = '委托费用';
								res[i]['fourTitle'] = '查看报告';
								res[i]['titleColor'] = this.titleColor;
								this.actlistYi.push(res[i]);
							} else {

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
		onShow: function(e) {
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.data.photo == "") {
				// this.getHopeJob();
				// console.log(1111);
			} else {
				// this.hope_job = currPage.data.hope_job
				// console.log(currPage.data.photo);
				this.photo = currPage.data.photo;
			}
			this.reveal = {
					first: true,
					second: false,
				},
				this.jiaZai();
		}
	}
</script>

<style>
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
