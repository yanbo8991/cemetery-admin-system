import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Button } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import CustomerList from '../customerList/index'
import DeadList from '../deadList/index'
import TransactionList from '../transactionList/index'
import CemeteryInfo from '../cemeteryInfo/index'
import CemeteryBoxInfo from '../cemeteryBoxInfo/index'

import './index.scss'

const { Header, Sider, Content, Footer } = Layout
const { SubMenu } = Menu

const Home = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate() // 获取 navigate 函数

  const handleMenuClick = (key) => {
    // 根据点击的 key 进行不同的处理
    switch (key) {
      case 'cemeteryInfo':
      case 'cemeteryBoxInfo':

      case 'customerList':
      case 'deadList':
      case 'transactionList':
        // 使用 navigate 进行路由导航
        navigate(`/home/${key}`)
        break
      // 可以根据需要添加其他处理逻辑
      default:
        break
    }
  }

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  // Mock user data
  const user = {
    username: localStorage.getItem('username'),
  }

  const menu = (
    <Menu>
      <Menu.Item key='1'>修改密码</Menu.Item>
      <Menu.Item
        key='2'
        onClick={() => {
          localStorage.removeItem('token')
          navigate('/login')
        }}
      >
        注销
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className='logo'
          style={{ color: '#ffff', padding: '40px', fontSize: '20px' }}
        >
          智慧陵寝系统
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          onClick={(e) => handleMenuClick(e.key)}
        >
          <Menu.Item key='cemeteryInfo' icon={<UserOutlined />}>
            墓地分布
          </Menu.Item>
          <Menu.Item key='cemeteryBoxInfo' icon={<UserOutlined />}>
            骨灰盒管理
          </Menu.Item>
          <Menu.Item key='customerList' icon={<UserOutlined />}>
            客户信息列表
          </Menu.Item>
          <Menu.Item key='deadList' icon={<UserOutlined />}>
            逝者信息列表
          </Menu.Item>
          <Menu.Item key='transactionList' icon={<UserOutlined />}>
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
            style={{ position: 'absolute', top: 0, right: 10 }}
          >
            <Dropdown overlay={menu} placement='bottomRight' arrow>
              <Button>
                {user.username} <UserOutlined />
              </Button>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ margin: '24px 16px', border: '1px solid #f5f5f5' }}>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              <Route path='/cemeteryInfo' element={<CemeteryInfo />} />
              <Route path='/cemeteryBoxInfo' element={<CemeteryBoxInfo />} />
              <Route path='/customerList' element={<CustomerList />} />
              <Route path='/deadList' element={<DeadList />} />
              <Route path='/transactionList' element={<TransactionList />} />

              <Route
                path='/'
                element={<Navigate replace to='/home/customerList' />}
              />
            </Routes>
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
