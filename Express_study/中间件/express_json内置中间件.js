const express = require("express");

const app = express();

//app.use(express.urlencoded({extended:false}))处理请求体为x-www-urlencoded格式的数据
app.use(express.json());

app.post('/user', (req, res) => {
    //如果我们不配置解析json格式数据的中间件，这里req.body默认为undefined
    console.log(req.body);
    res.send('ok');
})

app.listen(80, () => {
    console.log('服务器已经启动');
})

/*
    这里我们借助postman进行测试，发送请求的时候不选择Params选项，选择Body选项，然后raw子选项，后面选择JSON格式数据
    里面写一个json格式的数据：
    {
        "name": "jrd",
        "age": 20
    }

    测试express.urlencoded({extend: false})中间件时，postman发请求时Body子选项选择x-www-urlencoded，然后下面配置键值对
*/