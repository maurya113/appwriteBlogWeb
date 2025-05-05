import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer } from './components'
import { Header } from './components'
import { Outlet } from 'react-router'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then(userData => {
      if (userData) {
        dispatch(login({ userData }))
      } else{
        dispatch(logout())
      }
      }) 
    .catch((error)=> console.log('no active user found'))
    .finally(()=> setLoading(false))
  }, [dispatch])
  
  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gray-400'>
     
        <Header/>
        <main className='flex-grow'>
          <Outlet/> 
        </main>
        <Footer/>
     
    </div>
  ) : (null)
}

export default App
