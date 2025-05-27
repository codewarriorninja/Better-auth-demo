'use client'

import { useSession } from "@/lib/auth-client"
import { Button } from "./ui/button";
import Link from "next/link";

const GetStartedButton = () => {
    const {data:session, isPending} = useSession();

    if(isPending) {
        return (
          <Button size={'lg'} className="opacity-50" asChild>Get Started</Button>  
        )
    }

    const href = session ? '/profile' :'/auth/login'

    return (
    <div className="flex items-center flex-col gap-4">
        <Button size={'lg'} asChild>
            <Link href={href}>Get Started</Link>
        </Button>

        {session && <p>welcome back, {session.user.name} 👋</p>}
    </div>
  )
}

export default GetStartedButton