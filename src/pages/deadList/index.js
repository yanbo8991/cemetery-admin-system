import { Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import request from '../../http/request.js'
function App() {
  const columns = [
    {
      title: '死者编号',
      dataIndex: 'deadCode',
      key: 'deadCode',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '死者名字',
      dataIndex: 'deadName',
      key: 'deadName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '性别',
      dataIndex: 'deadGender',
      key: 'deadGender',
      render: (text) => <a>{text ? '男' : '女'}</a>,
    },
    {
      title: '出生年月',
      dataIndex: 'birthTime',
      key: 'birthTime',
      render: (text) => <a>{new Date(text).toLocaleString()}</a>,
    },
    {
      title: '身死亡年月份证',
      dataIndex: 'deadTime',
      key: 'deadTime',
      render: (text) => <a>{new Date(text).toLocaleString()}</a>,
    },

    {
      title: '骨灰盒或墓地编号',
      dataIndex: 'itemCode',
      key: 'itemCode',
    },
    {
      title: '关系人编号',
      dataIndex: 'relatedPerson',
      key: 'relatedPerson',
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
      .get('/dead-info/list')
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
