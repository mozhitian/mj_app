<template>
	<view style="overflow: hidden;">
		<uni-calendar :insert="true" :lunar="true" :disable-before="true" :date="date" :start-date="'2010-1-01'" :end-date="'2099-12-30'"
		 @change="change" :selected="selected" />
		<view class="uni-calendar__text">
			<text class="text">本月试验合计XX项，其中已完成XX项。</text>
		</view>

		<view class="uni-calenda__button">
			<button :class="{active:canlenderModel}" @click="replace(1)">日历模式</button>
			<button :class="{active:listing}" @click="replace(2)">清单模式</button>
		</view>
		<websocket></websocket>
	</view>
</template>

<script>
	import {
		uniCalendar
	} from "@/components/uni-calendar/uni-calendar"
	export default {
		components: {
			uniCalendar
		},
		data() {
			return {
				// date: "2019-7-1", //初始化当前日期
				// //设置打卡时间（后台动态，时间格式固定）
				selected: [],
				canlenderModel: true, //日历模式选中状态
				listing: false, //清单模式选中状态
				state: '', //项目进度
				sjc: '',
				selectedzi: {
					type: Object
				},
				// date:[]
				tiaoZhuan: [],
				disable: true

			};
		},
		methods: {
			change(e) {
				console.log(e); //当前值获取
				console.log(this.disable);
				console.log(this.tiaoZhuan);
				e.fulldate=this.toDate(e.fulldate);
				if ((this.tiaoZhuan.indexOf(e.fulldate) > -1) && this.disable == false) {
					if (this.state == '1') {
						uni.navigateTo({
							url: '../my_project/project_process/received_process?wtrq=' + e.fulldate + '&sjc=' + this.sjc
						});
					}else if(this.state=='2'){
						uni.navigateTo({
							url: '../my_project/project_process/test_process?wtrq=' + e.fulldate + '&sjc=' + this.sjc
						});
					}else{
						
					}
				}
			},
			options() {
				console.log(this.state);
				if (this.state == 1) {

				} else if (this.state == 2) {

				}
			},
			replace(e) {
				if (e == 1) {
					this.canlenderModel = true;
					this.listing = false
				} else if (e == 2) {
					this.canlenderModel = false;
					this.listing = true
					if (this.state == '1') {
						uni.navigateTo({
							url: '../my_project/project_process/received_process?wtrq=all&sjc=' + this.sjc
						});
					}else if(this.state=='2'){
						uni.navigateTo({
							url: '../my_project/project_process/test_process?wtrq=all&sjc=' + this.sjc
						});
					}else{
						
					}
				}
			},
			toDate(d){
				var arr=d.split('-');
				var num2=Number(arr[1]);
				var num3=Number(arr[2]);
				if(num2<10){
					num2='0'+num2;
				}
				if(num3<10){
					num3='0'+num3;
				}
				return `${arr[0]}-${num2}-${num3}`;
				// console.log(typeof(arr[1])+' '+arr);
			}
		},
		onLoad: function(option) {
			this.state = option.state;
			this.sjc = option.sjc;
			uni.request({
				url: this.apiServer + '/basicdata/delegateDate.php',
				data: {
					sjc: option.sjc,
					state:option.state
				},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded', //POST头信息
				},
				success: (res) => {
					res = res.data;
					this.tiaoZhuan = res;
					console.log(res);
					for (var i = 0; i < res.length; i++) {
						this.selectedzi = {
							date: res[i],
							info: '点击',
						};
						this.selected.push(this.selectedzi)
					}

				},
				fail: (error) => {
					console.log(error);
				},
			});
		},
		updated: function() {
			this.disable = false;
		}
	}
</script>

<style lang="scss">
	.uni-calenda__button {
		position: absolute;
		left: 0%;
		bottom: 0%;
		display: flex;
		justify-content: flex-start
	}

	.active {
		background-color: #007AFF;
		color: #FFFFFF;
	}


	.uni-calendar__text {
		margin-top: 20px;
		margin-left: 6%
	}

	.text {
		color: blue;
		font-size: 16px;
	}
</style>
