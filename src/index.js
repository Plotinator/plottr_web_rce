import React, { useState, useEffect } from 'react'
import RichTextEditor from './rce/RichTextEditor'

export default function App (props) {

  const [text, setText] = useState('')

  useEffect(() => {
    if (window) {
      setText(window.injectedText)
    }
  }, [])

  const onChange = (val) => {
    if (window?.ReactNativeWebView?.postMessage) {
      window.ReactNativeWebView.postMessage(val)
    }
    setText(val)
  }

  return <main>
    <RichTextEditor
      className={props.className}
      onChange={onChange}
      autoFocus={true}
      text={text}
      darkMode={props.darkMode}
    />
  </main>
}