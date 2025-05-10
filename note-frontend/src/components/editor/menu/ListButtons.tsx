import React from 'react'
import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { List, ListOrdered, Quote, TerminalSquare, SeparatorHorizontal } from 'lucide-react'

interface ListButtonsProps {
  editor: Editor
}

export const ListButtons: React.FC<ListButtonsProps> = ({ editor }) => {
  const getVariant = (isActive: boolean) => (isActive ? 'default' : 'ghost')

  return (
    <div className="flex items-center space-x-1 mr-2">
      <Button
        size="sm"
        variant={getVariant(editor.isActive('bulletList'))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="h-8 w-8 p-0"
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      
      <Button
        size="sm"
        variant={getVariant(editor.isActive('orderedList'))}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="h-8 w-8 p-0"
        title="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      
      <Button
        size="sm"
        variant={getVariant(editor.isActive('blockquote'))}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="h-8 w-8 p-0"
        title="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </Button>
      
      <Button
        size="sm"
        variant={getVariant(editor.isActive('codeBlock'))}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className="h-8 w-8 p-0"
        title="Code Block"
      >
        <TerminalSquare className="h-4 w-4" />
      </Button>
      
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="h-8 w-8 p-0"
        title="Horizontal Rule"
      >
        <SeparatorHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}