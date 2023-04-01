import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob",
      password: {
        create: {
          hash: await hash("hallo", 10),
        },
      },
    },
  });

  console.log({ bob });

  await prisma.project.upsert({
    where: { id: "xyz-bcy-ads" },
    update: {},
    create: {
      id: "xyz-bcy-ads",
      name: "My first project",
      user: { connect: { id: bob.id } },
      description: "This is my first project",
      location: "Garten",
    },
  });

  await prisma.blueprint.upsert({
    where: { id: "xyz-blue-print" },
    update: {},
    create: {
      id: "xyz-blue-print",
      name: "My first blueprint",
      project: { connect: { id: "xyz-bcy-ads" } },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
