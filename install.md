# 环境准备

**1. 购买云主机**

  在 https://cloud.tencent.com/product/cvm 购买云主机，购买之后就可以拥有对应权限的用户名和密码

**2. 下载 SSH 客户端**

  下载 SSH 客户端，如 [SecureCRT](https://www.vandyke.com/products/securecrt/)、ZenTermLite、OpenSSH、[Item2](https://iterm2.com/)。最后，

**3. 登录**

   通过上述软件登录云主机，我们以 Item2 为例：

```sh
/* ssh 用户名@IP */
ssh next@122.51.165.177
/* 输入密码 */
```


### 安装 Node

**1. 更新系统**

```
sudo yum -y update
```

**2. 安装 node@12**

```
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum clean all && sudo yum makecache fast
sudo yum install -y gcc-c++ make
sudo yum install -y nodejs
```
**3. 检查版本**

```
node -v
```

### 安装 Git

```
sudo yum install git
```

### 安装 PM2

```
npm install pm2 -g
```

### 上传代码

上传代码可以借助 github 来保持代码的同步，这个需要做一些简单的配置。

**1. 在 github 新建一个项目**

点击 [+](https://github.com/new) 在 github 新建一个项目，把本地的项目关联上远程仓库并提交。

**2. 在 CVM 上配置 SSH key**

```
ssh-keygen
```
在输入密码的时候直接两次回车就好，这样就可以免密拉取 github 代码了。

**3. 将 SSH 公钥在 github 进行配置**

在 [SSH and GPG keys](https://github.com/settings/keys) 新增 SSH Key。通过获取到的公钥粘贴到对应富文本中。

```
cat .ssh/id_rsa.pub
```

### 启动服务

编辑 pm2 配置文件，然后 pm2 start 即可。

```
pm2 ecosystem
```
- 修改 ecosystem.config.js 把 scripts 选项改成 npm start。
- 修改 app.js 的模块引用方式，把 import 改成 require。

```js
// import './lesson-5'
require('./lesson5')
```
开启服务

```
pm2 start
```
