const express = require("express");

const app = express();

app.get('/', function(req, res) {
    throw new Error('服务器内部发生了错误!');
    //发生错误之后的代码都不会执行，而且服务器报错并崩溃
    res.send('Home page');
})

//我们在所有路由之后挂在一个错误级别的中间件用来接收错误，让服务器继续正常运行，并给客户端一些反馈
app.use(function(err, req, res, next) {
    console.log('发生了错误:' + err.message);
    res.send("Error!" + err.message);
})

app.listen(80, () => {
    console.log('服务器已经启动');
})