import React from 'react'
import { Editor } from '@tiptap/react'
import { TextFormatButtons } from './menu/TextFormatButtons'
import { HeadingButtons } from './menu/HeadingButtons'
import { ListButtons } from './menu/ListButtons'
import { HistoryButtons } from './menu/HistoryButtons'
import { ClearButtons } from './menu/ClearButtons'
import { ColorPicker } from './menu/ColorPicker'

interface EditorMenuBarProps {
  editor: Editor | null
}

export const EditorMenuBar: React.FC<EditorMenuBarProps> = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-2 sticky top-0 bg-white dark:bg-gray-800 z-10 shadow-sm">
      <div className="flex flex-wrap gap-1">
        <TextFormatButtons editor={editor} />
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
        
        <ColorPicker editor={editor} />
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
        
        <HeadingButtons editor={editor} />
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
        
        <ListButtons editor={editor} />
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
        
        <HistoryButtons editor={editor} />
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
        
        <ClearButtons editor={editor} />
      </div>
    </div>
  )
}