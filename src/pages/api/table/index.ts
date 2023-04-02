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
    res
      .status(statusCode.METHOD_NOT_ALLOWED)
      .json({ message: 'method not allowed', data: null });
  }
  const { pageNumber = 0, rowsPerPage = 10, startDate, endDate } = req.query;
  // verify startDate and endDate
  if (!startDate || !endDate) {
    res
      .status(statusCode.BAD_REQUEST)
      .json({ message: 'Invalid start or end date', data: null });
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
    const paginatedData = await prisma.attacks.findMany({
      take: +rowsPerPage,
      skip: +pageNumber * +rowsPerPage,
      where: {
        timestamp: {
          lte: formattedEndDate,
          gte: formattedStartDate
        }
      }
    });
    const totalRowCount = await prisma.attacks.count({
      where: {
        timestamp: {
          lte: formattedEndDate,
          gte: formattedStartDate
        }
      }
    });
    const data = {
      rows: paginatedData,
      totalRowCount
    };
    res.status(statusCode.OK).json({ message: 'success', data });
  } catch (error: any) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'error', data: error.message });
  }
}
