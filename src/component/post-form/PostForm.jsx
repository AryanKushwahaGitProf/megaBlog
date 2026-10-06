import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

      if (file && post.feturedimage) {
        appwriteService.deleteFile(post.feturedimage)
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        feturedimage: file ? file.$id : undefined,
      })

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

      // an image was chosen but the upload failed: stop instead of saving without it
      if (data.image[0] && !file) return

      if (file) data.feturedimage = file.$id

      const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id })

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')
        .slice(0, 36)

    return ''
  }, [])

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]"
    >
      <div className="space-y-5">
        <Input
          label="Title"
          placeholder="Post title"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug"
          placeholder="post-slug"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
          }}
        />
        <RTE label="Content" name="content" control={control} defaultValue={getValues('content')} />
      </div>
      <div className="space-y-5">
        <Input
          label="Featured image (optional)"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image')}
        />
        {post?.feturedimage && (
          <img
            src={appwriteService.getFilePreview(post.feturedimage)}
            alt={post.title}
            className="w-full rounded-md"
          />
        )}
        <Select
          options={['active', 'inactive']}
          label="Status"
          {...register('status', { required: true })}
        />
        <Button type="submit" className="w-full">
          {post ? 'Save changes' : 'Save post'}
        </Button>
      </div>
    </form>
  )
}
