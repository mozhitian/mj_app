<template>
	<view class="content">
		<websocket></websocket>
		<field v-for="(item,index) in actlist" :key="index" :jclxzu="jclxzu" :index="index" :list="item" :jclx="jclx"
		 :disabled="disabled" @inc="alert" @lookdel="lookdel" @openPopup="openPopup"></field>
		<view class="form_submit" v-if="kjx">
			<button :class="receval.first?'submit':'disable'" hover-class="submit_cli" @click="changeReceal">修改</button>
			<button :class="receval.second?'submit':'disable'" hover-class="submit_cli" @click="delay">保存</button>
		</view>
		<back-to-date @backToDate="backToDate"></back-to-date>
		<mulcheck :labelList="zrr" :values="zrrSectArr" :num="'2'" ref="mulcheck" @postVal="getVal"></mulcheck>
	</view>
</template>
<script>
	import Bus from '../../../bus.js'
	import field from "../../../components/field.vue";
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
						title: "计划开始日期",
						content: "",
						placeholder: "请选择",
						disabled: false
					}, {
						title: "计划完成日期",
						content: "",
						placeholder: "请选择",
						disabled: false
					}, {
						title: "任务状态",
						content: "",
						placeholder: "请选择任务状态",
						disabled: true
					}, {
						title: "检测费用",
						content: "",
						placeholder: "请输入检测费用",
						disabled: false
					},
					{
						title: "任务摘要",
						content: "点击查看委托信息",
						placeholder: "",
						disabled: false
					}, {
						title: "任务描述",
						content: "",
						placeholder: "请输入任务描述",
						disabled: false
					}, {
						title: "责任人",
						content: "",
						placeholder: "请选择责任人",
						disabled: false
					}
				],
				id: '',
				jclx: '', //数据表中该委托单的检测类型
				disabled: true, //传给子组件作为判断是否启用
				dataAll: '', //表单内容
				base64: '', //接收组件chooseImage发送的base64
				zrr: '', //数据表中该委托单的责任人
				time: '', //当前日期
				kjx: true, //按钮的显示隐藏
				zrr: [

				],
				zrrSect: '',
				zrrSectArr: [

				]


			}
		},
		components: {
			field,
			backToDate,
			mulcheck
		},
		methods: {
			getVal([val, zt]) {
				this.zrrSect = val;
			},
			openPopup(e) {
				this.$refs.mulcheck.openPopup(e);
			},
			//跳转至日期页面
			backToDate() {
				uni.navigateTo({
					url: "../../dataSelect/uni-calendar?state=1&sjc=" + this.$store.state.sjc
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
			delay() {
				var this_ = this;
				setTimeout(function() {
					this_.submitValue();
				}, 500);
			},
			//保存按钮点击操作
			submitValue() {
				if (this.receval.second == true) {
					this.dataAll = '';
					for (var i = 0; i < this.actlist.length; i++) {
						if (i < 8 && i != 5) {
							if (i == 7) {
								this.dataAll += this.zrrSect + '/'
							} else {
								this.dataAll += this.actlist[i].content + '/';
							}
						}
						console.log(this.dataAll);
					}
					if (this.dataAll.indexOf(null) > -1 || this.dataAll.indexOf(undefined) > -1 || this.dataAll.indexOf('//') > -1 ||
						this.dataAll.substr(0, 1) == '/') {
						console.log(this.dataAll);
						console.log(111);
						uni.showToast({
							icon: 'none',
							title: '请将信息填写完整'
						})
					} else {
						console.log(222);
						//更改收样单数据
						uni.request({
							url: this.apiServer + '/basicdata/jcxm.php',
							data: {
								flag: 'upDateReceived',
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
			lookdel() {
				uni.navigateTo({
					url: '../project_form/add_field?zt=rec&id=' + this.id + '&jclx=' + this.jclx
				})
			},
			lookpic() {
				uni.navigateTo({
					url: '../project_form/pictrue?id=' + this.id
				})
			},
			checkmsg() {
				uni.navigateTo({
					url: '../project_form/test?id=' + this.id
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
		},
		//接收委托日期字段的内容,msg是内容,i是位置
		mounted: function() {
			console.log(22);
			var this_ = this;
			Bus.$on('change', function([msg, i]) {
				this_.actlist[i].content = msg;
			})
			console.log(JSON.stringify(this.actlist));
		},
		created() {
			uni.request({
				url: this.apiServer + '/account_regulate/accredit.php',
				data: {
					unit: "试验部"
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
						this.zrr = res;
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
			// console.log(option.zt);
			if (option.zt != undefined) {
				this.kjx = false;
			}
			//a3&g和a3&b状态下隐藏操作按钮
			if (option.disabled == 'true') {
				this.kjx = false;
			}
			uni.request({
				url: this.apiServer + '/basicdata/jcxm.php',
				data: {
					flag: 'getReceived',
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
					this.actlist[0].content = res.jclx; //检测类型都一样
					this.actlist[1].content = res.jhksrq; //计划开始日期
					var isdate = new Date(res.jhksrq.replace(/-/g, "/")); //把日期字符串转换成日期格式
					isdate = new Date((isdate / 1000 + (86400 * res.gqsj)) * 1000); //日期加1天
					var pdate = isdate.getFullYear() + "-" + (isdate.getMonth() + 1) + "-" + (isdate.getDate());
					console.log(pdate);
					// var hh = new Date((res.jhksrq / 1000 + (86400 * res.gqsj)) * 1000);
					// console.log(hh);
					this.actlist[2].content = pdate; //计划完成日期,计划开始日期加工期数据
					this.actlist[3].content = res.rwzt; //任务状态，不可更改
					this.actlist[4].content = res.jcfy; //检测费用，可更改
					this.actlist[6].content = res.rwms; //任务描述
					this.actlist[7].content = res.syzrr; //责任人
					this.zrrSectArr = (res.syzrr || "").split(";");
					const currentDate = this.getDate({
						format: true
					});
					if (this.actlist[1].content == null || this.actlist[1].content == '' || this.actlist[1].content == undefined) {
						this.actlist[1].content = currentDate
					}
					if (this.actlist[2].content == null || this.actlist[2].content == '' || this.actlist[2].content == undefined) {
						this.actlist[2].content = currentDate
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
		margin: 35px 10% 35px 10%;
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

	.disable {
		background-color: #B2B2B2;
		color: #FFFFFF;
		width: 40%;
		font-size: 14px;
	}
</style>
