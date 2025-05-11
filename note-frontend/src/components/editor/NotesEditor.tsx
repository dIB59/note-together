import React from 'react'
import { Editor, EditorContent, EditorProvider } from '@tiptap/react'
import { EditorMenuBar } from './EditorMenuBar'
import { useEditorConfig } from '@/hooks/useEditorConfig'
import { cn } from '@/lib/utils'

interface NotesEditorProps {
  editor: Editor | null
  setEditor: React.Dispatch<React.SetStateAction<Editor | null>>
}

export const NotesEditor: React.FC<NotesEditorProps> = ({ editor, setEditor }) => {
  const { extensions, initialContent } = useEditorConfig()

  return (
    <>
      <EditorMenuBar editor={editor} />
      <div className='pageless-editor'>
        <EditorProvider
          onCreate={({ editor }) => setEditor(editor)}
          extensions={extensions}
          content={initialContent}
          editorProps={{
            attributes: {
                class: [
                    cn('min-w-[850px] ml-10 mr-10'),
                    cn('outline-none'),
                    cn('min-h-[calc(100vh-50px)]'),
                  ].join(' '),
                  className: 'prose',
            },
          }}
        >
          <EditorContent className="prose-editor" editor={editor} />
        </EditorProvider>
      </div>
    </>
  )
}