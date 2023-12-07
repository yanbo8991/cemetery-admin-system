// src/pages/home/index.js

import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Button } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  RadarChartOutlined,
  PayCircleOutlined,
} from '@ant-design/icons'
import TransactionList from '../transactionList/index'

import './index.scss'

const { Header, Sider, Content, Footer } = Layout

const Home = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  // Mock user data
  const user = {
    username: localStorage.getItem('userName'),
  }

  const menu = (
    <Menu>
      <Menu.Item key='1'>注销登录</Menu.Item>
    </Menu>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <div style={{ color: '#FFF', fontSize: '20px', margin: '45px 0' }}>
          墓地管理系统
        </div>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item key='1' icon={<UserOutlined />}>
            顾客信息列表
          </Menu.Item>
          <Menu.Item key='2' icon={<RadarChartOutlined />}>
            死者信息列表
          </Menu.Item>
          <Menu.Item key='3' icon={<PayCircleOutlined />}>
            交易信息列表
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{ padding: 0, position: 'relative' }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            }
          )}
          <div
            className='user-menu'
            style={{ position: 'absolute', top: 0, right: 0 }}
          >
            <Dropdown overlay={menu} placement='bottomRight' arrow>
              <Button>
                {user.username} <UserOutlined />
              </Button>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ margin: '24px 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
          >
            <TransactionList />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Footer ©2023 Created by You
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Home
