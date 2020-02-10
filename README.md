# 物流小程序
> 小程序接口文档：[接口文档](https://github.com/guaidoukx/wuliu/小程序接口.docx)

## 2020-02-09
### 一、合并
> 本地合并master和WYJ分支，并更新远程WYJ分支
#### 存在冲突
-   [x] mine目录（js, wxml, wxss）
-   [x] project.config.json；
#### 修改：
1. 配送列表(goods)中：goods.wxml中，调度单编号由dispatch_id修改为id（共三处）


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


