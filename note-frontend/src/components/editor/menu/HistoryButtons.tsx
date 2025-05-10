import React from 'react'
import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Undo2, Redo2 } from 'lucide-react'

interface HistoryButtonsProps {
  editor: Editor
}

export const HistoryButtons: React.FC<HistoryButtonsProps> = ({ editor }) => {
  return (
    <div className="flex items-center space-x-1">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="h-8 w-8 p-0"
        title="Undo"
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="h-8 w-8 p-0"
        title="Redo"
      >
        <Redo2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
