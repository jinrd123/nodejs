const express = require('express');
const app = express();

app.use((req, res, next) => {
    const time = Date.now();
    //给req对象挂载自定义属性，从而把请求时间共享给所有路由
    req.startTime = time;
    next();
})

app.get('/', (req, res) => {
    res.send('请求时间：' + req.startTime);
})

app.listen(80, () => {
    console.log("服务已经启动");
})

/*
    请求：http://127.0.0.1/
    响应：请求时间：1664809702749
*/