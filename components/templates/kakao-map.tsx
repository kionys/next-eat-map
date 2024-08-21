/*global kakao */
import Script from "next/script";
import { Dispatch, SetStateAction } from "react";

const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`;
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;
const DEFAULT_ZOOM = 5;

declare global {
  interface Window {
    kakao: any;
  }
}

interface IPropsMap {
  setMap: Dispatch<SetStateAction<kakao.maps.Map | null>>;
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export const KakaoMap = ({ setMap, lat, lng, zoom }: IPropsMap) => {
  const loadKakaoMap = () => {
    // 지도 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat ?? DEFAULT_LAT,
          lng ?? DEFAULT_LNG,
        ),
        level: zoom ?? DEFAULT_ZOOM,
      };

      // 지도 띄우기
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      setMap(map); // Map 객체를 설정
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
