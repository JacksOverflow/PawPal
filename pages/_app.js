import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Layout from "/components/layout"
import connectDB from "/config/connectDB"



connectDB()
function MyApp({ Component, pageProps }) {

      
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp

