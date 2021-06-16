import styled from "styled-components";
import { SelectDownIcon } from "../../assets/icons/common";

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
  background-image: url(${SelectDownIcon});
  background-size: 18px 18px;
  background-position-x: 97%;
  background-position-y: 5px;
  background-repeat: no-repeat;

  option {
    display: flex;
    white-space: pre;
    min-height: 10px;
    padding: 0px 2px 1px 0px;
  }
`;

export default Select;
