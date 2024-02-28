import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './component/AuthComponent/Login'
import Dashboard from './component/Admin/Dashboard'
import PrivateRoutes from './auth'
import CreateQuiz from './component/Admin/CreateQuiz'
import EditQuiz from './component/Admin/EditQuiz'
import DetailQuiz from './component/Admin/DetailQuiz'

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoutes />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/create-quiz' element={<CreateQuiz />} />
        <Route path='/dashboard/edit-quiz/:id' element={<EditQuiz />} />
        <Route path='/dashboard/detail-quiz/:id' element={<DetailQuiz />} />
        </Route>
      </Routes>
        
    </div>
  )
}