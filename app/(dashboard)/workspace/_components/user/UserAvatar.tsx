import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { defaultUser } from '@/app/(dashboard)/workspace/const'

export const UserAvatar = () => {
  return (
    <Avatar className="size-8 relative rounded-lg">
      <AvatarImage
        src={defaultUser.picture}
        className="object-cover"
        alt="User Image"
      />
      <AvatarFallback>
        {defaultUser.given_name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
