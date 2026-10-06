import React from 'react'

export default function Button({
  children,
  type = 'button',
  bgColor = 'bg-marker hover:bg-marker-deep',
  textColor = 'text-ink',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}