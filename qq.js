var express= require('express')
var config = require('./config/index')
var axios = require('axios')
const app = express()
var apiRoutes = express.Router()// 使用 express.Router 类来创建可安装的模块化路由处理程序

app.get('/search', function (req, res) {  //中间件
 console.log(req.headers)
  res.json({
      name:1,
  })

});



//app.use(express.static('./dist')) // 静态目录
let port = 8000; 
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})

