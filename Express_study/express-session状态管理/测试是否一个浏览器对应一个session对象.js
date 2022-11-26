const express = require('express');

const session = require('express-session');

const app = express();

//配置session中间件
app.use(session({
    secret: '761214Jl',
    cookie: { maxAge: 10000 }, //cookie的有效时长，10s
    resave: false,
    saveUninitialized: true
}))

app.get('/api/login', (req, res) => {
    //输出session对象的user属性
    console.log(req.session.user);
    console.log(req.session);
    console.log(`当前的唯一会话ID，藏在cookie里的value：${ req.sessionID }`);
    //修改session对象的uesr属性为jrd
    req.session.user = 'jrd';
    res.send('成功请求');
})

app.listen(80, () => {
    console.log('服务器已经启动！');
})

/*
    测试：
        1.  使用edge浏览器请求http://localhost/api/login
            服务器端输出undefined
            再次请求http://localhost/api/login
            服务器端输出jrd
            说明：
                session对象存储了第一次请求保存的user信息
        2.  不关闭服务器，使用chrome浏览器请求http://localhost/api/login
            服务器端输出undefined
            说明：
                服务器端的req.session对象是针对发请求的浏览器的
                对于同一个浏览器发送的请求，req.session是共享的
                不用的浏览器创建了多个不同的session对象，这些session对象是相互独立的
*/