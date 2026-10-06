import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    setError('')
    try {
      const account = await authService.createAccount(data)
      if (account) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(login({ userData }))
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-5">
      <div className="rounded-lg border border-line bg-sheet p-8 sm:p-10">
        <div className="mb-6 flex justify-center">
          <Logo width="64px" />
        </div>
        <h1 className="text-center font-serif text-3xl font-semibold">
          Create your account
        </h1>
        <p className="mt-2 text-center text-sm text-ink-muted">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-ink underline decoration-marker-deep decoration-2 underline-offset-4 hover:bg-marker"
          >
            Sign in
          </Link>
        </p>
        {error && (
          <p
            role="alert"
            className="mt-6 rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger"
          >
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
          <Input
            label="Full name"
            placeholder="Enter your full name"
            {...register('name', { required: true })}
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...register('email', {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value) ||
                  'Email address must be a valid address',
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            {...register('password', { required: true })}
          />
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup