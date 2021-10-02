import styled from "styled-components";
import { Color } from "../..";

const OptionsElement = styled.div`
  cursor: pointer;
  position: absolute;
  display: inline;
  border-left: 1px solid ${Color.Grey};
  border-right: 1px solid ${Color.Grey};
  padding: 12px;
  top: -59px;
  right: -200px;
  height: 15px;
  width: 40px;
  text-align: center;
  transition: right 0.3s ease-in-out;

  &:first-child {
    right: -282px;
    border-right: none;
    border-left: none;
  }

  &:nth-child(2) {
    right: -218px;
    border-left: none;
  }

  &:nth-child(3) {
    right: -154px;
    border-left: none;
  }

  &:last-child {
    right: -90px;
  }
`;
export default OptionsElement;
