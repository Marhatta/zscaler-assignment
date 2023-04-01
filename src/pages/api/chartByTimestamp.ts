import methods from '@/utils/api/methods';
import statusCode from '@/utils/api/statusCodes';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== methods.GET) {
    res
      .status(statusCode.METHOD_NOT_ALLOWED)
      .json({ message: 'method not allowed', data: null });
  }
  try {
    const resp = await prisma.attacks.groupBy({
      by: ['timestamp'],
      where: { timestamp: { gte: '2021-08-20', lt: '2021-08-24' } },
      _count: true
    });
    res.status(statusCode.OK).json({ message: 'success', data: resp });
  } catch (error: any) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'error', data: error.message });
  }
}
