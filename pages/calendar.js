import Head from 'next/head'
import Calendar from 'react-calendar'
import React, {useState} from 'react'
import moment from 'moment'
import { SessionProvider, useSession, getSession } from "next-auth/react"
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css'

function MyCalendar() {
    const [dateState, setDateState] = useState(new Date())
    const { data: session} = useSession()
    const changeDate = (e) =>{
      setDateState(e)
    }
    
    return (
        <>
            <Head>
                <title>PawPal</title>
                <link rel="icon" href="/bone.ico" />
            </Head>
            <SessionProvider session={session}>
                <main className={styles.main}>
                    <Calendar 
                            value={dateState}
                            onChange={changeDate}
                    />
                    <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
                </main>
            </SessionProvider>
        </>
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
export default MyCalendar;