import styled from "styled-components";
import SymbolImage from "../../../../../compLibrary/symbol/styled/SymbolImage";

const SymbolBox = styled.div`
  max-height: 30px;
  
  ${SymbolImage} {
    min-height: 30px;
  }
`;

export default SymbolBox;
