const fs = require('fs');
const path = require('path');

//创建匹配<style></style>标签的正则
//其中  \s表示空白字符  \S表示非空白字符  *表示匹配任意次  "/"前需要加"\"进行转义
const regStyle = /<style>[\s\S]*<\/style>/
//匹配<script>标签的正则
const regScript = /<script>[\s\S]*<\/script>/

//定义处理css样式的方法
function resolveCSS(htmlStr) {
    //使用正则提取页面中的<style>标签
    //正则表达式的exec方法：接收一个字符串，返回一个数组，数组的每一项都是字符串中符合正则的子串
    const r1 = regStyle.exec(htmlStr);
    //将提取出来的样式字符串去掉标签部分
    const newCSS = r1[0].replace('<style>', "").replace("</style>", "");
    //将提取出来的css样式部分写入到index.css文件中
    fs.writeFile(path.join(__dirname, './clock/index.css'), newCSS, err => {
        if(err) return console.log("写入css样式失败" + err.message);
        console.log("写入css样式成功");
    })
}

//定义处理js部分的方法
function resolveJS(htmlStr) {
    const r1 = regStyle.exec(htmlStr);
    const newJS = r1[0].replace('<script>', "").replace("</script>", "");
    //将提取出来的css样式部分写入到index.css文件中
    fs.writeFile(path.join(__dirname, './clock/index.js'), newJS, err => {
        if(err) return console.log("写入JS脚本失败" + err.message);
        console.log("写入JS脚本成功");
    })
}

//定义处理html的方法
function resolveHTML(htmlStr) {
    //使用字符串的replace方法，把内嵌的<style>和<script>标签，替换为外联的<link>和<script>标签
    const newHTML = htmlStr
        .replace(regStyle, '<link rel="stylesheet" href="./index.css"')
        .replace(regScript, '<script src="./index.js"></script>');
    //将替换完的html代码写入index.html文件
    fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, err => {
        if(err) {
            return console.log("写入HTML文件失败" + err.message);
        }
        console.log("写入HTML文件成功");
    })
}

//调用fs.readFile()方法读取文件
fs.readFile(path.join(__dirname, './index.html'), 'utf8', function(err, dataStr) {
    if(err) {
        return console.log('读取html文件失败' + err.message);
    }
    resolveCSS(dataStr);
    resolveJS(dataStr);
    resolveHTML(dataStr);
})
