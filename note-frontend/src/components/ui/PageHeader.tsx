import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
      {subtitle && <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </header>
  )
}