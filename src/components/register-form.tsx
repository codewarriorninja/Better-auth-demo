'use client'

import { toast } from "sonner"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
// import { signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signUpEmailAction } from "@/actions/sign-up-email.action"

const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

    const handleSubmit = async(evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      setIsPending(true)
      const formData = new FormData(evt.target as HTMLFormElement);

      const {error} = await signUpEmailAction(formData);

      if(error){
        toast.error(error);
        setIsPending(false);
      }else{
        router.push('/auth/login')
        toast.success('User registered successfully')
      }
      // const name = String(formData.get('name'));
      // if(!name) return toast.error('Please enter your name');
      // const email = String(formData.get('email'));
      // if(!email) return toast.error('Please enter your email');
      // const password = String(formData.get('password'));
      // if(!password) return toast.error('Please enter your password');

      // await signUp.email({
      //   name,
      //   email,
      //   password
      // },{
      //   onRequest: () => {
      //     setIsPending(true);
      //   },
      //   onResponse:() => {
      //     setIsPending(false);
      //   },
      //   onError:(ctx) => {
      //       toast.error(ctx.error.message)
      //   },
      //   onSuccess:() => {
      //       router.push('/auth/login')
      //       toast.success('User registered successfully')
      //   }
      // })
    }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>Register</Button>
    </form>
  )
}

export default RegisterForm