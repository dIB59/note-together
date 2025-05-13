// Editor.tsx - TipTap Editor with Suspense support
import React, { useTransition, useState } from 'react'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorMenuBar } from './EditorMenuBar'

interface NoteEditorProps {
  initialContent?: string
}

// This version uses React.lazy and Suspense internally for editor loading
export const SuspenseEditor: React.FC<NoteEditorProps> = ({ initialContent = '<p>Start writing...</p>' }) => {
  const [_, setEditor] = useState<Editor | null>(null)
  const [isPending, startTransition] = useTransition()
  
  // Create editor with suspense-friendly loading
  const tiptapEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing something amazing...',
      }),
    ],
    content: initialContent,
    onCreate: ({ editor }) => {
      // Use transition to avoid blocking the UI
      startTransition(() => {
        setEditor(editor)
      })
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none outline-none min-h-[500px] p-6',
      },
    },
  })

  return (
    <div className="w-full editor-container">
      {/* Always render menu bar, but disable buttons until editor is ready */}
      <EditorMenuBar editor={tiptapEditor} />
      
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        {isPending || !tiptapEditor ? (
          // Show simpler inline loading state during transition
          <div className="animate-pulse bg-muted/30 rounded-md h-64" />
        ) : (
          <EditorContent editor={tiptapEditor} className="prose max-w-none" />
        )}
      </div>
    </div>
  )
}