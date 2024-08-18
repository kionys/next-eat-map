import { IStore } from "@core/interfaces/store";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const stores = (await import("@core/data/store_data.json"))[
      "DATA"
    ] as IStore[];

    res.status(200).json(stores);
  } else {
    res.status(405).end();
  }
}
