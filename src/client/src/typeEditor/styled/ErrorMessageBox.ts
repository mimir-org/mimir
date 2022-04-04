import styled from "styled-components";
import { Color } from "../../compLibrary/colors/Color";
import { FontSize } from "../../compLibrary/font";

const ErrorMessageBox = styled.div`
  margin: auto;
  margin-top: 15px;
  width: 270px;
  display: flex;
  flex-direction: column;
  align-items: left;
  border: 2px solid ${Color.BASTILLE};
  font-size: ${FontSize.STANDARD};
  line-height: 1.5;
  padding: 10px 20px;
  box-shadow: -1px 4px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;

  .icon {
    position: relative;
    display: inline-block;
    left: 265px;
    top: -4px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .message {
    margin-top: 0px;
    margin-bottom: 12px;
  }
`;

export default ErrorMessageBox;
