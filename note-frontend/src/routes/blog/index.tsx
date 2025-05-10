import { createFileRoute } from '@tanstack/react-router'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorContent, EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import { type Level } from '@tiptap/extension-heading'
import { 
  Bold, Italic, Strikethrough, Code, ChevronsUp, 
  Undo2, Redo2, List, ListOrdered, Quote, Heading1, 
  Heading2, Heading3, TerminalSquare, Minus, PenTool, 
  SeparatorHorizontal, Trash, Palette, ChevronDown
} from 'lucide-react'
import Placeholder from '@tiptap/extension-placeholder'
import { useState } from 'react'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  const getVariant = (isActive) => (isActive ? 'default' : 'ghost')
  const headingLevels = [
    { level: 1, icon: <Heading1 className="h-4 w-4" />, label: "Heading 1" },
    { level: 2, icon: <Heading2 className="h-4 w-4" />, label: "Heading 2" },
    { level: 3, icon: <Heading3 className="h-4 w-4" />, label: "Heading 3" },
    { level: 4, icon: <Heading3 className="h-4 w-4 scale-90" />, label: "Heading 4" },
    { level: 5, icon: <Heading3 className="h-4 w-4 scale-75" />, label: "Heading 5" },
    { level: 6, icon: <Heading3 className="h-4 w-4 scale-65" />, label: "Heading 6" },
  ]

  const colors = [
    { name: 'Default', color: '#000000' },
    { name: 'Purple', color: '#958DF1' },
    { name: 'Blue', color: '#4285F4' },
    { name: 'Green', color: '#34A853' },
    { name: 'Red', color: '#EA4335' },
    { name: 'Orange', color: '#FFA500' },
    { name: 'Teal', color: '#008080' },
  ]

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-2 sticky top-0 bg-white dark:bg-gray-800 z-10 shadow-sm">
      <div className="flex flex-wrap gap-1">
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

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
          
          <div className="relative group">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 flex items-center gap-1"
              title="Text Color"
            >
              <Palette className="h-4 w-4" />
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
            
            <div className="absolute hidden group-hover:flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-10 top-full left-0 mt-1 w-40">
              {colors.map((item) => (
                <Button
                  key={item.color}
                  size="sm"
                  variant="ghost"
                  className="justify-start h-8 mb-1 last:mb-0"
                  onClick={() => editor.chain().focus().setColor(item.color).run()}
                >
                  <div className="flex items-center w-full">
                    <div 
                      className="h-4 w-4 rounded-full mr-2 flex-shrink-0 border border-gray-200 dark:border-gray-700" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="truncate">{item.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>

        <div className="flex items-center space-x-1 mr-2">
          <Button
            size="sm"
            variant={getVariant(editor.isActive('paragraph'))}
            onClick={() => editor.chain().focus().setParagraph().run()}
            className="h-8 w-8 p-0"
            title="Paragraph"
          >
            <PenTool className="h-4 w-4" />
          </Button>
          
          <div className="relative group">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 flex items-center gap-1"
              title="Headings"
            >
              <Heading1 className="h-4 w-4" />
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
            
            <div className="absolute hidden group-hover:flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-10 top-full left-0 mt-1 w-40">
              {headingLevels.map((item) => (
                <Button
                  key={item.level}
                  size="sm"
                  variant={getVariant(editor.isActive('heading', { level: item.level }))}
                  onClick={() => editor.chain().focus().toggleHeading({ level: item.level }).run()}
                  className="justify-start mb-1 last:mb-0"
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
        
        <div className="flex items-center space-x-1 mr-2">
          <Button
            size="sm"
            variant={getVariant(editor.isActive('bulletList'))}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="h-8 w-8 p-0"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant={getVariant(editor.isActive('orderedList'))}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="h-8 w-8 p-0"
            title="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant={getVariant(editor.isActive('blockquote'))}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className="h-8 w-8 p-0"
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant={getVariant(editor.isActive('codeBlock'))}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className="h-8 w-8 p-0"
            title="Code Block"
          >
            <TerminalSquare className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="h-8 w-8 p-0"
            title="Horizontal Rule"
          >
            <SeparatorHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
        
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
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
        
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
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({}),
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
    bulletList: {
      keepMarks: true,
      keepAttributes: true,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: true,
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'block rounded-md bg-gray-100 dark:bg-gray-800 p-4 font-mono text-sm',
      },
    },
  }),
  Placeholder.configure({
    placeholder: 'Start writing your notes here...',
  }),
]

const content = `
<h1>
  Welcome to My Notes
</h1>
<p>
  This is your <em>modern</em> and <strong>elegant</strong> note-taking space with a Google Docs-like pageless view. You can scroll indefinitely and format text in various ways:
</p>

<h2>Formatting Options</h2>
<ul>
  <li>
    Create <strong>bullet lists</strong> to organize your thoughts
  </li>
  <li>
    Use <em>italic</em>, <strong>bold</strong>, and <span style="color: #958DF1;">colored text</span> to emphasize important points
  </li>
  <li>
    Add structure with <strong>headings</strong> and <strong>quotes</strong>
  </li>
</ul>

<h3>Code Examples</h3>
<p>
  Need to add some code? No problem:
</p>
<pre><code class="language-javascript">// Here's a code example
function greet() {
  console.log("Hello, world!");
}

// Try it out
greet();</code></pre>

<h2>Organize Your Thoughts</h2>
<p>
  Use different heading levels to create a structured document:
</p>

<h4>To-Do List</h4>
<ol>
  <li>Create meeting agenda</li>
  <li>Review project timeline</li>
  <li>Send follow-up emails</li>
</ol>

<h4>Project Notes</h4>
<p>
  This editor supports all the formatting tools you need to capture and organize your ideas effectively. The vertical space extends as much as you need, just like Google Docs in pageless mode.
</p>

<blockquote>
  Great notes lead to great ideas. Start writing!
</blockquote>

<h2>Advanced Features</h2>
<p>
  Experiment with the toolbar above to discover all the formatting options available. You can create:
</p>
<ul>
  <li>Formatted headings (6 levels)</li>
  <li>Ordered and unordered lists</li>
  <li>Code blocks with syntax highlighting</li>
  <li>Blockquotes for important citations</li>
  <li>Text in different colors</li>
</ul>

<p>
  The editor automatically saves your work as you type, so you never have to worry about losing your notes.
</p>

<h3>Share and Collaborate</h3>
<p>
  When you're ready, share your notes with colleagues or friends to collaborate on ideas together.
</p>
`

const BlogPage = () => {
  const [editor, setEditor] = useState<Editor | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Notes</h1>
          <p className="text-gray-500 dark:text-gray-400">Capture your thoughts, ideas, and inspirations</p>
        </header>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col">
          <MenuBar editor={editor} />
          <div className="pageless-editor">
            <EditorProvider
              onCreate={({ editor }) => setEditor(editor)}
              extensions={extensions}
              content={content}
              editorProps={{
                attributes: {
                  class: 'focus:outline-none',
                },
              }}
            >
              <EditorContent className="prose-editor" />
            </EditorProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

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
      outline: none !important;
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
      padding-left: 1rem;
      border-left: 4px solid #e5e7eb;
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
        color: #f9fafb;
      }
      
      .pageless-editor .ProseMirror blockquote {
        border-left-color: #4b5563;
        color: #9ca3af;
      }
    }
  </style>
`;

export const Route = createFileRoute('/blog/')({
  component: () => (
    <>
      <div dangerouslySetInnerHTML={{ __html: styles }} />
      <BlogPage />
    </>
  ),
});