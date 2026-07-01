'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-server'
import { requireAuth } from '@/lib/auth'

// ID를 내부 이메일 형식으로 변환
const toEmail = (id: string) => `${id}@banwon.local`

export async function signUp(formData: FormData) {
  const userId = formData.get('userId') as string
  const password = formData.get('password') as string
  const passwordConfirm = formData.get('passwordConfirm') as string

  if (!userId || !password) {
    throw new Error('아이디와 비밀번호를 입력해주세요')
  }

  if (!/^[a-zA-Z0-9_가-힣]+$/.test(userId)) {
    throw new Error('아이디는 영문, 숫자, 한글, 언더스코어(_)만 사용 가능합니다')
  }

  if (userId.length < 2 || userId.length > 20) {
    throw new Error('아이디는 2~20자 이내로 입력해주세요')
  }

  if (password !== passwordConfirm) {
    throw new Error('비밀번호가 일치하지 않습니다')
  }

  if (password.length < 6) {
    throw new Error('비밀번호는 최소 6자 이상이어야 합니다')
  }

  const supabase = await getSupabaseServerClient()
  const email = toEmail(userId)

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    if (error.message.includes('rate')) {
      throw new Error('잠시 후 다시 시도해주세요')
    }
    if (error.message.includes('already') || error.message.includes('duplicate')) {
      throw new Error('이미 사용 중인 아이디입니다')
    }
    throw new Error(`회원가입 실패: ${error.message}`)
  }

  revalidatePath('/')
  redirect('/')
}

export async function signIn(formData: FormData) {
  const userId = formData.get('userId') as string
  const password = formData.get('password') as string

  if (!userId || !password) {
    throw new Error('아이디와 비밀번호를 입력해주세요')
  }

  const supabase = await getSupabaseServerClient()
  const email = toEmail(userId)

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다')
  }

  revalidatePath('/')
  redirect('/')
}

export async function signOut() {
  const supabase = await getSupabaseServerClient()
  await supabase.auth.signOut()

  revalidatePath('/')
  redirect('/')
}

export async function updatePassword(formData: FormData) {
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!newPassword || !confirmPassword) {
    throw new Error('새 비밀번호를 입력해주세요')
  }

  if (newPassword !== confirmPassword) {
    throw new Error('비밀번호가 일치하지 않습니다')
  }

  if (newPassword.length < 6) {
    throw new Error('비밀번호는 최소 6자 이상이어야 합니다')
  }

  const supabase = await getSupabaseServerClient()
  const { error } = await supabase.auth.updateUser({ password: newPassword })

  if (error) {
    throw new Error(`비밀번호 변경 실패: ${error.message}`)
  }

  revalidatePath('/mypage')
}

export async function deleteAccount() {
  const user = await requireAuth()
  const adminClient = await getSupabaseAdminClient()

  const { error } = await adminClient.auth.admin.deleteUser(user.id)

  if (error) {
    throw new Error(`계정 삭제 실패: ${error.message}`)
  }

  revalidatePath('/')
  redirect('/')
}
