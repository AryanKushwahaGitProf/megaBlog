import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Button } from '../component'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export default function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)

  const isAuthor = post && userData ? post.userID === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post)
        else navigate('/')
      })
    } else navigate('/')
  }, [slug, navigate])

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        if (post.feturedimage) appwriteService.deleteFile(post.feturedimage)
        navigate('/')
      }
    })
  }

  const date = post?.$createdAt
    ? new Date(post.$createdAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return post ? (
    <article className="mx-auto w-full max-w-2xl px-5 sm:px-8">
      {isAuthor && (
        <div className="mb-6 flex justify-end gap-3">
          <Link to={`/edit-post/${post.$id}`}>
            <Button bgColor="bg-sheet hover:bg-paper border border-line">Edit</Button>
          </Link>
          <Button
            bgColor="bg-danger hover:bg-danger/90"
            textColor="text-white"
            onClick={deletePost}
          >
            Delete
          </Button>
        </div>
      )}
      <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">
        {post.title}
      </h1>
      {date && <p className="mt-3 text-sm text-ink-muted">{date}</p>}
      {post.feturedimage && (
        <img
          src={appwriteService.getFilePreview(post.feturedimage)}
          alt={post.title}
          className="mt-8 w-full rounded-md"
        />
      )}
      <div className="browser-css mt-10">{parse(post.content)}</div>
    </article>
  ) : null
}