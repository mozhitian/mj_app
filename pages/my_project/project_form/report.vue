<template>
	<view class="content">
		<websocket></websocket>
		<field v-for="(item,index) in actlist" :key="index" :index="index" :list="item" :zrrselt="zrr"
		 :disabled="disabled" @inc="alert" @lookdel="lookdel"></field>
		<view class="form_submit" v-if="kjx">
			<button :class="receval.first?'submit':'disable'" hover-class="submit_cli" @click="changeReceal">修改</button>
			<button :class="receval.second?'submit':'disable'" hover-class="submit_cli" @click="delay">保存</button>
		</view>
	</view>
</template>
<script>
	import Bus from '../../../bus.js'
	import field from "../../../components/field.vue";
	export default {
		data() {
			const currentDate = this.MyClass.getDate({
				format: true
			})
			return {
				receval: {
					first: true,
					second: false
				},
				actlist: [{
						title: "报告编号",
						content: "",
						placeholder: "请填写",
						disabled: false
					}, {
						title: "编制日期",
						content: "",
						placeholder: "请选择",
						disabled: false
					}, {
						title: "编制人",
						content: "",
						placeholder: "请选择",
						disabled: false
					}
				],
				id: '',
				jclx: '', //数据表中该委托单的检测类型
				disabled: true, //传给子组件作为判断是否启用
				dataAll: '', //表单内容
				bzr:'',//数据表中该检测报告的编制人
				time:currentDate,//当前日期
				kjx:true//按钮的显示隐藏
				
				
			}
		},
		components: {
			field
		},
		methods: {
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
				var this_=this;
				setTimeout(function() {
					this_.submitValue();
				}, 1000);
			},
			//保存按钮点击操作
			submitValue() {
				if(this.receval.second == true){
					this.dataAll = '';
					for (var i = 0; i < this.actlist.length; i++) {
						if (i < 4) {
							console.log(this.actlist[i].content);
							this.dataAll += this.actlist[i].content + '/'
						}
						console.log(this.dataAll);
					}
					if (this.dataAll.indexOf(null) > -1||this.dataAll.indexOf(undefined) > -1||this.dataAll.indexOf('//') > -1||this.dataAll.substr(0, 1) == '/') {
						console.log(this.dataAll);
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
								flag: 'upDateReport',
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
								}else{
									console.log(333);
								}
							},
							fail: (error) => {
								console.log(error);
							}
						});
					}
				}
				
			}
		},
		//接收日期字段的内容,msg是内容,i是位置
		mounted: function() {
			var this_ = this;
			Bus.$on('change', function([msg, i]) {
				this_.actlist[i].content = msg;
			})
		},
		//加载接收派工收样页面的传递的id和检测类型
		onLoad: function(option) {
			this.id = option.id; //获取上一个页面的id
			if(option.disabled=='true'){
				this.receval.first=false;
			}
			uni.request({
				url: this.apiServer + '/basicdata/jcxm.php',
				data: {
					flag: 'getReport',
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
					this.actlist[0].content = res.bgbh; //检测类型都一样
					this.actlist[1].content = res.bzrq; //计划开始日期
					this.actlist[2].content = res.bzr; //计划完成日期
					this.zrr=res.syzrr;
					if(res.bzrq==''||res.bzrq==null){
						this.actlist[1].content=this.time;
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
		height: 100vh;
		background-color: #F1F1F1;
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
