'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSermon } from '@/lib/actions/sermon-actions'

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

export function SermonForm() {
  const router = useRouter()
  const [date, setDate] = useState('')
  const [worshipItems, setWorshipItems] = useState<WorshipItem[]>([])
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [sermonTitle, setSermonTitle] = useState('')
  const [sermonScripture, setSermonScripture] = useState('')
  const [sermonContent, setSermonContent] = useState('')
  const [sermonPreacher, setSermonPreacher] = useState('')
  const [preacherNote, setPreacherNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

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

      const sermonId = await createSermon(formData)
      router.push(`/sermons/${sermonId}`)
    } catch (error) {
      setMessage(`오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
      setIsSubmitting(false)
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 disabled:bg-gray-400 font-medium"
      >
        {isSubmitting ? '등록중...' : '주보 등록'}
      </button>
    </form>
  )
}
