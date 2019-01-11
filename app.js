/*
* @Author: Nalaliu
* @Date:   2019-01-11 09:36:34
* @Last Modified by:   Nalaliu
* @Last Modified time: 2019-01-11 12:32:51
*/

'use strict';
var express = require('express')
var router = require('./router.js')
var bodyParser = require("body-parser")
var app = express()
app.use('/node_modules/', express.static('./node_modules/'))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//express中内置无法获取post请求体中的参数，用中间件body-parser
//  配置atr-template
app.engine('html', require('express-art-template'))
// 注意：express-art-template 默认的渲染的目录是 views下面的，如果需要修改默认渲染路径如下：
// 第一个参数 views 不能写错
// app.set('views', '目标文件夹')
// app.set('views', './pages')
//*************************************************
// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
app.use(router)

app.listen(3000,() => {
	console.log('running')
})