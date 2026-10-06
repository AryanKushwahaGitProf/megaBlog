import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../component'
import appwriteService from '../appwrite/config'

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.rows)
      }
    })
  }, [])

  return (
    <Container>
      <h1 className="mb-8 font-serif text-4xl font-semibold">All posts</h1>
      {posts.length === 0 ? (
        <p className="text-ink-muted">Nothing here yet. Write your first post from Add Post.</p>
      ) : (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      )}
    </Container>
  )
}

export default AllPosts