import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '~/context/authContext'
import Logo from '~/components/icons/Logo'
import { Col, Container, Row } from './layout'

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
      <Container>
        <Row>
          <Col className="flex flex-wrap md:flex-no-wrap items-center justify-between py-4 md:py-8 w-full">
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
              className="text-white px-4 py-2 hover:nm-flat-purple-500 group rounded-full transition text-xs uppercase tracking-widest font-bold leading-5 border border-purple-400 focus:outline-white active:border-transparent hover:border-transparent active:nm-inset-purple-500-sm"
              href={token ? logoutUrl : loginUrl}
              onClick={token ? handleLogout : handleLogin}
            >
              {token ? 'Logout' : 'Login'}
            </a>
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header
