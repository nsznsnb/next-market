import { User } from "@prisma/client";

const users: Omit<User, "id">[] = [
  {
    name: "monotein",
    email: "dummy@gmail.com",
    password: "mono-123",
  },
  {
    name: "monotein2",
    email: "dummy2@gmail.com",
    password: "mono-345",
  },
];

export const user = async () => {
  await prisma?.user.createMany({
    data: users,
  });
};
