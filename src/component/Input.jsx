import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', ...props },
  ref
) {
  const id = useId()
  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        ref={ref}
        type={type}
        className={`w-full rounded-md border border-line bg-sheet px-3.5 py-2.5 text-base text-ink transition-colors placeholder:text-ink-muted/70 hover:border-ink-muted focus:border-ink focus:outline-none focus:ring-2 focus:ring-marker file:mr-3 file:rounded file:border-0 file:bg-paper file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-ink ${className}`}
        {...props}
      />
    </div>
  )
})

export default Input