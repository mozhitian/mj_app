<template name='pdf'>
	<view>
		<button @tap="open()">{{list.name}}</button>
	</view>
</template>
<script>
	//pdf文件必须放在pdf.js/web里面，方便调用
	import browser from '../js_sdk/ww-browser/libs/browser.js'     
	export default {
		name:'pdf',
		data() {
			return {
			}
		},
		props:{
			list:{
				type: Object
			},
		},
		methods: {
			open() {
				var options = {
				     // 自定义参数
				}
				browser.init(options);
				// browser.show('http://baidu.com')
				browser.show(this.pdf+'file='+this.list.url)
				// uni.downloadFile({
				//   url: this.apiServer+'/basicdata/asd.pdf',
				//   success: function (res) {
				//     var filePath = res.tempFilePath;
				//     uni.openDocument({
				//       filePath: filePath,
				//       success: function (res) {
				//         console.log('打开文档成功');
				//       }
				//     });
				//   }
				// });
			}
		}
	}
</script>

<style>
</style>
