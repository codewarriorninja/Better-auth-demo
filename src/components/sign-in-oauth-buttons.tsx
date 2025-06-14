'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import { signIn } from "@/lib/auth-client"
import { toast } from "sonner"

interface SignInOauthButtonProps {
    provider:'google' | 'github'
    signUp?:boolean
}

const OauthSignButton = ({provider, signUp}: SignInOauthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true)
    
    await signIn.social({
      provider,
      callbackURL:'/profile',
      errorCallbackURL:'/auth/login/error',
      fetchOptions:{
        onRequest: () => {
          setIsPending(true)
        },
        onResponse:() => {
          setIsPending(false)
        },
        onError:(ctx) => {
          toast.error(ctx.error.message)
        },
      }
    })
    setIsPending(false)
  }

  const action = signUp ? 'Up' : 'In';
  const ProviderName = provider === "google" ? "Google" : "Github";

  return (
    <Button onClick={handleClick} disabled={isPending}>
      Sign {action} with {ProviderName}
    </Button>
  )
}

export default OauthSignButton