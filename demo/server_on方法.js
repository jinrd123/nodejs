const http = require("http");

const server = http.createServer();

/*
    server.on方法的回调
*/

server.on("request", (req, res) => {
    //通过req获取客户端的相关信息
    //req.url获取客户端请求端口号之后的部分
    const url = req.url;
    //req.method获取请求类型
    const method = req.method;
    console.log(`请求的url是${url}, 请求的类型是${method}`);
    //调用res.end方法，向客户端返回内容
    //设置内容的编码格式来解决返回内容中包含中文导致的乱码问题
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end("一些服务器数据");
})

server.listen(80, function() {
    console.log("服务器已经启动");
})