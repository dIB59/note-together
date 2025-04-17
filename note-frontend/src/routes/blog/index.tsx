import { createFileRoute } from '@tanstack/react-router'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
})

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) return null

  const getVariant = (isActive: boolean) => (isActive ? 'default' : 'outline')

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-1 justify-center">
        <Button
          variant={getVariant(editor.isActive('bold'))}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          variant={getVariant(editor.isActive('italic'))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          variant={getVariant(editor.isActive('strike'))}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          Strike
        </Button>
        <Button
          variant={getVariant(editor.isActive('code'))}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
        >
          Code
        </Button>
        <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </Button>
        <Button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </Button>
        <Button
          variant={getVariant(editor.isActive('paragraph'))}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          Paragraph
        </Button>
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <Button
            key={level}
            variant={getVariant(editor.isActive('heading', { level }))}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          >
            H{level}
          </Button>
        ))}
        <Button
          variant={getVariant(editor.isActive('bulletList'))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </Button>
        <Button
          variant={getVariant(editor.isActive('orderedList'))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Ordered List
        </Button>
        <Button
          variant={getVariant(editor.isActive('codeBlock'))}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code Block
        </Button>
        <Button
          variant={getVariant(editor.isActive('blockquote'))}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Blockquote
        </Button>
        <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          Horizontal Rule
        </Button>
        <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard Break
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </Button>
        <Button
          variant={getVariant(editor.isActive('textStyle', { color: '#958DF1' }))}
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        >
          Purple
        </Button>
      </div>
    </div>
  )
}

export default MenuBar

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

const BlogPage = () => {
  return (
    <div class='p-8'>
      <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
    </div>
  )
 }


