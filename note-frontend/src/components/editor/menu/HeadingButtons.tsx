import React from 'react'
import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { type Level } from '@tiptap/extension-heading'
import { Heading1, Heading2, Heading3, PenTool, ChevronDown } from 'lucide-react'
import { type JSX } from 'react'

interface HeadingButtonsProps {
  editor: Editor
}

export const HeadingButtons: React.FC<HeadingButtonsProps> = ({ editor }) => {
  const getVariant = (isActive: boolean) => (isActive ? 'default' : 'ghost')
  
  const headingLevels: { level: Level; icon: JSX.Element; label: string }[] = [
    { level: 1, icon: <Heading1 className="h-4 w-4" />, label: "Heading 1" },
    { level: 2, icon: <Heading2 className="h-4 w-4" />, label: "Heading 2" },
    { level: 3, icon: <Heading3 className="h-4 w-4" />, label: "Heading 3" },
    { level: 4, icon: <Heading3 className="h-4 w-4 scale-90" />, label: "Heading 4" },
    { level: 5, icon: <Heading3 className="h-4 w-4 scale-75" />, label: "Heading 5" },
    { level: 6, icon: <Heading3 className="h-4 w-4 scale-65" />, label: "Heading 6" },
  ]

  return (
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
  )
}