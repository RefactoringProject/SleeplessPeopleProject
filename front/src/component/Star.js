import { ImStarFull } from "react-icons/im";
import styled from "styled-components";

const Star = ({ handleStarChange, checked, starNum }) => {
  return (
    <StarContainer>
      {starNum.map((el, idx) => {
        return (
          <ImStarFull
            key={idx}
            onClick={() => handleStarChange(el)}
            className={checked[el] && "yellowStar"}
          />
        );
      })}
    </StarContainer>
  );
};

export default Star;

const StarContainer = styled.div`
  & svg {
    color: gray;
    cursor: pointer;
    font-size: 20px;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
