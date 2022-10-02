/*
    如果希望访问静态资源的时候，在静态资源文件名之前加一个前缀：
    app.use('/public', express.static('./静态资源文件夹'));
    相当于我们自定义一个静态资源的路径前缀
*/

const express = require('express');

const app = express();

//托管静态资源
app.use('/public', express.static('./静态资源文件夹'));

app.listen(80, () => {
    console.log('express server running at http://127.0.0.1');
})

/*
    运行后可访问：http://127.0.0.1:80/public/index.html
*/
