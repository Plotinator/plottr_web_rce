import React, { useState, useEffect } from 'react'
import RichTextEditor from './rce/RichTextEditor'
import RichTextViewer from './rce/RichTextViewer'

export default function App (props) {
  const [checkForWindow, setCheckWindow] = useState(false)
  const [text, setText] = useState(null)
  const [readOnly, setReadOnly] = useState(false)

  useEffect(() => {
    setTimeout(() => setCheckWindow(true), 5000)
  }, [])

  useEffect(() => {
    if (window) {
      setText(window.injectedText)
      setReadOnly(window.readOnly || false)
    }
  }, [checkForWindow])

  const onChange = (val) => {
    if (window?.ReactNativeWebView?.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify(val))
    }
    setText(val)
  }

  const renderRichText = () => {
    if (readOnly) {
      return <RichTextViewer text={text} className={props.className} />
    } else {
      return <RichTextEditor
        className={props.className}
        onChange={onChange}
        autoFocus={true}
        text={text}
        darkMode={props.darkMode}
      />
    }
  }

  return <main>
    { renderRichText() }
  </main>
}