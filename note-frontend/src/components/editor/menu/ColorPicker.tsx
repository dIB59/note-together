import React from 'react'
import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Palette, ChevronDown } from 'lucide-react'

interface ColorPickerProps {
  editor: Editor
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ editor }) => {
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
  )
}
