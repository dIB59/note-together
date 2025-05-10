import React from 'react'
import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Strikethrough, Code } from 'lucide-react'

interface TextFormatButtonsProps {
  editor: Editor
}

export const TextFormatButtons: React.FC<TextFormatButtonsProps> = ({ editor }) => {
  const getVariant = (isActive: boolean) => (isActive ? 'default' : 'ghost')

  return (
    <div className="flex items-center space-x-1 mr-2">
      <Button
        size="sm"
        variant={getVariant(editor.isActive('bold'))}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className="h-8 w-8 p-0"
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      
      <Button
        size="sm"
        variant={getVariant(editor.isActive('italic'))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className="h-8 w-8 p-0"
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      
      <Button
        size="sm"
        variant={getVariant(editor.isActive('strike'))}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className="h-8 w-8 p-0"
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      
      <Button
        size="sm"
        variant={getVariant(editor.isActive('code'))}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className="h-8 w-8 p-0"
        title="Inline Code"
      >
        <Code className="h-4 w-4" />
      </Button>
    </div>
  )
}