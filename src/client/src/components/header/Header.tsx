import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import textResources from "../../textResources";
import {
  TreeviewIcon,
  BlockviewIcon,
  VisualFilterIcon,
} from "../../assets/index";
import {
  TextWrapper,
  BlockviewWrapper,
  TreeviewWrapper,
  VisualFilterWrapper,
} from "./styled";

const Header = () => {
  const { push } = useHistory();

  return (
    <AppBar className="appbar">
      <Toolbar>
        <TextWrapper target="title">
          <Typography>{textResources.MainHeader_App_Name}</Typography>
        </TextWrapper>

        <BlockviewWrapper>
          <img
            src={BlockviewIcon}
            alt="blockview"
            onClick={() => push("/home/diagram")}
          />
        </BlockviewWrapper>

        <TreeviewWrapper>
          <img
            src={TreeviewIcon}
            alt="treeview"
            onClick={() => push("/home/treeview")}
          />
        </TreeviewWrapper>

        <VisualFilterWrapper>
          <img src={VisualFilterIcon} alt="visualfilter" onClick={() => null} />
        </VisualFilterWrapper>
        <TextWrapper target="visual">
          <Typography>{textResources.MainHeader_VisualFilter}</Typography>
        </TextWrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
