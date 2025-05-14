/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LoaderCircleIcon } from "@ui/components/ui/icon";
import { useCallback, useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  location?: string | undefined;
}

declare global {
  interface Window {
    kakao: any;
  }
}

type Marker = {
  position: {
    lat: number;
    lng: number;
  };
};

export default function KakaoMap({ location }: KakaoMapProps) {
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [marker, setMarker] = useState<Marker>({
    position: {
      lat: 0,
      lng: 0,
    },
  });
  const [locationName, setLocationName] = useState<string>();

  const handleLoadScript = useCallback(() => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(location, (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setLocationName(data[0]?.place_name);
        }
      });

      geocoder.addressSearch(location, function (result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          const coords = new window.kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x),
          );

          const locationMarker = {
            position: {
              lat: coords.getLat(),
              lng: coords.getLng(),
            },
          };
          bounds.extend(coords);
          setMarker(locationMarker);
          setScriptLoad(true);
          setIsLoading(false);
        }
      });
    });
  }, [location]);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.defer = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services,clusterer&autoload=false`;
    document.body.appendChild(script);

    script.addEventListener("load", handleLoadScript);
  }, [location, handleLoadScript]);

  return (
    <div>
      {scriptLoad ? (
        <Map
          id="map"
          center={marker?.position}
          className="h-60 w-full rounded-lg shadow-md lg:h-96"
          level={3}
        >
          <MapMarker
            position={marker.position}
            image={{
              src: "/marker.png",
              size: {
                width: 25,
                height: 35,
              },
            }}
          />
          <CustomOverlayMap
            position={marker.position}
            yAnchor={2.2}
            xAnchor={1}
          >
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
        </Map>
      ) : (
        <>
          {isLoading ? (
            <div className="h-60 w-full rounded-lg shadow-md sm:h-80 lg:h-96 flex justify-center items-center">
              <LoaderCircleIcon className="animate-spin" />
            </div>
          ) : (
            <div className="h-60 w-full rounded-lg shadow-md sm:h-80 lg:h-96 flex justify-center items-center flex-col text-desc text-sm">
              <p>지도를 불러오는 중 오류가 발생했어요.</p>
              <p>새로고침 해주세요.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
