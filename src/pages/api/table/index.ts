import methods from '@/utils/api/methods';
import statusCode from '@/utils/api/statusCodes';
import { PrismaClient } from '@prisma/client';
import { format, isBefore } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

// returns the converted operator
// Required to map the operator names between client and server
const convertOperator = (operator: string) => {
  if (operator === 'isAnyOf') return 'in';
  return operator;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== methods.GET) {
    res
      .status(statusCode.METHOD_NOT_ALLOWED)
      .json({ message: 'method not allowed', data: null });
  }
  const {
    pageNumber = 0,
    rowsPerPage = 10,
    startDate,
    endDate,
    field,
    operator = 'contains',
    value
  } = req.query;

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

  // check if end date it before start date
  if (isBefore(new Date(formattedEndDate), new Date(formattedStartDate))) {
    res.status(statusCode.BAD_REQUEST).json({
      message: 'End date cannot be before start date',
      data: null,
      statusCode: statusCode.BAD_REQUEST
    });
  }

  // checks if filters are provided in the query params -  then applies those filters
  if (field !== 'undefined' && value !== 'undefined') {
    const mappedOperator = convertOperator(operator as string);
    try {
      const paginatedData = await prisma.attacks.findMany({
        take: +rowsPerPage,
        skip: +pageNumber * +rowsPerPage,
        where: {
          AND: [
            {
              timestamp: {
                lte: formattedEndDate,
                gte: formattedStartDate
              }
            },
            {
              [`${field}`]: {
                [`${mappedOperator}`]: value
              }
            }
          ]
        }
      });

      const totalRowCount = await prisma.attacks.count({
        where: {
          AND: [
            {
              timestamp: {
                lte: formattedEndDate,
                gte: formattedStartDate
              }
            },
            {
              [`${field}`]: {
                [`${mappedOperator}`]: value
              }
            }
          ]
        }
      });
      const data = {
        rows: paginatedData,
        totalRowCount
      };
      res
        .status(statusCode.OK)
        .json({ message: 'success', data, statusCode: statusCode.OK });
    } catch (error: any) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        message: 'error',
        data: error.message,
        statusCode: statusCode.INTERNAL_SERVER_ERROR
      });
    }
  } else {
    // else returns paginated date based on start & end date only
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
      res
        .status(statusCode.OK)
        .json({ message: 'success', data, statusCode: statusCode.OK });
    } catch (error: any) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        message: 'error',
        data: error.message,
        statusCode: statusCode.INTERNAL_SERVER_ERROR
      });
    }
  }
}
