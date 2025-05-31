'use client'

import { UserRole } from "@/generated/prisma";
import { admin } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface UserRoleSelectProps {
    userId:string;
    role:UserRole
}


const UserRoleSelect = ({userId,role}:UserRoleSelectProps) => {
    const [isPending, setIspending] = useState(false);
    const router = useRouter();

    const handleChange = async(evt:React.ChangeEvent<HTMLSelectElement>) => {
        setIspending(true);

        const newRole = evt.target.value as UserRole;

        const canChangeRole = await admin.hasPermission({
            permissions:{
                user:['set-role'],
            },
        }) ;

        if(!canChangeRole.error){
          return toast.error('Forbidden')
        }
        
        await admin.setRole({
            userId,
            role:newRole,
            fetchOptions:{
                onRequest: () => {
                    setIspending(true)
                },
                onResponse: () => {
                    setIspending(false)
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                },
                onSuccess: () => {
                    router.refresh()
                    toast.success('Role updated successfully')
                }
            }
        })
    }

  return (
    <select value={role}
    onChange={handleChange}
    disabled={role ==='ADMIN' || isPending}
    className="px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
    >
        <option value={'ADMIN'}>ADMIN</option>
        <option value={'USER'}>USER</option>
    </select>
  )
}

export default UserRoleSelect