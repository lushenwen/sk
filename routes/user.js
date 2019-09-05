//创建用户路由
const express=require('express');
const router=express.Router();
const pool=require('../pool');
//创建用户名验证路由post unm
router.post('/unm',(req,res)=>{
    var obj=req.body;
    var sql='SELECT uid FROM skq_user WHERE uname=?';
    pool.query(sql,[obj.uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:-1,msg:'用户名已存在'})
        }else{
            res.send({code:1,msg:'用户名可用'})
        }
    })
})
//创建用户注册路由post reg
router.post('/reg',(req,res)=>{
    var obj=req.body;
    var sql='INSERT INTO skq_user(uname,upwd,phone) VALUES(?,md5(?),?)';
    pool.query(sql,[obj.uname,obj.upwd,obj.phone],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'注册成功'})
        }else{
            res.send({code:-1,msg:'注册失败'})
        }
    });
})
//创建用户登陆路由post login
router.post('/login',(req,res)=>{
    var obj=req.body;
    var sql='SELECT uid FROM skq_user WHERE uname=? AND upwd=md5(?)';
    pool.query(sql,[obj.uname,obj.upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            req.session.loginId=result[0].uid;
            // console.log(result)
            res.send({code:1,msg:'登陆成功'})
        }else{
            res.send({code:-1,msg:'用户名或密码错误'})
        }
    })
})
module.exports=router;