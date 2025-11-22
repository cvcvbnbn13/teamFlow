import { KindeOrganization, KindeUser } from '@kinde-oss/kinde-auth-nextjs'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { os } from '@orpc/server'
import { z } from 'zod'

const WorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
})

const UserSchema = z.custom<KindeUser<Record<string, unknown>>>()

const CurrentWorkspaceSchema = z.custom<KindeOrganization<unknown>>()

const ListWorkspacesResponseSchema = z.object({
  workspaces: z.array(WorkspaceSchema),
  user: UserSchema,
  currentWorkspace: CurrentWorkspaceSchema,
})

export const listWorkspaces = os
  .route({
    method: 'GET',
    path: '/workspaces',
    summary: 'List all workspaces',
    tags: ['workspace'],
  })
  .input(z.void())
  .output(ListWorkspacesResponseSchema)
  .handler(async ({ input }) => {
    const { getUserOrganizations } = getKindeServerSession()

    const organizations = await getUserOrganizations()

    return {
      workspaces: organizations?.orgs.map(org => ({
        id: org.code,
        name: org.name,
        avatar: org.name?.charAt(0),
      })),
    }
  })
