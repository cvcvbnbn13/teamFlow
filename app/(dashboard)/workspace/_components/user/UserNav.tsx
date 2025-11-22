import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from './UserAvatar'
import { defaultUser } from '../../const'
import { CreditCard, LogOut, User } from 'lucide-react'
import { LogoutLink, PortalLink } from '@kinde-oss/kinde-auth-nextjs/components'

export const UserNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-12 rounded-xl hover:rounded-lg transition-all duration-200 bg-background/50 border-border/50 hover:bg-accent hover:text-accent-foreground"
        >
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="right"
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuLabel className="font-normal flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserAvatar />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <p className="truncate font-medium">{defaultUser.given_name}</p>
            <p className="text-muted-foreground truncate text-xs">
              {defaultUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <PortalLink>
              <User />
              Account
            </PortalLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <PortalLink>
              <CreditCard />
              Billing
            </PortalLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink>
            <LogOut />
            Logout
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
