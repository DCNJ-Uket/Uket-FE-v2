/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  eventLocation?: string | undefined;
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

// TODO: 맵 로드 error 처리
export default function KakaoMap({ eventLocation }: KakaoMapProps) {
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);
  const [marker, setMarker] = useState<Marker>({
    position: {
      lat: 0,
      lng: 0,
    },
  });
  const [locationName, setLocationName] = useState<string>();

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.defer = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services,clusterer&autoload=false`;
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(eventLocation, (data: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            setLocationName(data[0]?.place_name);
          }
        });

        geocoder.addressSearch(
          eventLocation,
          function (result: any, status: any) {
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
            }
          },
        );
      });
    });
  }, [eventLocation]);

  return (
    <div>
      {scriptLoad ? (
        <Map
          id="map"
          center={marker?.position}
          className="h-60 w-full rounded-lg shadow-md sm:h-80 lg:h-96"
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
        <div></div>
      )}
    </div>
  );
}
