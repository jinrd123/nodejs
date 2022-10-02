const express = require('express');

const app = express();

//如果接收params参数的话需要在路径中用":"占位
app.get('/:id', (req, res) => {
    //通过 req.query 可以获取到客户端发送来的query参数;req.params可以获取params参数
    //注意： 默认情况下，req.query、req.params 是一个空对象
    console.log(req.query);
    console.log(req.params);
    res.send("您所发送请求的query参数是:" + JSON.stringify(req.query) + "params参数是:" + JSON.stringify(req.params));
})
/*
    请求：http://127.0.0.1/jrd?age=20&sex=man
    接收：您所发送请求的query参数是:{"age":"20","sex":"man"}params参数是:{"id":"jrd"}
*/

app.post("/user", (req, res) => {
    res.send('请求成功');
})

app.listen(80, ()=>{
    console.log("express server running at http://127.0.0.1");
})