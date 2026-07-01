'use client'

import { useState } from 'react'
import { updateChurchInfo, ChurchInfo } from '@/lib/actions/church-info-actions'

export function ChurchInfoForm({ info }: { info: ChurchInfo }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const formData = new FormData(e.currentTarget)
      await updateChurchInfo(formData)
      setMessage('교회 정보가 수정되었습니다!')
    } catch (error) {
      setMessage(`오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">섬기는 분들</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">담임목사</label>
            <input
              name="pastor"
              type="text"
              defaultValue={info.pastor || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">담당전도사</label>
            <input
              name="evangelist"
              type="text"
              defaultValue={info.evangelist || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">청년부장</label>
            <input
              name="youth_leader"
              type="text"
              defaultValue={info.youth_leader || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">담당선생님</label>
            <input
              name="teacher"
              type="text"
              defaultValue={info.teacher || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">임원</label>
            <input
              name="officers"
              type="text"
              defaultValue={info.officers || ''}
              placeholder="박현수(회장), 최선영(부회장)..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-bold mb-4">예배 안내</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">예배 시간</label>
            <input
              name="worship_time"
              type="text"
              defaultValue={info.worship_time || ''}
              placeholder="주일 오후 1:55"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">900기도회</label>
            <input
              name="prayer_meeting"
              type="text"
              defaultValue={info.prayer_meeting || ''}
              placeholder="매주 금요일 저녁 9시, 본당 1층 여자 어르신 쉼터"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-bold mb-4">오시는 길</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">주소</label>
            <input
              name="address"
              type="text"
              defaultValue={info.address || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">전화</label>
            <input
              name="phone"
              type="text"
              defaultValue={info.phone || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.startsWith('오류') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 disabled:bg-gray-400 font-medium"
      >
        {isSubmitting ? '저장중...' : '저장'}
      </button>
    </form>
  )
}
