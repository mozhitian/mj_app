import Vue from 'vue'
// // 
// Vue.propotype.class = function(a,b){
//      return a+b
// }
var MyClass = {
	//将数组参数arr的每一个元素都转化为对象如[obj,obj]并返回数组
	toObj:function(arr){
		if(arr!=''&&arr!=undefined&&arr!=null){
			for (var i = 0; i < arr.length; i++) {
				arr[i]=JSON.parse(arr[i]);
			}
			return arr
		}else{
			return null
		}
		
	},
	//在一维数组里面查找元素b返回位置i
	findIndex:function(a,b){
		for(var i=0;i<a.length;i++){
			if(b==a[i].label){
				return i
			}
		}
	},
	//在二维数组里面查找元素b返回位置i
	findIndexDeep:function(a,b){
		for(var i=0;i<a.length;i++){
			for(var j=0;j<a[i].length;j++){
				if(b==a[i][j].label){
					return j
				}
			}
		}
	},
	//在一维数组里面查找元素b返回位置i
	findNums:function(a,b){
		for(var i=0;i<a.length;i++){
			if(b==a[i]){
				return i
			}
		}
	},
	getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}
	
	
	
}
export default MyClass