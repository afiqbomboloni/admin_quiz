import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './component/AuthComponent/Login'
import Dashboard from './component/Admin/Dashboard'
import PrivateRoutes from './auth'
import CreateQuiz from './component/Admin/CreateQuiz'
import EditQuiz from './component/Admin/EditQuiz'
import DetailQuiz from './component/Admin/DetailQuiz'
import Reports from './component/Admin/Reports'

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/create-quiz' element={<CreateQuiz />} />
        <Route path='/edit-quiz/:id' element={<EditQuiz />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/detail-quiz/:id' element={<DetailQuiz />} />
        </Route>
      </Routes>
        
    </div>
  )
}