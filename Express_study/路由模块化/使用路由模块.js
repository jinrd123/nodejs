const express = require('express');
const app = express();

//1. 导入路由模块
const router = require('./路由模块');
//2. app注册路由模块
app.use(router);

app.listen(80, () => {
    console.log('http://127.0.0.1');
})

/*
    请求：http://127.0.0.1/user/list
    响应：Get user list
*/