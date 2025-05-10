import React from 'react'
import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { ChevronsUp, Trash } from 'lucide-react'

interface ClearButtonsProps {
  editor: Editor
}

export const ClearButtons: React.FC<ClearButtonsProps> = ({ editor }) => {
  return (
    <div className="flex items-center space-x-1">
      <Button
        size="sm" 
        variant="ghost"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="h-8 w-8 p-0"
        title="Clear Formatting"
      >
        <ChevronsUp className="h-4 w-4" />
      </Button>
      
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="h-8 w-8 p-0"
        title="Clear Nodes"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  )
}