# 物流小程序
> 小程序接口文档：[接口文档](https://github.com/guaidoukx/wuliu/blob/WYJ/小程序接口.docx)

## 2020-07-12
- [x] 修改连接服务器

## 2020-04-10
- [x] 存储网点经纬度到全局变量

- [x] 地图经纬度存储

## 2020-04-08
- [x] 样式调整：1）物流班列界面，高度百分比；2）配送列表界面，调度单信息高度调整

## 2020-04-06
### 修改
- [x] 配送标识退出后清除

## 2020-04-04
### 修改
- [x] Websocket：1.配送单；2.新增订单（后台未接）
- [x] 有“待取货”状态订单，添加红点提示
- [x] 配送列表加上配送单信息，修改布局

## 2020-03-27
### 一、修改
- [x] 登录时，使用“用户名”“密码”，从后台请求用户标识id等信息
- [x] 配送列表修改字段
- [x] 个人中心: 配送记录

## 2020-03-19
### 一、修改
- [x] 表单验证，验证填写数据是否合法（phoneNum, carNum, name）。
- [x] 历史配送单，mock，api

## 2020-02-25
### 一、接口变更（文档更新）
-  [x] GET,POST变更
-  [x] 登录请求数据加入驾驶员id

## 2020-02-24
### 一、接口变更(文档更新)
drivers下，新增name, tel, number，删除edit
### 二、全局变量/缓存
存储驾驶员信息（id, name, tel, number)
### 三、个人中心
-  [x] 工号、姓名、手机号、驾驶证（修改相应的js, wxml, wxss）
-  [x] 登录(logIn)跳转/realName目录下，同时realName进行修改
-  [x] mine相应修改：跳转时携带变量等

## 2020-02-10
### 一、合并
> 本地拉取远程master分支，合并远程master和本地WYJ分支，并更新远程WYJ分支
#### 存在冲突
-   [x] mine目录（js, wxml, wxss）--》 按“二、修改”处理
-   [x] project.config.json --》 以master分支为准
### 二、修改
#### 缓存认证信息
-  [x] （app.js）全局变量 globalData：添加 header 和 driverInfo
-  [x] （app.js）添加mock中（实际即接口）driverCertify返回参数data.sessionId
-  [x] （app.js）实现登录后，订单列表才能获取数据（监听） [参考](https://github.com/xyxl1997/watch)
-  [x] （realName.js，身份认证页面）写入缓存（即Storage）：sessionId, driverId, driverName
-  [x] （mine.js）修改函数 signOut：退出登录后清空缓存（Storage）
-  [x] （goods.js）请求后台数据时新增header
#### 其他
-  [x] 接口文档中ordersView修改：dispatch_id--》id ；其他以master分支为准，详见文档（包括id，warehouse，market，time，address，lng，lat，state）
-  [x] 所有dispatch_id--》id
### 三、功能
-  [x] 首次身份认证后，缓存信息
-  [x] 退出登录后，清空缓存、设置全局变量值为空
### 四、example（弃）
已登入微信，未认证时如下：example/个人中心-未登录
已认证后，如下：example/个人中心-已登录

## 2020-01-30更新
### 一、mock数据

1.	在utils目录下添加WxMock.js和mock.js[[下载地址](https://github.com/webx32/WxMock/tree/master/dist)]
2.  在utils目录下新增api.js
3.  在app.js中引入api.js，并添加请求数据操作

### 二、其他
#### 在goods.js中:
-   [x] 引入api.js，并新增onLoad函数；
-   [x] data中新增变量hiddenList和hiddenNum；
-   [x] 为“完成取货”“完成配送”和“删除订单”按钮分别添加orderLoad, orderFinish和orderHidden函数
#### 修改goods.wxml中相应内容
#### mine.js中data中加入id
#### realName目录下:
-   [x] 在realName.js中引入api.js，新增formSubmit函数
-   [x] 在realName.wxml中form标签上加上bindsubmit，在view上加上name=””
-   [x] 在realName.wxss中做对应的修改
#### driversEdit目录下（与realName相似）


