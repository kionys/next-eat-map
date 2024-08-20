import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    const stores = await prisma.store.findMany();
    // const stores = (await import("@core/data/store_data.json"))[
    //   "DATA"
    // ] as IStore[];

    // console.log(stores, "TEST");
    res.status(200).json(stores);
  } else {
    res.status(405).end();
  }
}
