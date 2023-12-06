// 登录组件
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import request from '../../http/request.js';

function Login() {

    // 用户信息
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
    });

    // 输入框处理回调
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Login按钮回调：请求判断用户状态
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userInfo)

        request.post('/user-info/login', userInfo)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="username"
                        required
                        value={userInfo.username}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={userInfo.password}
                        onChange={handleChange}
                    />

                    <button type="submit">Login</button>
                </form>

                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        );
}

export default Login;



