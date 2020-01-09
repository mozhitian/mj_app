<template>
	<view class="content">
		<uni-popup ref="popupAf" type="center" :css="css.popup">
			<view class="uni-list" style="background-color:#FFFFFF;">
				<checkbox-group @change="checkboxChange" style="display: flex;flex-direction: column;justify-content:flex-start;align-content: space-between;width: 100%;background-color: #FFFFFF;">
					<label v-for="(item,index) in list" :key="index" class="uni-list-cell uni-list-cell-pd">
						<view>
							<checkbox :value="index" :checked="item.checked" :disabled="disabled" />
						</view>
						<view style="padding: 0px 40px 0px 40px;">{{item.content}}</view>
					</label>
				</checkbox-group>
				<view style="width: 30%;margin: 0 auto;margin-top: 10px;">
					<button style="font-size: 14px;" @click="close">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "./uni-popup/uni-popup"
	import Bus from "../bus.js"
	export default {
		name: 'mulcheck',
		components: {
			uniPopup
		},
		props: {
			//数组
			labelList: {
				type: [Object, Array],
				default: [{
					content: '多选项',
					value: 0,
					checked: false
				}]
			},
			//已经选择的项
			values: {
				type: Array,
				default: []
			},
			num:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				//作为复制父组件的传值数组labelList，因为labelList及时子元素对象checked改变了，也不能改变选项框的状态
				list:[],
				name:'',//若是修改状态下，此变量保存原数据
				labelName: this.values,
				labelDataList: '',
				css:{
					popup: 'transparent'
				},
				disabled:false,//复选框是否禁用
				shuzu:0,//把num的值赋值给shuzu
			};
		},
		methods: {
			labelBtn(name, index) {
				console.log(name, index, "nameindex")
				if (this.labelDataList.join(',').indexOf(name) > -1) {
					this.labelList[index].checked = true
				} else {
					this.labelList[index].checked = false
				}
			},
			checkboxChange: function(e) {
				this.labelName='';
				this.labelDataList = e.detail.value;
				for(var i=0;i<this.labelDataList.length;i++){
					var hh=this.labelDataList[i];
					this.labelName+=this.list[hh].content+';';
				}
				this.findVal(this.labelName,this.list);
				console.log(this.labelName);
				var e=1;
				Bus.$emit('postMulVal',[this.labelName,this.shuzu,e]);
				this.$emit('postVal',[this.labelName,this.shuzu]);
			},
			openPopup(e) {
				console.log(e);
				if(e==1){
					this.disabled=false
					this.findVal(this.labelName,this.list);
				}else if(e==2){
					this.disabled=true
					this.findVal(this.name,this.list);
				}else{
					this.disabled=true
					this.findVal(this.labelName,this.list);
				}
				this.$refs.popupAf.open();
			},
			close(){
				this.$refs.popupAf.close();
				this.$emit('val',[this.labelName,this.shuzu]);
			},
			findVal(lastName,fullName){
				for(var i=0;i<this.list.length;i++){
					this.list[i].checked=false;
				}
				var fatherName=(lastName||'').split(';');
				for (var j = 0, lenI = fatherName.length; j < lenI; j++) {
					var item=fatherName[j];
					var h=fullName.findIndex(function(value, index, arr) {
						return value.content==item;
					});
					console.log(h);
					if(h>=0){
						this.list[h]['checked']=true;
					}
				}
			}
		},
		watch: {
			//值为0则是正常模式，值为1则为修改模式
			num: {
				handler(newval) {
					console.log(newval);
					this.shuzu=newval;
				},
				immediate: true
			},
			labelList: {
				handler(newval) {
					if(newval!=null&&newval!=undefined){
							this.list=newval;
					}
				},
				immediate: true
			},
			//已经选择的选项的值，数组格式如[选项a,选项b]
			values: {
				handler(newval) {
					
					this.name=newval.join(';');
					this.labelName=newval.join(';');
					var _this=this;
					setTimeout(function(){
						var e=0;
						Bus.$emit('postMulVal',[_this.labelName,_this.shuzu,e]);
						_this.$emit('postVal',[_this.labelName,_this.shuzu]);
					},1000);
					for (var j = 0, lenI = newval.length; j < lenI; j++) {
						var item=newval[j];
						var h=this.list.findIndex(function(value, index, arr) {
							return value.content==item;	
						});
						if(h>=0){
							this.list[h]['checked']=true;
						}
						console.log(JSON.stringify(this.list));
					}
				},
				immediate: true
			}
		}
	}
</script>

<style>
	@import url("../common/uni.css");

	.selectBox {
		background: #EB5248 !important;
		color: #fff !important;
	}

	.checkbox {
		padding: 5px 10px;
		border: 1px solid #EB5248;
		margin: 10px;
		border-radius: 7upx;
		color: #000;
	}

	.content {
		padding: 10px;
	}
</style>
