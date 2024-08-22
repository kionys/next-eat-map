// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
/**
 ** Description **
 * 개발 중에 이 명령은 next dev실행 시 Node.js 캐시를 지웁니다.
 * 그러면 PrismaClient핫 리로딩으로 인해 매번 새 인스턴스가 초기화되어 데이터베이스에 대한 연결이 생성됩니다.
 * 각 PrismaClient인스턴스가 자체 연결 풀을 보유하기 때문에 데이터베이스 연결이 빠르게 소진될 수 있습니다.
 * --
 * 이 경우 솔루션은 단일 인스턴스를 인스턴스화 PrismaClient하고 저장하는 것 입니다.
 * globalThis PrismaClient객체. 그런 다음 객체에 없는 경우 에만 인스턴스화하도록 체크하고,
 * globalThis그렇지 않으면 이미 있는 경우 동일한 인스턴스를 다시 사용하여 추가 인스턴스화 PrismaClient를 방지합니다.
 */
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
