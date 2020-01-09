//cmd运行该js     node "c:\phpstudy2018\PHPTutorial\WWW\asdasdasd\pages\websocker\demo2.js"
var ws = require("../../node_modules/nodejs-websocket");//引入文件

var PORT=3000//监听8081端口

var clientCount=0;//多人参加，统计人数

var server = ws.createServer(function (conn) {
	console.log("New connection");
	clientCount++;
	conn.nickname = 'user' + clientCount;
	var mes={};
	mes.type="enter";
	mes.data = conn.nickname + ' come in';
	broadcast(JSON.stringify(mes))
	conn.on("text", function (str) {
		console.log("Received "+str);
		var mes={};
		mes.type="message";
		mes.data = str;
		broadcast(JSON.stringify(mes))
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed");
		var mes={};
		mes.type="leave";
		mes.data = conn.nickname + ' left';
		broadcast(JSON.stringify(mes));
		clientCount--;
	})
	conn.on("error",function(err){
		console.log("handle err");
		console.log(err);
	})
}).listen(PORT)

console.log("websocket server listening on port" + PORT);

//发送信息函数
function broadcast(str){
	//获取状态，向所有在线的用户发信息
	server.connections.forEach(function(connection){
		connection.sendText(str)
	})
}