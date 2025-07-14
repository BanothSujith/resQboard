import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Draw from '../pages/Draw'
import Alerts from '../pages/Alerts'
import Help from '../pages/Help'

function RoutersApp() {
  return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/draw' element={<Draw/>} />
            <Route path='/alerts' element={<Alerts/>} />
            <Route path='/help' element={<Help/>} />
        </Routes>
  )
}

export default RoutersApp