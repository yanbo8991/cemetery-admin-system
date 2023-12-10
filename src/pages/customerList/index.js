import {
  Radio,
  Input,
  Button,
  Table,
  Modal,
  Form,
  Input as AntdInput,
} from 'antd'
import React, { useEffect, useState } from 'react'
import request from '../../http/request.js'

const { Search } = Input

function App() {
  const columns = [
    {
      title: '客户名字',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '性别',
      dataIndex: 'customerGender',
      key: 'customerGender',
      render: (text) => <span>{text ? '男' : '女'}</span>,
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
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => (
        <Button
          type='link'
          onClick={() => {
            handleSelectedCustomerDetails2(record)
            showUpdateModal(record)
          }}
        >
          修改
        </Button>
      ),
    },
  ]

  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [selectedCustomerDetails2, setSelectedCustomerDetails2] = useState(null)

  const UpdateUserForm = ({ visible, onCancel, onUpdate, userDetails }) => {
    const [form] = Form.useForm()
    useEffect(() => {
      form.setFieldsValue(userDetails)
    }, [userDetails])

    const onFinish = async (values) => {
      request
        .post('/customer-info/update', {
          ...values,
          id: userDetails.id,
          customerId: userDetails.customerId,
        })
        .then((data) => {
          onUpdate()
        })
        .catch((error) => {
          alert(error)
          console.error('Error:', error)
        })
    }

    return (
      <Modal
        title='修改用户信息'
        open={visible}
        onCancel={onCancel}
        footer={null}
      >
        <Form
          form={form}
          name='updateUserForm'
          onFinish={onFinish}
          initialValues={userDetails}
        >
          <Form.Item
            label='客户名字'
            name='customerName'
            rules={[{ required: true, message: '请输入客户名字' }]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            label='客户联系电话'
            name='customerPhone'
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <AntdInput />
          </Form.Item>{' '}
          <Form.Item
            label='客户联系地址'
            name='customerAddress'
            rules={[{ required: true, message: '请输入客户联系地址' }]}
          >
            <AntdInput />
          </Form.Item>{' '}
          <Form.Item
            label='客户身份证号码'
            name='idNumber'
            rules={[{ required: true, message: '请输入身份证号码' }]}
          >
            <AntdInput />
          </Form.Item>{' '}
          <Form.Item
            label='客户性别'
            name='customerGender'
            rules={[{ required: true, message: '请输入客户性别' }]}
          >
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          </Form.Item>
          {/* Add other form fields for user information */}
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              更新
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  const showUpdateModal = () => {
    setUpdateModalVisible(true)
  }
  const handleSelectedCustomerDetails2 = (item) => {
    setSelectedCustomerDetails2(item)
  }
  const handleUpdateModalClose = () => {
    setUpdateModalVisible(false)
  }

  const handleUpdate = () => {
    // You may want to reload the user list or update the state in another way
    // This is just a placeholder

    request
      .get('/customer-info/list')
      .then((data) => {
        setData(data)
        setFilteredData(data)
      })
      .catch((error) => {
        alert(error)
        console.error('Error:', error)
      })
    setUpdateModalVisible(false)
  }
  useEffect(() => {
    request
      .get('/customer-info/list')
      .then((data) => {
        setData(data)
        setFilteredData(data)
      })
      .catch((error) => {
        alert(error)
        console.error('Error:', error)
      })
  }, [])

  const handleSearch = (value) => {
    setSearchText(value)
    const filtered = data.filter((item) =>
      item.customerName.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredData(filtered)
  }

  return (
    <div>
      <Search
        placeholder='按客户姓名搜索'
        allowClear
        enterButton='搜索'
        size='large'
        onSearch={handleSearch}
      />
      <Table columns={columns} dataSource={filteredData} />

      <UpdateUserForm
        visible={updateModalVisible}
        onCancel={handleUpdateModalClose}
        onUpdate={handleUpdate}
        userDetails={selectedCustomerDetails2}
      />
    </div>
  )
}

export default App
