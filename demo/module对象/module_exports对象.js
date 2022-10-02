//给此模块的module.exports对象添加属性，等待其它模块引入
module.exports.username = "jrd";
module.exports.sayHello = function() {
    console.log("@@@@");
}