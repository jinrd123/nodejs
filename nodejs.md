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

## req请求对象

server.on的回调函数可以接收到一个req对象，通过这个对象可以获得用户请求的相关信息(请求地址、请求方法)

# 模块化

把大的js文件拆分为若干小的相互依赖的js文件

## 好处：

* 代码复用
* 增加可维护性(api里的方法实现细节一旦修改，整个项目引入了方法的地方全部完成修改)
* 实现按需加载

## node.js模块分类

* 内置模块（fs、path、http）
* 自定义模块（用户写的js文件）

引入自定义模块时：`const m = require("./...")`，js文件的后缀可以省略

* 第三方模块（别人开发的模块，需要先下载再引入，引入类似于内置模块，直接写名字即可）

**引入某个模块时，会执行引入模块内部的js代码**

模块内声明的变量和方法只在当前模块内有效

## module对象

每一个js文件（每一个模块）在node环境下都有一个module对象，里面存放模块相关信息，require方法返回的就是引入模块的module对象的exports（module的子对象）。

## exports对象

js模块的exports对象，和module.exports初始状态（没有修改module.exports与exports对象指向的时候）指向的是同一个对象，也就是`module.exports === exports`，直接操作exports对象，操作更方便。**但是一旦修改了exports或者module.exports的指向，那么exports与module.exports就不一定是同一个对象了，require返回的永远是module.exports**。

## CommonJS模块化规范

node.js模块化遵循CommonJS模块化规范：

* 每个模块内部，module对象代表当前模块
* module.exports是模块对外的接口
* require加载某个模块，其实就是加载模块的module.exports。

# npm与包

包就是第三方模块

npm（Node Package Manager，简称npm包管理工具）,是npm,Inc公司提供的，在Node.js安装之时npm已经被集成安装到了电脑上。

## 安装包：

`npm install 包名`可简写为`npm i 包名`

初次安装包之后，项目文件夹下会生成node_modules文件夹和package-lock.json配置文件（npm包管理工具会自动维护）

* node_modules：存放已经安装到项目的包
* pack-lock.json配置文件：记录node_modules目录下每一个包的下载信息，例如包名，版本号，下载地址等

## 安装指定版本的包：

`npm i 包名@版本号`

## 包的语义化版本规范

包的版本号以“点分十进制”形式进行定义。总共三位数字,例如2.24.0

其中每一位数字代表的含义如下：

* 第一位数字：**大版本**，发生底层重构后更新版本数字
* 第二位数字：**功能版本**，大版本不变，功能更新时更新版本数字
* 第三位数字：**Bug修复版本**，修复bug后更新版本数字

版本号提升规则：前面的版本号增长后，后面的版本号归零

## 包管理配置文件

npm规定，项目**根目录**中，必须提供一个叫做package.json的包管理配置文件。记录项目的配置信息（用到哪些包、项目名、项目版本号...）

上传代码时，不上传node_modules文件夹（加入.gitignore），执行npm install安装依赖包时就是根据package.json进行安装的。

新建项目时，执行一次`npm init -y`即可创建package.json文件。

## 卸载包

`npm uninstall 包名`

## 安装的包只在开发阶段使用

项目包分为两类：

* 开发依赖包（被记录到package.json的devDependencies配置项中，只在开发期间使用）
* 核心依赖包（被记录在package.json的dependencies配置项中，项目开发和上线都会使用）

npm i 安装的包都会出现在package.json的dependencies配置项中，这是不管项目开发还是上线都会一直使用的包，如果某些包只在开发阶段使用：`npm i -D 包名`/`npm i 包名 -D`（参数位置不重要）,这样安装的包会出现在package.json的devDependencies配置项中。

## 下包速度慢的问题

下包默认从国外npm官方服务器下包，所以慢，淘宝提供了一个npm镜像服务器，也就是国外npm服务器的克隆版

`npm config get registry`：查看我们电脑npm下包的服务器

`npm config set registry="https://registry.npm.taobao.org/"`：修改npm下包服务器地址

## 安装全局包

`npm i -g 包名`

全局包自动安装在....（C盘某个文件夹）下，只有工具类的包（提供一些好用的命令）才有必要全局安装。

## 发布包

走偏了吧，我是来学node的，不是来开发包的。

# 模块加载机制

* 模块会在第一次加载后被缓存，也就是说如果重复加载模块，模块内部的代码不会重复执行。

* 内置模块（由Node.js官方提供的模块）加载优先级最高，所以会忽略node_modules下的同名模块
* 自定义模块，通过require加载自定义模块时，必须指定./或者../开头的路径标识符，如果不加路径标识符，node会当作内置模块或者第三方模块进行加载
* require导入自定义模块时，如果省略扩展名，Node.js会按以下顺序尝试加载
  * 按确切文件名进行加载
  * 补全.js
  * 补全.json
  * 补全.node
  * 加载失败
* 第三方模块（不是内置，也没有路径），Node.js会从当前模块的父目录开始找node_modules文件夹下的第三方模块，找不到就再移动到上一层目录，找node_modules下的第三方模块。
* 目录作为模块....