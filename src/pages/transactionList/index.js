import { Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import request from '../../http/request.js'
function App() {
  const columns = [
    {
      title: '交易编号',
      dataIndex: 'transactionCode',
      key: 'transactionCode',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '客户编号',
      dataIndex: 'customerCode',
      key: 'customerCode',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '骨灰盒或墓地编号',
      dataIndex: 'itemCode',
      key: 'itemCode',
    },
    {
      title: '交易时间',
      dataIndex: 'transactionTime',
      key: 'transactionTime',
      render: (text) => <a>{new Date(text).toLocaleString()}</a>,
    },
    {
      title: '销售人',
      dataIndex: 'seller',
      key: 'seller',
    },
    {
      title: '实际出售金额',
      dataIndex: 'sellPrice',
      key: 'sellPrice',
      render: (text) => <a>{text}</a>,
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
      .get('/transaction-info/list')
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
