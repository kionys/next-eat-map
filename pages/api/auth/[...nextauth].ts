import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import prisma from "db";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

// const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as const, // jwt 기반의 session을 사용
    maxAge: 60 * 60 * 24, // 24시간으로 설정
    updateAge: 60 * 60 * 2, // session 업데이트 주기, 2시간으로 설정
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true, // 계정간 이메일 값이 동일할 경우 예외처리 | https://next-auth.js.org/configuration/providers/oauth#allowdangerousemailaccountlinking-option
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/users/login", // signIn 함수를 실행하면 /users/login로 리다이렉트 시킨다.
  },
};
export default NextAuth(authOptions);
