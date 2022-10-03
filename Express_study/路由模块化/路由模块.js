var express = require('express');
//1.创建路由对象
var router = express.Router();

//在路由对象上挂载具体的路由
router.get('/user/list', (req, res) => {
    res.send('Get user list');
})

//暴露路由对象
module.exports = router;