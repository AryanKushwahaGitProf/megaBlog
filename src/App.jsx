
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import { useState, useEffect } from 'react'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './component/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App