import React, { useState, useEffect } from 'react'
import {
  Select,
  Row,
  Col,
  Result,
  Modal,
  Form,
  Input,
  DatePicker,
  Radio,
  Button,
  message,
} from 'antd'
import request from '../../http/request.js'
import moment from 'moment'
const dateFormat = 'YYYY/MM/DD'

const App = () => {
  const [selectedArea, setSelectedArea] = useState(null)
  const [data, setData] = useState([])
  const [floor, setFloor] = useState(null)

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedBoxData, setSelectedBoxData] = useState(null)
  // 调用
  const fetchData = async () => {
    console.log(selectedArea, floor)
    request
      .get(
        `/cinerary-box-info/query?floor=${floor || 1}&area=${selectedArea || 1}`
      )
      .then((data) => {
        console.log('data', data)
        setData(data)
      })
      .catch((error) => {
        alert(error)
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])
  const { Option } = Select
  const { TextArea } = Input
  const { RangePicker } = DatePicker

  const BoxList = ({ data, handleModalOpen, selectedBoxData }) => {
    return (
      <Row gutter={[16, 16]}>
        {data?.length !== 0 ? (
          data?.map((item) => (
            <Col key={item.id} span={4}>
              <div
                style={{
                  width: '150px',
                  height: '120px',
                  padding: '20px',
                  backgroundColor: item.boxStatus ? '#509296' : 'gray',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  cursor: item.boxStatus ? 'not-allowed' : 'pointer',
                }}
                onClick={() => handleModalOpen(item)}
              >
                <div>序号：{item.id}</div>
                <div>编号：{item.cemeteryCode}</div>
                <div>地区：{item.area}</div>
                <div>等级：{item.cemeteryLevel ? 'VIP' : '普通'}</div>
                <div>价格：¥{item.price}</div>
              </div>
            </Col>
          ))
        ) : (
          <Result title='该区域暂时没有数据！' subTitle='暂无数据' />
        )}
      </Row>
    )
  }

  const CemeteryFormModal = ({
    visible,
    onCancel,
    onFinish,
    selectedBoxData,
  }) => {
    const [form] = Form.useForm()

    return (
      <Modal
        title='购买骨灰盒'
        open={visible}
        onCancel={onCancel}
        footer={[
          <Button key='cancel' onClick={onCancel}>
            取消{}
          </Button>,
          <Button key='submit' type='primary' onClick={() => form.submit()}>
            提交
          </Button>,
        ]}
      >
        <Form form={form} onFinish={onFinish}>
          {/* 表单项根据实际情况修改 */}
          <Form.Item
            name='customerName'
            label='客户姓名'
            rules={[{ required: true, message: '请输入客户姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='customerGender'
            label='客户性别'
            rules={[{ required: true, message: '请选择客户性别' }]}
          >
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name='customerPhone'
            label='客户电话号码'
            rules={[{ required: true, message: '请输入客户电话号码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='idNumber'
            label='客户身份证号码'
            rules={[{ required: true, message: '请输入客户身份证号码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='customerAddress'
            label='客户联系地址'
            rules={[{ required: true, message: '请输入客户联系地址' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='deadName1'
            label='逝者1姓名'
            rules={[{ required: true, message: '请输入逝者1姓名' }]}
          >
            <Input />
          </Form.Item>{' '}
          <Form.Item
            name='deadGender1'
            label='逝者1性别'
            rules={[{ required: true, message: '请选择逝者1性别' }]}
          >
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label='选择逝者1出生日期'
            name='birthTime1'
            rules={[{ required: true, message: '请选择逝者1出生日期' }]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            label='选择逝者1去世日期'
            name='deadTime1'
            rules={[{ required: true, message: '请选择逝者1去世日期' }]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            name='deadName2'
            label='逝者2姓名'
            rules={[{ required: false, message: '请输入逝者2姓名' }]}
          >
            <Input />
          </Form.Item>{' '}
          <Form.Item
            name='deadGender2'
            label='逝者2性别'
            rules={[{ required: false, message: '请选择逝者2性别' }]}
          >
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label='选择逝者2出生日期'
            name='birthTime2'
            rules={[{ required: false, message: '请选择逝者2出生日期' }]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            label='选择逝者2去世日期'
            name='deadTime2'
            rules={[{ required: false, message: '请选择逝者2去世日期' }]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  const handleAreaChange = (value) => {
    setSelectedArea(value)
  }
  const handleLevelChange = (value) => {
    setFloor(value)
  }

  const handleModalOpen = (item) => {
    // boxStatus
    console.log(item)
    if (item.boxStatus === 0) {
      setSelectedBoxData(item)
      setModalVisible(true)
    }
  }

  const handleModalCancel = () => {
    setModalVisible(false)
  }

  const handleFormFinish = (values) => {
    // 将数据提交给接口
    const requestData = {
      itemCode: selectedBoxData.cemeteryCode,
      customerName: values.customerName,
      customerGender: values.customerGender,
      customerPhone: values.customerPhone, //客户电话号码
      idNumber: values.idNumber, //客户身份证号码
      customerAddress: values.customerAddress, //客户联系地址
      deadName1: values.deadName1, //死者姓名
      deadGender1: values.deadGender1, //死者性别
      birthTime1: values.birthTime1, //死者出生日期
      deadTime1: values.deadTime1, //死者死亡日期
      deadName2: values.deadName2,
      deadGender2: values.deadGender2,
      birthTime2: values.birthTime2,
      deadTime2: values.deadTime2,
      sellPrice: selectedBoxData.price,
    }

    // 调用购买接口
    request
      .post('/cinerary-box-info/buy', requestData)
      .then(() => {
        // 购买成功后的处理，可以根据实际情况刷新数据或进行其他操作
        message.success('成功购买')
        setModalVisible(false)
      })
      .catch((error) => {
        message.error(error)
        console.error('购买失败:', error)
      })
  }

  return (
    <div style={{ padding: '20px' }}>
      <Select
        style={{ width: 120, marginBottom: '20px' }}
        placeholder='选择地区'
        onChange={handleAreaChange}
        defaultValue={1}
      >
        <Option value={1}>东1</Option>
        <Option value={2}>东2</Option>
        <Option value={3}>东3</Option>
        <Option value={5}>东5</Option>
        <Option value={6}>西6</Option>
        <Option value={7}>西7</Option>
        <Option value={8}>西8</Option>
        <Option value={9}>西9</Option>
      </Select>
      <Select
        style={{ width: 120, marginBottom: '20px' }}
        placeholder='选择楼层'
        onChange={handleLevelChange}
        defaultValue={1}
      >
        <Option value={0}>走廊</Option>
        <Option value={1}>1楼</Option>
        <Option value={2}>2楼</Option>
        <Option value={3}>3楼</Option>
        <Option value={5}>5楼</Option>
      </Select>
      <Button onClick={fetchData}>查询</Button>
      <BoxList
        data={data}
        handleModalOpen={handleModalOpen}
        selectedBoxData={selectedBoxData}
      />
      <CemeteryFormModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onFinish={handleFormFinish}
      />
    </div>
  )
}

export default App
