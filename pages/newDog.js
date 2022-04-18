import Head from 'next/head'
import { SessionProvider, useSession} from "next-auth/react"
import styles from '../styles/Home.module.css'

function NewDog(){
    const { data: session} = useSession()

    return(
        <>
        <Head>
            <title>PawPal</title>
            <link rel="icon" href="/bone.ico" />
        </Head>
        <SessionProvider session={session}>
            <main className={styles.main}>
            </main>
        </SessionProvider>
    </>

    )
}

export default NewDog;