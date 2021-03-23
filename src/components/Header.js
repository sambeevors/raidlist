import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '~/context/authContext'
import Logo from '~/components/icons/Logo'

const Header = () => {
  const { token, removeToken } = useAuth()
  const router = useRouter()

  const loginUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_TWITCH_REDIRECT_URI}&response_type=token`
  const logoutUrl = `https://id.twitch.tv/oauth2/revoke?client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&token=${token}`

  const handleLogin = (e) => {
    e.preventDefault()
    router.push(loginUrl)
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    removeToken()

    try {
      await axios.post(logoutUrl)
      router.push('/')
      router.reload()
    } catch (e) {
      console.warn(e)
      alert('Something went wrong, please try again later.')
    }
  }

  return (
    <header className="border-b border-purple-400">
      <div className="flex flex-wrap md:flex-no-wrap items-center justify-between max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex items-center">
          <Link href="/">
            <a className="font-bold tracking-widest uppercase text-white text-lg lg:text-xl flex items-center space-x-1">
              <span>Raid</span>
              <Logo className="fill-current text-2xl lg:text-3xl" />
              <span>List</span>
            </a>
          </Link>
        </div>

        <a
          className="text-white px-4 py-2 nm-convex-purple-500 rounded-full transition text-xs uppercase tracking-widest font-bold leading-5"
          href={token ? logoutUrl : loginUrl}
          onClick={token ? handleLogout : handleLogin}
        >
          {token ? 'Logout' : 'Login'}
        </a>
      </div>
    </header>
  )
}

export default Header
