import React, { useId } from 'react'

function Select({ options = [], label, className = '', ...props }, ref) {
  const id = useId()
  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full rounded-md border border-line bg-sheet px-3.5 py-2.5 text-base text-ink transition-colors hover:border-ink-muted focus:border-ink focus:outline-none focus:ring-2 focus:ring-marker ${className}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)