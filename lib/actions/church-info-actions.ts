'use server'

import { revalidatePath } from 'next/cache'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/auth'

export interface ChurchInfo {
  id: number
  pastor: string | null
  evangelist: string | null
  youth_leader: string | null
  teacher: string | null
  officers: string | null
  worship_time: string | null
  prayer_meeting: string | null
  address: string | null
  phone: string | null
}

export async function getChurchInfo(): Promise<ChurchInfo | null> {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from('church_info')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    return null
  }

  return data
}

export async function updateChurchInfo(formData: FormData) {
  await requireAdmin()

  const supabase = await getSupabaseServerClient()

  const { error } = await supabase
    .from('church_info')
    .update({
      pastor: formData.get('pastor') as string,
      evangelist: formData.get('evangelist') as string,
      youth_leader: formData.get('youth_leader') as string,
      teacher: formData.get('teacher') as string,
      officers: formData.get('officers') as string,
      worship_time: formData.get('worship_time') as string,
      prayer_meeting: formData.get('prayer_meeting') as string,
      address: formData.get('address') as string,
      phone: formData.get('phone') as string,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1)

  if (error) {
    throw new Error(`교회 정보 수정 실패: ${error.message}`)
  }

  revalidatePath('/')
  revalidatePath('/admin/church-info')
}
