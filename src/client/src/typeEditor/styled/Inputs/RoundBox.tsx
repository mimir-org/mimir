import styled from "styled-components";

const RoundBox = styled.span`
  .roundcheckbox {
    display: flex;
    position: relative;
    cursor: pointer;
    margin: 0px 7px;
  }

  input {
    position: absolute;
    display: none;
  }

  .checked {
    position: absolute;
    top: 0;
    left: 0;
    height: 12px;
    width: 12px;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
  }

  .checked:after {
    content: "";
    position: absolute;
    display: none;
  }

  .roundcheckbox input:checked ~ .checked:after {
    display: block;
  }

  .roundcheckbox .checked:after {
    position: relative;
    top: 2.3px;
    left: 2.3px;
    height: 5.5px;
    width: 5.5px;
    background-color: black;
    border: 1px solid black;
    border-radius: 10px;
  }
`;

export default RoundBox;
