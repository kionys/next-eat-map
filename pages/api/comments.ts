import { IComment, ICommentApiResponse } from "@core/interfaces/store";
import prisma from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

interface ResponseType {
  id?: string;
  page?: string;
  limit?: string;
  storeId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IComment | ICommentApiResponse | { message: string }>,
) {
  const session = await getServerSession(req, res, authOptions);
  const {
    id = "",
    page = "1",
    limit = "10",
    storeId = "",
  }: ResponseType = req.body;

  if (req.method === "POST") {
    if (!session?.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized or missing session.user" });
    }
    const { storeId, body }: { storeId: number; body?: string | null } =
      req.body;
    const comment = await prisma.comment.create({
      data: {
        storeId,
        body,
        userId: session?.user.id,
      },
    });
    return res.status(200).json(comment);
  } else if (req.method === "DELETE") {
    // 댓글 삭제 로직
    if (!session?.user || !id) {
      return res.status(401).json({ message: "Unauthorized or missing ID" });
    }

    const result = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json(result);
  } else if (req.method === "PUT") {
  } else {
    // GET
    const skipPage = parseInt(page) - 1;
    const count = await prisma.comment.count({
      where: {
        storeId: storeId ? parseInt(storeId) : {},
      },
    });

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        storeId: storeId ? parseInt(storeId) : {},
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
      include: {
        user: true,
      },
    });

    return res.status(200).json({
      data: comments,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  }
}
