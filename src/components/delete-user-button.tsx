'use client'
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { deleteUserAction } from "@/actions/delete-user.action";
import { toast } from "sonner";


interface DeleteUserButtonProps {
    userId:string;
}

const DeleteButton = ({userId}:DeleteUserButtonProps) => {
    const [isPending, setIsPending] = useState(false);

    const handleClick = async() => {
        setIsPending(true);
        const {error} = await deleteUserAction({userId})
        
        if(error){
          toast.error(error)  
        }else{
            toast.success('User deleted successfully!')
        }
        setIsPending(false)
    }

  return (
    <Button
    size={'icon'}
    variant={'destructive'}
    className="size-7 rounded-sm"
    disabled={isPending}
    onClick={handleClick}
     >
        <span className="sr-only">Delete User</span>
        <TrashIcon />
    </Button>
  )
}

export default DeleteButton


export const PlaceHolderDeleteUserButton = () => {
    return (
        <Button
        size={'icon'}
        variant={'destructive'}
        className="size-7 rounded-sm"
        disabled
        >
            <span className="sr-only">Delete User</span>
            <TrashIcon />
        </Button>
    );
};