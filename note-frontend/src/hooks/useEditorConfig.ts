import { useMemo } from 'react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

export const useEditorConfig = () => {
  const extensions = useMemo(() => [
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
  ], [])

  const initialContent = `
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

  return { extensions, initialContent }
}