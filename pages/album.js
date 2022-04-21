import { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {SessionProvider, getSession, useSession} from "next-auth/react"
import Image from 'next/image'
import images from '../data/images'

import {search, mapImageResources} from '../lib/cloudinary'

export default function Album({images}) {
  console.log('images', images);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const { data: session} = useSession()

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData('');
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({name}) => name === 'file')

    const formData = new FormData();
    for (const file of fileInput.files){
      formData.append('file', file);
    }

    formData.append('upload_preset', 'pawpal-uploads')

    const data = fetch('https://api.cloudinary.com/v1_1/pawpal/image/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json());

    setImageSrc(data.secure_url);
    setUploadData(data)
  }

  return (
    <>
      <Head>
        <title>Photo Album</title>
        <meta name="description" content="Upload dog pack!" />
        <link rel="icon" href="/bone.ico" />
      </Head>
      <SessionProvider session={session}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Photo Album
          </h1>
          <p className={styles.description}>
            Upload your dog pack! 
            <br/>
            <small>(rename files as your full user name (refer to top left corner) without spaces and .jpg [ex. JohnDoe.jpg or Jane1023.jpg] before uploading)</small>
          </p>
          <form className={styles.form} method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
            <p>
              <input type="file" name="file" />
            </p>
            <img src={imageSrc} />
            {imageSrc && !uploadData && (
              <p>
                <button>Upload Files</button>
              </p>
            )}
            {uploadData && (
              <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
            )}
          </form>
        </main>
        <main className={styles.container}>
          <h1>Dog Images</h1>
          <ul>
            {images.map(image => {
              return (
                <ul key={image.id}>
                  <a href={image.link} rel="noreferrer">
                    <div className={styles.imageImage}>
                      <Image width={image.width} height={image.height} src={image.image} alt="" />
                    </div>
                  </a>
                </ul>
              )
            })}
          </ul>
        </main>
      </SessionProvider>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const results = await search(session.user.name.split(" "));
  const {resources} = results;
  const images = mapImageResources(resources);

  if(!session){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  return {
    props: { 
      session,
      images,
    }
  }
}
