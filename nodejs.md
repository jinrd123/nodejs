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

**新建项目时，执行一次`npm init -y`即可创建package.json文件。之后就可以正常进行npm i 了，不然可能npm i 无效。**

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

# Express框架

是对于node.js中http模块的封装，用来创建服务器

对于前端，两种常见服务器：

* Web网站服务器：专门提供Web网页资源的服务器
* API接口服务器：专门对外提供API接口的服务器

使用Express，可以方便快速的创建Web网站服务器和API接口服务器。

## 安装express

新建文件夹Express_study，初始化项目：npm init；然后npm i express@4.17.1

## 托管静态资源

所谓静态资源，就是不与数据库，不通过网络交互信息的资源，比如写死的html页面、css文件。所谓托管静态资源说白了就是把一些死文件放到网上，比如把一个静态网页挂到网上。

我们可以用`express.static('存放静态资源的文件夹路径')`创建一个静态资源服务器，说白了就是创建一个服务器，托管这个文件夹下的文件（静态资源），把`express.static()` 传递给 `app.use()`作为参数，就完成了静态资源的托管。

现在我们就可以通过网址访问静态资源文件夹下的所有文件了，**但是请求路径中不包括静态资源文件夹,直接在ip地址后面加上文件夹下的文件名即可**。比如：public文件夹下有index.html文件，`app.use(express.static('public'))`，我们若想在网络上访问这个资源，请求地址应为：`http://localhost:3000/index.html`。

## nodemon

使用nodemon可以在修改js代码之后不用手动重启项目就可以自动重启项目

`npm i nodemon`安装之后，在启动项目的时候用`nodemon app.js(项目名)`启动项目，这样就可以监听代码修改自动重启项目。

## express路由

express里的路由就是指客户端请求与我们对应的处理函数之间的关系，express路由由三部分组成，请求方法、请求url地址、对应的回调函数。

说白了就是客户端提供的请求方法与url两者整体与服务器回调函数的对应关系。

举例：

~~~js
//匹配客户端的GET请求 且请求的 URL 为 "/"
app.get('/', function(req, res) => {
	res.send('hello world!');
})
~~~

这种操作就是在app上挂载路由。

## express中间件

我们express服务器在接收请求之后可以对请求进行若干次中间处理，上一次中间处理的结果作为输入传给下一级处理，最终响应。每次处理都是一个中间件。

### 全局生效的中间件

`app.use(function(req, res, next) { ...; next(); })`

说白了就是给app.use传一个函数，这个函数就是全局中间件，每次接收客户端请求之后都会先触发这个函数，最后才是路由处理函数执行。

可以连续`app.use()`定义多个全局中间件。

### 中间件作用

多个中间件之间（包括路由处理函数），共享同一份`req`和`res`，基于这个特性，我们可以在上游的中间件中为req或者res对象添加自定义的属性或者方法，供下游的中间件或者路由使用。

### 局部生效的中间件

把中间件函数写在app路由的第二个参数位置，这样就相当于这个中间件只对当前路由生效，首先定义中间件（middleWare）函数mw。

`app.get('/', mw, function(req, res) => { 路由处理函数 })`

#### 给一个路由添加多个局部中间件

~~~js
//以下两种形式完全等价
app.get('/', mw1, mw2, (req, res) => {res.send(...)})
app.get('/', [mw1, mw2], (req, res) => {res.send(...)})
~~~

### 中间件的分类

首先根据中间件挂载在app身上还是express.Router()身上可以分为：

* 应用（app）级别的中间件，通过以下方式挂载的都属于应用级别中间件：
  * app.use()
  * app.get()
  * app.post()
* 路由级别的中间件，通过以下方式挂载在路由上的属于路由级别的中间件：
  * router.use()
  * router.get()
  * router.post()

单独一类：**错误级别的中间件**，处理路由时如果发生错误，防止服务器崩溃，可以使用错误级别的中间件进行错误处理，（发生错误之后进入错误级别中间件处理函数）

**错误级别的中间件有四个形参，分别是err，req，res，next，且必须注册在所有路由之后**。

根据中间件来源又可以分：

* Express内置中间件
  * express.static()：快速托管静态资源的内置中间件
  * express.json()：解析JSON格式的请求体数据的中间件（请求体中携带了JSON格式的数据，我们服务器端通过req.body进行访问的时候，如果不提前配置express.json，req.body默认等于undefined）
  * express.urlencoded()：解析URL-encoded格式的请求体数据，作用与express.json相似。
* 第三方中间件：`npm install 中间件`，`require`导入中间件，`app.use()`注册并使用中间件 。

### 借助cors（第三方中间件）解决接口跨域问题

跨域问题：在客户端（html页面），我们借助axios向'http://127.0.0.1/'发送请求，这里我们两种打开客户端的方式：

* 直接打开文件夹里的`客户端.html`运行地址是`file:///D:/%E5%90...`——file协议与http协议不同，跨域
* 借助HBuilder打开，默认运行在某个不同于服务器80端口的任意端口，由于端口不同，跨域

我们发送出去的请求会正常被服务器接收，服务器也会正常返回数据，但是在客户端接收到服务器数据的时候，会验证是否同源（协议、ip地址、端口），由于不同源，所以服务器返回的数据会被拦截，浏览器接收不到服务器数据。

但如果我们的服务器使用了第三方中间件cors，那么浏览器就能正常接收到服务器的数据。**原理**：cors（Cross-Origin Resource Sharing，跨域资源共享）就是一系列的HTTP响应头，也就是服务器端向客户端响应数据的时候配置了这些HTTP响应头之后，浏览器就不再拦截跨域资源了。

cors注意事项

* cors在**服务器端**进行配置，客户端浏览器无需做任何额外的配置，只要服务器端配置了cors，客户端浏览器就可以请求开启了cors的接口。
* cors在浏览器中有兼容性（只有支持XMLHttpRequest Level2的浏览器才能正常访问开启了cors的服务器接口）

### cors相关的三个响应头(响应！)

我们服务器配置了cors之后，可以通过设置以下三个响应头来更具体的配置cors（具体允许哪些ip进行跨域资源共享、允许哪些默认以外的请求头、允许哪些默认以外的请求方式）

* `Access-Control-Allow-Origin`：决定我们的服务器允许跨域只针对指定的客户端ip，而不响应其它客户端。Access-Control-Allow-Origin的值除了是具体的ip地址以外，还可以是`*`，表示响应任何客户端的请求。

~~~js
//对http://localhost:80发送的请求进行响应
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:80');
~~~

* `Access-Control-Allow-Headers`：允许客户端使用指定的请求头（不在默认允许客户端使用的9个请求头之外的请求头）。因为cors仅支持客户端向服务器发送9个指定的请求头，如果使用了9个请求头之外的请求头，请求就会失败。

~~~js
//允许客户端使用额外的两个请求头
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');
~~~

* `Access-Control-Allow-Methods`：默认情况下，cors仅支持客户端发起GET、POST、HEAD请求，但如果客户端希望通过PUT、DELETE等方式请求服务器，就需要配置Access-Control-Allow-Methods。

~~~js
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
//允许所有的http请求方法
res.setHeader('Access-Control-Allow-Methods', "*");
~~~

### cors请求分类

* 简单请求（客户端只发送一次即可完成的请求），需满足两大条件：
  * 请求方式为GET、POST、HEAD之一
  * HTTP请求头不超过...九种字段范围
* 预检请求（先发送option请求进行预检，预检就是看看服务器能否正常响应，服务器响应预检请求成功后客户端才发送真正的请求，并且携带真实数据），除了简单请求就是预检请求

## 编写jsonp接口，利用jsonp解决跨域问题

所谓jsonp解决跨域，其实就是利用<script src="url">标签的特性，script访问某个url地址的资源并没有发送ajax请求，也就是说没进行网络请求就可以和服务器进行通信（或者说这种请求不受同源策略的限制），但是<script src="url">这样从服务器请求来的文本信息客户端会当作js脚本进行执行。所以我们就让服务器返回一个js执行语句，这样客户端接收到这个语句之后直接开始执行。一般服务器返回的这个js语句就是一个函数调用语句，调用的时候传递参数，参数就是服务器想传递给客户端的真实数据。所以我们客户端用script标签的url“发请求”的时候应该做好执行服务器传来的脚本的准备：准备好与脚本里函数调用语句相对应的函数，当然url里要通过query参数把客户端定义的函数名告诉服务器，方便服务器拼接脚本字符串。例如：`<script src="http://127.0.0.1/api/jsonp?callback=jsonpCallback"></script>`，并且我们客户端定义好一个函数`jsonpCallback(data) {处理数据}`。服务器的`/api/jsonp`路由就返回一个字符串`jsonpCallback(想传给客户端的真实数据)`。客户端的<script>标签接收到这个字符串之后，就当作js脚本进行执行，然后自动进入了我们客户端事先定义好的jsopCallback函数进行处理数据。

# MySQL数据库

开发相关软件

* MySQL Server：专门用来提供数据存储和服务的软件
* MySQL Workbench：可视化的MySQL管理工具，用来方便的操作存储在MySQL Server里的数据。

## 创建数据库和表

1. 使用workbench，输入密码连接本地数据库服务
2. 创建一个新数据库
3. 创建数据表
   1. 右键Tables——Create Table
   2. 建表选项卡：填写表名，表描述，字段设计（DataType数据类型：int整数、varchar(len)字符串、tinyint(1)布尔值）（字段的特殊标识：PK(Primary Key)主键，唯一标识、NN(Not Null)值不允许为空、UQ(Unique)值为一、AI(Auto Increment)值自动增长）
   3. Apply
4. 表中添加数据
   1. 右键表——Select Rows-Limit1000
   2. 手动填写数据即可，id（选择了AI的字段）不用填写，自动递增维护，status（设置了Default的字段）不用写，直接等于默认值

## 使用SQL管理数据库

### sql概念

英文全称Structured Query Language，结构化查询语言，是专门用来访问和处理数据库的编程语言（适用于关系型数据库）。

sql语句对大小写不敏感

### select

查询表中的数据

`select 属性名/* from 表名`

~~~sql
-- 从 users 表中把username和password对应的数据查询出来
select username, password from users
-- 通过 * 把 users 表中所有数据查询出来
select * from users
~~~

### insert

向数据表中插入新的数据行

`insert into 表名 (列1, 列2,...) values (值1, 值2,...)`

~~~sql
-- 向 users 表中，插入一条username为tom，password为0123的用户数据
insert into users (username, password) values ('tom', '0123')
~~~

### update

修改指定行的某些属性值

`update 表名 set 列名称 = 新值[, 列名称2 = 新值2] where 列名称 = 某值`

~~~sql
-- 把 users 表中 id 为 7 的用户的密码修改为 8888888
update users set password=8888888 where id=7
-- 把 users 表中 id 为 2 的用户密码和用户状态分别修改为123和1
update users set password='123', status=1 where id=2
~~~

### delete

删除指定的行

`delete from 表名 where 列名 = 值`

~~~sql
-- 删除 users 表中id为7的用户信息
delete from users where id=7
~~~

### where子句

删、改、查中使用where子句限定选择的范围

~~~sql
select 列名称 from 表名称 where 列名称 运算符 值
update 表名称 set 列=新值 where 列 运算符 值
delete from 表名称 where 列 运算符 值
~~~

#### 运算符：

=、!=、>、<、>=、<=、between、like

#### 连接词：

where子句中可以用`or`和`and`连接多个条件

~~~sql
-- 使用and查询所有status为0并且id小于3的用户
select * from users where status=0 and id<3
~~~

### order by 子句

根据指定的列对结果集进行排序

`order by 列名 asc/desc`，如果不指定asc或者desc，默认是asc升序排列

~~~sql
-- 对 users 表中的数据，按照 status 字段进行升序排列
select * from users order by status
-- 等价于
select * from users order by status asc
~~~

#### 多重排序

~~~sql
-- 对 users 表中的数据，先按照 status 字段进行降序排列，再按照 username 进行升序排序
select * from users order by status desc, username asc
~~~

### count(*)以及as关键字的使用

`count(*)`：返回查询结果总数据条数

`select count(*) from 表名`

`as`：为查询的列设置别名

~~~sql
-- 不设置as别名的话查询结果集的列名就是count(*)
select count(*) as total from users where status=0

select username as uname, password as upwd from users
~~~

# express项目中操作MySQL数据库

安装mysql模块

`npm install mysql`

服务器js文件内：

~~~js
//导入mysql模块
const mysql = require('mysql');
//建立与MySQL数据库的连接——创建数据库连接对象db
const db = mysql.createPool({
    host: '127.0.0.1', //mysql服务器运行的ip地址
    user: 'root', //登录数据库的账号（root账号是安装时系统给的）
    password: '761214Jl', 
    database: 'my_db_01' //MySQL账号下有若干数据库，指定要连接的具体的数据库
})
~~~

使用db数据库连接对象去操作数据执行sql语句并且返回sql结果：

## 查询操作

~~~js
//查询users表中的所有数据：
db.query('select * from users', (err, results) => {
    //查询失败
	if(err) return console.log(err.message);
    //查询成功
    /*
    	select查询语句的返回结果是一个数组
    	每一条数据都作为数组中的一个对象
    */
    console.log(results);
})
~~~

## 插入操作

~~~js
//要插入到users表中的数据对象
const user = { username: 'lgh', password: '1231223' };
//待执行的sql语句，其中英文?表示占位符，在使用db.query时，第一个参数是含有占位符的SQL语句，第二个参数就是一个数组，数组项依次对应?，第三个参数才是回调函数
const sqlStr = 'insert into users (username, password) values (?, ?)'
//使用数组的形式，依次为?指定具体的内容
db.query(sqlStr, [user.username, user.password], (err, results) => {
    if(err) return console.log(err.message);//插入失败
    /*
    	insert into插入语句返回的results是一个对象，
    	可以通过results.affectedRows属性判断是否插入成功
    */
    if(results.affectedRows === 1) {
        console.log('插入数据成功')
    }
})
~~~

向表中插入数据时，如果数据对象的每个属性和数据表的属性一一对应，可以使用如下快捷插入：

~~~js
const user = { username: 'lgh', password: '1231223' };

//insert into 表名 后面直接跟set和占位符，然后db.query的第二个参数直接放数据对象
const sqlStr = 'insert into users set ?'
//第二个参数直接用数据对象user
db.query(sqlStr, user, (err, results) => {
    if(err) return console.log(err.message);//插入失败
    if(results.affectedRows === 1) {
        console.log('插入数据成功')
    }
})
~~~

## 更新操作

~~~js
const user = { id: 7, username: 'lgh', password: '1231223' };
const sqlStr = 'update users set username=?, password=? where id=?'
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
    if(err) return console.log(err.message);//更新失败
    if(results.affectedRows === 1) {
        console.log('更新数据成功')
    }
})
~~~

更新表数据时，如果数据对象的每个属性和数据表的字段一一对应，可以快捷更新（类似于快捷插入）

~~~js
const user = { id: 7, username: 'lgh', password: '1231223' };

const sqlStr = 'update users set ? where id=?'
//第二个参数直接用数据对象user
db.query(sqlStr, user, (err, results) => {
    if(err) return console.log(err.message);//失败
    if(results.affectedRows === 1) {
        console.log('更新数据成功')
    }
})
~~~

## 删除操作

~~~js
const sqlStr = 'delete from user where id=?'
//在db.query为占位符指定具体值的时候，如果SQL语句中只有一个占位符，db.query中可以省略数组括号
db.query(sqlStr, 7, (err,results) => {
    if(err) return console.log(err.message);
    if(results.affectsRows === 1) {
        console.log('删除数据成功');
    }
})
~~~

使用delete语句，会把真正的数据从数据库表中彻底删除，为了防止错误操作引起数据丢失，保险起见，推荐使用**删除标记**的形式，来模拟删除动作。所谓删除标记就是给表增加一个状态字段（比如status，0表示正常，1表示被删除）,然后用update语句修改status模拟删除的动作。

# web开发模式

## 基于服务器渲染的传统Web开发模式

服务器拿着数据，在服务器端通过字符串的拼接，动态生成HTML页面，然后发送给客户端

优点：

* 前端耗时少，浏览器只需要渲染页面即可
* 有利于SEO

缺点：

* 占用服务器端资源（服务器生成html）
* 不利于前后端分离，开发效率低

## 前后端分离的Web开发模式

后端只负责提供API接口，前端使用Ajax调用接口获取数据

优点：

* 开发体验好
* 用户体验好（轻松实现页面的局部刷新）
* 服务器端压力小

缺点：

* 不利于SEO（但是Vue、React框架的SSR技术可以很好的解决SEO问题）

## 选择Web开发模式

**不谈业务场景而盲目使用何种开发模式都是耍流氓**

* 企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的SEO，选择服务器端渲染。
* 类似于后台管理项目，交互性强，不考虑SEO，选择前后端分离的开发模式
* 为了同时兼顾首屏渲染速度和前后端分离的开发效率，一些网站采用首屏服务器端渲染+其它页面前后端分离开发模式

# 身份认证

又称“身份验证”、“鉴权”，是指通过一定手段，完成对用户身份的确认。

* 服务器端渲染推荐使用**Session认证机制**
* 前后端分离推荐使用**JWT认证机制**

## Session认证机制

背景：HTTP协议的无状态性——客户端每次http请求都是独立的，**服务器不会主动保留每次http请求的状态**

突破http无状态的限制：Cookie——存储在用户浏览器中一段不超过4kb的字符串，由key-value和其它几个用于控制cookie有效期，安全性、使用范围的可选属性组成。

不同域名下的cookie各自独立，每当客户端发送请求时，会自动把当前域名下所有未过期的cookie发送到服务器，Cookie的4个特性：

* 自动发送
* 域名独立
* 有过期时限
* 4kb大小限制

客户端第一次请求服务器的时候，服务器通过响应头的形式，给客户端发送身份认证的cookie，客户端自动保存在浏览器中，以后客户端请求的时候，会自动将身份认证的cookie通过请求头发送给服务器。

但为了提高安全性（防止客户端随意读写cookie），我们增加了服务器端存储，用户首次请求时服务器生成cookie并不包含一些重要的用户信息（密码），而是服务器本地存储重要的用户信息，用户携带cookie再次请求成功时服务器再读取用户信息返回给客户端。

这种客户端用cookie存储身份认证信息，服务器端也保存身份认证信息和用户信息，每次客户端请求携带的cookie和服务器的信息进行对比，然后返回给客户端信息的机制，就是Session认证机制。

### 网上看到的比较通俗的描述：

#### **什么是cookie**

cookie是一种客户端的状态管理技术

当浏览器向服务器发送请求时，服务器会将少量的数据以set-cookie消息头的方式发送给浏览器

浏览器会将这些数据保存下来。当浏览器再次访问服务器时，会将这些数据以cookie消息头的方式发送给服务器。

#### **什么是session**

session是一种服务器端的状态管理技术。

当浏览器访问服务器时，服务器创建一个session对象(该对象有一个唯一的id号，称之为sessionId),服务器在默认情况下，会将sessionId以cookie的方式(set-cookie消息头)发送给浏览器,浏览器会将sessionId保存到内存。当浏览器再次访问服务器时，会将sessionId发送给服务器，服务器依据sessionId就可找到之前创建的session对象。

这里总结到cookie和session分别是客户端和服务器端不同的状态管理技术（vuex就是vue的状态管理）,也就是一种让资源共享的技术，对于客户端来说，每次请求都可以访问到cookie；对于服务器端来说，原本每次独立的路由处理都可以访问到共享session对象（类似于服务器的全局变量）。

### 服务器端配置session状态管理

`npm install express-session`

项目内：

~~~js
//导入 session 中间件
var session = require('express-session')

//配置 Session 中间件
app.use(session({
    secret: '761214Jl', //secret 属性值可以为任意字符串
    resave: false, //固定写法
    saveUninitialized: true //固定写法
}))
~~~

当express-session中间件配置成功后，即可通过`req.session`来访问session对象，从而在req.session上挂载对象，存储信息。

**req.session对于同一浏览器发送的请求之间共享，不同浏览器创建的req.session之间相互独立。**详见测试代码

`req.session.destroy()`：清空服务器保存的session信息。