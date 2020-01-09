<template>
	<view class="content">
		<websocket></websocket>
		<field v-for="(item,index) in actlist" :key="index" :index="index" :list="item" :jclx="jclx" :disabled="disabled"
		 @inc="alert" @looktes="looktes" @openPopup="openPopup"></field>
		
		<view class="form_message">
			<button class="message" hover-class="message_cli" @click="lookpic">附件</button>
			<button class="message" hover-class="message_cli" @click="lookrec">试验摘要</button>
			<button class="message" hover-class="message_cli" @click="checkmsg" :disabled="kjx">检测试验数据</button>
		</view>
		<view class="form_submit">
			<button :class="receval.first?'submit':'disable'" hover-class="submit_cli" @click="changeReceal" :disabled="kjx">修改</button>
			<button :class="receval.second?'submit':'disable'" hover-class="submit_cli" @click="delay" :disabled="kjx">保存</button>
		</view>
		<back-to-date @backToDate="backToDate"></back-to-date>
		<mulcheck :labelList="zrr" :values="zrrSectArr" :num="'2'" ref="mulcheck" @postVal="getVal"></mulcheck>
	</view>
</template>
<script>
	import Bus from '../../../bus.js';
	import field from "../../../components/field.vue";
	import store from '../../../store/index.js';
	import backToDate from "../../../components/backToDate.vue"
	import mulcheck from "../../../components/mulcheck.vue"
	export default {
		data() {
			return {
				receval: {
					first: true,
					second: false
				},
				actlist: [{
					title: "检测类型",
					content: "",
					placeholder: "请选择",
					disabled: true
				}, {
					title: "开始日期",
					content: "",
					placeholder: "请选择",
					disabled: false
				}, {
					title: "完成日期",
					content: "",
					placeholder: "请选择",
					disabled: false
				}, {
					title: "试验过程记录",
					content: "",
					placeholder: "请输入试验过程",
					disabled: false
				}, {
					title: "试验描述",
					content: "",
					placeholder: "请输入试验描述",
					disabled: false
				}, {
					title: "责任人",
					content: "",
					placeholder: "请选择责任人",
					disabled: false
				} ],
				id: '',
				jclx: '', //数据表中该委托单的检测类型
				disabled: true, //传给子组件作为判断是否启用
				dataAll: '', //表单内容
				base64: '', //接收组件chooseImage发送的base64
				time: '', //当前时间
				kjx: false, //操作按钮的禁用
				synr: '', //检测数据内容
				state: '' ,//委托单所处状态
				zrr:[
					
				],
				zrrSect:'',
				zrrSectArr:[
					
				]


			}
		},
		components: {
			field,
			backToDate,
			mulcheck
		},
		methods: {
			getVal([val,zt]){
				this.zrrSect=val;
			},
			openPopup(e){
				this.$refs.mulcheck.openPopup(e);
			},
			//跳转至日期页面
			backToDate(){
			    var state=2;
				if(this.$store.state.process=='收样'){
					state=1;
				}
				uni.navigateTo({
					url:"../../dataSelect/uni-calendar?state="+state+"&sjc="+this.$store.state.sjc
				})
			},
			//子组件传递过来的值,data是字段内容,i是第几个
			alert([data, i]) {
				this.actlist[i].content = data;
				// console.log(i);
				console.log(JSON.stringify(this.actlist));
				// console.log(typeof(this.actlist));
			},
			//修改按钮点击操作
			changeReceal() {
				if (this.receval.first == true) {
					this.receval = {
							first: false,
							second: true,
						},
						this.disabled = false
				}

			},
			//保存按钮点击操作
			delay() {
				var this_=this;
				setTimeout(function() {
					this_.submitValue();
				}, 1000);
			},
			submitValue() {
				if (this.receval.second == true) {
					this.dataAll = '';
					for (var i = 0; i < this.actlist.length; i++) {
						if (i !=5) {
							this.dataAll += this.actlist[i].content + '/'
						}else{
							this.dataAll +=this.zrrSect+'/';
						}
						console.log(this.dataAll);
					}
					if (this.dataAll.indexOf(null) > -1 || this.dataAll.indexOf(undefined) > -1 || this.dataAll.indexOf('//') > -1||this.dataAll.substr(0, 1) == '/') {
						console.log(this.dataAll);
						console.log(111);
						uni.showToast({
							icon: 'none',
							title: '请将信息填写完整'
						})
					} else {
						
						// console.log(this.$store.state.state);
						//更改试验单数据
						this.state=this.$store.state.state;//this.$store.state.state变量存储委托单状态
						if (this.synr != ''||this.synr!=null) {
							
							switch (this.state) {
								case 'a3&g':
								    this.state='a3&b'
								
									break;
								case 'a5&g':
									this.state='a5&b'
									
									break;
								default:
									break;
							}
							this.dataAll += this.state;
						}
						console.log(this.dataAll);
						uni.request({
							url: this.apiServer + '/basicdata/jcxm.php',
							data: {
								flag: 'upDateTest',
								content: this.dataAll,
								id: this.id
							},
							method: 'POST',
							dataType: 'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded', //POST头信息
							},
							success: (res) => {
								console.log(res.data);
								if (res.data.result == "success") {
									// console.log(11);
									uni.showToast({
										icon: 'none',
										title: '保存成功'
									})
									this.receval = {
											first: true,
											second: false
										},
										this.disabled = true;
								} else {
									console.log(333);
								}
							},
							fail: (error) => {
								console.log(error);
							}
						});
					}
				}

			},
			//跳转至委托单页面查看详细
			lookrec() {
				uni.navigateTo({
					url: '../project_form/received?zt=tes&id=' + this.id
				})
			},
			looktes() {
				//用于跳转页面后检测数据页面操作按钮的启用或禁用判断
				this.$store.state.disabledt=true;//this.$store.state.disabledt变量用于判断跳转进新页面后按钮是否禁用
				uni.navigateTo({
					url: '../project_form/testdata?id=' + this.id
				})
			},
			lookpic() {
				uni.navigateTo({
					url: '../project_form/pictrue?id=' + this.id + '&disabled=' + this.kjx
				})
			},
			checkmsg() {
				//用于跳转页面后检测数据页面操作按钮的启用或禁用判断
				this.$store.state.disabledt=false;//this.$store.state.disabledt变量用于判断跳转进新页面后按钮是否禁用
				uni.navigateTo({
					url: '../project_form/testdata?id=' + this.id
				})
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
			// 接收组件chooseImage发送的base64
			// getBase64([sign,base]){
			// 	//只有新添加的
			// 	if(sign==''){
			// 		base=base.substr(1);
			// 		this.base64=base;
			// 		console.log(this.base64);
			// 	}else if(base==''){//只有本地的
			// 		this.base64=sign;
			// 		console.log(this.base64);
			// 	}else{//本地和新添加都有
			// 		this.base64=sign+'~**~'+base
			// 	}
			// }
		},
		//接收委托日期字段的内容,msg是内容,i是位置
		mounted: function() {
			var this_ = this;
			Bus.$on('change', function([msg, i]) {
				this_.actlist[i].content = msg;
			})
		},
		created() {
			uni.request({
				url: this.apiServer + '/account_regulate/accredit.php',
				data: {
					unit:"试验部"
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					console.log(res.data);
					res=res.data;
					if (res[res.length-1].result == "success") {
						res.splice(res.length-1,1);
						this.zrr=res;
						console.log(res);
					} else {
						// _this.sqObj=[];
						console.log('无授权数据');
					}
				},
				fail: (error) => {
					console.log(error);
				}
			});
		},
		//加载接收派工收样页面的传递的id和检测类型
		onLoad: function(option) {
			this.id = option.id; //获取上一个页面的id
			this.$store.state.id=this.id;
			console.log(option);
			if (option.disabled.toString()=='true') {
				console.log(22233);
				this.kjx = true;
				this.receval.first = false;
			}
			uni.request({
				url: this.apiServer + '/basicdata/jcxm.php',
				data: {
					flag: 'getTest',
					id: option.id,
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					res = res.data;
					console.log(res);
					this.$store.state.jclx=res.jclx;
					this.actlist[0].content = res.jclx; //检测类型都一样
					this.actlist[1].content = res.syksrq; //试验开始日期
					this.actlist[2].content = res.sywcrq; //试验完成日期
					this.actlist[3].content = res.sygcjl; //试验过程记录
					this.actlist[4].content = res.syms; //试验描述
					this.actlist[5].content = res.syzrr; //试验责任人
					this.zrrSectArr=(res.syzrr||"").split(";");
					this.synr = res.synr;
					console.log(this.synr);
					const currentDate = this.getDate({
						format: true
					});
					if (res.syksrq == '' || res.syksrq == null) {
						this.actlist[1].content = currentDate;
					}
					if (res.sywcrq == '' || res.sywcrq == null) {
						this.actlist[2].content = currentDate;
					}
				},
				fail: (error) => {
					console.log(error);
				}
			});

		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: #F1F1F1;
		overflow: scroll;
	}

	.form_submit {
		width: 80%;
		margin: 10px 10% 10px 10%;
		display: flex;
		flex-direction: row;
	}
	.form_message {
		width: 90%;
		margin: 30px 5% 30px 5%;
		display: flex;
		flex-direction: row;
	}

	.submit_cli {
		background-color: #F1F1F1;
		color: #FFFFFF;
	}
	.submit {
		background-color: #007AFF;
		color: #FFFFFF;
		width: 40%;
		font-size: 14px;
	}
	.message_cli {
		background-color: #F1F1F1;
		color: #FFFFFF;
	}
	.message {
		background-color: #007AFF;
		color: #FFFFFF;
		font-size: 14px;
	}
	.disable {
		background-color: #B2B2B2;
		color: #FFFFFF;
		width: 40%;
		font-size: 14px;
	}
</style>
