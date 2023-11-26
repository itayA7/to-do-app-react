import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, About, Header, Tasks, Todo, Footer } from './components'
import { ToastContainer } from 'react-toastify'

function App() {
  const navigate = useNavigate();
  const handleAboutClick = () => {
    navigate('/about')
  };

  return (
    <>
      <Header />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/' element={<Home />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/todo/:todoId' element={<Todo />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
