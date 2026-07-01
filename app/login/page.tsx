import { LoginForm } from '@/components/login-form'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function LoginPage() {
  const user = await getCurrentUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="Joshua & Caleb" width={180} height={48} priority />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">반월중앙교회</h1>
          <p className="text-center text-gray-600 mb-8">청년부</p>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
