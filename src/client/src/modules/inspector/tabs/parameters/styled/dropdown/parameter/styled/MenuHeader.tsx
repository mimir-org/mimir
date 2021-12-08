import styled from "styled-components";
import { Color } from "../../../../../../../../compLibrary/colors";
import { FontSize } from "../../../../../../../../compLibrary/font";

const MenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  background: ${Color.White};
  border: 1px solid ${Color.Black};
  border-radius: 5px;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  img {
    margin-right: 4px;
    padding: 5px;
  }
  
  .searchText {
    margin: 0;
    padding: 10px;
    opacity: 0.5;
    font-style: italic;
  }
`;

export default MenuHeader;
