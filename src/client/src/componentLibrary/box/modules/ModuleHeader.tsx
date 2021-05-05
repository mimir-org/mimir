import styled from "styled-components";
import { FontType, FontSize } from "../../../componentLibrary";
import { MODULE_TYPE } from "../../../models/project";

const ModuleHeader = styled.div`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  text-align: center;
  padding-top: 5px;
  height: 25px;
  margin-left: ${(props) => (props.left ? 0 : 7)}px;
  margin-right: ${(props) => (props.right ? 0 : 7)}px;
  margin-top: ${(props: { type: string }) =>
    props.type === MODULE_TYPE.INSPECTOR ? "0px" : "22px"};
  margin-bottom: ${(props: { type: string }) =>
    props.type === MODULE_TYPE.INSPECTOR ? "0px" : "12px"};
  width: ${(props: { type: string }) =>
    props.type === MODULE_TYPE.INSPECTOR ? "154px" : "initial"};
  float: ${(props: { type: string }) =>
    props.type === MODULE_TYPE.INSPECTOR ? "right" : "none"};

  .text {
    position: relative;
    bottom: 18px;
    right: 107px;
    float: right;
  }
  .text_inspector {
    display: inline;
    vertical-align: top;
    margin-left: 5px;
  }
  .icon {
    cursor: pointer;
    float: ${(props) => (props.left ? "right" : "left")};
  }
  .icon_inspector {
    cursor: pointer;
    float: right;
    bottom: 25px;
    margin-top: 6px;
  }
`;

export default ModuleHeader;
