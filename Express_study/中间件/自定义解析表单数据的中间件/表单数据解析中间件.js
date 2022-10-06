//querystring是一个内置模块，qs对象的parse方法可以把字符串解析成对象格式
const qs = require('querystring');

function bodyParser(req, res, next) {
    /*
        中间件中，客户端发送来的数据有可能太大，并不会一次性发送完毕，(会客户端每发送来一段数据，都会触发“data”事件),
        会把客户端数据切割之后分批发送到服务器，所以一次客户端请求可能触发多次data事件，我们需要手动把客户端数据进行
        拼接:利用req对象监听data事件（data事件回调的第一个参数就是数据块）
    */
   let str = '';
   req.on('data', (chunk) => {
       //拼接客户端数据
       str += chunk;
   })
   /*
        req对象监听end事件（请求体发送完毕之后自动触发）：我们把字符串格式的请求体数据解析成对象格式，然后挂载到req.body
        供下游的中间件和路由使用
   */
   req.on('end', () => {
       const body = qs.parse(str); //str解析成对象
       req.body = body;
       next();
   })
}

//向外暴露中间件函数
module.exports = bodyParser;