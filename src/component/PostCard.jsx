import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

// The editor saves HTML, so turn it into plain text and keep the first bit
function toExcerpt(html = '') {
  const text = new DOMParser().parseFromString(html, 'text/html').body.textContent || ''
  return text.replace(/\s+/g, ' ').trim().slice(0, 240)
}

function PostCard({ $id, title, feturedimage, content, $createdAt }) {
  const excerpt = toExcerpt(content)
  const date = $createdAt
    ? new Date($createdAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <Link
      to={`/post/${$id}`}
      className="group block h-full rounded-lg border border-line bg-sheet p-4 transition-colors hover:border-ink"
    >
      {feturedimage && (
        <div className="aspect-[4/3] overflow-hidden rounded-md bg-line">
          <img
            src={appwriteService.getFilePreview(feturedimage)}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <h2
        className={`font-serif text-xl font-semibold leading-snug ${feturedimage ? 'mt-3' : ''}`}
      >
        <span className="marker-link">{title}</span>
      </h2>
      {excerpt && (
        <p className="mt-2 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-muted">
          {excerpt}
        </p>
      )}
      {date && <p className="mt-2 text-sm text-ink-muted">{date}</p>}
    </Link>
  )
}

export default PostCard