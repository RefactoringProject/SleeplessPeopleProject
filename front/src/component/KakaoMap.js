/* global kakao */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Page/Header";

const KaKaoMap = () => {
  const { kakao } = window;
  const info = useLocation();
  const location = info.state.data;
  let arr = [];
  const windowHeight = window.innerHeight;

  for (let i = 0; i < location.length; i++) {
    arr.push({
      name: location[i].name,
      latlng: new kakao.maps.LatLng(
        location[i].longitude,
        location[i].latitude
      ),
      lat: location[i].latitude,
      lng: location[i].longitude,
    });
  }

  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const imageSize = new kakao.maps.Size(24, 35);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  useEffect(() => {
    const container = document.getElementById("map");
    let lat;
    let lon;

    const displayMarker = (localPosition, message) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: localPosition,
        image: markerImage,
      });

      let markerMessage = message;
      let markerRemoveAble = true;

      const infoWindow = new kakao.maps.InfoWindow({
        content: markerMessage,
        removable: markerRemoveAble,
      });

      infoWindow.open(map, marker);
      map.setCenter(localPosition);
    };

    if (navigator.geolocation) {
      const handlePosition = (position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(position.coords);

        let locPosition = new kakao.maps.LatLng(lat, lon);
        let message = '<div style="padding:5px;">νμμΉ</div>';

        displayMarker(locPosition, message);
      };

      const handlePositionError = (err) => {
        console.log(err);
      };
      navigator.geolocation.getCurrentPosition(
        handlePosition,
        handlePositionError,
        { timeout: 10000 }
      );
    } else {
      var locPosition = new kakao.maps.LatLng(33.499655, 126.531362),
        message = "νμ¬ μμΉλ₯Ό μ μ μμ΄ κΈ°λ³Έ μμΉλ‘ μ΄λν©λλ€.";
      console.log("err");
      displayMarker(locPosition, message);
    }
    const options = {
      center: new kakao.maps.LatLng(35.85133, 127.734086),
      level: 5,
      marker: arr,
      text: arr.name,
    };

    const map = new kakao.maps.Map(container, options);

    for (let i = 0; i < arr.length; i++) {
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      let marker = new kakao.maps.Marker({
        map: map,
        position: arr[i].latlng,
        title: arr[i].name,
      });
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="Map" style={{ height: `${windowHeight}px` }}>
        <div className="MapContainer" id="map" style={{ height: "100%" }}></div>
      </div>
    </div>
  );
};

export default KaKaoMap;
