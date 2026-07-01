import { getCurrentUser, isAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getChurchInfo } from '@/lib/actions/church-info-actions'
import { ChurchInfoForm } from '@/components/church-info-form'

export default async function AdminChurchInfoPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const userIsAdmin = await isAdmin(user.id)

  if (!userIsAdmin) {
    redirect('/sermons')
  }

  const info = await getChurchInfo()

  if (!info) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header isAdmin={userIsAdmin} isLoggedIn={true} />
        <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
          <p className="text-red-600">교회 정보를 불러올 수 없습니다. church_info 테이블을 확인해주세요.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isAdmin={userIsAdmin} isLoggedIn={true} />

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        <h1 className="text-3xl font-bold mb-2">교회 정보 관리</h1>
        <p className="text-gray-600 mb-8">하단 푸터에 표시되는 교회 정보를 수정합니다</p>

        <div className="bg-white rounded-lg shadow p-8">
          <ChurchInfoForm info={info} />
        </div>

        <div className="mt-8">
          <Link
            href="/admin/sermons"
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
