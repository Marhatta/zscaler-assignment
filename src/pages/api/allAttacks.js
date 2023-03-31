import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const resp = await prisma.attacks.findMany();
  res.status(200).json({ message: 'success', data: resp });
}
