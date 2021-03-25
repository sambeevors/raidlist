import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Container } from '~/components/layout'

const Layout = (props) => (
  <div className="flex flex-col min-h-screen bg-purple-500 text-white antialiased">
    <Header />
    <Container as="main" className="flex-1 w-full mx-auto py-8 md:py-16">
      {props.children}
    </Container>
    <Footer />
  </div>
)

export default Layout
