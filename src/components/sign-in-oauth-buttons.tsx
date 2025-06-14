'use client'

import { Button } from "./ui/button"

interface SignInOauthButtonProps {
    provider:'google' | 'github'
    signUp?:boolean
}

const OauthSignButton = ({provider, signUp}: SignInOauthButtonProps) => {
  return (
    <Button>OauthSignButtons</Button>
  )
}

export default OauthSignButton