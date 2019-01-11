/*
* @Author: Nalaliu
* @Date:   2019-01-11 10:48:38
* @Last Modified by:   Nalaliu
* @Last Modified time: 2019-01-11 16:17:01
* 对文件进行增删查改的操作函数
* 职责：操作文件中的数据，只处理数据，不关心业务
*/
var fs = require('fs')

var dataPath = './data.json'
// 读取文件
function readfs(path,callback){
	//******
	// 封装node.js fs模块的函数都是异步方法
	// 获取异步操作结果，则必须使用回调函数来操作
	//*****
	fs.readFile(path,'utf8',(err,data) => {
		if (err) {
			return callback(err)
		}
		// 将字符串数据转化为对象
		let users = JSON.parse(data)
		callback(null,users)
	})
}
// 写文件
function writeFs(path,newUser,callback){
	//******
	// 封装node.js fs模块的函数都是异步方法
	// 获取异步操作结果，则必须使用回调函数来操作
	//*****
	readfs(path,function(err,data){
		if (err) {
			return callback(err)
		}
		let users = data
		// 因为不是数据库操作，所以需要给新的会员添加id,
		newUser.id = parseInt(users[users.length-1].id) + 1
		users.push(newUser)
		 // 把对象数据转换为字符串，以便于存入data.js文件
		var fileData = JSON.stringify(users)
		fs.writeFile(path,fileData,(err,data) => {
		if (err) {
			// 有错误返回错误
			return callback(err)
		}
		callback(null)
	})
	})
}
// 
exports.readfs = readfs
//  因为要导出增加用户，修改用户，删除用户等多个方法,所以使用exports来导出数据
//  
/**
 * 读取列表
 */
exports.read = function(callback){
	// 这里的readfs还是异步操作，还得使用回调函数传出去
	readfs(dataPath,function(err,data){
		if (err) {
			return callback(err)
		}
		callback(null,data)
	})
}
// 不能这样读，因为还是异步函数，还得回调
// exports.read = function(){
// 	let aa = readfs(function(err,data){
// 		console.log(err)
// 		console.log('文件内容')
// 		console.log(data)
// 		if (err) {
// 			return 'err'
// 		}
// 		return data
// 	})
// 	console.log('这是——————————————————————————————')
// 	console.log(aa)
// 	return aa
// }

// 添加用户
exports.addUser = function(newUser,callback){
	writeFs(dataPath,newUser,function(err){
		if(err){
			return callback('失败，写入失败了')
		}
		return callback(null)
	})
}
// 读取其中一个用户的信息
exports.showUser = function(id,callback){
	readfs(dataPath,function(err,data){
		if (err) {
			return callback(err)
		}
		let users = data
		// id记得转为Number类型
		let user = users.find(item =>　item.id === parseInt(id))
		callback(null,user)
	})
}
// 修改用户
exports.modify = function(user,callback){
	readfs(dataPath,function(err,data){
		if (err) {
			return callback(err)
		}
		// 请求体内的表单的参数id是字符串转为Number类型
		user.id = parseInt(user.id)
		let users = data
		// 遍历找到id
		let uu = users.find(item => item.id === user.id)
		// 因为es6的find方法是一个浅复制，所以可以直接操作
		// uu = user
		// 这里不能像上面那样写，因为如果这样写的话，
		// 因为如果uu有 指向users这个数组的引用，但是如果直接等于user的话
		// 引用会断开，uu的引用会指向user
		for(let i in uu) {
			//拷贝user对象给引用uu
			uu[i] = user[i]
		}
		console.log(users)
		let fileData = JSON.stringify(users)
		fs.writeFile(dataPath,fileData,(err,data) => {
		if (err) {
			// 有错误返回错误
			return callback(err)
		}
		callback(null)
	})
	})
}
// 删除用户
exports.delete = function(id,callback){
		readfs(dataPath,function(err,data){
		if (err) {
			return callback(err)
		}
		// 请求的参数id是字符串转为Number类型
		id = parseInt(id)
		let users = data
		// 遍历找到id所对应的Index
		let index = users.findIndex(item => item.id === id)
		// 在数组中删除
		users.splice(index,1)
		// 将数组转为字符串
		let fileData = JSON.stringify(users)
		fs.writeFile(dataPath,fileData,(err,data) => {
		if (err) {
			// 有错误返回错误
			return callback(err)
		}
		callback(null)
	})
	})
}