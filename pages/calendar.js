
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import React, {useState} from 'react'
import moment from 'moment'
import { SessionProvider, useSession, getSession } from "next-auth/react"

function MyCalendar() {
    const [dateState, setDateState] = useState(new Date())
    const { data: session} = useSession()
    const changeDate = (e) =>{
      setDateState(e)
    }
    

    return (
        <SessionProvider session={session}>
                <Calendar 
                        value={dateState}
                        onChange={changeDate}
                />
                <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
        </SessionProvider>
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