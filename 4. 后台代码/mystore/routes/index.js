var express = require('express');
var router = express.Router();
var mysql=require("mysql");// 链接mySQL数据库,通过第三方数据块
var dbconfig=require("../config/dbconfig.json");// 引入数据库配置连接的基本信息对象
var optfile = require('./fs_read');
const fs = require('fs');
const http = require('http');
var con = mysql.createConnection(dbconfig);// 创建连接
con.connect();//链接

//导入页面---根据获取性别来分类
router.get('/insertSex/:id',function(req,res){
  var userid=req.params.id
  con.query(`select userSex from users where userId=${userid}`,function(err,result){
      // console.log(JSON.stringify(result))
      // console.log(result[0].userSex)
      res.json(result[0].userSex)
})
})

//储物箱--根据名字来跳转家或者各个页面
router.get('/seek/:value',function(req,res){
  var value=JSON.stringify(req.params.value);
  console.log('前端传来得value',value);
  con.query(`select whereId from clothing where cloName=${value}`,function(err,result){
    // console.log(result)
    // console.log(Boolean(result[0]))
      if(!result[0]){
        res.json("不存在")
      }else{
        res.json(result[0].whereId)
      
      console.log('查找得到的',result)
      }
  })
})

//导入页面导入图片
router.post('/insert',function(req,res){
  // console.log('body',req.body);
  //种类
  var zhonglei=JSON.stringify(req.body.zhonglei[0]+req.body.zhonglei[1]);
  // //类型
  var filesType=req.body.filesType[0];
  // // id
  var userid=JSON.stringify(req.body.userid);
  // //位置
  var weizhi=JSON.stringify(req.body.weizhi[0]);
  // //颜色
  var yanse=JSON.stringify(req.body.yanse[0]);
  // //名字
  var mingzi=JSON.stringify(req.body.mingzi);
  console.log(mingzi);
  // //1or2or3
  var whereId=JSON.stringify(req.body.whereId);
  // //性别
  var sex=req.body.sex;
  // // 衣服id
  var data=new Date();
  var cloId1=''+data.getFullYear()+data.getMonth()+data.getDate()+data.getHours()+data.getMinutes()+data.getSeconds();
  var cloId=JSON.stringify(cloId1);
  // //图片base64
  var base64=req.body.base64[0].url.split(',')[1];
  // 大图片地址
  var cloPic=JSON.stringify('我的/images/'+cloId1+filesType);
  //小图片地址
  var cloSmallPic;
  if (sex == '女') {
    console.log('女');
    console.log(zhonglei=='"裤子牛仔裤"')
    if (zhonglei == '"裤子运动裤"') {
      cloSmallPic = JSON.stringify('我的/images/yundongku.png');
    } else if (zhonglei == '"裤子牛仔裤"') {
      cloSmallPic = JSON.stringify('我的/images/kuku.png');
    } else if (zhonglei == '"裤子短裤"') {
      cloSmallPic = JSON.stringify('我的/images/duanku1.png');
    } else if (zhonglei == '"裤子西装裤"') {
      cloSmallPic = JSON.stringify('我的/images/kuku.png');
    } else if (zhonglei == '"裤子直筒裤"') {
      cloSmallPic = JSON.stringify('我的/images/kuku.png');
    } else if (zhonglei == '"裙子短裙"') {
      cloSmallPic = JSON.stringify('我的/images/duanqun.png')
    } else if (zhonglei == '"裙子半身长裙"') {
      cloSmallPic = JSON.stringify('我的/images/changqun.png')
    } else if (zhonglei == '"裙子吊带裙"') {
      cloSmallPic = JSON.stringify('我的/images/heiqun.png')
    } else if (zhonglei == '"上衣毛衣"') {
      cloSmallPic = JSON.stringify('我的/images/maoyi.png')
    } else if (zhonglei == '"上衣打底衫"') {
      cloSmallPic = JSON.stringify('我的/images/yundongyi.png')
    } else if (zhonglei == '"上衣卫衣"') {
      cloSmallPic = JSON.stringify('我的/images/changshangyi.png')
    } else if (zhonglei == '"上衣短袖"') {
      cloSmallPic = JSON.stringify('我的/images/duanxiuyi.png')
    } else if (zhonglei == '"外套牛仔外套"') {
      cloSmallPic = JSON.stringify('我的/images/chenshantao.png')
    } else if (zhonglei == '"外套毛呢大衣"') {
      cloSmallPic = JSON.stringify('我的/images/waitao.png')
    } else if (zhonglei == '"外套风衣"') {
      cloSmallPic = JSON.stringify('我的/images/waitao.png')
    } else if (zhonglei == '"外套衬衫"') {
      cloSmallPic = JSON.stringify('我的/images/waitao.png')
    }
  } 
  else {
    if (zhonglei == '"裤子运动裤"') {
      cloSmallPic = JSON.stringify('我的/images/yundongku_boy.png');
    } else if (zhonglei == '"裤子牛仔裤"') {
      cloSmallPic = JSON.stringify('我的/images/kuku_boy.png');
    } else if (zhonglei == '"外套牛仔外套"') {
      cloSmallPic = JSON.stringify('我的/images/chenshantao_boy.png')
    } else if (zhonglei == '"外套毛呢大衣"') {
      cloSmallPic = JSON.stringify('我的/images/waitao_boy.png')
    } else if (zhonglei == '"外套风衣"') {
      cloSmallPic = JSON.stringify('我的/images/waitao_boy.png')
    } else if (zhonglei == '"外套衬衫"') {
      cloSmallPic = JSON.stringify('我的/images/chenshan_boy.png')
    }else if (zhonglei == '"外套运动外套"') {
      cloSmallPic = JSON.stringify('我的/images/chenshan_boy.png')
    }
  }
  
  console.log('cloSmallPic',cloSmallPic);
  // 插入到数据库
  con.query(`insert into clothing values(${cloId},
  ${userid},${zhonglei},${weizhi},${yanse},
  ${cloPic},${cloSmallPic},${mingzi},${whereId})`,(err,result)=>{
    if(err){
      console.log(err);
    }else{
      console.log('导入成功昂')
     
    }
  })
  //读取图片到服务端
  var path='../我的/images/'+cloId1+filesType;
  console.log(path);
  var dataBuffer=Buffer.from(base64,'base64');
  fs.writeFile(path,dataBuffer,function(err){
      if(err){
          console.log(err);
      }else{
          console.log('写入成功');
      }
  })
})

module.exports = router;
