"use client";

import { useEffect, useState } from "react";

type Marker = {
  position: {
    lat: number;
    lng: number;
  };
};

export const useCustomMap = ({
  location,
}: {
  location: string | undefined;
}) => {
  const [marker, setMarker] = useState<Marker>();
  const [map, setMap] = useState<kakao.maps.Map>();
  const [locationName, setLocationName] = useState<string>();

  useEffect(() => {
    if (!map || !location) return;
    const geocoder = new kakao.maps.services.Geocoder();
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(location, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setLocationName(data[0]?.place_name);
      }
    });

    geocoder.addressSearch(location, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const coords = new kakao.maps.LatLng(
          Number(result[0]?.y),
          Number(result[0]?.x),
        );

        const locationMarker = {
          position: {
            lat: coords.getLat(),
            lng: coords.getLng(),
          },
        };

        bounds.extend(coords);
        setMarker(locationMarker);

        map.setBounds(bounds);
      }
    });
  }, [map, location]);

  return {
    marker,
    position: marker?.position,
    locationName,
    initializeMap: setMap,
  };
};
