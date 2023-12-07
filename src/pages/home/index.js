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
import './index.scss';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // Mock user data
  const user = {
    username: 'John Doe',
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Option 1
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
        <div className="user-menu" style={{ position: 'absolute', top: 0, right: 0 }}>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Button>
                {user.username} <UserOutlined />
            </Button>
            </Dropdown>
        </div>
        </Header>

        <Content style={{ margin: '24px 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer ©2023 Created by You</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
