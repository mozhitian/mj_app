<template name='websocket'>
	<view>
		<uni-popup type="top" ref="popup">
			<button @click="closePopup(index)" :ref="index" v-for="(item,index) in remain" :key="index" v-if="item.display">{{item.value}}</button>
		</uni-popup>
	</view>
</template>


<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		name: "websocket",
		props: {
			list: {}
		},
		data() {
			return {
				value: '',
				remain:this.$store.state.count
			}
		},
		methods: {
			closePopup(e) {
				console.log(e);
				this.hh=false;
				this.remain[e].display=false;
				console.log(JSON.stringify(this.remain));
				this.check();
			},
			check(){
				for(var i=0;i<this.remain.length;i++){
					var j=0;
					if(this.remain[i].display==true){
						j++
					}
				}
				if(j==0){
					this.$refs.popup.close();
				}
			}
		},
		// mounted() {
		// 	this.$refs.popup.open()
		// },
		components: {
			uniPopup
		},
		watch: {
			//消息推送
			// 进程提醒:送检委托-草稿箱提交,提醒试验部
			// 派工检测-收样-收样提交至试验草稿箱，提醒试验部
			// 派工检测-收样-延期提交至试验草稿箱，提醒试验部
			// 派工检测-试验-已完成提交到检测报告-草稿箱，提醒技术部
			// 检测报告-批准提交到项目结算的草稿箱，提醒财务部
			// 项目结算-草稿箱提交至待提交，提醒经办人
			//签名使用提醒
			'$store.state.count': {
				handler: function(valArr, oldVal) {
					if (valArr) {//valArr,数组嵌套对象，格式为[{value:""}]
						for(var j=0;j<valArr.length;j++){
							var val=valArr[j].value;
							var arr = (val||"").split("|");
							var type = arr[0];//类型
							var peo = arr[1];//提醒人员，多个，格式为"人员1;人员2;"
							var gcmc=arr[2];//工程名称
							var wtbh=arr[3];//委托编号
							switch (type) {//根据类型1至6筛选消息的内容
								case '1':
									var message = gcmc+':编号'+wtbh+'的任务待处理(收样-草稿)'
									break;
								case '2':
									var message = gcmc+':编号'+wtbh+'的任务待处理(试验-草稿)'
									break;
								case '3':
									var message = gcmc+':编号'+wtbh+'的任务待处理(检测-草稿)'
									break;
								case '4':
									var message = gcmc+':编号'+wtbh+'的任务待处理(项目结算-签发结算)'
									break;
								case '5':
									var message = gcmc+':编号'+wtbh+'的任务已完成，请催甲方缴费'
									break;
								case '6':
									var message = gcmc+':'+peo+'在编号'+wtbh+'的任务中使用了您的签名'
									break;
								default:
									break;
							}
							const value = uni.getStorageSync('setUserData');//读取缓存中的人员信息
							if (value) {
								var peoArr = (peo||'').split(";");//切割为数组
								for (var i = 0; i < peoArr.length; i++) {
									if (value.my_name == peoArr[i]&&value.dlzt==true) {//提醒人员和登录人员的信息(名字)一致且人员处于登录状态
										this.remain[j].value=message;
										this.$refs.popup.open();
										//删除已读的消息
										uni.request({
											url: this.apiServer + '/basicdata/components/message.php',
											data: {
												flag:"delect",
												type:type,
												peo:peoArr[i],
												wtbh:wtbh,
												gcmc:gcmc
											},
											method: 'POST',
											dataType: 'json',
											header: {
												'content-type': 'application/x-www-form-urlencoded', //POST头信息
											},
											success: (res) => {
												console.log(res.data);
											},
											fail: (error) => {
												console.log(error);
											}
										});
							
									}
									// console.log(JSON.stringify(peoArr));
								}
							}
						}
					}
				},
				deep: true
			}
		}

	}
</script>

<style>
</style>
