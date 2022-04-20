import Head from "next/head"
import React, {useState} from 'react'
import Post from '../components/post'
import styles from '../components/post.module.css'
import { SessionProvider, useSession, getSession } from "next-auth/react"

export default function MedHx({posts}){
  const [user, setUser] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { data: session} = useSession();

  function reloadAsGet()
  {
    var loc = window.location;
    window.location = loc.protocol + '//' + loc.host + loc.pathname;
  }

  const handlePost = async (e) => {
      e.preventDefault();

      // reset error and message
      setError('');
      setMessage('');

      // fields check
      if (!content) return setError('All fields are required');

      // post structure
      let post = {
          user,
          content,
          published: false,
          createdAt: new Date().toISOString(),
      };
      // save the post
      let response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify(post),
      });

      // get the data
      let data = await response.json();

      if (data.success) {
          // reset the fields
          setUser('');
          setContent('');
          // set the message
          setMessage(data.message);
          return reloadAsGet();
      } else {
          // set the error
          return setError(data.message);
      }
  };

  return(
    <>
    <Head>
        <title>PawPal</title>
        <link rel="icon" href="/bone.ico" />
    </Head>
    <SessionProvider session={session}>
      <main className={styles.container}>
        {posts.length === 0 ? (
            <h2>No added posts</h2>
          ) : (
            <ul>
                {posts.map((post, i) => (
                    <Post post={post} key={i} />
                ))}
            </ul>
        )}
        <div>
          <div className={styles.formItem}>
              <form onSubmit={handlePost} className={styles.form}>
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
                          placeholder="Post content"
                      />
                  </div>
                  <div className={styles.formItem}>
                      <button type="submit"
                        onClick={(e) => setUser(session.user.name)}>
                        Add post</button>
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

  // request posts from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts?name=${session.user.name}`);
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
      posts: data['message'],
    }
  }
}