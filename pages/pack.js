import Head from 'next/head'
import Calendar from 'react-calendar'
import React, {useState} from 'react'
import { SessionProvider, useSession, getSession } from "next-auth/react"
import 'react-calendar/dist/Calendar.css';
import styles from '../components/post.module.css'
import Dog from '../components/dog'
import {useRouter} from 'next/router'

export default function Pack({ dogs }) {
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { data: session } = useSession();
    const router = useRouter();

    const handleDog = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!content) return setError('All fields are required');

        // event structure
        let dog = {
            user,
            name,
            age,
            breed,
            createdAt: new Date().toISOString(),
        };
        // save the event
        let response = await fetch('/api/dogs', {
            method: 'POST',
            body: JSON.stringify(dog),
        });

        // get the data
        let data = await response.json();

        if (data.success) {
            // reset the fields
            setName('');
            setAge('');
            setBreed('');
            // set the message
            setMessage(data.message);
            return router.push(router.asPath);
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
            <main className={styles.container}>
                {dogs.length === 0 ? (
                    <h2>Dog pack is empty</h2>
                ) : (
                    <ul>
                        {dogs.map((dog, i) => (
                            <Dog dog={dog} key={i} />
                        ))}
                    </ul>
                )}
                <div>
                    <div className={styles.formItem}>
                        <form onSubmit={handleDog} className={styles.form}>
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
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    placeholder="Enter dog's name"
                                />
                            </div>
                            <div className={styles.formItem}>
                                <label>Age (years)</label>
                                <input
                                    type="text"
                                    name="age"
                                    onChange={(e) => setAge(e.target.value)}
                                    value={age}
                                    placeholder="Enter dog's age"
                                />
                            </div>

                            <div className={styles.formItem}>
                                <label>Breed</label>
                                <input
                                    type="text"
                                    name="breed"
                                    onChange={(e) => setBreed(e.target.value)}
                                    value={breed}
                                    placeholder="Enter dog's breed(s)"
                                />
                            </div>
                            <div className={styles.formItem}>
                                <button type="submit"
                                    onClick={(e) => setUser(session.user.name)}>
                                    Add dog</button>
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
  
    if(!session){
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
        // get the current environment
        let dev = process.env.NODE_ENV !== 'production';
        let { DEV_URL, PROD_URL } = process.env;
      
        // request dogs from api
        let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/dogs?name=${session.user.name}`);
        // extract the data
        let data = await response.json();
    
    return {
      props: { 
        session,
        dogs: data['message'],
      }
    }
  }

