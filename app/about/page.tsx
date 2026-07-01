import { getCurrentUser, isAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default async function AboutPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const userIsAdmin = await isAdmin(user.id)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isAdmin={userIsAdmin} />

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Joshua & Caleb</h2>
        <p className="text-gray-600 mb-8">반월중앙교회 청년부 소개</p>

        <div className="bg-white rounded-lg shadow p-8 space-y-8">
          {/* 섬기는 분들 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">섬기는 분들</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">담임목사</span> — 강범석 목사
              </p>
              <p>
                <span className="font-semibold">담당전도사</span> — 유경일 전도사
              </p>
              <p>
                <span className="font-semibold">청년부장</span> — 차준희 장로
              </p>
              <p>
                <span className="font-semibold">담당선생님</span> — 박진용 권사
              </p>
              <p>
                <span className="font-semibold">임원</span> — 박현수(회장), 최선영(부회장), 강슬지(회계), 김수현(서기)
              </p>
            </div>
          </div>

          {/* 예배 안내 */}
          <div className="pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">예배 안내</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">예배 시간</span> — 주일 오후 1:55
              </p>
              <p>
                <span className="font-semibold">900기도회</span> — 매주 금요일 저녁 9시, 본당 1층 여자 어르신 쉼터
              </p>
            </div>
          </div>

          {/* 오시는 길 */}
          <div className="pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">오시는 길</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">주소</span> — 경기도 안산시 상록구 본오로 126
              </p>
              <p>
                <span className="font-semibold">전화</span> — 031.409.0027
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
