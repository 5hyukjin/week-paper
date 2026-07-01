import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/sermons?select=id&order=date.desc&limit=1`
    const res = await fetch(url, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
      },
      // 캐시하지 않고 항상 최신 데이터 조회
      cache: 'no-store',
    })

    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.redirect(new URL(`/sermons/${data[0].id}`, request.url))
      }
    }
  } catch {
    // 실패 시 주보 목록으로 폴백
  }

  return NextResponse.redirect(new URL('/sermons', request.url))
}

export const config = {
  matcher: '/',
}
