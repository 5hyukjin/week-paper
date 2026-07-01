import { getCurrentUser, isAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const PLAYLIST_ID = 'PLHUg6gc_ECXGS5WYBEHAsdvwFV5iiqlZG'

export default async function VideosPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const userIsAdmin = await isAdmin(user.id)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isAdmin={userIsAdmin} />

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">예배 영상</h2>
        <p className="text-gray-600 mb-8">반월중앙교회 청년부 예배 영상 모음</p>

        {/* 플레이리스트 임베드 */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&hl=ko`}
              title="반월중앙교회 청년부 예배 영상"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* YouTube 플레이리스트 링크 */}
        <div className="text-center">
          <a
            href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
          >
            ▶ YouTube에서 전체 재생목록 보기
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
