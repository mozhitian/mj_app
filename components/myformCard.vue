 <template name="myformCard">
	<view>
		<view class="card">
			<view :class="['card_first',list.titleColor]">
				<view @tap="options" @longpress="openPopup" class="nav">
					<image class="img" src="../../../static/Set.png"></image>
					<text>{{list.jclx}}-{{list.jcxm}}</text>
				</view>
			</view>
			<view class="card_next">
				<text class="textf">{{list.firstTitle}}</text>
				<text class="textt">{{listContent.firstContent}}</text>
			</view>
			<view class="card_next">
				<text class="textf">{{list.secondTitle}}</text>
				<text class="textt">{{listContent.secondContent}}</text>
			</view>
			<view class="card_next" @click="lookrep(1)">
				<text class="textf">{{list.thridTitle}}</text>
				<text class="textt">{{listContent.thridContent}}</text>
			</view>
			<view class="card_next" @click="lookrep(2)">
				<text class="textf">{{list.fourTitle}}</text>
				<text class="textt">{{listContent.fourContent}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '../store/index.js';
	export default {
		name: "myformCard",
		data: function() {
			return {
				//表单卡的字段内容
				listContent: {
					firstContent: '',
					secondContent: '',
					thridContent: '',
					fourContent: ''
				},
				disabled:false//不同所处状态下操作按钮的启用和禁用

			}
		},
		props: {
			list: {
				type: Object
			},

		},
		methods: {
			//表单卡片头部点击根据状态跳转页面
			options: function() {
				// console.log(this.list.state);
				//送检委托
				if (this.list.state == 'a1&b') {
					uni.navigateTo({
						url: '../project_form/add_field?id=' + this.list.id
					})
				}else if (this.list.state == 'a2&b'||this.list.state == 'a2&r'||this.list.state == 'a4&b'||this.list.state == 'a4&r') {
					//派工收样
					uni.navigateTo({
						url: '../project_form/received?id=' + this.list.id
					})
				}else if(this.list.state=='a3&g'||this.list.state == 'a3&b'||this.list.state == 'a3&r'||this.list.state == 'a5&g'||this.list.state == 'a5&b'||this.list.state == 'a5&r'||this.list.state == 'a6&b'||this.list.state == 'a6&l'){
					//派工检测
					if(this.$store.state.process=='试验'){
						console.log(2222);
						if(this.list.state=='a6&b'||this.list.state=='a6&l'){
							this.disabled=true;
						}
						this.$store.state.state=this.list.state;//this.$store.state.state变量存储委托单状态
						uni.navigateTo({
							
							url: '../project_form/test?id=' + this.list.id+'&disabled='+this.disabled+'&state='+this.list.state
						})
					}else{
						console.log(33333);
						if(this.list.state=='a3&g'||this.list.state == 'a3&b'||this.list.state == 'a3&r'){
							this.disabled=true;
							console.log(this.disabled+' '+22);
						}
						uni.navigateTo({
							url: '../project_form/test?id=' + this.list.id+'&disabled='+this.disabled
						})
					}	
				}else if (this.list.state == 'a7&b'||this.list.state == 'a7&r'||this.list.state == 'a8&b'||this.list.state == 'a8&r'||this.list.state == 'a9&b'||this.list.state == 'a9&l') {
					//检测报告
					if(this.list.state == 'a9&b'||this.list.state == 'a9&l'){
						this.disabled=true;
					}
					uni.navigateTo({
						url: '../project_form/report?id=' + this.list.id+'&disabled='+this.disabled
					})
				}else if (this.list.state == 'a10&b'||this.list.state == 'a11&b'||this.list.state == 'a12&b'||this.list.state == 'a12&l') {
					//项目结算
					if(this.list.state == 'a11&b'||this.list.state == 'a12&b'||this.list.state == 'a12&l'){
						this.disabled=true;
					}
					uni.navigateTo({
						url: '../project_form/settlement?id=' + this.list.id+'&disabled='+this.disabled
					})
				}
			},
			//表单卡片头部长按触发父组件页面显示弹出层
			openPopup: function() {
				console.log(11111);
				this.$store.state.wtbh=this.list.wtbh;
				this.$store.state.id=this.list.id;//this.$store.state.id变量存储委托单id
				this.$emit('openPopup', [this.list.id, this.list.state])
			},
			//查看报告
			lookrep:function(e){
				if(this.list.fourTitle=='查看报告'&&e==2){
					uni.navigateTo({
						url:'../project_form/reportdata?id=' + this.list.id+'&disabled='+this.disabled
					})
				}else if(this.list.fourTitle=='试验结论'&&e==2){
					this.$store.state.id=this.list.id;
					this.$store.state.jclx=this.list.jclx;
					this.$store.state.state=this.list.state;
					var state=this.list.state.split('&')[0];
					console.log(state);
					if(state=='a3'||state=='a5'){
						this.$store.state.disabledt=false
					}else{
						this.$store.state.disabledt=true
					}
					uni.navigateTo({
						url:'../project_form/testdata?id=' + this.list.id+'&disabled='+this.disabled
					})
				}else if(this.list.threeTitle=='试验数据'&&e==1){
					uni.navigateTo({
						url:'../project_form/testdata?id=' + this.list.id+'&disabled='+this.disabled
					})
				}
				
			}
			

		},
		computed: {

		},
		watch: {
			//初始化时监听list对象，动态赋值给listContent
			list: {
				handler(newval, old) {
					switch (true) {
						case 'a1&b'.indexOf(newval.state)>-1:
							this.listContent = {
								firstContent: newval.wtbh,
								secondContent: newval.wtrq,
								thridContent: newval.wtdw,
								fourContent: newval.jbr
							}
							break;
						case 'a2&b||a2&r||a4&b||a4&r'.indexOf(newval.state)>-1:
							this.listContent = {
								firstContent: newval.jclx,
								secondContent: newval.jhksrq,
								thridContent: newval.jhwcrq,
								fourContent: newval.rwzt
							}
							break;	
						case 'a3&g||a3&b||a3&r||a5&b||a5&g||a5&r||a6&b||a6&l'.indexOf(newval.state)>-1:
						console.log(newval);
						    this.listContent = {
						    	firstContent: newval.jclx,
						    	secondContent: newval.syksrq,
						    	thridContent: newval.sywcrq,
						    	fourContent: newval.syjl
						    }
							break;
						case 'a7&b||a7&r||a8&b||a8&r||a9&b||a9&l'.indexOf(newval.state)>-1:
							this.listContent = {
								firstContent: newval.bgbh,
								secondContent: newval.bzrq,
								thridContent: newval.bzr,
								fourContent: ''
							}
							break;
						case 'a10&b||a11&b||a12&b||a12&l'.indexOf(newval.state)>-1:
							this.listContent = {
								firstContent: newval.wtdw,
								secondContent: newval.syksrq+'至'+newval.sywcrq,
								thridContent: newval.jcfy,
								fourContent: ''
							}
							break;
						default:
							break;
					}
				},
				immediate: true
			}
		}
	}
</script>

<style scoped>
	.card {
		width: 96%;
		height: 200px;
		margin-left: 2%;
		margin-top: 4%;
		border: 1px solid #E1E1E1;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;

	}

	.card_first {
		width: 100%;
		height: 26%;

		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 16px;
		color: #FFFFFF;
	}

	.img {
		width: 9%;
		height: 60%;
		margin-left: 4%;
		margin-right: 3%;
	}

	.card_next {
		display: flex;
		align-items: center;
		font-size: 16px;
		height: 18.5%;
		width: 100%;
		background-color: #FFFFFF;
		border-bottom: 1px solid #E1E1E1;
	}

	.textf {
		color: #007AFF;
		margin-left: 12%;
		margin-right: 8%;
		width: 40%;
	}

	.textt {
		color: #3F536E;
		width: 60%;
		font-size: 14px;
		text-align: left;
	}

	.nav {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.b {
		background-color: #007AFF;
	}

	.g {
		background-color: #4CD964;
	}

	.r {
		background-color: red;
	}

	.l {
		background-color: #ccc;
	}
</style>
