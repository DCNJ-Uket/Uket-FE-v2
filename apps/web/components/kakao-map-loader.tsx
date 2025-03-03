/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import { useCustomMap } from "../hooks/use-custom-map";

interface KakaoMapLoaderProps {
  eventLocation: string | undefined;
}

// TODO: 맵 로드 error 처리
export default function KakaoMapLoader({ eventLocation }: KakaoMapLoaderProps) {
  const [error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY!,
    libraries: ["services", "clusterer"],
  });

  const { marker, position, locationName, initializeMap } = useCustomMap({
    location: eventLocation,
  });

  return (
    <Map
      id="map"
      center={{ lat: 33.5563, lng: 126.79581 }}
      className="h-60 w-full rounded-lg shadow-md sm:h-80 lg:h-96"
      onCreate={initializeMap}
    >
      {marker && position && (
        <>
          <MapMarker
            position={position}
            image={{
              src: "/marker.png",
              size: {
                width: 25,
                height: 35,
              },
            }}
          />
          <CustomOverlayMap position={position} yAnchor={2.2} xAnchor={1}>
            <div className="customoverlay truncate rounded-full bg-brand/70 p-2 text-xs text-white">
              <a
                href={`https://map.kakao.com/link/map/${locationName},${marker.position.lat},${marker.position.lng}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>{locationName}</span>
              </a>
            </div>
          </CustomOverlayMap>
        </>
      )}
    </Map>
  );
}
