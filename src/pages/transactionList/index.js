import { Button, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import request from '../../http/request.js'

function App() {
  const columns = [
    {
      title: '交易编号',
      dataIndex: 'transactionCode',
      key: 'transactionCode',
      render: (text) => <div>{text}</div>,
    },
    {
      title: '客户编号',
      dataIndex: 'customerCode',
      key: 'customerCode',
      render: (text) => <div>{text}</div>,
    },
    {
      title: '海会塔福寿位或长青园编号',
      dataIndex: 'itemId',
      key: 'itemId',
    },
    {
      title: '交易时间',
      dataIndex: 'transactionTime',
      key: 'transactionTime',
      render: (text) => <div>{new Date(text).toLocaleString()}</div>,
    },
    {
      title: '销售',
      dataIndex: 'seller',
      key: 'seller',
    },
    {
      title: '实际出售金额',
      dataIndex: 'sellPrice',
      key: 'sellPrice',
    },

    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a>查看详情</a>
          <a>修改信息</a>
          <a>取消交易</a>
        </Space>
      ),
    },
  ]

  const [data, setData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    request
      .get('/transaction-info/list')
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        alert(error)
        console.error('Error:', error)
      })
  }, [])

  const exportData = async () => {
    try {
      const response = await request.post(
        '/transaction-info/export',
        selectedRowKeys,
        {
          responseType: 'blob',
        }
      )
      const blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel',
      }) // 使用正确的 MIME 类型
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = '666.xls'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      alert(error)
      console.error('Error:', error)
    }
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
      console.log(selectedRowKeys)
    },
  }

  return (
    <div>
      <Button style={{ marginBottom: '30px' }} onClick={exportData}>
        导出
      </Button>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        rowKey={(record) => record.transactionCode} // Ensure a unique key for each row
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default App
