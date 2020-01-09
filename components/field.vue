<template name="field">
	<view>
		<!-- 表单填写字段 -->
		<view :key="index" class="text" :style="{marginTop:-css.textMargin+'%',marginLeft:css.textMargin+'%',width:css.textWidth+'%'}"
		 v-if="actlist.indexOf(list.title)<=-1" @click="ckwt">
			<label class="label" :style="{width:width+'%'}">{{list.title}}:</label>
			<input type="text" :placeholder="list.placeholder" class="input" v-model="list.content" @blur="getValue(index)" @focus="changeHeight"
			 :disabled="disabled||list.disabled" @click="ckwt" v-if="list.disableds==undefined||list.disableds==null" />
			<!-- 原数据驳回后 -->
			<view class="input" v-if="list.disableds==true" style="display: flex;flex-direction: row;">
				<input type="text" :placeholder="list.placeholder" class="input" v-model="list.contentt" @blur="getValues(index)"
				 :disabled="disabled||list.disabled" @click="ckwt" style="margin-left:0px ;" />
				<input type="text" :placeholder="list.placeholder" class="input" v-model="list.content" :disabled="true" style="margin-left: 0; border: 1px solid #DDD;   
			 background-color: #F5F5F5;   
			 color:#ACA899;" />
			</view>
		</view>
		<!-- 表单检测项目检测类型 -->
		<view :key="index" v-if="actlists.jcxm.indexOf(list.title)>-1">
			<view class="text">
				<label class="label">{{list.title}}:</label>
				<wpicker :disabled="disabled" :disabledt="list.disabled" @postJcff='getJcff'></wpicker>
			</view>
			<view class="text">
				<label class="label">{{list.title}}:</label>
				<wpicker :disabled="disabled" :disabledt="list.disabled" @postJcff='getJcff' style="display: none;"></wpicker>
				<pick :type="'picker'" :array="arr" :num="[jcffNum,index+1]" :disabled="disabled"></pick>
			</view>
		</view>
		<!-- 表单日期 -->
		<view :key="index" class="text" v-if="actlists.rq.indexOf(list.title)>-1">
			<label class="label">{{list.title}}:</label>
			<demo :wtrq="list.content" :index="index" :disabled="disabled" :disabledt="list.disabled"></demo>
		</view>
		<!-- 责任人 -->
		<view :key="index" class="text" v-if="actlists.zrr.indexOf(list.title)>-1">
			<label class="label">{{list.title}}:</label>
			<input type="text" class="input" v-model="zrrSect" :disabled="true" @click="openPopup(1)"/>
		</view>
		<!-- 检测类体 -->
		<view :key="index" class="text" v-if="actlists.jclt.indexOf(list.title)>-1">
			<label class="label">检测类型:</label>
			<pick :type="'picker'" :array="jclt" :num="[jcltNum,index]" :disabled="disabled"></pick>
		</view>
		<!-- 试验依据 -->
		<view :key="index" class="text" v-if="actlists.syyj.indexOf(list.title)>-1" :style="{marginTop:-css.textMargin+'%',marginLeft:css.textMargin+'%',width:css.textWidth+'%'}">
			<label class="label" :style="{width:width+'%'}">{{list.title}}:</label>
			<input type="text" :placeholder="list.placeholder" class="input" v-model="syyj"
			 :disabled="true" @click="openPopup(1)" v-if="list.disableds==undefined||list.disableds==null" />
			 <!-- 原数据驳回后试验依据 -->
			 <view class="input" v-if="list.disableds==true" style="display: flex;flex-direction: row;">
			 	<input type="text" :placeholder="list.placeholder" class="input" v-model="syyjt"
			 	 :disabled="true" @click="openPopup(1)" style="margin-left:0px ;"/>
			 	<input type="text" @click="openPopup(2)" :placeholder="list.placeholder" class="input" v-model="syyj" :disabled="true" style="margin-left: 0; border: 1px solid #DDD;   
			  background-color: #F5F5F5;   
			  color:#ACA899;" />
			 </view>
		</view>
		<alertInput v-if="alertInput.zt" :title="alertInput.title" :placeholder="alertInput.placeholder" :name="alertInput.name" :type="alertInput.text" :value="alertInput.value" @confirm="val" @cancel="cancel"></alertInput>


	</view>

</template>

<script>
	import {
		demo
	} from "@/components/sen-pickerview/demo/demo";
	import wpicker from "../components/w-picker-jcxm/index.vue";
	import Bus from "../bus.js"
	import pick from "@/components/pick.vue";
	import store from "../store/index.js";
	import alertInput from "@/components/alertInput.vue"
	export default {
		name: "field",
		components: {
			demo,
			wpicker,
			pick,
			alertInput
		},
		data: function() {
			return {
				//用于判断显示或者隐藏
				actlist: '检测项目||检测方法||委托日期||检测类体||计划开始日期||计划完成日期||责任人||编制日期||试验依据',
				//用于判断显示或者隐藏
				actlists: {
					jcxm: '检测项目',
					jcff: '检测方法',
					rq: '委托日期||计划开始日期||计划完成日期||编制日期',
					zrr: '责任人',
					jclt: '检测类体',
					syyj:'试验依据'
				},
				//存储该检测类型所有的检测项目
				jcxm: [

				],
				//存储用||分割出来的检测方法，如抗压||劈裂->[抗压，劈裂]
				jcffc: [

				],
				arr:[
					
				],
				//存储检测方法选择的第几个
				jcffNum: 0,
				//存储责任人选择的第几个
				jcltNum: 0,
				zrrSect:'',//责任人内容
				//三个检测项选择
				jclt: [],
				//设备宽度的百分之60
				inpWidth:0,
				syyj:'',//试验依据
				syyjt:'',//修改后的试验依据
				alertInput:{
					zt:false,
					title:'请输入',
					placeholder:'请输入',
					name:'content',
					text:'mul',
					value:''
				},

			}
		},
		props: {
			list: {
				type: Object
			},
			//接收当前字段是第几个
			index: Number,
			jclxselt: {
				type: String
			},
			//数据表中该委托单的检测项目
			jcxmselt: {
				type: String
			},
			//数据表中该委托单的检测方法
			jcffselt: {
				type: String
			},
			//数据表中该委托单的检测类体
			jcltselt: {
				type: String
			},
			//作为判断是否启用字段
			disabled: {
				type: Boolean,
				default:false
			},
			zrrselt: {
				type: String
			},
			//label宽度百分比
			width: {
				type: Number,
				default: 30
			},
			//input框样式
			css: {
				type: Object
			}
		},
		created() {
			const res = uni.getSystemInfoSync();
			// console.log(res.windowHeight+' '+res.windowWidth);
			this.inpWidth=res.windowWidth*0.6;
		},
		mounted() {
			var _this=this;
			Bus.$on('postMulVal',function([content,number,e]){
				if(number==0){
					_this.syyj=content;
				}else if(number==1&&e==0){
					_this.syyj=content;
					_this.syyjt=content;
				}else if(number==1&&e==1){
					_this.syyjt=content;
				}else if(number==2){
					_this.zrrSect=content;
				}
			});
			
			
		},
		methods: {
			//
			val([a,b]){
				console.log(a+b);
				this.alertInput.zt=false;
				var bl=b+' '+a+'车道';
				this.$emit('cheVal',bl);
			},
			cancel(){
				this.alertInput.zt=false;
			},
			//将正在填写的字段内容及序号返回给父组件
			getValue(index) {
				this.$emit('inc', [this.list.content, index]);
				Bus.$emit('resizeHeight');
			},
			getValuet(index){
				this.$emit('inc', [this.syyj, index]);
			},
			getValues(index) {
				// console.log(this.list.contentt);
				this.$emit('inc', [this.list.contentt, index]);
			},
			changeHeight(){
				Bus.$emit('postHeight');
			},
			ckwt() {
				if (this.list.title == '任务摘要') {
					this.$emit('lookdel')
				}
				if (this.list.title == '试验数据') {
					console.log(3333);
					this.$emit('looktes')
				}
				if (this.list.title == '车道结构') {
					this.alertInput.zt=true;
				}
			},
			getJcff(data) {
				// console.log(2323);
				this.jcffc = data.split('||');
				// console.log(this.jcffc);
				this.$store.state.jcffc=this.jcffc;
				this.jcffNum=this.MyClass.findNums(this.jcffc,this.jcffselt);
				// console.log(this.jcffNum);
			},
			openPopup(e){
				if(this.disabled==true){
					e=3;
				}
				this.$emit('openPopup',e);
			}
		},
		watch: {
			jcltselt: {
				handler(newval) {
					this.jclt = ['普通', '见证', '监督'];
					this.jcltNum=this.MyClass.findNums(this.jclt,newval);
					// console.log(this.jcltNum);
				},
				immediate: true
			},
			jcffc: {
				handler(newval,oldval) {
					// console.log(newval+'='+oldval);
					
					this.arr=newval;
				},
				immediate: true
			},
		},
		computed: {

		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 352px;
	}

	.text {
		display: flex;
		flex-direction: row;
		width: 95%;
		height: 120upx;
		margin-left: 3%;
		align-items: center;
		border-bottom: 1px solid #B2B2B2;
		/* background-color: #007AFF; */
	}

	.label {
		font-size: 14px;
		width: 30%;
		text-align: right;
	}

	.input {
		margin-left: 8%;
		text-align: left;
		font-size: 14px;
		width: 60%;
	}

	.select {
		margin-left: %;
	}

	.btn {
		margin-top: 75px;

	}

	.button {
		width: 90%;
		margin-left: 5%;
		height: 35px;
		background-color: #007AFF;
		color: #FFFFFF;
		font-family: '宋体';
		border-radius: 3px;
		font-size: 16px;

	}

	/*    .hidden{
		visibility: hidden;
	} */
	.hidden {
		visibility: hidden;
		width: 0px;
		height: 0px;
	}
</style>
