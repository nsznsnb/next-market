import prisma from "../../app/lib/prisma";
import { item } from "./item";
import { user } from "./user";

async function main() {
  await prisma.item.deleteMany();
  await prisma.user.deleteMany();
  await item();
  await user();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
