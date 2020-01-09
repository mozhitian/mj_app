<template>
	<view class="content">
		<websocket></websocket>
		<field v-for="(item,index) in actlist" :key="index" :index="index" :list="item" :disabled="disabled" @inc="alert"></field>
		<view class="form_submit" v-if="display">
			<button :class="['submit',{hidden:receval.first}]" hover-class="submit_cli" @click="changeReceal">修改</button>
			<button :class="['submit',{hidden:receval.second}]" hover-class="submit_cli" @click="delay">保存</button>
		</view>
	</view>
</template>

<script>
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
					title: "甲方",
					content: "",
					placeholder: "请输入甲方名称",
					disabled: true
				}, {
					title: "乙方",
					content: "",
					placeholder: "请输入乙方名称",
					disabled: true
				}, {
					title: "工程编号",
					content: "",
					placeholder: "请输入工程编号",
					disabled: true
				}, {
					title: "联系电话",
					content: "",
					placeholder: "请输入联系电话",
					disabled: true
				}, {
					title: "工程名称",
					content: "",
					placeholder: "请输入工程名称",
					disabled: true
				}, {
					title: "见证单位",
					content: "",
					placeholder: "请输入见证单位",
					disabled: true
				}, {
					title: "监督单位",
					content: "",
					placeholder: "请输入监督单位",
					disabled: true
				}],
				id: '',
				disabled: true, //传给子组件作为判断是否启用
				dataAll: '', //表单内容
				display:true//判断操作按钮的显示隐藏
			}
		},
		components: {
			field
		},
		methods: {
			alert([data, i]) {
				this.actlist[i].content = data;
				console.log(this.actlist);
			},
			changeReceal() {
				this.receval = {
						first: true,
						second: false
					},
					this.disabled = false
			},
			delay() {
				var this_=this;
				setTimeout(function() {
					this_.submitValue();
				}, 1000);
			},
			submitValue() {
				this.dataAll='';
				for (var i = 0; i < this.actlist.length; i++) {
						this.dataAll+=this.actlist[i].content+'||'
				}
				console.log(this.dataAll);
				if (this.dataAll.indexOf(null) > -1||this.dataAll.indexOf(undefined) > -1||this.dataAll.indexOf('||||') > -1||this.dataAll.substr(0, 1) == '||') {
					// console.log(this.dataAll);
					uni.showToast({
						icon: 'none',
						title: '请将信息填写完整'
					})
				} else {
					this.$store.state.dycszzu=(this.dataAll||'').split('||');//this.$store.state.dycszzu变量存储扩展参数字段值数组，用于模拟实时更新
					var id=this.$store.state.id;
					uni.request({
						url: this.apiServer + '/basicdata/jcxm.php',
						data: {
							flag: 'upDateDelegatet',
							content: this.dataAll,
							id: id
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
		onLoad: function(option) {
			console.log(option.id);
			if (option.flag == 'gc') {
				this.display=false;
				uni.request({
					url: this.apiServer + '/basicdata/jcxm.php',
					data: {
						flag: 'getGcmsg',
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
						this.actlist[0].content = res.jiafang;
						this.actlist[1].content = res.yifang;
						this.actlist[2].content = res.gcbh;
						this.actlist[3].content = res.lxdh;
						this.actlist[4].content = res.gcmc;
						this.actlist[5].content = res.jcdw;
						this.actlist[6].content = res.jddw;
					},
					fail: (error) => {
						console.log(error);
					}
				});
			} else if (option.flag == 'kz') {
				this.display=true;
				this.actlist = [];
				var dycszzu = this.$store.state.dycszzu;//this.$store.state.dycszzu变量存储扩展参数字段值数组
				var ziduan = this.$store.state.ziduan;//this.$store.state.ziduan变量存储扩展参数字段数组
				var tswz = this.$store.state.tswz;//this.$store.state.tswz变量存储扩展参数字段提示文字数组
				console.log(dycszzu+' '+ziduan+' '+tswz);
				for (var i = 0; i < ziduan.length; i++) {
					this.actlist.push({
						title: ziduan[i],
						content: dycszzu[i],
						placeholder: tswz[i],
						disabled: false
					})
				}
			}


		}
	}
</script>

<style>
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
	.hidden {
		display: none;
	}
</style>
