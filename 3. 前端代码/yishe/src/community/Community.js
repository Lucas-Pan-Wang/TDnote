import React, { Component } from 'react';
import { Popover, NavBar, WingBlank,WhiteSpace } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import { Typography } from 'antd';
import './community.css';

import xiala from '../images/下拉.png';
import fenxiang from '../images/分享(1).png';
import shoucang from '../images/收藏.png';
import yishoucang from '../images/收藏(1).png';
import pingbi from '../images/屏蔽.png';
import guanzhu from '../images/关注.png';
import yiguanzhu from '../images/关注(1).png';
import pinglun from '../images/评论.png';
import dianzan from '../images/点赞.png';
import yidianzan from '../images/点赞(1).png';

const { Paragraph } = Typography;
const Item = Popover.Item;
const menu = [
    {key:'1',value:'分享',image:`${fenxiang}`},
    {key:'2',value:'关注',image:`${guanzhu}`},
    {key:'3',value:'收藏',image:`${shoucang}`},
    {key:'4',value:'屏蔽',image:`${pingbi}`}
];

export default class Community extends Component {
    constructor(){
        super();
        this.state = {
            visible: false,
            selected: '',
            users:[],
            // collect:false,
            // care:false,
            // agree:false
        }
    }    
    componentDidMount(){
        // console.log(this.props.id);
        fetch("http://47.98.163.228:8086/article")
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:8086"+res[i].userPic.substr(j);
            }
            this.setState({
                users:res
            })
        });
        fetch("http://47.98.163.228:8086/collect?userId="+this.props.id)
        .then(res=>res.json())
        .then(res=>{
            var users=this.state.users;
            for(var j=0;j<users.length;j++){
                users[j].collect = false;
                for(var i=0;i<res.length;i++){
                    if(users[j].articleId == res[i].articleId){
                        users[j].collect = true;
                    }
                }
            }
            this.setState({
                users:users
            })
            // console.log(this.state.users);
        })
        fetch("http://47.98.163.228:8086/agree?userId="+this.props.id)
        .then(res=>res.json())
        .then(res=>{
            var users=this.state.users;
            for(var j=0;j<users.length;j++){
                users[j].like = false;
                for(var i=0;i<res.length;i++){
                    if(users[j].articleId == res[i].articleId){
                        users[j].like = true;
                    }
                }
            }
            this.setState({
                users:users
            })
        })
    }
    //修改时间
    standardTime = (time) => {
        var date = new Date();
        var nowDate = [date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()];
        var myDate = time.split(/[ /:]/);
        var timeDate = [];
        var str = ['年前','月前','天前','小时前','分钟前','秒前']
        for(var i=0;i<6;i++){
          timeDate[i] = nowDate[i] - Number(myDate[i]);
        }
        for(var j=0;j<5;j++){
          if(timeDate[j] > 1){
            return timeDate[j]+str[j];
          }else if(timeDate[j] === 1){
            if(timeDate[j+1] >= 0){
              return timeDate[j]+str[j];
            }else{
              if(j === 0){
                timeDate[j+1] = timeDate[j+1]+12;
              }else if(j === 1){
                timeDate[j+1] = timeDate[j+1]+30;
              }else if(j === 2){
                timeDate[j+1] = timeDate[j+1]+24;
              }else{
                timeDate[j+1] = timeDate[j+1]+60;
              }
              return timeDate[j+1]+str[j+1];
            }
          }
        }
      }
    //下拉菜单
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    //收藏/取消收藏
    onCollect = (id,event) =>{
        var users = this.state.users;
        if(users.find(it => it.articleId === id).collect === false){
            fetch("http://47.98.163.228:8086/collectAdd?userId="+this.props.id+"&articleId="+id)
            .then(res=>res.json())
            .then(res=>{
                users.find(it => it.articleId === id).collect = true;
                users.find(it => it.articleId === id).save += 1;
                this.setState({
                    users:users
                })
            })
        }else{
            fetch("http://47.98.163.228:8086/collectDelete?userId="+this.props.id+"&articleId="+id)
            .then(res=>res.json())
            .then(res=>{
                users.find(it => it.articleId === id).collect = false;
                users.find(it => it.articleId === id).save -= 1;
                this.setState({
                    users:users
                })
            })
        }
    }
    onCare = () =>{
        if(this.state.care === false){
            this.setState({
                care:true
            })
        }else{
            this.setState({
                care:false
            })
        }
    }
    //点赞/取消点赞
    onAgree = (id,event) =>{
        var users = this.state.users;
        if(users.find(it => it.articleId === id).like === false){
            fetch("http://47.98.163.228:8086/agreeAdd?userId="+this.props.id+"&articleId="+id)
            .then(res=>res.json())
            .then(res=>{
                users.find(it => it.articleId === id).like = true;
                users.find(it => it.articleId === id).agree += 1;
                this.setState({
                    users:users
                })
            })
        }else{
            fetch("http://47.98.163.228:8086/agreeDelete?userId="+this.props.id+"&articleId="+id)
            .then(res=>res.json())
            .then(res=>{
                users.find(it => it.articleId === id).like = false;
                users.find(it => it.articleId === id).agree -= 1;
                this.setState({
                    users:users
                })
            })
        }
    }
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                >社区</NavBar>

                <div style={{borderBottom:'5px dotted #bbb'}}>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <span style={{fontSize:'16px'}}>官方消息</span>
                        <div className="official">温馨提示：近日北京市寒潮即将抵达，温度降低，大家要做好保暖措施。</div>
                    </WingBlank>
                    <WhiteSpace size="lg" />
                </div>
                
                {
                    this.state.users.map((item)=>(<div className="article" key={item.articleId}>
                        <div className='artUser'>
                            <img className='userImg' src={item.userPic} alt=""/>
                            <span className='userName'>{item.userName}</span>
                            <Popover mask
                                visible={this.state.visible}
                                overlay={[menu.map(it => (
                                    (<Item key={it.key} value={it.value} style={{padding:'10px 25px'}}>
                                        <img src={it.image} alt='' style={{width:'25px'}}/>
                                        <span style={{padding:'0 20px',fontSize:'18px'}}>{it.value}</span>
                                    </Item>)
                                ))]}
                                onSelect={this.onSelect}
                            ><img src={`${xiala}`} alt="" style={{margin:'10px',width:'20px',float:'right'}}/>
                            </Popover>
                        </div>
                        <div className="artDetail">
                            <Paragraph ellipsis={{rows:5}}>{item.content}</Paragraph>
                            <Link to={"/shequarticle/"+item.articleId+"&"+this.props.id}>阅读全文>></Link>
                        </div>
                        <ul className="artState">
                            <li><span>{this.standardTime(item.time)}</span></li>
                            <li><img src={`${pinglun}`} alt=''/><span>{item.review || "评论"}</span></li>
                            <li onClick={this.onCollect.bind(this,item.articleId)}><img src={item.collect?`${yishoucang}`:`${shoucang}`} alt=''/><span>{item.save || "收藏"}</span></li>
                            <li onClick={this.onAgree.bind(this,item.articleId)}><img src={item.like?`${yidianzan}`:`${dianzan}`} alt=''/><span>{item.agree || "点赞"}</span></li>
                        </ul>
                    </div>))
                }
            </div>
        );
    }
}