/*
    创建最基本的web服务器
*/

//1.导入http模块
const http = require("http");
//2.创建web服务器实例
const server = http.createServer();
//3.为服务器绑定request事件，监听客户端的请求,第一个参数"request"是特定字符串，指有人请求的时候触发回调
server.on("request", function() {
    console.log('有人访问了服务器');
})
//4.启动服务器,第一个参数指定端口
server.listen(8080, function() {
    console.log("服务器已经启动");
})