'use server'

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"
import { redirect } from "next/navigation";

export const deleteUserAction = async({userId}:{userId:string}) => {
    const headerList = await headers();

    const session = await auth.api.getSession({
        headers:headerList,
    });

    if(!session) throw new Error("Unauthorized");

    if(session.user.role !== 'ADMIN' || session.user.id === userId){
        throw new Error("Forbidden")
    }
    try {
      await prisma.user.delete({
        where:{
            id:userId,
            role:'USER'
        }
      });

      if(session.user.id === userId){
        await auth.api.signOut({headers:headerList});
        redirect('/auth/sign-in');
      }

      revalidatePath('/admin/dashboard');
      return {success:true, error:null};
    } catch (error) {
        if(error instanceof APIError){
            return {success:false, error:error.message};
        }
        return {success:false, error:'Internal Error'}
    }
}