import Head from 'next/head'
import App from '../src'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Plottr Rich Text Editor</title>
      </Head>

      <App
        className=''
        onChange={value => console.log(value)}
        autoFocus={true}
        text={''}
        darkMode={false}
      />
    </div>
  )
}
