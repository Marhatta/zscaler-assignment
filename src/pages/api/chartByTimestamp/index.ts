import methods from '@/utils/api/methods';
import statusCode from '@/utils/api/statusCodes';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== methods.GET) {
    res.status(statusCode.METHOD_NOT_ALLOWED).json({
      message: 'method not allowed',
      data: null,
      statusCode: statusCode.METHOD_NOT_ALLOWED
    });
  }

  const { startDate, endDate } = req.query;

  // verify startDate and endDate
  if (!startDate || !endDate) {
    res.status(statusCode.BAD_REQUEST).json({
      message: 'Invalid start or end date',
      data: null,
      statusCode: statusCode.BAD_REQUEST
    });
  }

  const formattedStartDate = format(
    new Date(startDate as string),
    `yyyy-MM-dd'T'HH:mm:ss'Z'`
  );
  const formattedEndDate = format(
    new Date(endDate as string),
    `yyyy-MM-dd'T'HH:mm:ss'Z'`
  );

  try {
    const chartData = await prisma.attacks.groupBy({
      by: ['timestamp'],
      where: {
        timestamp: {
          gte: formattedStartDate,
          lte: formattedEndDate
        }
      },
      _count: true
    });
    res.status(statusCode.OK).json({
      message: 'success',
      data: chartData,
      statusCode: statusCode.OK
    });
  } catch (error: any) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: 'error',
      data: error.message,
      statusCode: statusCode.INTERNAL_SERVER_ERROR
    });
  }
}
