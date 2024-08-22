/*global kakao */
import { locationState, mapState } from "atom";
import Script from "next/script";
import { useRecoilValue, useSetRecoilState } from "recoil";

const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`;

declare global {
  interface Window {
    kakao: any;
  }
}

interface IPropsMap {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export const KakaoMap = ({ lat, lng, zoom }: IPropsMap) => {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    // 지도 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat ?? location.lat,
          lng ?? location.lng,
        ),
        level: zoom ?? location.zoom,
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
