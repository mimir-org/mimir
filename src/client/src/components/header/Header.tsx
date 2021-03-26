import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import textResources from "../../textResources";
import { TreeviewIcon, BlockviewIcon } from "../../assets/index";
import { TitleWrapper, BlockviewWrapper, TreeviewWrapper } from "./styled";

const Header = () => {
  const { push } = useHistory();

  return (
    <AppBar className="appbar">
      <Toolbar>
        <TitleWrapper>
          <Typography>{textResources.MainHeader_App_Name}</Typography>
        </TitleWrapper>

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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
