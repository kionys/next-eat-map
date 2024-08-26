import { CurrentLocationButton } from "@components/elements/current-location-button";
import { IStore } from "@core/interfaces/store";
import axios from "axios";
import { KakaoMap } from "components/templates/kakao-map";
import { KakaoMarkers } from "components/templates/kakao-markers";
import { StoreBox } from "components/templates/store-box";
import { GetServerSideProps } from "next";

const Home = ({ stores }: { stores: IStore[] }) => {
  return (
    <>
      <KakaoMap />
      <KakaoMarkers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </>
  );
};
export default Home;

// export const getStaticProps: GetStaticProps = async () => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/api/stores`;
//   const stores = await axios({ method: "GET", url: url });

//   return {
//     props: { stores: stores.data },
//     revalidate: 60 * 60,
//   };
// };

export const getServerSideProps: GetServerSideProps = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/stores`;

  try {
    const response = await axios.get(url);
    return {
      props: { stores: response.data },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { stores: [] },
    };
  }
};
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
