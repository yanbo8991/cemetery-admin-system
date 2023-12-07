import { Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import request from '../../http/request.js'
function App() {
  const columns = [
    {
      title: '顾客名字',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '性别',
      dataIndex: 'customerGender',
      key: 'customerGender',
      render: (text) => <a>{text ? '男' : '女'}</a>,
    },
    {
      title: '电话',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
    },
    {
      title: '身份证',
      dataIndex: 'idNumber',
      key: 'idNumber',
    },

    {
      title: '地址',
      dataIndex: 'customerAddress',
      key: 'customerAddress',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]

  const [data, setData] = useState([])
  useEffect(() => {
    request
      .get('/customer-info/list')
      .then((data) => {
        console.log('data', data)
        setData(data)
      })
      .catch((error) => {
        alert(error)
        console.error('Error:', error)
      })
  }, [])
  return <Table columns={columns} dataSource={data} />
}

export default App
