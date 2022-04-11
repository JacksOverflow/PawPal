import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Footer from '/components/footer'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PawPal</title>
        <link rel="icon" href="/bone.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <p>Welcome to PawPal!</p>
          <a href="/api/auth/signin"><Image src="/PawPalLogo.jpg" alt="PawPal Logo" width={160} height={120} /></a>
        </h1>
      </main>

      

    </div>
  )
}
