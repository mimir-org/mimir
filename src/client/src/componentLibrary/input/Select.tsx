import styled from "styled-components";
import { ToggleDown } from "../../assets/icons";

const Select = styled.select`
  border: 1px solid #898787;
  border-radius: 5px;
  width: 50%;
  height: 31px;
  padding: 5px;
  padding-right: 40px;
  margin-bottom: 10px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(${ToggleDown});
  background-size: 12px 12px;
  background-position-x: 95%;
  background-position-y: 8px;
  background-repeat: no-repeat;

  /* option {
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  } */
`;

export default Select;
