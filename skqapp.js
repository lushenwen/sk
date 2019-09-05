//创建斯凯奇服务器
const express=require('express')
const server=express();
const bodyParser=require('body-parser');
const userRouter=require('./routes/user');
// cors解决跨域问题
const cors=require('cors');
server.use(cors({
    origin:['http://127.0.0.1:8080','http://localhost:8080'],
    credentials:true
}));
// 添加session功能
const session=require('express-session');
server.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));
server.listen(3000);
//托管静态资源
server.use(express.static('public'));
//获取数据
server.use(bodyParser.urlencoded({
    extended:false
}));
//挂载用户路由
server.use('/user',userRouter);
