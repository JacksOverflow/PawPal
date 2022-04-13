import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getSession, useSession} from 'next-auth/react'


const Home = () => {
  const { data: session} = useSession()
    return (
      <div className={styles.container}>
        <Head>
          <title>PawPal</title>
          <link rel="icon" href="/bone.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            <p>Welcome {session.user.name}, to PawPal!</p>
          <Image src="/PawPalLogo.jpg" alt="PawPal Logo" width={320} height={240} />
          </h1>
        </main>
      </div>
    )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if(!session){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}
export default Home

