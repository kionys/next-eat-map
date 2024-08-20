import { IStoreApiResponse } from "@core/interfaces/store";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IStoreApiResponse>,
) {
  if (req.method === "GET") {
    const { page = "1" }: { page?: string } = req.query;
    const skipPage = parseInt(page) - 1;
    const prisma = new PrismaClient();
    const count = await prisma.store.count();
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      take: 10,
      skip: skipPage * 10,
    });

    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    res.status(405).end();
  }
}
