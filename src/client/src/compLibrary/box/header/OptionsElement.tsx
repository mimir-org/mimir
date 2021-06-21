import styled from "styled-components";

const OptionsElement = styled.div`
  cursor: pointer;
  position: absolute;
  display: inline-block;

  &:first-child {
    margin-left: 51px;
  }

  &:nth-child(2) {
    margin-left: 119px;
  }

  &:last-child {
    margin-left: 187px;
  }
`;
export default OptionsElement;