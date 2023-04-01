import { ForbiddenError, subject } from "@casl/ability";
import { accessibleBy } from "@casl/prisma";
import { z } from "zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc.server";

export const blueprintRouter = router({
  list: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query((req) => {
      return prisma.blueprint.findMany({
        where: {
          AND: [
            { projectId: req.input.projectId },
            accessibleBy(req.ctx.ability, "read").Blueprint,
          ],
        },
      });
    }),

  get: protectedProcedure.input(z.string()).query(async (req) => {
    const blueprint = await prisma.blueprint.findUnique({
      where: { id: req.input },
      include: { project: { include: { user: true } }, objects: true },
    });

    blueprint &&
      ForbiddenError.from(req.ctx.ability).throwUnlessCan(
        "read",
        subject("Project", blueprint.project)
      );

    const { project, ...strippedBlueprint } = { ...blueprint };

    return strippedBlueprint;
  }),
});
