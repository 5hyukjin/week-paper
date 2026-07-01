'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateSermon, deleteSermon } from '@/lib/actions/sermon-actions'
import { Sermon } from '@/lib/actions/sermon-queries'

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

export function EditSermonForm({ sermon }: { sermon: Sermon }) {
  const router = useRouter()
  const [date, setDate] = useState(sermon.date)
  const [worshipItems, setWorshipItems] = useState<WorshipItem[]>(() => {
    try { return sermon.worship_order ? JSON.parse(sermon.worship_order) : [] }
    catch { return [] }
  })
  const [newsItems, setNewsItems] = useState<NewsItem[]>(() => {
    try { return sermon.youth_news ? JSON.parse(sermon.youth_news) : [] }
    catch { return [] }
  })
  const [sermonTitle, setSermonTitle] = useState(sermon.sermon_title || '')
  const [sermonScripture, setSermonScripture] = useState(sermon.sermon_scripture || '')
  const [sermonContent, setSermonContent] = useState(sermon.sermon_content || '')
  const [sermonPreacher, setSermonPreacher] = useState(sermon.sermon_preacher || '')
  const [preacherNote, setPreacherNote] = useState(sermon.preacher_note || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const addWorshipItem = () => {
    setWorshipItems([...worshipItems, {
      id: Date.now().toString(),
      order: worshipItems.length + 1,
      title: '',
      content: '',
    }])
  }

  const deleteWorshipItem = (id: string) => {
    const newItems = worshipItems
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, order: index + 1 }))
    setWorshipItems(newItems)
  }

  const updateWorshipItem = (id: string, field: 'title' | 'content', value: string) => {
    setWorshipItems(worshipItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const addNewsItem = () => {
    setNewsItems([...newsItems, {
      id: Date.now().toString(),
      title: '',
      content: '',
    }])
  }

  const deleteNewsItem = (id: string) => {
    setNewsItems(newsItems.filter((item) => item.id !== id))
  }

  const updateNewsItem = (id: string, field: 'title' | 'content', value: string) => {
    setNewsItems(newsItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('date', date)
      formData.append('worshipOrder', JSON.stringify(worshipItems))
      formData.append('youthNews', JSON.stringify(newsItems))
      formData.append('sermonTitle', sermonTitle)
      formData.append('sermonScripture', sermonScripture)
      formData.append('sermonContent', sermonContent)
      formData.append('sermonPreacher', sermonPreacher)
      formData.append('preacherNote', preacherNote)

      const sermonId = await updateSermon(sermon.id, formData)
      router.push(`/sermons/${sermonId}`)
    } catch (error) {
      setMessage(`오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsSubmitting(true)
    try {
      await deleteSermon(sermon.id)
      router.push('/sermons')
    } catch (error) {
      setMessage(`오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
      setIsSubmitting(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
      {/* 날짜 */}
      <div>
        <label className="block text-sm font-medium mb-2">날짜 *</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </div>

      {/* 예배순서 */}
      <div className="pb-8 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <label className="block text-lg font-bold">예배순서</label>
          <button
            type="button"
            onClick={addWorshipItem}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 text-sm font-medium"
          >
            + 항목 추가
          </button>
        </div>

        {worshipItems.length === 0 ? (
          <p className="text-gray-500 text-sm">항목을 추가하면 여기에 표시됩니다</p>
        ) : (
          <div className="space-y-4">
            {worshipItems.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-semibold text-gray-600">{item.order}번째</span>
                  <button
                    type="button"
                    onClick={() => deleteWorshipItem(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-medium"
                  >
                    삭제
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateWorshipItem(item.id, 'title', e.target.value)}
                    placeholder="예배 항목 (예: 경배와 찬양)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                  <input
                    type="text"
                    value={item.content}
                    onChange={(e) => updateWorshipItem(item.id, 'content', e.target.value)}
                    placeholder="세부 내용 (예: 최선영 청년)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 청년부 소식 */}
      <div className="pb-8 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <label className="block text-lg font-bold">청년부 소식</label>
          <button
            type="button"
            onClick={addNewsItem}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 text-sm font-medium"
          >
            + 항목 추가
          </button>
        </div>

        {newsItems.length === 0 ? (
          <p className="text-gray-500 text-sm">항목을 추가하면 여기에 표시됩니다</p>
        ) : (
          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-semibold text-gray-600">항목 {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => deleteNewsItem(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-medium"
                  >
                    삭제
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateNewsItem(item.id, 'title', e.target.value)}
                    placeholder="소식 제목"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                  <textarea
                    value={item.content}
                    onChange={(e) => updateNewsItem(item.id, 'content', e.target.value)}
                    placeholder="소식 내용"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm h-24 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 오늘의 말씀 */}
      <div className="pb-8 border-b border-gray-200">
        <h3 className="text-lg font-bold mb-6">오늘의 말씀</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">설교 제목</label>
            <input
              type="text"
              value={sermonTitle}
              onChange={(e) => setSermonTitle(e.target.value)}
              placeholder="예: 여호수아 같은 청년 공동체"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">본문 구절</label>
            <input
              type="text"
              value={sermonScripture}
              onChange={(e) => setSermonScripture(e.target.value)}
              placeholder="예: 고린도후서 13:5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">설교 본문</label>
            <textarea
              value={sermonContent}
              onChange={(e) => setSermonContent(e.target.value)}
              placeholder="성경 본문 내용을 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 h-32 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">주보 상세페이지에만 표시됩니다</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">설교자</label>
            <input
              type="text"
              value={sermonPreacher}
              onChange={(e) => setSermonPreacher(e.target.value)}
              placeholder="설교자 이름"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">추가 내용</label>
            <textarea
              value={preacherNote}
              onChange={(e) => setPreacherNote(e.target.value)}
              placeholder="설교자 관련 추가 내용을 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 h-24 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">주보 상세페이지에만 표시됩니다</p>
          </div>
        </div>
      </div>

      {message && (
        <div className="p-4 rounded-lg bg-red-100 text-red-700">{message}</div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 disabled:bg-gray-400 font-medium"
        >
          {isSubmitting ? '수정중...' : '주보 수정'}
        </button>

        <button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 font-medium"
        >
          주보 삭제
        </button>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => !isSubmitting && setShowDeleteConfirm(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">주보 삭제</h3>
            <p className="text-gray-600 text-sm mb-6">
              정말로 이 주보를 삭제하시겠습니까?<br />삭제 후에는 복구할 수 없습니다.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 font-medium"
              >
                {isSubmitting ? '삭제중...' : '삭제'}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 font-medium"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
