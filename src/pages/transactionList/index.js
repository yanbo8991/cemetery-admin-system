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
      const response = await fetch('/transaction-info/test/export', {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        credentials: 'same-origin',
      })

      if (response.ok) {
        const blob = await response.blob()

        // 设置响应头
        const filename = 'exportedData.xls'
        const contentDisposition = response.headers.get('content-disposition')
        const contentType = response.headers.get('content-type')

        // 创建一个包含 Excel 数据的 Blob 对象
        const excelBlob = new Blob([blob], { type: contentType })

        // 创建一个链接并模拟点击下载
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(excelBlob)
        link.download = filename

        // 添加到 DOM 并触发点击
        document.body.appendChild(link)
        link.click()

        // 移除链接
        document.body.removeChild(link)
      } else {
        console.error('Server response not okay')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // const exportData = async () => {
  //   // request.get('/transaction-info/test/export').catch((error) => {
  //   //   alert(error)
  //   //   console.error('Error:', error)
  //   // })
  //   window.location.href = '/transaction-info/test/export'
  // }
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
