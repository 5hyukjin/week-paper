import { getCurrentUser, isAdmin } from '@/lib/auth'
import { getSermonById } from '@/lib/actions/sermon-queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SermonContent } from '@/components/sermon-content'

interface NewsItem {
  id: string
  title: string
  content: string
}

interface WorshipItem {
  id: string
  order: number
  title: string
  content: string
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function SermonDetailPage({ params }: PageProps) {
  const user = await getCurrentUser()
  const userIsAdmin = user ? await isAdmin(user.id) : false

  const { id } = await params
  const sermon = await getSermonById(id)

  if (!sermon) {
    notFound()
  }

  let worshipItems: WorshipItem[] = []
  if (sermon.worship_order) {
    try {
      worshipItems = JSON.parse(sermon.worship_order)
    } catch {}
  }

  let newsItems: NewsItem[] = []
  if (sermon.youth_news) {
    try {
      newsItems = JSON.parse(sermon.youth_news)
    } catch {}
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isAdmin={userIsAdmin} isLoggedIn={!!user} />

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        {/* 주보 정보 */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <SermonContent
            date={sermon.date}
            worshipItems={worshipItems}
            newsItems={newsItems}
            sermonTitle={sermon.sermon_title}
            sermonScripture={sermon.sermon_scripture}
            sermonContent={sermon.sermon_content}
            sermonPreacher={sermon.sermon_preacher}
            preacherNote={sermon.preacher_note}
          />
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4">
          <Link
            href="/sermons"
            className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 font-medium text-center"
          >
            목록
          </Link>
          {userIsAdmin && (
            <Link
              href={`/admin/sermons/${sermon.id}`}
              className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 font-medium text-center"
            >
              수정
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
