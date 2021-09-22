import styled from "styled-components";
import PropTypes from "prop-types";

const InputContainer = styled.div`
  input {
    border: 1px solid ${(props) => props.borderColor};
    width: 100%;
    box-sizing: border-box;
    border-radius: ${(props) => props.roundedCorner && "5px"};
    margin-bottom: 10px;
    padding: 5px;
    height: 31px;
    text-align: left;
    margin-right: ${(props) => props.inputType === "tech" && "4px"};
    background-color: ${(props) => props.backgroundColor};
    font-size: 13px;

    @media (min-width: 3000px) {
      height: 40px;
      font-size: 16px;
    }
  }
`;

InputContainer.propTypes = {
  borderColor: PropTypes.string,
  roundedCorner: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

export default InputContainer;
