const express = require("express");

const app = express();

//自定义的密钥，用于jwt加密生成token以及解密客户端携带的token
const secretKey = "761214Jl";

//安装并导入 JWT 相关的两个模块，分别是token生成模块jwt和token解析模块express-jwt
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

app.use(expressJWT({secret:secretKey}).unless({ path: [/^\/api\//]}));

app.post('/api/login', function(req, res) {
    //省略登录失败情况下的逻辑
    //用户登陆成功之后，生成JWT字符串，通过token属性相应给客户端
    res.send({
        status: 200,
        massage: '登陆成功',
        //调用 jwt.sign() 生成 JWT 字符串，三个参数分别是：用户信息对象、加密密钥、配置对象（expiresIn有效时限）
        token: jwt.sign({ username: 'jrd' }, secretKey, { expiresIn: '30s' })
    })
})

app.get('/admin/getinfo', function(req, res) {
    //只要用户携带了token并且被成功解析,req就有user这个属性
    console.log(req.user);
    res.send('服务器需要权限的接口已经接收到了请求，请到服务器控制台查看解析出来的token数据')
})

app.use((err, req, res, next) => {
    // 根据err.name判断是否为token解析失败的错误
    if(err.name === 'UnauthorizedError') {
        return res.send({ status: 401, message: '无效的token' })
    }
    //其它原因导致的错误
    res.send({
        status: 500,
        message: '未知错误'
    })
})

app.listen(80, () => {
    console.log('服务器启动成功！');
})

/*
    测试：
        启动服务器后，先向服务器发请求：http://127.0.0.1/api/login
        客户端获得服务器加密生成的token字符串（说明服务器已经成功加密数据生成token）
        新建一个get请求：http://127.0.0.1/admin/getinfo
        并为这个请求配置请求头：
            Authorization:bearer + 空格 + 刚刚获得的token字符串
        发送请求
    预期结果：
        服务器端控制台输出{ username: 'jrd' }，即为token包含的真实数据
        如果超出token时限或者token错误，服务器不崩溃，错误被错误中间件捕获，客户端收到提示

*/