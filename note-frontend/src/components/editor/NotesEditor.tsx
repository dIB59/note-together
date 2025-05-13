import React from 'react'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { EditorMenuBar } from './EditorMenuBar'
import { useEditorConfig } from '@/hooks/useEditorConfig'

interface NotesEditorProps {
  editor: Editor | null
  setEditor: React.Dispatch<React.SetStateAction<Editor | null>>
}

export const NotesEditor: React.FC<NotesEditorProps> = ({ setEditor }) => {
  // If useEditorConfig hook isn't working, use fallback extensions
  const editorConfig = useEditorConfig ? useEditorConfig() : { 
    extensions: [StarterKit], 
    initialContent: '<p>Start writing here...</p>' 
  }
  
  const { extensions, initialContent } = editorConfig
  
  // Create the editor instance directly with useEditor
  const tiptapEditor = useEditor({
    extensions,
    content: initialContent,
    onUpdate: () => {
      console.log('Editor updated')
    },
    onCreate: ({ editor }) => {
      console.log('Editor created')
      setEditor(editor)
    },
    onDestroy: () => {
      // Clean up when editor is destroyed
      setEditor(null)
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none outline-none min-h-[500px] p-6',
      },
    },
  })

  // Fix for return statement in NotesEditor
  return (
    <div className="pageless-editor w-full">
      {tiptapEditor && <EditorMenuBar editor={tiptapEditor} />}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        {tiptapEditor ? (
          <EditorContent editor={tiptapEditor} className="prose max-w-none" />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">
            Loading editor...
          </div>
        )}
      </div>
    </div>
  )
}