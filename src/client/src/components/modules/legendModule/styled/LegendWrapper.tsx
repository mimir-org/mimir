import styled from "styled-components";
import { Color } from "../../../../componentLibrary";

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 45%;
  border-top: ${(props: { visible: boolean }) =>
    props.visible ? `1px solid ${Color.Grey}` : "none"};
`;

export default LegendWrapper;
