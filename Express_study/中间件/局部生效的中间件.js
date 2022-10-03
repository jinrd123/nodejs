const express = require('express');
const app = express();

const mw = (req, res, next) => {
    console.log('调用了局部生效的中间件');
    next();
}

//给路由添加局部中间件（只有请求当前路由时，在路由处理函数之前才会执行的函数）
app.get('/', mw, (req, res) => {
    res.send('Home page');
})

app.listen(80, () => {
    console.log('服务器启动成功');
})