// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import React from 'react'
import {HashRouter  as Router,Route,Routes } from 'react-router-dom'

import './App.css'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'
// import Header from './components/header'
// import Footer from './components/Footer'

function App() {

  return (
    <>

    

    

      
        <Router>
          <Routes>
              <Route path='/' element={<PostList/>} />
              <Route path='/blogs/:id' element={<PostDetail/>}/>
          </Routes>
        </Router>
     
    </>
  )
}

export default App
