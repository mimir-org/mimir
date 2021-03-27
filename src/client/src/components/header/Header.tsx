import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import textResources from "../../textResources";
import {
  TreeviewIcon,
  BlockviewIcon,
  VisualFilterIcon,
  SwitchOnIcon,
  SwitchOffIcon,
} from "../../assets/index";
import {
  TextWrapper,
  BlockviewWrapper,
  TreeviewWrapper,
  VisualIconWrapper,
  TitleWrapper,
  IconsWrapper,
  SwitchWrapper,
} from "./styled";

const Header = () => {
  const { push } = useHistory();

  return (
    <AppBar className="appbar">
      <Toolbar>
        <TitleWrapper>
          <Typography>{textResources.MainHeader_App_Name}</Typography>
        </TitleWrapper>

        <IconsWrapper>
          <TreeviewWrapper>
            <img
              src={TreeviewIcon}
              alt="treeview"
              onClick={() => push("/home/treeview")}
            />
          </TreeviewWrapper>
          <BlockviewWrapper>
            <img
              src={BlockviewIcon}
              alt="blockview"
              onClick={() => push("/home/diagram")}
            />
          </BlockviewWrapper>
          <SwitchWrapper>
            <img src={SwitchOnIcon} alt="switchicon" onClick={() => null} />
          </SwitchWrapper>
        </IconsWrapper>

        <VisualIconWrapper>
          <img src={VisualFilterIcon} alt="visualfilter" onClick={() => null} />
        </VisualIconWrapper>
        <TextWrapper>
          <Typography>{textResources.MainHeader_VisualFilter}</Typography>
        </TextWrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
