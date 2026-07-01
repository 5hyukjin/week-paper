'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from '@/lib/actions/auth-actions'

export function LoginForm() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('userId', userId)
      formData.append('password', password)
      await signIn(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인 실패')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-900">아이디</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 placeholder-gray-400 bg-white"
          placeholder="아이디 입력"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-900">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 placeholder-gray-400 bg-white"
          placeholder="••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 disabled:bg-gray-400 font-medium"
      >
        {isSubmitting ? '로그인중...' : '로그인'}
      </button>

      <p className="text-center text-gray-600 text-sm">
        계정이 없으신가요?{' '}
        <a href="/signup" className="text-blue-900 hover:underline font-medium">
          회원가입
        </a>
      </p>
    </form>
  )
}
