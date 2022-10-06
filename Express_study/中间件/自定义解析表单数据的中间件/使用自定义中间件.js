const express = require('express');

//导入自定义中间件(函数)
const myBodyParser = require('./表单数据解析中间件');

const app = express();

//使用自定义中间件
app.use(myBodyParser);

app.get('/', (req, res) => {
    res.send(req.body);
})

app.listen(80, () => {
    console.log("服务器启动成功!");
})

/*
    测试：通过postman发送请求，Body选择x-www-form-urlencoded（表单数据）,设置键值对发送请求
    客户端收到请求键值对的对象格式
*/