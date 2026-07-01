interface WorshipItem {
  id: string
  order: number
  title: string
  content: string
}

interface NewsItem {
  id: string
  title: string
  content: string
}

interface SermonContentProps {
  date: string
  worshipItems: WorshipItem[]
  newsItems: NewsItem[]
  sermonTitle?: string | null
  sermonScripture?: string | null
  sermonContent?: string | null
  sermonPreacher?: string | null
  preacherNote?: string | null
}

export function SermonContent({
  date,
  worshipItems,
  newsItems,
  sermonTitle,
  sermonScripture,
  sermonContent,
  sermonPreacher,
  preacherNote,
}: SermonContentProps) {
  return (
    <>
      <div className="text-sm text-gray-500 mb-6 font-semibold">{date}</div>

      {/* 예배순서 */}
      {worshipItems.length > 0 && (
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">예배순서</h2>
          <div className="space-y-3">
            {worshipItems.map((item) => (
              <div key={item.id} className="flex gap-2 items-baseline">
                <span className="font-semibold text-gray-700 shrink-0">
                  {item.order}.
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  {item.content && (
                    <p className="text-gray-600 text-sm mt-0.5">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 청년부 소식 */}
      {newsItems.length > 0 && (
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">청년부 소식</h2>
          <div className="space-y-3">
            {newsItems.map((item, index) => (
              <div key={item.id} className="flex gap-2 items-baseline">
                <span className="font-semibold text-gray-700 shrink-0">
                  {index + 1}.
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  {item.content && (
                    <p className="text-gray-600 text-sm mt-0.5 whitespace-pre-wrap">
                      {item.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 오늘의 말씀 */}
      {(sermonTitle || sermonScripture || sermonContent || sermonPreacher || preacherNote) && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">오늘의 말씀</h2>
          <div className="space-y-2">
            {sermonTitle && (
              <p className="font-semibold text-gray-900 text-lg">{sermonTitle}</p>
            )}
            {sermonScripture && (
              <p className="text-gray-600 text-sm">본문: {sermonScripture}</p>
            )}
            {sermonContent && (
              <p className="text-gray-700 text-sm whitespace-pre-wrap mt-2 p-4 bg-gray-50 rounded-lg">
                {sermonContent}
              </p>
            )}
            {sermonPreacher && (
              <p className="text-gray-600 text-sm mt-2">설교자: {sermonPreacher}</p>
            )}
            {preacherNote && (
              <p className="text-gray-700 text-sm whitespace-pre-wrap mt-4">
                {preacherNote}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
