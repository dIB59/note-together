import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
})

function BlogPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Blog</h1>
      <p className="text-gray-600">Here are some cool posts.</p>
    </div>
  )
}
