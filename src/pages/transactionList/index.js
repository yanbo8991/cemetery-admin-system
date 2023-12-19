import {
  message,
  Button,
  Space,
  Table,
  Modal,
  Form,
  Input,
  Collapse,
  Radio,
  DatePicker,
} from 'antd'
import React, { useEffect, useState } from 'react'
import request from '../../http/request.js'
import dayjs from 'dayjs'
import moment from 'moment'

import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
const dateFormat = 'YYYY/MM/DD'
function App() {
  const [data, setData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [disabled, setDisabled] = useState(false)

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
        <Space size='small'>
          <Button onClick={() => showEditModal(record, 1)}>查看详情</Button>
          <Button onClick={() => showEditModal(record, 2)}>修改信息</Button>
          <Button onClick={() => cancelTrans(record)}>取消交易</Button>
        </Space>
      ),
    },
  ]
  const cancelTrans = (record) => {
    console.log(record)
    request
      .get(`/transaction-info/cancel/${record.transactionCode}`)
      .then(() => {
        getList()
        message.success('取消成功')
      })
      .catch((error) => {
        alert(error)
        console.error('Error:', error)
      })
  }
  const fetchBoxData = async (item) => {
    try {
      const response = await request.get(`/transaction-info/info/${item}
      `)
      form.setFieldsValue(response)

      setModalData(response)
    } catch (error) {
      alert(error)
      console.error('Error:', error)
      throw error
    }
  }
  const showEditModal = (record, item) => {
    console.log(record)
    if (item === 1) setDisabled(true)
    if (item === 2) setDisabled(false)
    fetchBoxData(record?.transactionCode)
    form.setFieldsValue(record) // 设置表单字段初始值
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }

  const handleEdit = () => {
    form.validateFields().then((values) => {
      console.log(values, '00000')
      const formatData = {
        birthTime1: values?.birthTime1
          ? values?.birthTime1
          : modalData?.birthTime1,
        birthTime2: values?.birthTime2
          ? values?.birthTime2
          : modalData?.birthTime2,
        customerAddress: modalData?.customerAddress,
        customerGender: modalData?.customerGender,
        customerName: modalData?.customerName,
        customerPhone: modalData?.customerPhone,
        deadCode1: modalData?.deadCode1,
        deadCode2: modalData?.deadCode2,
        deadGender1: values?.deadGender1
          ? values?.deadGender1
          : modalData?.deadGender1,
        deadGender2: values?.deadGender2
          ? values?.deadGender2
          : modalData?.deadGender2,
        deadName1: values?.deadName1 ? values?.deadName1 : modalData?.deadName1,
        deadName2: values?.deadName2 ? values?.deadName2 : modalData?.deadName2,
        deadTime1: values?.deadTime1 ? values?.deadTime1 : modalData?.deadTime1,
        deadTime2: values?.deadTime2 ? values?.deadTime2 : modalData?.deadTime2,
        idNumber: modalData?.idNumber,
        itemId: modalData?.itemId,
        sellPrice: values?.sellPrice ? values?.sellPrice : modalData?.sellPrice,
        seller: values?.seller ? values?.seller : modalData?.seller,
        transactionCode: modalData?.transactionCode,
      }
      // 发送修改信息的请求
      request
        .post(`/transaction-info/update`, formatData)
        .then(() => {
          getList()
          message.success('修改成功')
          setVisible(false)
        })
        .catch((error) => {
          alert(error)
          console.error('Error:', error)
        })
    })
  }
  useEffect(() => {
    getList()
  }, [])
  const getList = () => {
    request
      .get('/transaction-info/list')
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        alert(error)
        console.error('Error:', error)
      })
  }
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

      {/* 修改信息的弹窗 */}
      <Modal
        title='修改信息'
        open={visible}
        onCancel={handleCancel}
        footer={
          disabled
            ? [<Button onClick={handleCancel}>取消</Button>]
            : [
                <Button onClick={handleCancel}>取消</Button>,
                <Button onClick={handleEdit} key='submit' type='primary'>
                  更新
                </Button>,
              ]
        }
      >
        <Form form={form}>
          <Form.Item label='交易编号' name='transactionCode'>
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item label='交易价格' name='sellPrice'>
            <Input />
          </Form.Item>{' '}
          <Form.Item label='交易人' name='seller'>
            <Input />
          </Form.Item>
          <Form.Item
            name='customerName'
            label='客户姓名'
            rules={[{ required: true, message: '请输入客户姓名' }]}
            initialValues={modalData}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name='customerGender'
            label='客户性别'
            rules={[{ required: true, message: '请选择客户性别' }]}
          >
            <Radio.Group disabled>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name='customerPhone'
            label='客户电话号码'
            rules={[{ required: true, message: '请输入客户电话号码' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name='idNumber'
            label='客户身份证号码'
            rules={[{ required: true, message: '请输入客户身份证号码' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name='customerAddress'
            label='客户联系地址'
            rules={[{ required: true, message: '请输入客户联系地址' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name='deadName1'
            label='逝者1姓名'
            rules={[{ required: true, message: '请输入逝者1姓名' }]}
          >
            <Input disabled={disabled} />
          </Form.Item>{' '}
          <Form.Item
            name='deadGender1'
            label='逝者1性别'
            rules={[{ required: true, message: '请选择逝者1性别' }]}
          >
            <Radio.Group disabled={disabled}>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label='选择逝者1出生日期'
            name={modalData?.birthTime1 ? null : 'birthTime1'}
            rules={[{ required: true, message: '请选择逝者1出生日期' }]}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current > moment().endOf('day')
              }
              defaultValue={dayjs(modalData?.birthTime1, dateFormat)}
              format={dateFormat}
              onChange={(date) => {
                form.setFieldsValue({ birthTime1: date })
              }}
            />
          </Form.Item>
          <Form.Item
            label='选择逝者1去世日期'
            name={modalData?.deadTime1 ? null : 'deadTime1'}
            rules={[{ required: true, message: '请选择逝者1去世日期' }]}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current > moment().endOf('day')
              }
              defaultValue={dayjs(modalData?.deadTime1, dateFormat)}
              format={dateFormat}
              onChange={(date) => {
                form.setFieldsValue({ deadTime1: date })
              }}
            />
          </Form.Item>
          <Collapse
            items={[
              {
                key: '1',
                label: '点击添加+',
                children: (
                  <p>
                    {' '}
                    <Form.Item
                      name='deadName2'
                      label='逝者2姓名'
                      rules={[{ required: false, message: '请输入逝者2姓名' }]}
                    >
                      <Input disabled={disabled} />
                    </Form.Item>{' '}
                    <Form.Item
                      name='deadGender2'
                      label='逝者2性别'
                      rules={[{ required: false, message: '请选择逝者2性别' }]}
                    >
                      <Radio.Group disabled={disabled}>
                        <Radio value={1}>男</Radio>
                        <Radio value={0}>女</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      label='选择逝者2出生日期'
                      name={modalData?.birthTime2 ? null : 'birthTime2'}
                      rules={[
                        { required: false, message: '请选择逝者2出生日期' },
                      ]}
                    >
                      <DatePicker
                        disabledDate={(current) =>
                          current && current > moment().endOf('day')
                        }
                        defaultValue={dayjs(modalData?.birthTime2, dateFormat)}
                        format={dateFormat}
                        onChange={(date) => {
                          form.setFieldsValue({ birthTime2: date })
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label='选择逝者2去世日期'
                      name={modalData?.deadTime2 ? null : 'deadTime2'}
                      rules={[
                        { required: false, message: '请选择逝者2去世日期' },
                      ]}
                    >
                      <DatePicker
                        disabledDate={(current) =>
                          current && current > moment().endOf('day')
                        }
                        defaultValue={dayjs(modalData?.deadTime2, dateFormat)}
                        format={dateFormat}
                        onChange={(date) => {
                          form.setFieldsValue({ deadTime2: date })
                        }}
                      />
                    </Form.Item>
                  </p>
                ),
              },
            ]}
          ></Collapse>
          {/* 其他表单项 */}
        </Form>
      </Modal>
    </div>
  )
}

export default App
