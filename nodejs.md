# node.js是什么？

js本身跑在浏览器中，浏览器就是js语言的运行环境，这个运行环境提供了很多内置api（Dom、Bom操作的方法都是浏览器运行环境提供的），**js结合了浏览器这个运行环境，自然就可以用来写前端**，那js可以用来写后端吗？**node.js就是一个运行环境，js结合node.js这个运行环境就可以写后端。**（官方定义：node.js是一个基于Chrome V8引擎的JavaScript运行时）

# 相关终端操作与命令

## 查看node的安装版本：

`node -v`

## 在Node.js环境中执行JavaScript代码：

`node <要执行的js文件路径>`

## 在指定位置（路径）打开终端：

进入我的电脑的目标位置，按住shift，点击鼠标右键，选择“在此处打开Powershell窗口”。（打开的是Powershell终端，是cmd终端的加强版）

## tab键快速补全路径：

## esc键快速清空当前已经输入的命令：

## cls命令清空当前终端窗口：

# fs文件系统模块

fs模块是Node.js官方提供的，进行文件操作的模块，提供了很多属性和方法。

我们使用之前需要先引入此模块：

`const fs = require('fs');`

## `fs.readFile()`

~~~js
const fs = require('fs');
//调用fs.readFile()方法读取文件
//参数1：读取文件的存放路径
//参数2：读取文件时采用的编码格式，一般默认utf8
//参数3：读取文件后执行的回调函数，两个参数err和dataStr
fs.readFile('./files/11.txt','utf8',function(err,dataStr) {
    //如果读取成功，则err值为null
    //如果读取失败，则err为错误对象，dataStr值为undefined
    if(err) {
        return console.log('文件读取失败！' + err.message);
    }
    console.log('文件读取成功，内容为：' + dataStr);
})
~~~

## `fs.writeFile()`

~~~js
const fs = require('fs');
//调用fs.writeFile()方法写文件
//参数1：想写的文件的存放路径
//参数2：想要写入文件的内容
//参数3：写文件后执行的回调函数，参数err
fs.writeFile('./files/11.txt','ok123',function(err) {
    //如果写入成功，则err值为null
    //如果写入失败，则err为错误对象
    if(err) {
        return console.log('文件写入失败！' + err.message);
    }
    console.log('文件写入成功！');
})
~~~

## 成绩整理案例

~~~js
/*
整理前，成绩.txt：
小红=99 小白=100 小黄=70 小黑=66 小绿=88
整理后，成绩-ok.txt：
小红：99
小白：100
小黄：70
小黑：66
小绿：88
*/
const fs = require('fs');
fs.readFile('成绩.txt','utf8',(err,dataStr)=>{
    if(err) {
        return console.log('读取文件失败！' + err.message);
    }
    const arrOld = dataStr.split(' ');
    const arrNew = [];
    arrOld.forEach(item => {
        arrNew.push(item.replace('=','：'));
    })
    //用换行符连接每一项
    const newStr = arrNew.join('\r\n');
    fs.writeFile('成绩-ok.txt',newStr,(err)=>{
        if(err) {
            return console.log('写入文件失败！' + err.message);
        }
        console.log('成绩写入成功！');
    })
})
~~~

## `__dirname`优化路径

`__dirname`:代表当前文件所处的目录，`./`代表的是终端运行脚本时所在的当前目录，所以`./`容易出现bug，而`__dirname`不会出现bug。

# path路径模块

## 引入path模块

`const path = require('path');`

## 路径拼接

* `path.join()`:把多个路径片段拼接为完整的路径字符串

**今后涉及路径拼接的操作，都要使用path.join()方法进行处理。**不要使用"+"进行字符串的拼接：`fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function(err, dataStr){...});`

## 获取路径中的文件名

* `path.basename(path, 文件扩展名（可选）);`：返回路径最后一部分，如果不提供扩展名，直接返回完整的文件名+拓展名；如果提供拓展名，那么只返回文件名无拓展名

## 获取路径中的文件扩展名

* `path.extname();`

# path+fs综合案例

我们把index.html文件拆分成index.css、index.js、index.html，并将拆分出来的三个文件存放到clock目录中。

两个注意点：

* `fs.writeFile()`方法只能用来创建文件，不能用来创建路径，也就是说clock文件夹必须存在，里面的index.js等文件可以没有
* 重复调用`fs.writeFile()`写入同一文件，新写入的内容会覆盖之前的内容

# http模块

理解：普通的电脑属于客户端，安装了服务器软件（如Apache）的电脑，就叫做服务器。(我们启动了服务器软件之后，比如把写好的html文件给Apache，其它的电脑就可以访问我们的电脑ip，看到html服务)。

在node.js中，我们不需要Apache这样的第三方web服务器软件，我们直接用http模块就可以写出来服务器软件，从而对外提供服务。

## 相关概念

### IP地址

ip地址是互联网上每台电脑的唯一地址，用”点分十进制（a.b.c.d）“表示，abcd都是0~255之间的十进制整数，例如192.168.1.1

* 互联网中的每台web服务器都有自己的ip地址（既然是服务器肯定联网了，联网肯定就有ip地址），终端运行`ping www.baidu.com`可以查看百度的ip地址，然后我们浏览器直接输入ip地址同样可以访问百度
* 开发期间，我们的电脑既是服务器又是客户端，我们可以通过`127.0.0.1`访问我们自己电脑的服务。

### 域名和域名服务器

域名就是ip地址的别名，两者一一对应，（百度ip：182.61.200.7对应域名www.baidu.com)，我们在浏览器输入域名的时候，其实底层还是先把域名转换为ip地址，这个转换工作就由域名服务器（DNS）来完成。

* 127.0.0.1对应的域名是localhost，代表我们自己的电脑

### 端口号

一台计算机，可以提供成百上千个web服务，每个web服务都占用这个计算机的一个端口

* URL的80端口可以被省略，一个web服务运行在80端口，那么访问时可以不写端口。（www.baidu.com可以访问百度肯定说明运行百度的服务器肯定把百度运行在了80端口）

## 创建最基本的web服务器

1. 导入http模块
2. 创建web服务器实例
3. 为服务器绑定事件，监听客户端的行为
4. （指定端口）启动服务器