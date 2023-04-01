import { ForbiddenError, subject } from "@casl/ability";
import { accessibleBy } from "@casl/prisma";
import { z } from "zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc.server";

export const projectRouter = router({
  list: protectedProcedure.query((req) => {
    return prisma.project.findMany({
      where: accessibleBy(req.ctx.ability, "read").Project,
    });
  }),

  get: protectedProcedure.input(z.string()).query(async (req) => {
    const project = await prisma.project.findUnique({
      where: { id: req.input },
    });

    project &&
      ForbiddenError.from(req.ctx.ability).throwUnlessCan(
        "read",
        subject("Project", project)
      );

    return project;
  }),
});
