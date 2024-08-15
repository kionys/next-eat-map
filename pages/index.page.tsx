import Link from "next/link";
interface IGlobalNavigation {
  name: string;
  url: string;
}
export default function Home() {
  return (
    <div>
      <h1>Map index page</h1>
      <ul>
        {[
          { name: "맛집 목록", url: `/stores` },
          { name: "맛집 생성", url: `/stores/add` },
          { name: "맛집 상세 페이지", url: `/stores/1` },
          { name: "맛집 수정 페이지", url: `/stores/1/edit` },
          { name: "로그인 페이지", url: `/users/login` },
          { name: "마이페이지", url: `/users/mypage` },
          { name: "찜한 맛집", url: `/users/likes` },
        ].map((item: IGlobalNavigation, i: number) => {
          return (
            <li key={i}>
              <Link href={item.url}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
/**
 * Next.js Data Fetching
 *------------------------------
 * CSR (Client Side Rendering)  : 초기 로딩이 빠르지만 SEO가 어려우며, 클라이언트에서 데이터 로딩이 필요
 * Ex) SPA, 대시보드 및 관리 패널, 소셜 미디어 플랫폼, 라이브 스트리밍 및 실시간 업데이트 서비스
 *
 * SSR (Server Side Rendering)  : 초기 로딩이 빠르고 SEO가 우수하지만, 서버 부하가 증가할 수 있음
 * Ex) 뉴스 웹 사이트, 블로그, 전자 상거래 플랫폼 등
 *
 * SSG (Static Stie Generation) : 초기 로딩이 빠르고 SEO가 우수하며 서버 부하가 낮지만, 동적데이터에 제한이 있음
 * Ex) 블로그, 포트폴리오 웹 사이트, 회사 폼페이지 등 정적인 사이트에 이용
 */
