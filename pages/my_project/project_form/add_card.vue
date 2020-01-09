<template>
	<view>
		<websocket></websocket>
		<view class="content">
			<field v-for="(item,index) in actlist" :key="index" v-if="index<num&&receval.second" :index="index" :list="item" @inc="alert"></field>
			<field v-for="(item,index) in actlist" :key="index" v-if="index>=num&&receval.first" :index="index" :list="item" @inc="alert" @cheVal="cheVal"></field>
			<view class="form_submit">
				<button :class="['submit',{hidden:receval.first}]" class="submit" hover-class="submit_cli" @click="nextStep">下一步</button>
				<button :class="['submit',{hidden:receval.second}]" class="submit" hover-class="submit_cli" @click="delay">新建</button>
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
			const currentDate = this.MyClass.getDate({
				format: true
			})
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
					disabled: true
				}, {
					title: "经办人",
					content: this.jbr,
					placeholder: "请输入经办人",
					disabled: true
				}, {
					title: "设计要求",
					content: "0.01mm",
					placeholder: "请输入设计要求",
					disabled: false
				}, {
					title: "检测类体",
					content: "",
					placeholder: "选择检测类型",
					disabled: false
				}, {
					title: "委托日期",
					content: currentDate,
					placeholder: "请选择委托日期",
					disabled: false
				}],
				disabled: false, //传给子组件作为判断是否启用
				dataAll: '', //表单内容
				sjc: '', //工程时间戳
				jcff:'贝克曼梁法（结构层总厚度       mm）',
				date: currentDate,
				jbr:'',
				num:7,//显示条数
				bgbh:'',//报告编号
			}
		},
		components: {
			field
		},
		methods: {
			cheVal(e){
				for(var i=0;i<this.actlist.length;i++){
					if(this.actlist[i].title=="车道结构"){
						this.actlist[i].content=e;
						console.log(this.actlist[i].content+' '+222);
					}
				}
			},
			//子组件传递过来的值,data是字段内容,i是第几个
			alert([data, i]) {
				this.actlist[i].content = data;
				console.log(this.actlist);
				// console.log(typeof(this.actlist));
			},
			nextStep() {				
				this.dataAll = '';
				for (var i = 0; i < this.actlist.length; i++) {						
					this.dataAll += this.actlist[i].content + '/';
				}
				console.log(this.dataAll);
				if (this.dataAll.indexOf(null) > -1 || this.dataAll.indexOf(undefined) > -1 || this.dataAll.indexOf('//') > -1||this.dataAll.substr(0, 1) == '/') {
					// console.log(this.dataAll);
					uni.showToast({
						icon: 'none',
						title: '请将信息填写完整'
					})
				} else {
					this.receval = {
							first: true,
							second: false
					},
					console.log(this.dataAll);
					uni.request({
						url: this.apiServer + '/basicdata/jcxm.php',
						data: {
							flag: 'getDelegatecs',
							jclx:this.jclx
						},
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded', //POST头信息
						},
						success: (res) => {
							console.log(res.data);
							var data=res.data;
							for (var i = 0; i < data.length; i++) {
								this.actlist.push({
									title: data[i].ziduan,
									content: '',
									placeholder: data[i].tswz,
									disabled: false
								})
							}
						},
						fail: (error) => {
							console.log(error);
						}
					});
				}


			},
			delay() {
				var this_=this;
				setTimeout(function() {
					this_.submitValue();
				}, 500);
			},
			submitValue() {
				this.dataAll = '';
				// if(this.jcff=='贝克曼梁法（结构层总厚度       mm）'){
				// 	var flag='insertJcxmt'
				// }else{
				// 	var flag='insertJcxmf'
				// }
				for (var i = 0; i < this.actlist.length; i++) {
					if(i<this.num){
						this.dataAll += this.actlist[i].content + '/'
					}else{
						this.dataAll += this.actlist[i].content + '||'
					}
					
				}
				if (this.dataAll.indexOf(null) > -1 || this.dataAll.indexOf(undefined) > -1 || this.dataAll.indexOf('//') > -1||this.dataAll.indexOf('||||') > -1) {
					// console.log(this.dataAll);
					uni.showToast({
						icon: 'none',
						title: '请将信息填写完整'
					})
				} else {
					console.log(this.dataAll);
					uni.request({
						url: this.apiServer + '/basicdata/jcxm.php',
						data: {
							flag: "insertJcxm",
							sjc: this.sjc,
							content: this.dataAll,
							projectOf:this.$store.state.projectOf,
							bgbh:this.bgbh
						},
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded', //POST头信息
						},
						success: (res) => {
							if (res.data.result == "success") {
								uni.showToast({
										icon: 'none',
										title: '新建成功'
									}),
									uni.redirectTo({
										url: '../project_process/delegate_process?sjc=' + this.sjc
									});
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
			const value = uni.getStorageSync('setUserData');
			if (value) {
				console.log("已登录用户:", value);
				this.actlist[this.num-4].content=value.my_name;
				console.log(this.actlist[this.num-4].content);
			}
			this.sjc = option.sjc;
			this.$store.state.projectOf=option.projectOf;//项目模块，材料检测或者实体检测
			console.log(this.sjc+' '+option.projectOf);
			console.log('222');
			// SELECT * FROM `检测项目表` ORDER BY id DESC LIMIT 1
			uni.request({
				url: this.apiServer + '/basicdata/jcxm.php',
				data: {
					flag: 'getWtbh'
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					res=res.data;
					var myDate = new Date();
					var tYear = myDate.getFullYear();
					var tMonth = myDate.getMonth()+1;
					var hh=tYear.toString().substr(-2);
					var wtbh='JFT'+hh+tMonth;
					var bgbh='JBT'+hh+tMonth;
					var numStr=res.wtbh.substr(-5);
					var num=Number(numStr);
					console.log(num);
					num++;
					this.actlist[2].content=wtbh+'-0'+num;
					this.bgbh=bgbh+'-0'+num;
				},
				fail: (error) => {
					console.log(error);
				}
			});
			//onload事件太快发送,mounted不能接受到数据
			setTimeout(function (){
				Bus.$emit("postJccs", ['市政工程-路面检测', '弯沉',option.projectOf]);
			},500);
			
		},
		mounted: function() {
			
			var this_ = this;
			
			Bus.$on('change', function([msg, i]) {
				if(i==0){
					var str=(msg||'').split('-');
					this_.jclx=str[0]+'-'+str[1];
				}
				this_.actlist[i].content = msg;
				// if(this_.actlist[1].content!='贝克曼梁法（结构层总厚度       mm）'&&this_.actlist.length==8){
				// 	this_.jcff=this_.actlist[1].content;
				// 	this_.actlist.splice(2,1);
				// 	this_.num--;
				// }else if(this_.actlist[1].content=='贝克曼梁法（结构层总厚度       mm）'&&this_.actlist.length==7){
				// 	this_.jcff=this_.actlist[1].content;
				// 	var obj={
				// 		title: "结构层总厚度(mm)",
				// 		content: "",
				// 		placeholder: "请输入结构层总厚度",
				// 		disabled: false
				// 	}
				// 	this_.actlist.splice(2,0,obj);
				// 	this_.num++;
				// }
			});
			
		},
	}
</script>

<style scoped>
	.submit {
		background-color: #007AFF;
		color: #FFFFFF;
	}

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
