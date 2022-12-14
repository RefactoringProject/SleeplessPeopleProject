import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiStarFill } from "react-icons/ri";

import Header from "./Header";
import Button from "../component/Button";

const ReviewDetail = () => {
  const [reviewData, setReviewData] = useState(null);
  const {
    state: { reviewInfo },
  } = useLocation();

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}/v1/review/${reviewInfo}`,
    }).then((data) => {
      console.log(data.data);
      setReviewData(data.data);
    });
  }, []);

  const handleDeleteReview = () => {
    alert("삭제할 수 없습니다.");
  };

  if (reviewData === null) {
    return;
  }

  return (
    <>
      <Header />
      <ReviewDetailInfo>
        <div>
          <img src={reviewData.images} alt="alt" />
        </div>
        <div className="storeName">상호</div>
        <div className="storeInfoName">{reviewData.shopName}</div>
        <div>일시</div>
        <div className="date">{reviewData.createAt}</div>
        <div reviewInfo="opened">장소가 열려 있었나요?</div>
        <div>
          {reviewData.openCheck ? (
            <div className="btnFlex">
              <Button buttonStyle="main" width="150px">
                예
              </Button>
              <Button buttonStyle="sub" width="150px">
                아니오
              </Button>
            </div>
          ) : (
            <div className="btnFlex">
              <Button buttonStyle="sub" width="150px">
                예
              </Button>
              <Button buttonStyle="main" width="150px">
                아니오
              </Button>
            </div>
          )}
        </div>
        <div>별점</div>
        <div>
          <RiStarFill className="star" />
          {reviewData.rating} 점
        </div>
        <div className="reviewTxt">후기</div>
        <pre className="reviewInfoTxt">{reviewData.content}</pre>
        <Button buttonStyle="main">
          <Link
            to="/reviewCorrection"
            state={{
              reviewData: reviewData,
            }}
          >
            수정하기
          </Link>
        </Button>
        <Button
          buttonStyle="main"
          className="delete"
          onClick={handleDeleteReview}
        >
          삭제하기
        </Button>
      </ReviewDetailInfo>
    </>
  );
};

export default ReviewDetail;

const ReviewDetailInfo = styled.main`
  color: white;
  margin-top: 20px;
  .storeName {
    margin: 10px 0;
  }
  .storeInfoName {
    color: #ffc700;
    margin-bottom: 10px;
  }
  .date {
    color: #ffc700;
    margin: 10px 0;
  }
  .opened:after {
    content: "*";
    color: red;
  }
  .btnFlex {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .reviewTxt {
    margin: 10px 0;
  }
  .reviewInfoTxt {
    border: 1px solid white;
    height: 200px;
    padding: 5px;
    margin-bottom: 20px;
  }
  .delete {
    margin: 20px 0;
  }
  .star {
    color: #ffc700;
    margin-right: 5px;
  }
`;
