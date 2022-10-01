/*
    path.join()
*/
const path = require('path');

const pathStr = path.join('/a', '/b/c', '../', './d', 'e');//'../'在join中会抵消上一个路径,'./'没有影响,且join方法的路径片段可以以'/'开头，也可以不加，没有区别，这也就是优于"+"的原因，join可以把多余的"."、"./"自动规避掉，避免错误
console.log(pathStr); //  \a\b\d\e

const pathStr2 = path.join(__dirname, './files/1.txt');
console.log(pathStr2); //  D:\各种项目代码存储\node学习笔记\demo\files\1.txt

/*
    path.basename()
*/
const fpath = '/a/b/c/index.html';

var fullName = path.basename(fpath);
console.log(fullName); // index.html

var nameWithExt = path.basename(fpath, '.html');
console.log(nameWithExt); // index

/*
    path.extname()
*/
const fext = path.extname(fpath);
console.log(fext);// .html