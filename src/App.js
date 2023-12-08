import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import RegisterClass from './pages/RegisterClass'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import HomeWork from './pages/HomeWork'
const App = () => {

  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>} />
      <Route path='/login' index element={<Login/>} />
      <Route path='/' index element={<Login/>} />
      <Route path='/regclass' element={<RegisterClass/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/courses' element={<Courses/>} />
      <Route path='/homework' element={<HomeWork/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
