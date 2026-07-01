'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signOut } from '@/lib/actions/auth-actions'

interface HeaderProps {
  isAdmin: boolean
  isLoggedIn: boolean
}

export function Header({ isAdmin, isLoggedIn }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex-1">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">반월중앙교회</h1>
            <p className="text-gray-600 text-sm">청년부</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link
              href="/admin/sermons"
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 text-sm font-medium"
            >
              주보 등록
            </Link>
          )}

          {/* 햄버거 메뉴 */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-3 py-2 text-gray-900"
              title="메뉴"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <Link
                    href="/sermons"
                    className="block px-4 py-3 hover:bg-gray-100 text-gray-900 text-sm font-medium border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    주보 목록
                  </Link>
                  <a
                    href="https://www.youtube.com/playlist?list=PLHUg6gc_ECXGS5WYBEHAsdvwFV5iiqlZG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 hover:bg-gray-100 text-gray-900 text-sm font-medium border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    예배 영상 ↗
                  </a>
                  {isLoggedIn && (
                    <Link
                      href="/mypage"
                      className="block px-4 py-3 hover:bg-gray-100 text-gray-900 text-sm font-medium border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      마이페이지
                    </Link>
                  )}
                  {isAdmin && (
                    <>
                      <Link
                        href="/admin/users"
                        className="block px-4 py-3 hover:bg-gray-100 text-gray-900 text-sm font-medium border-b border-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        사용자 관리
                      </Link>
                      <Link
                        href="/admin/church-info"
                        className="block px-4 py-3 hover:bg-gray-100 text-gray-900 text-sm font-medium border-b border-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        교회 정보 관리
                      </Link>
                    </>
                  )}
                  {isLoggedIn && (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleLogout()
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-900 text-sm font-medium"
                    >
                      로그아웃
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
