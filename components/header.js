import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import Link from "next/link"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session} = useSession()

  return (
    <header>
      <meta name="referrer" content="no-referrer"/>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${styles.loaded}`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <> 
            
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')`}}
                  className={styles.avatar}
                />
              )} 
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      {session &&(
        <nav className={styles.centerItems}>
          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/calendar">
                <a>Calendar</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/medhx">
                <a>Medical History</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/pack">
                <a>Dog Pack!</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/album">
                <a>Photo Album</a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
