/*global kakao */
import * as stores from "@core/data/store_data.json";
import Script from "next/script";

const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`;
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;
declare global {
  interface Window {
    kakao: any;
  }
}

export const KakaoMap = () => {
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

const loadKakaoMap = () => {
  // 지도 로드
  window.kakao.maps.load(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
      level: 3,
    };

    // 지도 띄우기
    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    // 식당 데이터 마커 띄우기
    stores?.DATA?.map(store => {
      // 마커가 표시될 위치
      var markerPosition = new window.kakao.maps.LatLng(
        store?.y_dnts,
        store?.x_cnts,
      );

      // 마커를 생성
      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(map);
    });
  });
};
