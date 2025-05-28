import DeleteButton, { PlaceHolderDeleteUserButton } from '@/components/delete-user-button'
import ReturnButton from '@/components/return-button'
import { Table, TableHeader,TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'


const AdminPage = async() => {
    const session = await auth.api.getSession({
        headers:await headers(),
    })

    if(!session) redirect('/auth/login');

    if(session.user.role !== 'ADMIN') {
  return (
    <div className='px-8 py-16 container mx-auto max-w-screen-lg space-y-8'>
        <div className='space-y-8'>
            <ReturnButton href='/profile' label='profile'/>
            <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
            <p className="p-2 rounded-md text-lg bg-red-700 text-white font-bold">FORBIDDEN</p>
        </div>
    </div>
  )
}

const users = await prisma.user.findMany({
    orderBy:{
        name:'asc'
    }
});

return (
    <div className='px-8 py-16 container mx-auto max-w-screen-lg space-y-8'>
        <div className='space-y-8'>
            <ReturnButton href='/profile' label='profile'/>
            <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
            <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">ACCESS GRANTED</p>
        </div>

        <div className="w-full overflow-x-auto">
         <Table className='table-auto min-w-full whitespace-nowrap'>
            <TableHeader>
                <TableRow className='border-b text-sm text-left'>
                    <TableHead className='px-2 py-2'>ID</TableHead>
                    <TableHead className='px-2 py-2'>Name</TableHead>
                    <TableHead className='px-2 py-2'>Email</TableHead>
                    <TableHead className='px-2 py-2'>Role</TableHead>
                    <TableHead className='px-2 py-2'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id} className='border-b text-sm text-left'>
                        <TableCell className='p-2'>{user.id.slice(0,8)}</TableCell>
                        <TableCell className='p-2'>{user.name}</TableCell>
                        <TableCell className='p-2'>{user.email}</TableCell>
                        <TableCell className='p-2'>{user.role}</TableCell>
                        <TableCell className='p-2'>
                            {user.role === 'USER' ? (
                                <DeleteButton userId={user.id}/>
                            ):(
                                <PlaceHolderDeleteUserButton />
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
         </Table>
        </div>
    </div>
  )
}

export default AdminPage