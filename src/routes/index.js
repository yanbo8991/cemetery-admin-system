// 路由对象
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import { Routes, Route, Navigate } from 'react-router-dom';

function CreateRoutes() {
	return (
        <Routes>
            <Route path='/home/*' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
			<Route path='/' element={<Navigate to="/home"/>}/>
        </Routes>
	);
}

export default CreateRoutes;
