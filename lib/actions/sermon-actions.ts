'use server'

import { revalidatePath } from 'next/cache'
import { getSupabaseAdminClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/auth'

export async function createSermon(formData: FormData): Promise<string> {
  const user = await requireAdmin()

  const date = formData.get('date') as string
  const worshipOrder = formData.get('worshipOrder') as string
  const youthNews = formData.get('youthNews') as string
  const sermonTitle = formData.get('sermonTitle') as string
  const sermonScripture = formData.get('sermonScripture') as string
  const sermonContent = formData.get('sermonContent') as string
  const sermonPreacher = formData.get('sermonPreacher') as string
  const preacherNote = formData.get('preacherNote') as string

  if (!date) {
    throw new Error('날짜는 필수입니다')
  }

  const supabase = await getSupabaseAdminClient()

  const { data, error } = await supabase
    .from('sermons')
    .insert({
      date,
      worship_order: worshipOrder || null,
      youth_news: youthNews || null,
      sermon_title: sermonTitle || null,
      sermon_scripture: sermonScripture || null,
      sermon_content: sermonContent || null,
      sermon_preacher: sermonPreacher || null,
      preacher_note: preacherNote || null,
      created_by: user.id,
    })
    .select('id')
    .single()

  if (error) {
    throw new Error(`주보 등록 실패: ${error.message}`)
  }

  revalidatePath('/sermons')
  return data.id
}

export async function updateSermon(id: string, formData: FormData): Promise<string> {
  await requireAdmin()

  const date = formData.get('date') as string
  const worshipOrder = formData.get('worshipOrder') as string
  const youthNews = formData.get('youthNews') as string
  const sermonTitle = formData.get('sermonTitle') as string
  const sermonScripture = formData.get('sermonScripture') as string
  const sermonContent = formData.get('sermonContent') as string
  const sermonPreacher = formData.get('sermonPreacher') as string
  const preacherNote = formData.get('preacherNote') as string

  if (!date) {
    throw new Error('날짜는 필수입니다')
  }

  const supabase = await getSupabaseAdminClient()

  const { error } = await supabase
    .from('sermons')
    .update({
      date,
      worship_order: worshipOrder || null,
      youth_news: youthNews || null,
      sermon_title: sermonTitle || null,
      sermon_scripture: sermonScripture || null,
      sermon_content: sermonContent || null,
      sermon_preacher: sermonPreacher || null,
      preacher_note: preacherNote || null,
    })
    .eq('id', id)

  if (error) {
    throw new Error(`주보 수정 실패: ${error.message}`)
  }

  revalidatePath('/sermons')
  revalidatePath(`/sermons/${id}`)
  return id
}

export async function deleteSermon(id: string) {
  await requireAdmin()

  const supabase = await getSupabaseAdminClient()

  const { error } = await supabase.from('sermons').delete().eq('id', id)

  if (error) {
    throw new Error(`주보 삭제 실패: ${error.message}`)
  }

  revalidatePath('/sermons')
}
