import Link from 'next/link'
import { getSermons } from '@/lib/actions/sermon-queries'

interface SermonListProps {
  isAdmin: boolean
}

export async function SermonList({ isAdmin }: SermonListProps) {
  const sermons = await getSermons()

  if (sermons.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">등록된 주보가 없습니다</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sermons.map((sermon) => (
        <Link
          key={sermon.id}
          href={`/sermons/${sermon.id}`}
          className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-blue-900"
        >
          {/* 날짜, 본문, 설교자 한 줄 */}
          <div className="flex flex-wrap gap-x-3 text-xs text-gray-500 mb-2">
            <span>{sermon.date}</span>
            {sermon.sermon_scripture && (
              <>
                <span>·</span>
                <span>{sermon.sermon_scripture}</span>
              </>
            )}
            {sermon.sermon_preacher && (
              <>
                <span>·</span>
                <span>{sermon.sermon_preacher}</span>
              </>
            )}
          </div>

          {/* 설교 제목 */}
          {sermon.sermon_title && (
            <h3 className="text-xl font-bold text-gray-900">
              {sermon.sermon_title}
            </h3>
          )}
        </Link>
      ))}
    </div>
  )
}
