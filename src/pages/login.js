import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '~/context/authContext'

const Login = () => {
  const { token, setToken } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (document) {
      if (token) router.push('/')

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
          if (window) window.location = '/'
        }
      }
    }
  }, [])

  return <p>Please wait...</p>
}

export default Login
