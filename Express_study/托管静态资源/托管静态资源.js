const express = require('express');

const app = express();

//托管静态资源
app.use(express.static('./静态资源文件夹'));

app.listen(80, () => {
    console.log('express server running at http://127.0.0.1');
})

/*
    运行后可访问：http://127.0.0.1:80/index.html
*/

/*
    如果需要托管多个静态资源目录，多次调用app.use(express.static('...'))即可
    访问静态资源文件的时候，会根据app.use(express.static('...'))的顺序查找文件夹
*/