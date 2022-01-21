import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from '../styles/Home.module.css'
import APestanas from '../components/APestanas'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (session) {
    return (
      <>
        SESSION
        {console.log(session)}
        <div> {session.user?.name}</div>
        <button type="button" onClick={() => signOut()}>
          OUT
        </button>
        <AppBar position="relative">
        <Toolbar>
          <Typography variant="h5" color="black" noWrap>
            Pagos
          </Typography>
        </Toolbar>
      </AppBar>
        <APestanas 
        session={session}/>
      </>
    )
  }

  return (
    <div className={styles.container}>
      No session
      <button type="button" onClick={() => signIn()}>
        Click
      </button>
    </div>
  )
}

export default Home
