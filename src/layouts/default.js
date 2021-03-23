import Header from '~/components/Header'
import Footer from '~/components/Footer'

const Layout = (props) => (
  <div className="flex flex-col min-h-screen bg-purple-500 text-white antialiased">
    <Header />
    <main className="flex-1 w-full max-w-4xl p-4 mx-auto md:px-8 md:py-16">
      {props.children}
    </main>
    <Footer />
  </div>
)

export default Layout
