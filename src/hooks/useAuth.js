import { useState } from 'react'
import { getAll, postItem } from '../modules/apiManager'

export default () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const isAuthenticated = () => loggedIn || localStorage.getItem('credentials') !== null

  const login = creds => {
    getAll('users').then(users => {
      users.map(user => {
        if (creds.email === user.email && creds.password === user.password) {
          const { id, userName, firstName } = user
          const userInfo = { id, userName, firstName }

          localStorage.setItem('credentials', JSON.stringify(userInfo))
          setLoggedIn(true)
        }
        return user.id
      })
    })
    if (!isAuthenticated) window.alert('Please enter the correct email + password.')
  }

  const register = userInfo => {
    postItem('users', userInfo).then(r => login(r))
  }

  const logout = () => {
    setLoggedIn(false)
    localStorage.removeItem('credentials')
  }

  return { isAuthenticated, logout, login, register }
}
