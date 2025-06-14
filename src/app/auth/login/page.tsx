import LoginForm from '@/components/login-form'
import ReturnButton from '@/components/return-button'
import OauthSignButton from '@/components/sign-in-oauth-buttons'
import Link from 'next/link'



const Login = () => {
  return (
    <div className='px-8 py-16 container mx-auto max-w-screen-lg y-8'>
        <div className='space-y-8'>
          <ReturnButton href='/' label='Home'/>
           <h1 className='text-3xl font-bold'>Login</h1> 
        </div>
        <div className='space-y-4'>
        <LoginForm />
        <p className='text-muted-foreground text-sm'>
          Don&apos;t have an account?{' '}
          <Link href={'/auth/register'} className='hover:text-foreground'>
            Register
          </Link>
        </p>
        
        <hr className='max-w-sm'/>
    </div>
    
    <div className='flex flex-col max-w-sm gap-4'>
  
     <OauthSignButton provider='google' />
     <OauthSignButton provider='github' />
    </div>
    </div>
  )
}

export default Login