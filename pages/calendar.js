import Head from 'next/head'
import Calendar from 'react-calendar'
import React, {useState} from 'react'
import moment from 'moment'
import { SessionProvider, useSession, getSession } from "next-auth/react"
import 'react-calendar/dist/Calendar.css';
import styles from '../components/post.module.css'
import Event from '../components/event'

export default function MyCalendar({events}) {
  const [user, setUser] = useState('');
  const [content, setContent] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [dateState, setDateState] = useState(new Date())
  const { data: session} = useSession()
  const changeDate = (e) =>{
    setDateState(e)
  }
  
  const handleEvent = async (e) => {
    e.preventDefault();

    // reset error and message
    setError('');
    setMessage('');

    // fields check
    if (!content) return setError('All fields are required');

    // event structure
    let event = {
        user,
        content,
        eventDate,
        createdAt: new Date().toISOString(),
    };
    // save the event
    let response = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(event),
    });

    // get the data
    let data = await response.json();

    if (data.success) {
        // reset the fields
        setUser('');
        setContent('');
        setEventDate('');
        // set the message
        return setMessage(data.message);
    } else {
        // set the error
        return setError(data.message);
    }
  };
  
  return (
    <>
      <Head>
      <title>PawPal</title>
      <link rel="icon" href="/bone.ico" />
      </Head>
      <SessionProvider session={session}>
            <div className={styles.container}>
              
            </div>
            <main className={styles.container}>
              {events.length === 0 ? (
                  <h2>No Scheduled Events</h2>
                ) : (
                  <ul>
                      {events.map((event, i) => (
                          <Event event={event} key={i} />
                      ))}
                  </ul>
              )}
              <Calendar value={dateState} onChange={changeDate}/>
              <div>
                <div className={styles.formItem}>
                    <form onSubmit={handleEvent} className={styles.form}>
                        {error ? (
                            <div className={styles.formItem}>
                                <h3 className={styles.error}>{error}</h3>
                            </div>
                        ) : null}
                        {message ? (
                            <div className={styles.formItem}>
                                <h3 className={styles.message}>{message}</h3>
                            </div>
                        ) : null}
                        <div className={styles.formItem}>
                            <label>Content</label>
                            <textarea
                                name="content"
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                placeholder={dateState}
                            />
                        </div>
                        <div className={styles.formItem}>
                            <button type="submit"
                              onClick={(e) => 
                                [setUser(session.user.name), 
                                setEventDate(moment(dateState).format('MMMM Do YYYY'))]}>
                              Add event</button>
                        </div>
                    </form>
                </div>
              </div>
          </main>
      </SessionProvider>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  // get the current environment
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;

  // request events from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/events?name=${session.user.name}`);
  // extract the data
  let data = await response.json();

  if(!session){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: { 
      session,
      events: data['message'], 
    }
  }
}