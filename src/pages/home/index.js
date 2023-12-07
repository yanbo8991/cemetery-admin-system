// src/pages/home/index.js

import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Demo1 from './components/demo1/';
import Demo2 from './components/demo2';
import Demo3 from './components/demo3';
import Demo4 from './components/demo4';
import './index.scss';



const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // 获取 navigate 函数

  const handleMenuClick = (key) => {
    // 根据点击的 key 进行不同的处理
    switch (key) {
      case 'demo1':
      case 'demo2':
      case 'demo3':
      case 'demo4':
        // 使用 navigate 进行路由导航
        navigate(`/home/${key}`);
        break;
      // 可以根据需要添加其他处理逻辑
      default:
        break;
    }
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // Mock user data
  const user = {
    username: 'John Doe',
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">修改密码</Menu.Item>
      <Menu.Item key="2">注销</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu 
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={(e) => handleMenuClick(e.key)}
        >
          <Menu.Item key="demo1" icon={<UserOutlined />}>
            demo1
          </Menu.Item>
          <Menu.Item key="demo2" icon={<UserOutlined />}>
            demo2
          </Menu.Item>
          <Menu.Item key="demo3" icon={<UserOutlined />}>
            demo3
          </Menu.Item>
          <Menu.Item key="demo4" icon={<UserOutlined />}>
            demo4
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UploadOutlined />} title="Submenu">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
            <SubMenu key="sub1-2" title="Submenu">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0, position: 'relative' }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
        })}
        <div className="user-menu" style={{ position: 'absolute', top: 0, right: 10 }}>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Button>
                {user.username} <UserOutlined />
            </Button>
            </Dropdown>
        </div>
        </Header>

        <Content style={{ margin: '24px 16px', border: '1px solid #f5f5f5' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Routes>
              <Route path="demo1" element={<Demo1 />} />
              <Route path="demo2" element={<Demo2 />} />
              <Route path="demo3" element={<Demo3 />} />
              <Route path="demo4" element={<Demo4 />} />
              <Route path="/" element={<Navigate replace to="demo1" />}  />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer ©2023 Created by You</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
