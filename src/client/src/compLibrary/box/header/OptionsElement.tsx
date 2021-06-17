import styled from "styled-components";

const OptionsElement = styled.div`
  cursor: pointer;
  position: absolute;
  display: inline-block;

  &:first-child {
    margin-left: 25px;
  }

  &:nth-child(2) {
    margin-left: 85px;
  }

  &:last-child {
    margin-left: 145px;
  }
`;
export default OptionsElement;
