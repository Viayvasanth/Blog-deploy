// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import React from 'react'
import {HashRouter  as Router,Route,Routes } from 'react-router-dom'

import './App.css'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'
import { Toaster } from 'react-hot-toast';
// import Header from './components/header'
// import Footer from './components/Footer'

function App() {

  return (
    <>
 <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
          },
          success: {
            duration: 5000,
            style: {
              background: 'white',
              color:"black",
              fontSize:'18px',
            },
           
          },
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
        }}
      />

        <Router>
          <Routes>
              <Route path='/' element={<PostList/>} />
              <Route path='/blogs/:slug' element={<PostDetail/>}/>
          </Routes>
        </Router>
     
    </>
  )
}

export default App
