import { axios } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AxiosStore = () => {
  const [storeItemDetail, setStoreItemDetail] = useState(null);
  const {
    state: { storeData },
  } = useLocation();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/v1/shop/${storeData}`)
      .then((data) => {
        setStoreItemDetail(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [storeItemDetail, storeData]);

  return;
};

/*
    통신 관련해서 값들이 전부 페이지마다 각자 작동이 되는 방식으로 되어있어 상당히 헷갈림.

    파일을 어느정도 분리한 후,
    상태관리 라이브러리로 값들을 처리해줄것.
*/

export default AxiosStore;
