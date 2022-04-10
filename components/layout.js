import Header from "./header"
import Footer from "./footer"


const name = 'Paw Pal'
export const siteTitle = 'Paw Pal'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
