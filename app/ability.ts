import { AbilityBuilder, PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";
import { Blueprint, BlueprintObject, Project, User } from "@prisma/client";

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Project: Project;
      Blueprint: Blueprint;
      BlueprintObject: BlueprintObject;
    }>
  ],
  PrismaQuery
>;

export async function createAbility(user: User | null) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility
  );

  if (user) {
    can("manage", "User", { id: user.id });
    can("manage", "Project", { userId: user.id });
    can("manage", "Blueprint", { project: { userId: user.id } });
  }

  return build();
}
