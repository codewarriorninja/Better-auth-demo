import ReturnButton from '@/components/return-button';
import SignOutButton from '@/components/sign-out-button';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Profile = async() => {
  const session = await auth.api.getSession({
    headers:await headers()
  });
  
  if(!session) redirect('/auth/login');
  
  return (
    <div className='px-8 py-16 container mx-auto max-w-screen-lg space-y-8'>
      <div className='space-y-8'>
        <ReturnButton href='/' label='Home'/>
        <h1 className='text-3xl font-bold'>Profile</h1>
      </div>
      <div className='flex items-center gap-2'>
        {session.user.role === 'ADMIN' && (
          <Button size='sm' asChild>
            <Link href={'/admin/dashboard'}>Admin Dashboard</Link>
          </Button>
        )}
       <SignOutButton />
      </div>
      
      <pre className='text-sm overflow-hidden'>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  )
}

export default Profile

// import { auth } from "@/lib/auth"
// import { headers } from "next/headers"


// const Profile = async() => {
//   const session = await auth.api.getSession({
//     headers:await headers()
//   });

//   if(!session){
//     return <p className='text-destructive'>Unauthorized</p>
//   }
  
//   const user = session.user

//   return (
//     <div>
//       <p>welcome, {user.name ?? user.email}</p>
//       <h1>{user.email}</h1>
//     </div>
//   )
// }

// export default Profile