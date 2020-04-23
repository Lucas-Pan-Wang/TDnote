import React from "react";
import { TabBar } from "antd-mobile";

import shequ from './images/社区.png'
import shequ1 from './images/社区 (1).png'
import chuanda from './images/试衣间.png'
import chuanda1 from './images/试衣间 (1).png'
import zhenglixiang from './images/整理箱.png'
import zhenglixiang1 from './images/整理箱 (1).png'
import xiaoxi from './images/message.png'
import xiaoxi1 from './images/message(1).png'
import geren from './images/个人.png'
import geren1 from './images/个人 (1).png'


import Wear from './wear/Wear'
import Message from './message/MIndex'
import Community from "./community/Community";
import Me from "./me/Me";
import AppBox from "./store/AppBox";

export default class RijiTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "shequTab",
      url:""
    };
  }
  componentDidMount(){
    console.log(window.location.href.split('#')[0]);
    this.setState({
      url:window.location.href.split('#')[0]
    })
  }
  render() {
    return (
      <div
        style={{
          position: "fixed",
          height: "100%",
          width: "100%",
          top: 0
        }}
      >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#fc9d9a"
          barTintColor="white"
        >
          
          <TabBar.Item
            icon={{
              uri:chuanda
            }}
            selectedIcon={{
              uri:
                chuanda1
            }}
            title="穿搭"
            key="chuanda"
            selected={this.state.selectedTab === "chuandaTab"}
            onPress={() => {
              window.location.href = this.state.url+'#/apptab/'+this.props.match.params.id;
              this.setState({
                selectedTab: "chuandaTab"
              });
            }}
          >
          <Wear id={this.props.match.params.id}/>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url("+zhenglixiang+") center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url("+zhenglixiang1+") center center /  21px 21px no-repeat"
                }}
              />
            }
            title="整理箱"
            key="zhenglixiang"
            // dot
            selected={this.state.selectedTab === "zhengliTab"}
            onPress={() => {
              window.location.href = this.state.url+'#/zhenglitab/'+this.props.match.params.id;
              this.setState({
                selectedTab: "zhengliTab"
              });
            }}
          >
          <AppBox id={this.props.match.params.id}/>
          </TabBar.Item>
          <TabBar.Item
            title="社区"
            key="shequ"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url("+shequ+") center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url("+shequ1+") center center /  21px 21px no-repeat"
                }}
              />
            }
            selected={this.state.selectedTab === "shequTab"}
            onPress={() => {
              window.location.href = this.state.url+'#/shequtab/'+this.props.match.params.id;
              this.setState({
                selectedTab: "shequTab"
              });
            }}
          >
            <Community id={this.props.match.params.id}/>
          </TabBar.Item>
          <TabBar.Item
            title="消息"
            key="xiaoxi"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url("+xiaoxi+") center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url("+xiaoxi1+") center center /  21px 21px no-repeat"
                }}
              />
            }
            selected={this.state.selectedTab === "xiaoxiTab"}
            onPress={() => {
              window.location.href = this.state.url+'#/xiaoxitab/'+this.props.match.params.id;
              console.log(window.location.href);
              this.setState({
                selectedTab: "xiaoxiTab"
              });
            }}
          >
            <Message id={this.props.match.params.id}/>
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri:geren
            }}
            selectedIcon={{
              uri:
                geren1
            }}
            title="个人"
            key="geren"
            selected={this.state.selectedTab === "gerenTab"}
            onPress={() => {
              window.location.href = this.state.url+'#/gerentab/'+this.props.match.params.id;
              this.setState({
                selectedTab: "gerenTab"
              });
            }}
          >
            <Me id={this.props.match.params.id}/>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
