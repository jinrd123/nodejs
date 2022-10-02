const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res) => {
    const url = req.url;
    /*
        用户请求的格式是我们服务器的ip地址加上一段资源地址（我们说的请求接口）
        我们服务器返回给客户端的原理实际上就是拿到我们服务器电脑上的某个文件
        然后把这个文件的内容返回给客户端，所以我们一般设计用户请求的url和我们
        服务器电脑上的文件真实地址（文件名）相匹配，我们用__dirname结合用户传来的url去
        我们电脑上真实寻找这个资源，然后返回给客户端
    */
    //结合__dirname和url在我们服务器电脑上真实定位一个资源
    const fpath = path.join(__dirname, url);
    //如果用户访问/clock/index.html，我们就能fpath读取到这个文件，然后把字符串返回给客户端
    //客户端接收到的html语法的字符串会被解析成真正的网页
    //然后index.html中通过./index.css和./index.js访问了另一个文件的css和js，浏览器会自动请求这两个资源
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
        if(err) return res.end('404 Not found');
        res.end(dataStr);
    })
})
//期待用户访问localhost:80/clock/index.html

server.listen(80, function() {
    console.log("服务器已经启动");
})