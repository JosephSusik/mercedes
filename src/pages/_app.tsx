import '../styles/globals.css'
import '../styles/PreviewCar.css'
import '../styles/DisplayCar.css'
import '../styles/Navbar.css'
import '../styles/AddCar.css'
import '../styles/Loading.css'

import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import Head from "next/head";

export default function App({ Component, pageProps }:AppProps) {
    return(
     <>
     <Head>
      {/* preconnect scripts... */}
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      <title>Mercedes-Benz</title>
      <link rel="shortcut icon" href="../favicon.ico" />
    </Head> 
      <Layout> 
        <Component {...pageProps} />
      </Layout>
      </>
    ) 
  }    