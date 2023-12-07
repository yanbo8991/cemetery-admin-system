// 路由对象
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import CustomerList from '../pages/customerList'
import DeadList from '../pages/deadList'
import TransactionList from '../pages/transactionList'

import { Routes, Route, Navigate } from 'react-router-dom'

function CreateRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/home/*' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home/customerList' element={<CustomerList />} />
      <Route path='/home/deadList' element={<DeadList />} />
      <Route path='/home/transactionList' element={<TransactionList />} />

      <Route path='/' element={<Navigate to='/login' />} />
    </Routes>
  )
}

export default CreateRoutes
