import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')

  const login = async (data) => {
    setError('')
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin({ userData }))
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
          Sign in to your account
        </h1>
        <p className="mt-2 text-center text-sm text-ink-muted">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-ink underline decoration-marker-deep decoration-2 underline-offset-4 hover:bg-marker"
          >
            Sign up
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
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
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
            placeholder="Enter your password"
            {...register('password', { required: true })}
          />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login