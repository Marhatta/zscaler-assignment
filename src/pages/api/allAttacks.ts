import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resp = await prisma.attacks.findMany();
  res.status(200).json({ message: 'success', data: resp });
}
