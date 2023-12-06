// 路由对象
import Home from '../pages/home';
import Others from '../pages/others';
import { Routes, Route, Navigate } from 'react-router-dom';

function CreateRoutes() {
	return (
        <Routes>
            <Route path='/home/*' element={<Home/>}/>
            <Route path='/others' element={<Others/>}/>
			<Route path='/' element={<Navigate to="/home"/>}/>
        </Routes>
	);
}

export default CreateRoutes;
