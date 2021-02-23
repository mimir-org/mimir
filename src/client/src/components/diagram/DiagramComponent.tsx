import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

import { getWorkspace } from "../../store/workspace/actions";
import { WorkspaceState } from "../../store/workspace/types";
import { WorkspaceComponent } from "..";
import { RootState } from "./../../store/index";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: any;
//   value: any;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: any) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

const DiagramComponent = () => {

  // const [value, setValue] = React.useState(0);

  const workspaceState = useSelector<RootState>(
    (state) => state.workspace
  ) as WorkspaceState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspace());
  }, [dispatch]);

  

  // const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
  //   setValue(newValue);
  // };

  return (
    <div className='diagram'>
     {/* <AppBar position="static" className='app-bar'>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Level 0" {...a11yProps(0)} />
          <Tab label="Level 1" {...a11yProps(1)} />
          <Tab label="Level 2" {...a11yProps(2)} />
        </Tabs>
      </AppBar> 
      <TabPanel value={value} index={0}> */}
      {workspaceState &&
        workspaceState.workspace &&
        !workspaceState.fetching && (
          <WorkspaceComponent
            root={workspaceState.workspace.root}
            aspects={workspaceState.workspace.aspects}            
          />
        )}
      {/* </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </div>
  );
};

export default DiagramComponent;
