import React, { useState, useEffect } from 'react'
import RichTextEditor from './rce/RichTextEditor'
import RichTextViewer from './rce/RichTextViewer'

const initialText = [{ type: 'paragraph', children: [{ text: '' }] }]

export default function App (props) {
  const [checkForWindow, setCheckWindow] = useState(false)
  const [text, setText] = useState(null)
  const [readOnly, setReadOnly] = useState(false)
  const [android, setAndroid] = useState(false)
  const [platformIsSet, setPlatform] = useState(false)

  useEffect(() => {
    if (!window) setTimeout(() => setCheckWindow(true), 5000)
  }, [])

  useEffect(() => {
    if (window) {
      setAndroid(!!window.isAndroid)
      setReadOnly(window.readOnly || false)
      if (window.injectedText && !text) {
        setText(window.injectedText)
      } else if (!window.injectedText && !text) {
        setText(initialText)
      }
    }
    setPlatform(true)
  }, [checkForWindow])

  const onChange = (val) => {
    if (window?.ReactNativeWebView?.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify(val))
    }
  }

  const renderRichText = () => {
    if (!platformIsSet) return null
    if (!text) return null

    if (readOnly) {
      return <RichTextViewer text={text} className={props.className} />
    } else {
      return <RichTextEditor
        className={props.className}
        onChange={onChange}
        autoFocus={true}
        initialText={text}
        darkMode={props.darkMode}
        isAndroid={android}
      />
    }
  }

  return <main>
    { renderRichText() }
  </main>
}