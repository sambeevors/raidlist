import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthContext, useAuth } from '~/context/authContext'
import '~/css/style.css'
import Layout from '~/layouts/default'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps, router }) => {
  const { token } = useAuth()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={token}>
        <Layout>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </AuthContext.Provider>
    </QueryClientProvider>
  )
}

export default MyApp
