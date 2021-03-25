import { createContext } from 'react'
import { useCookie } from 'react-use'

export const useAuth = () => {
  const [token, setToken, removeToken] = useCookie('token')
  return { token, setToken, removeToken }
}

export const AuthContext = createContext()
