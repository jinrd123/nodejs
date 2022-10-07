const express = require('express');

const cors = require('cors');

const app = express();

//jsonp接口必须在配置cors中间件之前挂载，否则会被当作cors接口
app.get('/api/jsonp', (req, res) => {
    const funcName = req.query.callback;
    //我们想传给客户端的数据
    const data = { name: 'jrd', age: 20 };
    //返回给客户端的字符串脚本
    const scriptStr = `${funcName}(${JSON.stringify(data)})`;
    console.log(scriptStr);
    res.send(scriptStr);
})

//应用cors第三方中间件（cors()返回中间件函数）解决跨域问题
app.use(cors());

app.get('/', (req, res) => {
    console.log("@@@");
    res.send('服务器返回的get数据');
})

app.listen(80, () => {
    console.log('服务器启动成功');
})