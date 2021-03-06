import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import PropTypes from 'react-proptypes'
import i18n from 'format-message'
import { ButtonGroup } from 'react-bootstrap'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { useAndroidPlugin } from 'slate-android-plugin'
import { FaBold, FaItalic, FaUnderline, FaQuoteLeft, FaListOl, FaListUl, FaStrikethrough } from 'react-icons/fa'
import ToolBar from './ToolBar'
import { MarkButton, toggleMark } from './MarkButton'
import BlockButton from './BlockButton'
import { withLinks } from './LinkButton'
import { withHTML } from './withHTML'
import withNormalizer from './Normalizer'
import Leaf from './Leaf'
import Element from './Element'
import cx from 'classnames'
import { useTextConverter } from './helpers'

const RichTextEditor = (props) => {
  let editor
  if (props.isAndroid) {
    editor = useAndroidPlugin(useMemo(() => {
      return withNormalizer(withHTML(withLinks(withHistory(withReact(createEditor())))))
    }, []))
  } else {
    editor = useMemo(() => {
      return withNormalizer(withHTML(withLinks(withHistory(withReact(createEditor())))))
    }, [])
  }
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const renderElement = useCallback(props => <Element {...props} />, [])
  const [value, setValue] = useState(useTextConverter(props.initialText))

  if (!value) return null

  const updateValue = newVal => {
    setValue(newVal)
    // only update if it changed
    // (e.g. this event could fire with a selection change, but the text is the same)
    if (value !== newVal) {
      props.onChange(newVal)
    }
  }

  const otherProps = {
    autoFocus: props.autoFocus
  }
  return (
    <Slate editor={editor} value={value} onChange={updateValue}>
      <div className={cx('slate-editor__wrapper', props.className)}>
        <div className={cx('slate-editor__toolbar-wrapper', {darkmode: props.darkMode})}>
          <ToolBar>
            <ButtonGroup>
              <MarkButton mark='bold' icon={<FaBold/>} />
              <MarkButton mark='italic' icon={<FaItalic/>} />
              <MarkButton mark='underline' icon={<FaUnderline/>} />
              <MarkButton mark='strike' icon={<FaStrikethrough/>} />
              <BlockButton format='heading-one' icon={i18n('Title')} />
              <BlockButton format='heading-two' icon={i18n('Subtitle')} />
              <BlockButton format='numbered-list' icon={<FaListOl/>} />
              <BlockButton format='bulleted-list' icon={<FaListUl/>} />
            </ButtonGroup>
          </ToolBar>
        </div>
        <div className={cx('slate-editor__editor', {darkmode: props.darkMode})}>
          <Editable
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            placeholder={i18n('Enter some text...')}
          />
        </div>
      </div>
    </Slate>
  )
}

RichTextEditor.propTypes = {
  text: PropTypes.any,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  darkMode: PropTypes.bool,
}

export default RichTextEditor