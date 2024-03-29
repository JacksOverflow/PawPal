import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getSession} from 'next-auth/react'
import React from 'react'
import {signIn} from 'next-auth/react'

const Login = () => {
    return (
        <div className>
            <Head>
            <title>PawPal</title>
            <link rel="icon" href="/bone.ico" />
            </Head>

            <main className={styles.main}>
            <h1 className={styles.title}>
                <p><Image src="/PawPalLogo.jpg" alt="PawPal Logo" width={320} height={240} /></p>
                <button
                    href="/api/auth/signin" 
                    onClick={(e) => {
                        e.preventDefault()
                        signIn()
                    }}>
                    Login here!
                </button>
            </h1>
            </main>
        </div>
    )
}

export async function getServerSideProps (context) {
    const session = await getSession(context)
    if(!session){
        return {
            props: {
            session: await getSession(context)
            }
        }
    }
    return{
        redirect:{
            destination:'/',
            permanent: false
        }
    }
}

export default Login