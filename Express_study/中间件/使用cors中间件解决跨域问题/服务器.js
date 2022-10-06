const express = require('express');

//需要现在项目中安装cors：npm install cors
//引入第三方模块
const cors = require('cors');

const app = express();

//应用cors第三方中间件（cors()返回中间件函数）解决跨域问题
app.use(cors());

app.get('/', (req, res) => {
    console.log("@@@");
    res.send('服务器返回的get数据');
})
app.post('/', (req, res) => {
    console.log("@@@");
    res.send('服务器返回的post数据');
})

app.listen(80, () => {
    console.log('服务器启动成功');
})