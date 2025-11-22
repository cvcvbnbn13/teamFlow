import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { mockWorkspaces } from '../const'
import { cn } from '@/lib/utils'
import { getWorkspaceColor } from '../utils'

export function WorkspaceList() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {mockWorkspaces.map(ws => {
          return (
            <Tooltip key={ws.id}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  // className="size-12 transition-all duration-200"
                  className={cn(
                    'size-12 transition-all duration-200',
                    getWorkspaceColor(ws.id)
                  )}
                >
                  <span className="text-sm font-semibold">{ws.avatar}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{ws.name}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
