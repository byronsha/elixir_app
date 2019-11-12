import React from 'react'
import { Editor } from 'slate-react'
import { isKeyHotkey } from 'is-hotkey'

import styled from '@emotion/styled'
import { Flex, Box, Heading, IconButton, Text } from '@chakra-ui/core'
import { FiBold, FiUnderline, FiItalic, FiCode, FiList } from 'react-icons/fi'

const DEFAULT_NODE = 'paragraph'

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

class RichTextEditor extends React.Component {
  hasMark = type => {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type === type)
  }

  hasBlock = type => {
    const { value } = this.props
    return value.blocks.some(node => node.type === type)
  }

  ref = editor => {
    this.editor = editor
  }

  render() {
    return (
      <Box p={2}>
        <Flex mb={2}>
          {this.renderMarkButton('bold', FiBold)}
          {this.renderMarkButton('italic', FiItalic)}
          {this.renderMarkButton('underlined', FiUnderline)}
          {this.renderMarkButton('code', FiCode)}
          {this.renderBlockButton('heading-one', H1)}
          {this.renderBlockButton('heading-two', H2)}
          {this.renderBlockButton('bulleted-list', FiList)}
        </Flex>
        <EditorContainer>
          <Editor
            spellCheck
            autoFocus
            placeholder="Enter some rich text..."
            ref={this.ref}
            value={this.props.value}
            onChange={this.props.onChange}
            onKeyDown={this.onKeyDown}
            renderBlock={this.renderBlock}
            renderMark={this.renderMark}
          />
        </EditorContainer>
      </Box>
    )
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)

    return (
      <IconButton
        onMouseDown={event => this.onClickMark(event, type)}
        variant={isActive ? 'solid' : 'outline'}
        variantColor="blue"
        aria-label={type}
        icon={icon}
        size="sm"
        mr={1}
      />
    )
  }

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type)

    if (['bulleted-list'].includes(type)) {
      const { value: { document, blocks } } = this.props

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
      <IconButton
        onMouseDown={event => this.onClickBlock(event, type)}
        variant={isActive ? 'solid' : 'outline'}
        variantColor="blue"
        aria-label={type}
        icon={icon}
        size="sm"
        mr={1}
      />
    )
  }

  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <Heading as="h1" size="2xl" {...attributes}>{children}</Heading>
      case 'heading-two':
        return <Heading as="h2" size="xl" {...attributes}>{children}</Heading>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return next()
    }
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  onKeyDown = (event, editor, next) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return next()
    }

    event.preventDefault()
    editor.toggleMark(mark)
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
  }

  onClickBlock = (event, type) => {
    event.preventDefault()

    const { editor } = this
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }
}

export default RichTextEditor

const H1 = () => <Text fontWeight={300}>H1</Text>

const H2 = () => <Text fontWeight={300}>H2</Text>

const EditorContainer = styled(Box)`
  ul {
    padding-left: 1.5rem;
  }

  code {
    background-color: #CBD5E0;
  }
`