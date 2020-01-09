<template>
	<view class="content">
		<websocket></websocket>
		<field v-for="(item,index) in actlist" :key="index" :index="index" :list="item" :jcffselt="jcff" :jcltselt='jclt' :disabled="disabled" @inc="alert"></field>
		<view class="total">
			<view class="form_information" @click="lookKzmsg">
				<image src='../../../static/u329.png' style="width: 30px;height: 30px;margin: 0 auto;"></image>
				<text style="font-size: 14px;">扩展信息</text>
			</view>
			<view class="form_information" @click="lookGcmsg">
				<image src='../../../static/u336.png' style="width: 30px;height: 30px;margin: 0 auto;"></image>
				<text style="font-size: 14px;">工程信息</text>
			</view>
			<view class="form_submit">
				<button :class="['submit',{hidden:receval.first}]" hover-class="submit_cli" @click="changeReceal">修改</button>
				<button :class="['submit',{hidden:receval.second}]" hover-class="submit_cli" @click="delay">保存</button>
			</view>
		 	</view>
		</view>


	</view>
</template>
<script>
	import Bus from '../../../bus.js';
	import field from "../../../components/field.vue";
	import store from "../../../store/index.js";
	export default {
		data() {
			return {
				receval: {
					first: false,
					second: true,
				},
				actlist: [{
					title: "检测项目",
					content: "",
					placeholder: "请选择",
					disabled: false
				}, {
					title: "检测方法",
					content: "",
					placeholder: "请选择",
					disabled: false
				}, {
					title: "委托单编号",
					content: "",
					placeholder: "请输入委托单编号",
					disabled: false
				}, {
					title: "经办人",
					content: "",
					placeholder: "请输入经办人",
					disabled: false
				}, {
					title: "设计要求",
					content: "",
					placeholder: "请输入设计要求",
					disabled: false
				}, {
					title: "检测类体",
					content: "",
					placeholder: "选择检测类型",
					disabled: false
				}, {
					title: "委托日期",
					content: "",
					placeholder: "请选择委托日期",
					disabled: false
				}],
				jgczhd:'',//结构层总厚度
				id: '',
				dycsz: '', //扩展字段，如11||22||33
				dycszzu: [], //扩展字段，如[11,22,33]
				jclxzu: '', //所有的检测项目及其对应方法[{jcxm:'',jcff:''},{jcxm:'',jcff:''}]
				jclx: '', //数据表中该委托单的检测类型
				jcxm: '', //数据表中该委托单的检测项目
				jclt: '', //数据表中该委托单的检测类体
				jcff: '', //数据表中该委托单的检测方法
				disabled: true, //传给子组件作为判断是否启用
				dataAll: '', //表单内容
				defaultval: [0, 0, 0] //检测项目三级联动选项框默认选项
			}
		},
		components: {
			field
		},
		methods: {
			//子组件传递过来的值,data是字段内容,i是第几个
			alert([data, i]) {
				this.actlist[i].content = data;
				console.log(this.actlist);
			},
			//修改按钮点击操作
			changeReceal() {
				this.receval = {
						first: true,
						second: false
					},
					this.disabled = false
			},
			lookGcmsg() {
				uni.navigateTo({
					url: 'gcmsg?flag=gc&id=' + this.id
				})
			},
			lookKzmsg() {
				uni.navigateTo({
					url: 'gcmsg?flag=kz&id=' + this.id
				})
			},
			delay() {
				var this_ = this;
				setTimeout(function() {
					this_.submitValue();
				}, 500);
			},
			//保存按钮点击操作
			submitValue() {
				this.dataAll = '';
				for (var i = 0; i < this.actlist.length; i++) {
					this.dataAll += this.actlist[i].content + '/'	
				}
				console.log(this.dataAll);
				if (this.dataAll.indexOf(null) > -1 || this.dataAll.indexOf(undefined) > -1 || this.dataAll.indexOf('//') > -1 ||
					this.dataAll.substr(0, 1) == '/') {
					// console.log(this.dataAll);
					uni.showToast({
						icon: 'none',
						title: '请将信息填写完整'
					})
				} else {
					// if(this.jcff=='贝克曼梁法（结构层总厚度       mm）'){
					// 	var flag='upDateDelegateft'
					// }else{
					// 	var flag='upDateDelegateff'
					// }

					uni.request({
						url: this.apiServer + '/basicdata/jcxm.php',
						data: {
							flag: "upDateDelegateft",
							content: this.dataAll,
							id: this.id
						},
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded', //POST头信息
						},
						success: (res) => {
							if (res.data.result == "success") {
								// console.log(11);
								uni.showToast({
									icon: 'none',
									title: '保存成功'
								})
								this.receval = {
										first: false,
										second: true
									},
									this.disabled = true;
							}
						},
						fail: (error) => {
							console.log(error);
						}
					});
				}
			}
		},
		//接收委托日期字段的内容,msg是内容,i是位置
		mounted: function() {
			var this_ = this;
			Bus.$on('change', function([msg, i]) {
				this_.actlist[i].content = msg;
				// if(this_.actlist[1].content!='贝克曼梁法（结构层总厚度       mm）'&&this_.actlist.length==8){
				// 	this_.jcff=this_.actlist[1].content;
				// 	this_.actlist.splice(2,1);
				// }else if(this_.actlist[1].content=='贝克曼梁法（结构层总厚度       mm）'&&this_.actlist.length==7){
				// 	this_.jcff=this_.actlist[1].content;
				// 	var obj={
				// 		title: "结构层总厚度(mm)",
				// 		content: this_.jgczhd,
				// 		placeholder: "请输入结构层总厚度",
				// 		disabled: false
				// 	}
				// 	this_.actlist.splice(2,0,obj);
				// }
			});
		},
		//加载接收送检委托页面的传递的id和检测类型
		onLoad: function(option) {
			this.id = option.id;
			this.$store.state.id = option.id; //this.$store.state.id存储委托单id
			//只让查看
			if (option.zt == '') {
				console.log(333);
			} else if (option.zt == 'rec') {
				console.log(option.id + ' ' + option.jclx);
				this.receval.first = true
			}
			uni.request({
				url: this.apiServer + '/basicdata/jcxm.php',
				data: {
					flag: 'getDelegate',
					id: option.id
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					res = res.data;
					console.log(res);
					this.jclx = res.jclx;
					Bus.$emit("postJccs", [this.jclx, res.jcxm,res.xmmk]);
					this.actlist[0].content = res.jcxm;
					this.jcxm = res.jcxm;
					this.actlist[1].content = res.jcff;
					this.jcff = res.jcff;
					var num=2;
					// this.jgczhd=res.jgczhd;
					// if(res.jcff=='贝克曼梁法（结构层总厚度       mm）'){
					// 	var obj={
					// 		title: "结构层总厚度(mm)",
					// 		content: res.jgczhd,
					// 		placeholder: "请输入结构层总厚度",
					// 		disabled: false
					// 	}
					// 	this.actlist.splice(2,0,obj);
					// 	num++;
					// }
					this.actlist[num].content = res.wtbh;
					num++;
					this.actlist[num].content = res.jbr;
					num++;
					this.actlist[num].content = res.sjyq;
					num++;
					this.actlist[num].content = res.jclt;
					num++;
					this.actlist[num].content = res.wtrq;
					this.jclt = res.jclt;

					this.dycsz = res.dycsz;
					//扩展字段内容
					this.dycszzu = (this.dycsz || ' ').split('||');
					this.$store.state.dycszzu = this.dycszzu; //this.$store.state.dycszzu变量存储扩展参数字段值数组
					this.$store.state.ziduan = res.ziduan; //this.$store.state.ziduan变量存储扩展参数字段数组
					this.$store.state.tswz = res.tswz; //this.$store.state.tswz变量存储扩展参数字段提示文字数组
					// console.log(this.$store.state.dycszzu+' '+this.$store.state.ziduan+' '+this.$store.state.tswz);

				},
				fail: (error) => {
					console.log(error);
				}
			});

		},

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
	.form_information {
		display: flex;
		flex-direction: column;
	}

	.form_submit {
		width: 20%;
	}

	.submit {
		background-color: #007AFF;
		color: #FFFFFF;
		font-size: 12px;
		padding: 3px 0px 3px 0px;
	}

	.submit_cli {
		background-color: #F1F1F1;
		color: #FFFFFF;
	}

	.place {
		margin-top: -45px;
	}

	.hidden {
		display: none;
	}

	.menu {
		width: 30%;
		background-color: #007AFF;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		padding: 3px;
		color: #FFFFFF;
		margin: 25px 0px 0px 25px;
	}

	.total {
		height: 75px;
		width: 80%;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		margin: 5% 10% 5% 10%;
		justify-content: space-around;
	}

	.palace {
		width: 100%;
		height: 80%;
		/* height: 20%; */
		background-color: #FFFFFF;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		border: 1px solid #E1E1E1;
		border-radius: 50%;
		margin-right: 2%;
	}

	.img1 {
		width: 38%;
		height: 34%;
		color: #FFFFFF;
	}

	.img2 {
		width: 36%;
		height: 28%;
		color: #FFFFFF;

	}

	.container {
		width: 20%;
		height: 100%;
		text-align: center;
	}


	.text1 {
		width: 100%;
		height: 20%;
		text-align: center;
		font-size: 12px;
	}
</style>
