/*global kakao */
import Script from "next/script";

const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`;

declare global {
  interface Window {
    kakao: any;
  }
}

export const KakaoMap = () => {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      new window.kakao.maps.Map(mapContainer, mapOption);
    });
  };
  return (
    <>
      <Script
        type="text/javascript"
        src={KAKAO_MAP_API_URL}
        strategy="afterInteractive"
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen" />
    </>
  );
};
