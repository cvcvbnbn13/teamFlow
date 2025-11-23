import { KindeOrganization, KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import { base } from "../middlewares/base";
import { requiredAuthMiddleware } from "../middlewares/auth";
import { requiredWorkspaceMiddleware } from "../middlewares/workspace";

const WorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
});

const UserSchema = z.custom<KindeUser<Record<string, unknown>>>();

const CurrentWorkspaceSchema = z.custom<KindeOrganization<unknown>>();

const ListWorkspacesResponseSchema = z.object({
  workspaces: z.array(WorkspaceSchema),
  user: UserSchema,
  currentWorkspace: CurrentWorkspaceSchema,
});

export const listWorkspaces = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .route({
    method: "GET",
    path: "/workspaces",
    summary: "List all workspaces",
    tags: ["workspace"],
  })
  .input(z.void())
  .output(ListWorkspacesResponseSchema)
  .handler(async ({ context, errors }) => {
    const { getUserOrganizations } = getKindeServerSession();

    const organizations = await getUserOrganizations();

    if (!organizations) {
      throw errors.FORBIDDEN;
    }

    return {
      workspaces: organizations?.orgs.map((org) => ({
        id: org.code,
        name: org.name ?? "My Workspace",
        avatar: org.name?.charAt(0) ?? "FS",
      })),
      user: context.user,
      currentWorkspace: context.workspace,
    };
  });
