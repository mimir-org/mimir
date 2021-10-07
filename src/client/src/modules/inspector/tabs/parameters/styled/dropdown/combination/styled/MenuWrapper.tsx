import styled from "styled-components";
import { Color, FontSize } from "../../../../../../../../compLibrary";

const MenuWrapper = styled.div`
  position: relative;
  margin-top: -46px;
  width: 250px;
  left: 20px;
  height: 250px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  .label {
    margin-bottom: 4px;
  }

  .tooltipText {
    display: flex;
    //visibility: hidden;
    width: auto;
    height: 15px;

    font-size: ${FontSize.ToolTip};
    background-color: ${Color.GreyInspector};

    border: 1px solid ${Color.Black};
    box-shadow: 1px 1px ${Color.Black};

    text-align: center;
    padding: 2px;

    position: absolute;
    z-index: 10;
    right: 30px;

    transition: 2s all ease;
    transition-delay: 0s;

    span {
      margin: auto;
    }
  }
`;

export default MenuWrapper;
