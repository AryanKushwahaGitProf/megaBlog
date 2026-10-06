import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../component'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.rows)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
      <Container>
        <div className="py-24 text-center">
          <h1 className="font-serif text-3xl font-semibold">Welcome to megablog</h1>
          <p className="mt-3 text-ink-muted">Posts you publish will show up here.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <h1 className="mb-8 font-serif text-4xl font-semibold">Latest posts</h1>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))}
      </div>
    </Container>
  )
}

export default Home