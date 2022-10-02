/*
    创建get和post请求服务
*/

//导入express
const express = require('express');

//创建web服务器
const app = express();

//监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
//创建名为/user的get请求服务（监听客户端请求/user）
app.get('/user', (req, res) => {
    //res.send()方法向客户端发送一个JSON对象(底层应该是存在对象转JSON的操作)
    res.send({
        name: 'jrd',
        age: 20,
        gender: '男'
    })
})
//创建名为/user的post请求服务
app.post("/user", (req, res) => {
    //向客户端响应一个文本字符串
    res.send('请求成功');
})


//启动 web 服务器
app.listen(80, ()=>{
    console.log("express server running at http://127.0.0.1");
})