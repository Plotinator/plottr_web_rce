import { cloneDeep } from 'lodash'

const RCE_INITIAL_VALUE = [{ type: 'paragraph', children: [{ text: '' }] }]

export const LIST_TYPES = ['numbered-list', 'bulleted-list']

export function useTextConverter (text) {
  let rceText = text
  if (!text || !text.length || typeof text === 'string') {
    // [{ type: 'paragraph', children: [{ text: '' }] }]
    rceText = cloneDeep(RCE_INITIAL_VALUE)
  }
  if (typeof text === 'string') {
    rceText[0].children[0].text = text
  }

  return rceText
}
