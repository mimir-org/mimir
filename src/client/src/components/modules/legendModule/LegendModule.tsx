import { LegendIcon } from "../../../assets";
import {
  LegendHeader,
  LegendIconWrapper,
  LegendContent,
  TransportWrapper,
  TransportColor,
} from "./styled";
import { SidebarWrapper } from "../libraryModule/styled";
import textResources from "../../../textResources";
interface Props {
  visible: boolean;
}

const LegendModule = ({ visible }: Props) => {
  return (
    <>
      <LegendHeader visible={visible}>
        <LegendIconWrapper>
          <img src={LegendIcon} alt="legend-icon" />
        </LegendIconWrapper>
        {textResources.Legend_Heading}
      </LegendHeader>
      <SidebarWrapper visible={visible}>
        <LegendContent>
          <TransportWrapper>
            <p>Gas export</p>
            <TransportColor color="F59D56"></TransportColor>
          </TransportWrapper>
        </LegendContent>
      </SidebarWrapper>
    </>
  );
};
export default LegendModule;
