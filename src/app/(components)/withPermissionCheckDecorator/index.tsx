import { clerkClient } from "@clerk/nextjs/server";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];
export async function withPermissionCheckDecorator(
  userId: string,
  permission: string,
  callback: () => MenuItem
): Promise<MenuItem | null> {
  const user = await (await clerkClient()).users.getUser(userId);
  const userPermissions = user.publicMetadata.permissions || [];

  if (userPermissions == permission) {
    return callback();
  }

  return null;
}
