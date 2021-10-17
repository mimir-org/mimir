import styled from "styled-components";

const SquareBox = styled.span`
  .squarecheckbox {
    display: flex;
    position: relative;
    cursor: pointer;
    margin: 0px 7px;
  }

  .squarecheckbox input {
    position: absolute;
    display: none;
  }

  .scheckmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 12px;
    width: 12px;
    background-color: transparent;
    border: 2px solid black;
    border-radius: 3px;
  }

  .squarecheckbox input:checked ~ .scheckmark {
    background-color: black;
  }

  .scheckmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .squarecheckbox input:checked ~ .scheckmark:after {
    display: block;
  }

  .squarecheckbox .scheckmark:after {
    left: 3.8px;
    top: 0.7px;
    width: 2px;
    height: 7px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .label {
    margin-left: 25px;
    white-space: nowrap;
  }

  label:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default SquareBox;
