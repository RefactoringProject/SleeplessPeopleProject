import styled from "styled-components";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Image from "../component/Image";
import Button from "../component/Button";
import localList from "../DummyData/localList";

const Registration = () => {
  const { kakao } = window;
  const [address, setAddress] = useState();
  const [imageData, setImageData] = useState([]);
  const [addressLocation, setAddressLocation] = useState(null);
  const [filter, setFilter] = useState({ cityId: null, areaId: null });

  const navigate = useNavigate();
  const storeNumber = useRef();
  const storeName = useRef();
  const storeAddress = useRef();
  const storeInfo = useRef();
  const storeType = useRef();

  const name = storeName.current;
  const number = storeNumber.current;
  const info = storeInfo.current;
  const type = storeType.current;
  const ffffff = localList.filter((local) => local.id === filter.cityId)[0]
    ?.area;

  const handleAddressValue = (event) => {
    setAddress(event.target.value);
  };
  const handleCheckAddress = () => {
    let geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(`${address}`, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setAddressLocation(coords);
        alert(`${address} 가 맞나요?`);
      } else {
        alert("주소를 확인해 주세요 !");
        console.log("address err");
      }
    });
  };

  const handleCreateRegistration = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL_API}/v1/shop`,
      data: {
        memberId: 1,
        category: type.value,
        businessNumber: number.value,
        name: name.value,
        address: address,
        cityId: filter.cityId,
        areaId: filter.areaId,
        detail: info.value,
        longitude: addressLocation.Ma,
        latitude: addressLocation.La,
        imageList: imageData[0],
      },
    }).catch((err) => console.log(err));
    navigate("/");
  };

  return (
    <>
      <Header />
      <RegistrationContainer>
        <label htmlFor="category">카테고리</label>
        <select id="category" ref={storeType}>
          <option>선택해 주세요</option>
          <option>음식점</option>
          <option>카페</option>
          <option>동물병원</option>
          <option>약국</option>
          <option>병원</option>
          <option>노래방</option>
          <option>세탁방</option>
          <option>편의점</option>
          <option>pc방</option>
          <option>주유소</option>
          <option>무인 판매점</option>
          <option>기타 등등</option>
        </select>
        <label htmlFor="registrationNumber">사업자 등록번호</label>
        <input
          placeholder="- 없이 숫자만 작성해 주세요"
          id="registrationNumber"
          ref={storeNumber}
        />
        <button className="registrationCheckBtn">확인하기</button>
        <label htmlFor="registrationName">사업장 이름</label>
        <input id="registrationName" ref={storeName} />
        <label htmlFor="registrationAddress">사업장 주소</label>
        <select
          className="locationFilterOption"
          onChange={(e) => setFilter({ ...filter, cityId: e.target.value })}
        >
          <option>선택해 주세요</option>
          {localList.map((post, idx) => {
            return (
              <option className="buttonStyle" key={idx} value={post.id}>
                {post.city}
              </option>
            );
          })}
        </select>
        <select
          className="locationFilterOption"
          onChange={(e) =>
            setFilter({ ...filter, areaId: e.target.value.slice(2, 5) })
          }
        >
          {filter.cityId == null
            ? null
            : ffffff.map((post) => {
                return (
                  <option className="buttonStyle" value={post.id}>
                    {post.name}
                  </option>
                );
              })}
        </select>
        <input
          id="registrationAddress"
          ref={storeAddress}
          placeholder="상세주소를 입력해주세요"
          onChange={(event) => handleAddressValue(event)}
        />
        <Button
          className="registrationAddressCheck"
          buttonStyle="main"
          width="60px"
          onClick={handleCheckAddress}
        >
          확인하기
        </Button>
        <label htmlFor="registrationTxt">상세 설명</label>
        <textarea id="registrationTxt" ref={storeInfo} />
        <label htmlFor="imageUpload">이미지</label>
        <Image TYPE="SHOP" imageData={imageData} setImageData={setImageData} />
        <Button buttonStyle="main" onClick={handleCreateRegistration}>
          등록하기
        </Button>
      </RegistrationContainer>
      ;
    </>
  );
};

export default Registration;

const RegistrationContainer = styled.main`
  padding: 0px 24px;
  height: 2000px;
  label {
    display: block;
    color: white;
    margin: 20px 0 10px;
  }
  label::after {
    content: "*";
    color: red;
  }
  select {
    background-color: #76736e;
    color: white;
    width: 70%;
    padding: 10px 5px;
  }
  option {
    color: white;
    background-color: #76736e;
  }
  input {
    padding: 10px 5px;
    width: 70%;
    border: #76736e;
    color: white;
    background-color: #76736e;
  }
  .registrationAddressCheck {
    margin-left: 10px;
    font-size: 10px;
    font-weight: bold;
    padding: 10px;
    border-radius: 3px;
    border: none;
    background-color: var(--mainYellow);
  }
  .registrationCheckBtn {
    margin-left: 10px;
    font-size: 10px;
    font-weight: bold;
    padding: 10px;
    border-radius: 3px;
    background-color: var(--mainYellow);
  }
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px 5px;
    border: #76736e;
    background-color: #76736e;
    color: white;
  }
  .locationFilterOption {
    margin-bottom: 10px;
    padding: 10px 5px;
  }
`;
