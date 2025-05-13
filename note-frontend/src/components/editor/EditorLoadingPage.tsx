import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'

export const EditorLoadingPage = () => {
  return (
    <div className="w-full space-y-8 p-8">
      {/* Header Section */}
      <div className="space-y-2">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      
      {/* Toolbar Skeleton */}
      <div className="flex flex-wrap gap-2 py-2 border-b">
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-10" />
        <Skeleton className="h-8 w-10" />
        <Skeleton className="h-8 w-24" />
      </div>
      
      {/* Content Area Skeleton */}
      <div className="space-y-4 py-6">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-4/6" />
        <div className="py-2" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      
      {/* Spinner in the center */}
      <div className="flex justify-center items-center py-8">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground font-medium">Loading editor...</span>
        </div>
      </div>
    </div>
  )
}