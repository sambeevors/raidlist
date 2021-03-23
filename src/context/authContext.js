import { useEffect } from 'react'
import { createContext } from 'react'

import { useLocalStorage } from 'react-use'

export const useAuth = () => {
  const [token, setToken, removeToken] = useLocalStorage('token')

  useEffect(() => {
    if (document) {
      const hash = document?.location?.hash
      if (hash) {
        const params = new URLSearchParams(hash.substring(1))
        const obj = {}

        for (const key of params.keys()) {
          if (params.getAll(key).length > 1) {
            obj[key] = params.getAll(key)
          } else {
            obj[key] = params.get(key)
          }
        }

        if (obj.access_token) {
          setToken(obj.access_token)
        }
      }
    }
  }, [])

  return { token, setToken, removeToken }
}

export const AuthContext = createContext()
