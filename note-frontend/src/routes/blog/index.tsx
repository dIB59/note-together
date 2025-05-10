import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Editor } from '@tiptap/react'
import { NotesEditor } from '@/components/editor/NotesEditor'
import { PageHeader } from '@/components/ui/PageHeader'

// Add custom styles for the pageless editor experience
const styles = `
  <style>
    /* Pageless editor styling */
    .pageless-editor {
      min-height: 80vh;
      padding: 0;
      position: relative;
    }
    
    .pageless-editor .ProseMirror {
      min-height: 80vh;
      padding: 2rem 4rem;
      max-width: 850px;
      margin: 0 auto;
    }
    
    /* Content styling */
    .pageless-editor .ProseMirror h1 {
      font-size: 2rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-weight: 700;
      color: #111827;
    }
    
    .pageless-editor .ProseMirror h2 {
      font-size: 1.5rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
      color: #111827;
    }
    
    .pageless-editor .ProseMirror h3 {
      font-size: 1.25rem;
      margin-top: 1.25rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
      color: #111827;
    }
    
    .pageless-editor .ProseMirror h4 {
      font-size: 1.125rem;
      margin-top: 1.25rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #111827;
    }
    
    .pageless-editor .ProseMirror p {
      margin-top: 1rem;
      margin-bottom: 1rem;
      line-height: 1.7;
    }
    
    .pageless-editor .ProseMirror blockquote {
      font-style: italic;
      color: #6b7280;
    }
    
    .pageless-editor .ProseMirror ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin: 1rem 0;
    }
    
    .pageless-editor .ProseMirror ol {
      list-style-type: decimal;
      padding-left: 1.5rem;
      margin: 1rem 0;
    }
    
    .pageless-editor .ProseMirror li {
      margin: 0.5rem 0;
    }
    
    .pageless-editor .ProseMirror pre {
      margin: 1rem 0;
      border-radius: 0.375rem;
      overflow-x: auto;
    }
    
    /* Dark mode compatibility */
    @media (prefers-color-scheme: dark) {
      .pageless-editor .ProseMirror h1,
      .pageless-editor .ProseMirror h2,
      .pageless-editor .ProseMirror h3,
      .pageless-editor .ProseMirror h4 {
        color: #aaaaaa;
      }
      
      .pageless-editor .ProseMirror blockquote {
        border-left-color: #4b5563;
        color: #9ca3af;
      }
    }
  </style>
`;

const BlogPage = () => {
  const [editor, setEditor] = useState<Editor | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 md:p-8">
        <PageHeader
          title="My Notes" 
          subtitle="Capture your thoughts, ideas, and inspirations" 
        />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col">
          <NotesEditor editor={editor} setEditor={setEditor} />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/blog/')({
  component: () => (
    <>
      <div dangerouslySetInnerHTML={{ __html: styles }} />
      <BlogPage />
    </>
  ),
});
