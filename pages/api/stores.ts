import { IStore, IStoreApiResponse } from "@core/interfaces/store";
import axios from "axios";
// import { PrismaClient } from "@prisma/client";
import prisma from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
  id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IStoreApiResponse | IStore[] | IStore | null>,
) {
  const { page = "", limit = "", q, district, id }: ResponseType = req.query;
  // const prisma = new PrismaClient();
  const session = await getServerSession(req, res, authOptions);

  // POST 맛집 등록
  if (req.method === "POST") {
    // const data = req.body;
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    // https://developers.kakao.com/docs/latest/ko/local/dev-guide
    const { data }: any = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address,
      )}`,
      { headers },
    );

    const result = await prisma.store.create({
      // data: { ...data },
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });
    return res.status(200).json(result);

    // PUT 맛집 수정
  } else if (req.method === "PUT") {
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    // https://developers.kakao.com/docs/latest/ko/local/dev-guide
    const { data }: any = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address,
      )}`,
      { headers },
    );
    const result = await prisma.store.update({
      where: { id: formData.id },
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });
    return res.status(200).json(result);
  }
  // DELETE 맛집 삭제
  else if (req.method === "DELETE") {
    if (id) {
      const result = await prisma.store.delete({
        where: { id: parseInt(id) },
      });
      return res.status(200).json(result);
    }
    return res.status(500).json(null);
  } else {
    // GET
    if (page) {
      const skipPage = parseInt(page) - 1;
      const count = await prisma.store.count();
      const stores = await prisma.store.findMany({
        orderBy: { id: "asc" },
        where: {
          name: q ? { contains: q } : {},
          address: district ? { contains: district } : {},
        },
        take: parseInt(limit),
        skip: skipPage * 10,
      });

      res.status(200).json({
        page: parseInt(page),
        data: stores,
        totalCount: count,
        totalPage: Math.ceil(count / 10),
      });
    } else {
      // const session: any = await getServerSession(authOptions);
      const { id }: { id?: string } = req.query;
      const stores = await prisma.store.findMany({
        orderBy: { id: "asc" },
        where: {
          id: id ? parseInt(id) : {},
        },
        include: {
          likes: {
            where: session ? { userId: session.user.id } : {},
          },
        },
      });
      return res.status(200).json(id ? stores[0] : stores);
    }
  }
}
