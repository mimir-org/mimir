import styled from "styled-components";
import { Color } from "./../../../componentLibrary";

const ModuleBody = styled.div`
  float: ${(props) => (props.explorer ? "right" : "left")};
  width: 331px;
  opacity: ${(props: { visible: boolean }) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  position: ${(props) => (props.legend ? "absolute" : "initial")};
  bottom: ${(props) => (props.legend ? "0" : "initial")};
  height: ${(props) => (props.legend ? "30%" : "initial")};
  border-top: ${(props) => (props.legend ? `1px solid ${Color.Grey}` : "0")};
  margin-bottom: ${(props) => (props.legend ? "20px" : "0")};
  overflow-y: ${(props) => (props.legend ? "auto" : "none")};
  position: ${(props) => (props.legend ? "absolute" : "initial")};

  ::-webkit-scrollbar {
    width: 14px;
    height: 18px;
  }
  ::-webkit-scrollbar-thumb {
    height: 6px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 7px;
    -webkit-border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
      inset 1px 1px 0px rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
      inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }
`;

export default ModuleBody;
