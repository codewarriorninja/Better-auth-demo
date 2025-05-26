import ReturnButton from '@/components/return-button';
import SignOutButton from '@/components/sign-out-button';
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const Profile = async() => {
  const session = await auth.api.getSession({
    headers:await headers()
  });
  
  if(!session){
    return <p className='text-destructive'>Unauthorized</p>
  }
  
  console.log(session)
  return (
    <div className='px-8 py-16 container mx-auto max-w-screen-lg space-y-8'>
      <div className='space-y-8'>
        <ReturnButton href='/' label='Home'/>
        <h1 className='text-3xl font-bold'>Profile</h1>
      </div>
      <SignOutButton />
      
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