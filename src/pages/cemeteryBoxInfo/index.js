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
  Collapse,
} from 'antd'
import request from '../../http/request.js'
import moment from 'moment'
const dateFormat = 'YYYY/MM/DD'

const App = () => {
  const [selectedArea, setSelectedArea] = useState(null)
  const [data, setData] = useState([])
  const [selectedBoxData, setSelectedBoxData] = useState(null)
  const [modalData, setModalData] = useState(null)
  const [floor, setFloor] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  // 调用
  const fetchData = async () => {
    request
      .get(
        `/cinerary-box-info/query?floor=${floor || 1}&area=${selectedArea || 1}`
      )
      .then((data) => {
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
                  height: '150px',
                  padding: '20px',
                  backgroundColor: item.boxStatus ? '#509296' : 'gray',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}
                onClick={() => handleModalOpen(item)}
              >
                {/* <div>序号：{item.id}</div> */}
                <div>编号：{item.boxCode}</div>
                <div>地区：{item.area}</div>
                <div>
                  楼层：{item.boxLevel > 0 ? item.boxLevel + '楼' : '走廊'}
                </div>

                <div>等级：{item.boxStatus ? 'VIP' : '普通'}</div>
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
  const [form] = Form.useForm()

  const fetchBoxData = async (item) => {
    try {
      const response = await request.get(`/cinerary-box-info/query/${item}`)
      form.setFieldsValue(response)

      setModalData(response)
    } catch (error) {
      alert(error)
      console.error('Error:', error)
      throw error
    }
  }
  const CemeteryFormModal = ({ visible, onCancel, onFinish, detail }) => {
    const [form] = Form.useForm()
    return (
      <Modal
        title='购买长青园'
        open={visible}
        onCancel={onCancel}
        footer={
          detail?.customerName
            ? [
                <Button key='cancel' onClick={onCancel}>
                  取消{}
                </Button>,
              ]
            : [
                <Button key='cancel' onClick={onCancel}>
                  取消{}
                </Button>,
                <Button
                  key='submit'
                  type='primary'
                  onClick={() => form.submit()}
                >
                  提交
                </Button>,
              ]
        }
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={detail}
          disabled={detail?.customerName}
        >
          {/* 表单项根据实际情况修改 */}
          <Form.Item
            name='customerName'
            label='客户姓名'
            rules={[{ required: true, message: '请输入客户姓名' }]}
            initialValues={modalData}
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
            name={detail?.birthTime1 ? null : 'birthTime1'}
            rules={[{ required: true, message: '请选择逝者1出生日期' }]}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current > moment().endOf('day')
              }
              format={dateFormat}
              value={detail?.birthTime1 ? moment(detail?.birthTime1) : null}
            />
          </Form.Item>
          <Form.Item
            label='选择逝者1去世日期'
            name={detail?.deadTime1 ? null : 'deadTime1'}
            rules={[{ required: true, message: '请选择逝者1去世日期' }]}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current > moment().endOf('day')
              }
              format={dateFormat}
              value={detail?.deadTime1 ? moment(detail?.deadTime1) : null}
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
                      name={detail?.birthTime2 ? null : 'birthTime2'}
                      rules={[
                        { required: false, message: '请选择逝者2出生日期' },
                      ]}
                    >
                      <DatePicker
                        disabledDate={(current) =>
                          current && current > moment().endOf('day')
                        }
                        format={dateFormat}
                        value={
                          detail?.birthTime2 ? moment(detail?.birthTime2) : null
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      label='选择逝者2去世日期'
                      name={detail?.deadTime2 ? null : 'deadTime2'}
                      rules={[
                        { required: false, message: '请选择逝者2去世日期' },
                      ]}
                    >
                      <DatePicker
                        disabledDate={(current) =>
                          current && current > moment().endOf('day')
                        }
                        format={dateFormat}
                        value={
                          detail?.deadTime2 ? moment(detail?.deadTime2) : null
                        }
                      />
                    </Form.Item>
                  </p>
                ),
              },
            ]}
          ></Collapse>
        </Form>
      </Modal>
    )
  }

  const handleAreaChange = (value) => {
    setSelectedArea(value)
  }

  const handleModalOpen = async (item) => {
    try {
      // 通过 await 确保数据请求成功后再设置 Modal 可见性
      await fetchBoxData(item?.id)

      // 只有当 cemeteryStatus 为 0 时才能打开 Modal
      setSelectedBoxData(item)
      setModalVisible(true)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleModalCancel = () => {
    setModalVisible(false)
  }

  const handleFormFinish = (values) => {
    // 将数据提交给接口
    console.log(selectedBoxData)
    const requestData = {
      itemId: selectedBoxData.id,
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
        fetchData()

        setModalVisible(false)
      })
      .catch((error) => {
        message.error(error)
        console.error('购买失败:', error)
      })
  }
  const handleLevelChange = (value) => {
    setFloor(value)
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
        detail={modalData}
      />
    </div>
  )
}

export default App
