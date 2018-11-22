# music-player 

算是学习Vue2.0的第二个项目，基本上是界面是模仿的网易云，但是交互逻辑更像qq音乐，目前项目的数据来源是qq音乐，但是已经崩了一个音乐资源，所以用的是一个大佬的接口 [BZQLL](https://www.bzqll.com/2018/10/39.html)。接下来打算在搭完服务器后上线项目。

# 技术栈

* vue + vuex + router 
* better-scroll (页面上下滑动 也可用于 左右滑动)
* vue-lazyload (懒加载)
* swiper (页面左右滑动)
* axios (请求数据)
* good-storage (localStorage的包装)




# 框架设计

* header 头部 嵌入了 搜索栏 以及 用户中心
* tab 用于3个页面的切换
* component 放入了3个大组件，分别是推荐、排行、歌手
* player 播放器 通过vuex来控制是否显示大播放器还是小播放器
* confirm 用于显示 提示信息 或者 歌曲列表，比如 添加歌曲成功 删除成功 是否删除歌曲 等 
（主要时为了能保证它能显示在界面最顶层才出此下策）

## 主界面

通过swiper实现3个tab左右滑动切换，能实现一级路由，二级路由就不行了。
主要参考我的一个[demo](https://github.com/zzNire/RouterSwiper/commits/master)


# 项目设计

主要分为五个大块
* 推荐页面
* 排行页面
* 歌手页面
* 搜索页面
* 播放器

![主界面](./readme-picture/main.png)

# 推荐页面
* 滑动推荐
* 歌单

## 数据请求
直接通过JsonP请求，可以获取 轮播图数据 和 推荐歌单
url:https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg

## 滑动推荐

[Slider组件](./src/base/slider/slider.vue) 
通过Better-Scroll实现，在Slider中实现Better-Scroll的初始化以及参数设置。
通过SetTimeout实现轮播，为了循环播放，需要将组件宽度设置为两倍的单个图片大小

## 歌单
通过每个块设置为inline-block，设置宽度为33.33%来保证一行只有三个

通过如下设置来保存标题只有两行，多出来的显示省略号

父组件
```
    overflow: hidden;
    text-overflow: ellipsis;
```
文字
```
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;   
```
# 排行页面
![rank](./readme-picture/rank.png)

实现比较简单 主要介绍数据请求来源

url：https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg 

直接通过JsonP请求

>一个细节
在设定 `width：100%` 和 设定边距 的情况下，想要实现溢出显示省略号，需要设置 `box-sizing: border-box` 和设定 内边距 ，外边距不可行，这样内容的宽度就是P标签的宽度减去内边距 

# 歌手页面
![singer](./readme-picture/singer.png)

## 数据请求
需要跨域请求，使用ProxyTable反向代理

url：'/api/getSinger'

```
 '/api/getSinger':{
        target: 'https://c.y.qq.com/v8/fcg-bin/v8.fcg',
        changeOrigin: true,
        secure: false,
        /*bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://c.y.qq.com';
          req.headers.host = 'c.y.qq.com';
        },*/
        pathRewrite: {
          '^/api/getSinger': ''
        }
```


两个技术点
* 类别框在滑动过程中悬停在顶部
* 侧边快捷导航栏

## 类别框在滑动过程中悬停在顶部

主要通过一个固定在顶部的块实现，这个块会在每一个类滑动到起始位置或结束位置时，跟随scroll一起滑动，在切换类型时，改变文本内容，并重新回到顶部。

需要计算每一个类的高度，以便于判断是否滑动到边界位置。

滑动位置通过监听 Better-Scroll 的 scroll 事件。

## 侧边快捷导航栏 

通过监听Touch事件来实现
* touchstart 记录起始位置，通过高度跳转到相应的类别
* touchmove 计算偏移量，通过偏移量跳转到相应的类别
* touchend （未使用）



#播放器实现






## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
