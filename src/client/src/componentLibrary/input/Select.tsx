import styled from "styled-components";

const Select = styled.select`
  border: 1px solid #898787;
  border-radius: 5px;
  width: 100%;
  height: 31px;
  margin-bottom: 10px;
  padding: 5px;
  display: inline-block;
  font: inherit;
  font-size: 14px;
  padding-right: 40px;

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: linear-gradient(45deg, transparent 50%, #007079 50%),
    linear-gradient(135deg, #007079 50%, transparent 50%);
  background-position: calc(100% - 14px) calc(1em + -3px),
    calc(100% - 6px) calc(1em + -3px), 100% 0;
  background-size: 8px 8px, 8px 8px, 2.5em 2.5em;
  background-repeat: no-repeat;

  margin-bottom: 10px;

  option {
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export default Select;
