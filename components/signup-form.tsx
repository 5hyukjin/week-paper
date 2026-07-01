'use client'

import { useState } from 'react'
import { signUp } from '@/lib/actions/auth-actions'

export function SignupForm() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('userId', userId)
      formData.append('password', password)
      formData.append('passwordConfirm', passwordConfirm)
      await signUp(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입 실패')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">아이디</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          placeholder="아이디 입력"
        />
        <p className="text-xs text-gray-500 mt-1">영문, 숫자, 한글, 언더스코어(_) 2~20자</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          placeholder="••••••"
        />
        <p className="text-xs text-gray-500 mt-1">최소 6자 이상</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">비밀번호 확인</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          placeholder="••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 disabled:bg-gray-400 font-medium"
      >
        {isSubmitting ? '가입중...' : '회원가입'}
      </button>

      <p className="text-center text-gray-600 text-sm">
        이미 계정이 있으신가요?{' '}
        <a href="/login" className="text-blue-900 hover:underline font-medium">
          로그인
        </a>
      </p>
    </form>
  )
}
