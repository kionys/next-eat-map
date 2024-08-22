import { IStore } from "@core/interfaces/store";
import { mapState } from "atom";
import { useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";

interface IPropsMarker {
  store: IStore;
}
export const KakaoMarker = ({ store }: IPropsMarker) => {
  const map = useRecoilValue(mapState);
  const loadKakaoMarker = useCallback(() => {
    if (map && store) {
      // 현재 선택한 식당 데이터 마커 하나만 띄우기
      let imageSrc = store?.category
          ? `/images/markers/${store?.category}.png`
          : "/images/markers/default.png",
        imageSize = new window.kakao.maps.Size(40, 40),
        imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      let markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      // 마커가 표시될 위치
      let markerPosition = new window.kakao.maps.LatLng(store?.lat, store?.lng);

      // 마커를 생성
      let marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(map);

      // 마커 커서가 오버되었을 때 마커 위에 표시할 인포윈도우 생성
      let content = `<div class="infowindow">${store?.name}</div>`; // 인포윈도우에 표시될 내용

      let customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });

      //   마커에 마우스오버 이벤트를 등록한다.
      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커 위에 표시한다.
        customOverlay.setMap(map); // map 객체를 사용하여 오버레이를 지도에 추가
      });

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거한다.
        customOverlay.setMap(null); // 오버레이 제거 시에는 null 사용
      });
    }
  }, [map, store]);

  useEffect(() => {
    loadKakaoMarker();
  }, [loadKakaoMarker, map]);
  return null;
};
