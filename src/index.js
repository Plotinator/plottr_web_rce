import React from 'react'
import RichTextEditor from './rce/RichTextEditor'

export default function App (props) {

  return <main>
    <RichTextEditor
      className={props.className}
      onChange={props.onChange}
      autoFocus={props.autofocus}
      text={props.description}
      darkMode={props.darkMode}
    />
  </main>
}