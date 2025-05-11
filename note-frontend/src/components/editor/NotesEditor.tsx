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
                    cn('prose dark:prose-invert'),
                    cn('max-w-[850px] mx-auto px-6 py-8'),
                    cn('focus:outline-none min-h-[80vh]'),
                    // Headings
                    'prose-headings:font-semibold',
                    'prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg',
                    // Paragraphs
                    'prose-p:my-2 prose-p:leading-relaxed',
                    // Lists
                    cn('prose-ul:list-disc prose-ol:list-decimal'),
                    cn('prose-ul:pl-6 prose-ol:pl-6 list-outside'),
                    cn('prose-li:my-1'),
                    // Quotes
                    'prose-blockquote:italic prose-blockquote:text-gray-500 dark:prose-blockquote:text-gray-400',

                    // Code blocks
                    'prose-pre:rounded-md prose-pre:p-4 prose-pre:overflow-x-auto',
                    'prose-code:before:content-none prose-code:after:content-none',
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