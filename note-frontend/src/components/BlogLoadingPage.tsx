import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideLoader2, BookOpen, Download, Share2 } from "lucide-react"

export const BlogLoadingPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header with title & search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      {/* Editor loading skeleton */}
      <Card className="border shadow-md">
        <CardHeader>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-14" />
            <Skeleton className="h-8 w-14" />
            <Skeleton className="h-8 w-14" />
            <Skeleton className="h-8 w-14" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <div className="py-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <LucideLoader2 className="h-5 w-5 animate-spin" />
            <span>Loading editor environment...</span>
          </div>
        </CardFooter>
      </Card>

      {/* Action buttons at bottom */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled className="gap-1">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
          </Button>
          <Button variant="outline" size="sm" disabled className="gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
        <Button variant="outline" size="sm" disabled className="gap-1">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
    </div>
  )
}