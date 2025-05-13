// BlogPage.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Editor } from '@tiptap/react'
import { NotesEditor } from '@/components/editor/NotesEditor'
import { PageHeader } from '@/components/ui/PageHeader'
import '@/styles/pageless-editor.css'

const BlogPage = () => {
  const [editor, setEditor] = useState<Editor | null>(null)
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <PageHeader
          title="My Notes"
          subtitle="Capture your thoughts, ideas, and inspirations"
        />
       
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <NotesEditor editor={editor} setEditor={setEditor} />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/blog/')({
  component: BlogPage
});