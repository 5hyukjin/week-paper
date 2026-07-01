import { getCurrentUser } from '@/lib/auth'
import { isAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { MypageForm } from '@/components/mypage-form'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default async function MypagePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const userIsAdmin = await isAdmin(user.id)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isAdmin={userIsAdmin} isLoggedIn={true} />

      {/* 메인 컨텐츠 */}
      <main className="max-w-2xl mx-auto px-4 py-8 flex-1 w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">마이페이지</h2>

        <MypageForm userEmail={user.email || ''} />

        {/* 하단 버튼 */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 font-medium"
          >
            ← 돌아가기
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
