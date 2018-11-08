import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import GameContent from './games/game-content'
import gameContent from './games/game-content';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const itemClick = function(obj){
    console.log('click' + obj.key);
    GameContent.showGame(obj.key);
}
ReactDOM.render(
    <Layout>
      <Header className="header">
        <div className="logo">
        <label style={{color:"#ffffff" ,fontSize: "40px"}}><strong>学习React</strong></label>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            theme = "dark"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu  key="sub1" title={<span><Icon type="trophy" theme="outlined" />完成的游戏</span>}>
              <Menu.Item onClick = {itemClick} key="cut-fruit">切水果</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />正在做的游戏</span>}>
              <Menu.Item onClick = {itemClick} key="catch-fish">捕鱼达人</Menu.Item>
  
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="notification" />打算做的游戏</span>}>
              <Menu.Item  onClick = {itemClick} key="9">斗地主</Menu.Item>

            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="appstore" theme="outlined" />工具</span>}>
              <Menu.Item onClick = {itemClick}  key="11">贝塞尔曲线编辑器</Menu.Item>
        


            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' ,bottom: 0}}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <Content style={{  padding: 24, minHeight: 280 }}>
            <div id = "game-div" style={{
                margin: 0,
                background: "#2b3595",
                width: "800px",
                height: "480px"
                
            }}></div>

          </Content>
          
          <Content style={{  padding: 24, minHeight: 280 }}>
            <div style={{
                margin: 0,
                background: "#7045af",
                width: "800px",
                height: "480px"
                
            }}></div>

          </Content>
        </Layout>,
        
      </Layout>
      
    </Layout>,
    document.getElementById('root'));
    gameContent.showApp();
