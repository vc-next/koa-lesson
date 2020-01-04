# Koa 入门


### HTTP

在互联网时代我们必须理解什么是 B/S 架构，这基本奠定了我们生存所要学习的技能。关于 B/S 百度百科是这么定义的：

> B/S架构即浏览器和服务器架构模式，是随着Internet技术的兴起，对C/S架构的一种变化或者改进的架构。 在这种架构下，用户工作界面是通过WWW浏览器来实现，极少部分事务逻辑在前端（Browser）实现，但是主要事务逻辑在服务器端(Server)实现，形成所谓三层3-tier结构。

C/S（Client/Server）：客户端/服务器结构。界面表示、事务处理逻辑放在客户端，服务端主要负责数据的存储管理，这就是胖客户端模式。而在三层架构模式下，表示层和少量的事务处理放在客户端，主要的事务处理逻辑放在业务应用服务端，同时数据存储管理仍然为独立的一层。

B/S（Browser/Server）：浏览器/服务器结构，界面显示逻辑放在浏览器，事务处理逻辑则在Web Server。极少数的逻辑在前端实现，但主要的事务逻辑在服务器端实现。通常由Browser、Web Server、数据存储Server形成三层架构。

HTTP：是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。

HTTPS：是以安全为目标的HTTP通道，简单讲是HTTP的安全版，即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。

简单的说每天都有成千上万的用户使用浏览器访问不计其数的站点（服务器），每一个过程用一张图来描述会更加形象：

![](../imgs/b-s-http.png)

从这张图不难看出如果想掌握服务端技能，一定要理解 HTTP 知识，否则很难进行服务端开发。HTTP 历经几个版本的迭代，我们普遍使用的是 HTTP 1.1。关于 HTTP 的学习主要涉及几个核心概念：http URL、MIME、Character Sets、Request、Response

#### HTTP URL

浏览器和服务器通信本质上是资源的传递，比如 HTML 文件、图片文件、JavaScript 文件等等。而浏览器如何识别不同的资源呢？这需要给每个资源起一个名字作为唯一的标识，就叫做统一资源标识符（Uniform Resource Identifier，URI)。有了统一资源标识符就可以在万维网轻易找到对应的资源，而找的过程就叫做统一资源定位系统（uniform resource locator;URL）。浏览器和服务器都要通过 URL 来发起请求和做出响应的。

> http_URL = "http:" "//" host [ ":" port ] [ abs_path [ "?" query ]]

一个完整的 URL 是有几部分组成的：协议、主机、端口、路径、查询。

#### MIME

前面我们提到浏览器和服务端通信本质上资源的传递，而资源会是不同性质的，如 HTML 文件就是普通的文本，而 JavaScript 是可执行的程序等，那我们如何约定资源的的类型呢？一个词：MIME。

> 媒体类型（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 ）是一种标准，用来表示文档、文件或字节流的性质和格式。它在IETF RFC 6838中进行了定义和标准化。

MIME的组成结构非常简单；由类型与子类型两个字符串中间用'/'分隔而组成，不允许空格存在。常见的  MIME 类型如下：

| 类型 | 描述 | 典型示例 |
| :--: | :-- | :-- |
| text  | 表明文件是普通文本，理论上是人类可读  | text/plain, text/html, text/css, text/javascript  |
| image  | 表明是某种图像  | 不包括视频，但是动态图（比如动态gif）也使用image类型	image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon  |
| audio  |  表明是某种音频文件 | audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav  |
| video  | 表明是某种视频文件  | video/webm, video/ogg  |
| application  | 表明是某种二进制数据  | application/octet-stream, application/pkcs12, application/vnd.mspowerpoint, application/xhtml+xml, application/xml,  application/pdf  |


#### Character Sets

在服务端下发的 HTML 文件中经常可以看到如下内容：

```html
<meta charset="UTF-8">
```
或者在浏览器抓包可以看到：

```
content-type: text/html;charset=utf-8
```

这里都有个 charset ，不难理解这是“字符集”的意思，对于文本文件需要解析就要知道整个文件中采用的是哪种字符集，如果不指定就会出现解析错误。可以通过如下资料获取所有 charset 集合： [Character Sets](http://www.iana.org/assignments/character-sets/character-sets.xhtml)

#### Request

浏览器必须发出请求才能在网络中找到目标资源，这个请求就是 Request。第一部分叫 Request line, 第二部分叫 Request header, 第三部分是 Body. header 和 body 之间有个空行。其中 Request-Line 包含 HTTP Method、URI、 protocol version。大家可以在 Chrome Network 面板随便找到一个网站打开看第一个 html 请求。

```
GET /wizardforcel/koa-doc/147575 HTTP/1.1
Host: www.kancloud.cn
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Referer: https://www.google.com.hk/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7
Cookie: __jsluid_s=1e4a075266b34bf5ff427bef966af898; PHPSESSID=78ut7tfa6j0jn0f5po9i1m32ge
```
不难看出浏览器就是在不断发送这种 Request 来和服务端通信的，在这里可以关注几个点：GET、Accept、Referer、Cookie，这几个也是我们将要在 Koa 程序中要用到的。
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

#### Response

服务端收到浏览器发出的请求，就要给出响应了即 Response。第一部分叫 Response line, 第二部分叫 Response header，第三部分是 Body。header 和 body 之间有个空行。下面是从 Chrome 拿到的前两部分，body 就是 HTML 本身了。

```
HTTP/1.1 200 OK
Date: Tue, 12 Nov 2019 09:52:15 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 7477
Connection: keep-alive
Vary: Accept-Encoding
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Vary: Accept-Encoding
Content-Encoding: gzip
X-Via-JSL: 0d60de7,-
X-Cache: bypass
```

### Node

众所周知 JavaScript 是最流行的编程语言之一，这么多年来一直被用作 Web 前端开发，在构建跨平台开发方也贡献了很大的力量如 React Native、PhoneGap、Titanium、Apache、NativeScript、Appcelerator等。实际上，JavaScript 依然可以在服务端进行开发，这就是传说中的 Node.js。


### Node.js 是什么？

![](../imgs/nodejs-1.png)


Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型。

Node 是一个让 JavaScript 运行在服务端的开发平台，它让 JavaScript 成为与PHP、Python、Perl、Ruby 等服务端语言平起平坐的脚本语言。

Node对一些特殊用例进行优化，提供替代的API，使得V8在非浏览器环境下运行得更好。V8引擎执行Javascript的速度非常快，性能非常好。Node是一个基于Chrome JavaScript运行时建立的平台， 用于方便地搭建响应速度快、易于扩展的网络应用。Node 使用事件驱动， 非阻塞I/O 模型而得以轻量和高效，非常适合在分布式设备上运行数据密集型的实时应用。

### 安装 Node

接下来我们所有的工作都会依赖 Node 开发环境，所以请现在电脑上安装 [Node.js](http://nodejs.cn/download/)。

现在检查下 Node 是否正常安装成功了呢？在命令行输入如下命令：

```
node -v
# v11.14.0
```
如果能显示版本号就证明 Node 已被成功安装了，如果没有请重新来过。

> [!TIP]
> 使用 Windows 操作系统的同学，可以安装 [Git Bash](https://gitforwindows.org/) 在这里可以正常使用上述的命令。

有了 Node 开发环境我们就可以使用 npm 工具进行项目初始化和开发了，为了提升效率我们使用第三方的脚手架快速初始化项目。

```
npm i koa-generator -g
```
首先要全局安装脚手架，然后利用脚手架来快速初始化项目，起哄 npm i 是 npm install 的简写，-g 是全局安装的意思。

```bash
# 1. 初始化项目
koa -e code
# 2. 进入到创建好的项目目录
cd code
# 3. 安装依赖包
npm i
# 4. 启动服务
npm run dev
```

> [!Warning]
> 这个脚手架初始化的项目还不支持 ES6+、也未支持 ESLint，显然需要我们自己动手改造下

```bash
# 1. 全局安装 eslint
npm i eslint -g
# 2. 进入到项目目录
cd code
# 3. eslint 配置
eslint --init
# 4. 按照提示一步一步选择就好
# 5. eslint 配置好后，配置 babel 来支持 es6+
# 6. 创建 babel 配置文件，参考 [babel 官网](https://www.babeljs.cn/docs/configuration)
touch .babelrc
# 7. 自己动手编辑下 .babelrc 文件的内容，如下
# {
#  "presets": ["@babel/preset-env"]
#}
# 8. 手动安装 babel 工具包
npm i @babel/cli @babel/core @babel/node @babel/preset-env -D
# 9. 修改 package.json 中的 scrips 选项
# {
#  "start": "babel-node bin/www",
#  "dev": "./node_modules/.bin/nodemon --exec babel-node bin/www",
#  "prd": "pm2 start bin/www",
#  "test": "echo \"Error: no test specified\" && exit 1"
#}
# 10. 重启服务
npm run dev
```

### Koa

虽然 Node.js 比较强大，前面我们也讲述了 Node 的优缺点。如果直接使用 Node.js 原生语法来开发服务，上手还是需要一些成本的，因此我们推荐 Koa 框架。

> Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

在学习 Koa 之前需要先了解几个核心概念，App、Request、Response、Context。

### App

App 是 Application 的缩写，用来表示一个服务端应用程序。在代码层面就是 Koa 的一个服务实例，用于封装所有业务逻辑。

```js
import Koa from 'koa';
const app = new Koa()
app.listen(8080)
```

### Context

Koa Context 将 node 的 request 和 response 对象封装在一个单独的对象里面，其为编写 web 应用和 API 提供了很多有用的方法。这些操作在 HTTP 服务器开发中经常使用，因此其被添加在上下文这一层，而不是更高层框架中，因此将迫使中间件需要重新实现这些常用方法。

比如我们想记录每个用户的访问时间和访问内容，可以这样做：

```js
import Koa from 'koa';
const app = new Koa()
app.use(()=>{return async ctx=>{
  console.log(ctx.ip,ctx.url);
}})
app.listen(8080)
```

这里的 ctx 就是 Context，它是服务程序不断传递的上下文，我们在任意地方都可以轻松通过 Context 拿到 Request、Response 信息。

### Request

通过 B/S 架构我们知道通信就是 Browser 和 Server（Node），每一次通信都是请求（Request）和响应（Response）。在 Koa 程序中 Request 对象保存了所有与请求相关的信息。

比如：http://baidu.com/search?txt=koa

对于这个 URL ，在服务端可以这样处理：

```js
import Koa from 'koa';
const app = new Koa()
app.use(()=>{return async ctx=>{
  console.log(ctx.req.host); // baidu.com
  console.log(ctx.req.pathname); // /search
  console.log(ctx.req.search); // ?txt=koa
}})
app.listen(8080)
```

### Response

Response 用来描述 HTTP 响应，在 Koa 框架去写 HTTP Response 不需要我们手动拼接格式，只需要操作对应的 API 就好。

```js
import Koa from 'koa';
import Router from 'koa-router'
const app = new Koa()
const router = new Router()
router.get('/',async ctx=>{
  ctx.body = 'hello world'
})
app.use(router.routes(), router.allowedMethods())
app.listen(8080)
```

这样在浏览器直接访问 http://localhost:8080 就可以看到 hello world 字样了。


至此，学会这几个核心概念，就可以轻松的跑起来一个简单的 hello world 应用程序了，抓紧去试试吧！
