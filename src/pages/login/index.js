// 登录组件
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './index.scss'
import request from '../../http/request.js'

function Login() {
  // 导航对象
  const navigate = useNavigate()

  // 用户信息
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  })

  // 输入框处理回调
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  // Login按钮回调：请求判断用户状态
  const handleSubmit = (e) => {
    e.preventDefault()

    request
      .post('/user-info/login', userInfo)
      .then((toekn) => {
        localStorage.setItem('token', toekn)
        localStorage.setItem('username', userInfo.username)

        // 登录成功后跳转到 Home 页面
        navigate('/home/cemeteryInfo')
      })
      .catch((error) => {
        alert(error)
        console.error('Error:', error)
      })
  }

  return (
    <div className='login-container'>
      <h2>欢迎登陆智慧陵寝平台</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>账号:</label>
        <input
          type='text'
          name='username'
          required
          value={userInfo.username}
          onChange={handleChange}
        />

        <label htmlFor='password'>密码:</label>
        <input
          type='password'
          name='password'
          required
          value={userInfo.password}
          onChange={handleChange}
        />

        <button type='submit'>Login</button>
      </form>

      <p>
        还没有账号? <Link to='/register'>注册</Link>
      </p>
    </div>
  )
}

export default Login
