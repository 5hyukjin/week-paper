import { getChurchInfo } from '@/lib/actions/church-info-actions'
import Link from 'next/link'

export async function Footer() {
  const info = await getChurchInfo()

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* 교회 정보 */}
          <div>
            <Link href="/login">
              <h3 className="text-white font-bold mb-4 hover:underline inline-block">
                반월중앙교회
              </h3>
            </Link>
            <div className="space-y-2 text-sm">
              {info?.pastor && (
                <p><span className="font-semibold">담임목사:</span> {info.pastor}</p>
              )}
              {info?.evangelist && (
                <p><span className="font-semibold">담당전도사:</span> {info.evangelist}</p>
              )}
              {info?.youth_leader && (
                <p><span className="font-semibold">청년부장:</span> {info.youth_leader}</p>
              )}
              {info?.teacher && (
                <p><span className="font-semibold">담당선생님:</span> {info.teacher}</p>
              )}
              {info?.officers && (
                <p><span className="font-semibold">임원:</span> {info.officers}</p>
              )}
            </div>
          </div>

          {/* 예배 안내 */}
          <div>
            <h3 className="text-white font-bold mb-4">예배 안내</h3>
            <div className="space-y-2 text-sm">
              {info?.worship_time && (
                <p><span className="font-semibold">예배 시간:</span> {info.worship_time}</p>
              )}
              {info?.prayer_meeting && (
                <p><span className="font-semibold">900기도회:</span> {info.prayer_meeting}</p>
              )}
              {info?.address && (
                <p><span className="font-semibold">주소:</span> {info.address}</p>
              )}
              {info?.phone && (
                <p><span className="font-semibold">전화:</span> {info.phone}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-xs text-gray-400 text-center">
            © 2026 반월중앙교회 청년부. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
