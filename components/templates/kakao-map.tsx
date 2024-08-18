/*global kakao */
import stores from "@core/data/store_data.json";
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
      level: 5,
    };

    // 지도 띄우기
    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    // 식당 데이터 마커 띄우기
    /** https://data.seoul.go.kr/dataList/OA-2741/S/1/datasetView.do */
    stores?.DATA?.map(store => {
      let imageSrc = store?.bizcnd_code_nm
          ? `/images/markers/${store?.bizcnd_code_nm}.png`
          : "/images/markers/default.png",
        imageSize = new window.kakao.maps.Size(40, 40),
        imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      let markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      // 마커가 표시될 위치
      let markerPosition = new window.kakao.maps.LatLng(
        store?.y_dnts,
        store?.x_cnts,
      );

      // 마커를 생성
      let marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(map);
    });
  });
};
