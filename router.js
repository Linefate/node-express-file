// 路由模块
var express = require('express')
// 创建路由对象
var router = express.Router()
// 导入操作文件数据的js文件
var handle = require('./handle.js')
router.get('/',(req,res) => {
	handle.read(function(err,users){
		if (err) {
			// 文件读取失败
			console.log(err)
			return res.status(500).send('Server error...')
		}
		// 文件读取成功，渲染界面
		res.render('index.html',{
			users: users
		})
	})
})
// 显示添加界面
router.get('/add',(req,res) => {
	res.render('add.html')
})
// 添加用户
router.post('/add',(req,res) => {
	console.log(req.body)
	handle.addUser(req.body,function(err){
		if (err) {
			return res.status(500).send('Server error...')
		}
		// redirect 重定向
		res.status(301).redirect('/')
	})
})
// 显示需要修改的用户信息
router.get('/modify',(req,res) => {
	console.log(req.query.id)
	handle.showUser(req.query.id,function(err,user) {
		if (err) {
			return res.status(500).send('Server errror')
		}
		res.render('modify.html',{
			user: user
		})
	})
})
// 修改用户信息
router.post('/modify',(req,res) => {
	console.log(req.body)
	handle.modify(req.body,function(err,user) {
		if (err) {
			return res.status(500).send('Server errror')
		}
		res.status(301).redirect('/')
	})
})
// 删除用户
router.get('/delete',(req,res) => {
	console.log('删除的id:',req.query.id)
	handle.delete(req.query.id,function(err,user) {
		if (err) {
			return res.status(500).send('Server errror')
		}
		res.status(301).redirect('/')
	})
})
// 导出router对象
// 只用导出一个对象
module.exports = router
