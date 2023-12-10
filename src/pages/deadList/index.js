import {
  Radio,
  Input,
  Button,
  Table,
  Modal,
  Form,
  DatePicker,
  Input as AntdInput,
} from 'antd'
import React, { useEffect, useState } from 'react'
import request from '../../http/request.js'
import moment from 'moment'

const dateFormat = 'YYYY/MM/DD'

const { Search } = Input

function App() {
  const columns = [
    {
      title: '逝者编号',
      dataIndex: 'deadCode',
      key: 'deadCode',
    },
    {
      title: '逝者名字',
      dataIndex: 'deadName',
      key: 'deadName',
    },
    {
      title: '性别',
      dataIndex: 'deadGender',
      key: 'deadGender',
      render: (text) => <div>{text ? '男' : '女'}</div>,
    },
    {
      title: '出生年月',
      dataIndex: 'birthTime',
      key: 'birthTime',
      render: (text) => <div>{new Date(text).toLocaleString()}</div>,
    },
    {
      title: '逝世日期',
      dataIndex: 'deadTime',
      key: 'deadTime',
      render: (text) => <div>{new Date(text).toLocaleString()}</div>,
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
        .post('/dead-info/update', {
          ...values,
          deadCode: userDetails.deadCode,
          id: userDetails.id,
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
            label='逝者名字'
            name='deadName'
            rules={[{ required: true, message: '请输入逝者名字' }]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            label={
              <span>
                <div
                  style={{
                    display: 'inline-block',
                    color: '#ff4d4f',
                    fontSize: '16px',
                  }}
                >
                  *
                </div>
                逝者出生日期
              </span>
            }
            rules={[{ required: true, message: '请输入出生日期' }]}
          >
            <DatePicker
              format={dateFormat}
              value={moment(userDetails?.birthTime)}
            />
          </Form.Item>{' '}
          <Form.Item
            label={
              <span>
                <div
                  style={{
                    display: 'inline-block',
                    color: '#ff4d4f',
                    fontSize: '16px',
                  }}
                >
                  *
                </div>
                逝者逝世日期
              </span>
            }
            rules={[{ required: true, message: '请输入逝者逝世' }]}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current > moment().endOf('day')
              }
              format={dateFormat}
              value={moment(userDetails?.deadTime)}
            />
          </Form.Item>{' '}
          <Form.Item
            label='骨灰盒编号'
            name='itemCode'
            rules={[{ required: true, message: '请输入骨灰盒编号' }]}
          >
            <AntdInput />
          </Form.Item>{' '}
          <Form.Item
            label='关系人编号'
            name='relatedPerson'
            rules={[{ required: true, message: '请输入关系人编号' }]}
          >
            <AntdInput />
          </Form.Item>{' '}
          <Form.Item
            label='逝者性别'
            name='deadGender'
            rules={[{ required: true, message: '请输入逝者性别' }]}
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
    console.log(item)
    setSelectedCustomerDetails2(item)
  }
  const handleUpdateModalClose = () => {
    setUpdateModalVisible(false)
  }

  const handleUpdate = () => {
    // You may want to reload the user list or update the state in another way
    // This is just a placeholder

    request
      .get('/dead-info/list')
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
      .get('/dead-info/list')
      .then((data) => {
        console.log('data', data)
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
      item.deadName.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredData(filtered)
  }

  return (
    <div>
      <Search
        placeholder='按逝者姓名搜索'
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
