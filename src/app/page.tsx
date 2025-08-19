import { GetStartedButton } from '@/components/get-started'
import { APP_NAME } from '@/lib/constants'

export default async function Home() {
  return (
    <div className='flex h-dvh items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-8'>
        <h1 className='text-6xl font-bold'>{APP_NAME}</h1>
        <GetStartedButton />
      </div>
    </div>
  )
}
