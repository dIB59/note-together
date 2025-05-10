import { createFileRoute } from '@tanstack/react-router'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import { type Level } from '@tiptap/extension-heading'
import { 
  Bold, Italic, Strikethrough, Code, ChevronsUp, 
  Undo2, Redo2, List, ListOrdered, Quote, Heading1, 
  Heading2, Heading3, TerminalSquare, Minus, PenTool, 
  SeparatorHorizontal, Trash, Palette
} from 'lucide-react'

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Notes</h1>
        </header>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <EditorProvider 
            slotBefore={<MenuBar />} 
            extensions={extensions} 
            content={content}
            editorProps={{
              attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none p-6',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
})

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) return null

  const getVariant = (isActive: boolean) => (isActive ? 'default' : 'ghost')
  const headingLevels = [
    { level: 1, icon: <Heading1 className="h-4 w-4" /> },
    { level: 2, icon: <Heading2 className="h-4 w-4" /> },
    { level: 3, icon: <Heading3 className="h-4 w-4" /> },
  ]

  const colors = [
    { name: 'Default', color: '#000000' },
    { name: 'Purple', color: '#958DF1' },
    { name: 'Blue', color: '#4285F4' },
    { name: 'Green', color: '#34A853' },
    { name: 'Red', color: '#EA4335' },
  ]

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-2">
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
            </Button>
            
            <div className="absolute hidden group-hover:flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-10 top-full left-0 mt-1">
              {colors.map((item) => (
                <Button
                  key={item.color}
                  size="sm"
                  variant="ghost"
                  className="justify-start h-8"
                  onClick={() => editor.chain().focus().setColor(item.color).run()}
                >
                  <div className="flex items-center">
                    <div 
                      className="h-4 w-4 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}</span>
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
            </Button>
            
            <div className="absolute hidden group-hover:flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-10 top-full left-0 mt-1">
              {headingLevels.map((item) => (
                <Button
                  key={item.level}
                  size="sm"
                  variant={getVariant(editor.isActive('heading', { level: item.level }))}
                  onClick={() => editor.chain().focus().toggleHeading({ level: item.level }).run()}
                  className="justify-start"
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">Heading {item.level}</span>
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

export default MenuBar

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({}),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
]

const content = `
<h2>
  Welcome to My Notes
</h2>
<p>
  This is your <em>modern</em> and <strong>elegant</strong> note-taking space. You can format text in various ways:
</p>
<ul>
  <li>
    Create lists to organize your thoughts
  </li>
  <li>
    Use <em>formatting</em> to <strong>emphasize</strong> important points
  </li>
  <li>
    Add structure with headings and quotes
  </li>
</ul>
<p>
  Need to add some code? No problem:
</p>
<pre><code class="language-javascript">// Here's a code example
function greet() {
  console.log("Hello, world!");
}</code></pre>
<p>
  This editor supports all the formatting tools you need to capture and organize your ideas effectively.
</p>
<blockquote>
  Great notes lead to great ideas. Start writing!
</blockquote>
`