import { accountMenuSelector, flowViewSelector, useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useRef } from "react";
import { InspectorModule } from "../../modules/inspector";
import { LibraryModule } from "../../modules/library";
import { AccountMenu } from "../menus/accountMenu";
import { getUser } from "../../redux/store/user/actions";
import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../flow";
import { ErrorModule } from "../../modules/error";
import { TypeEditorComponent } from "../../typeEditor";
import { getContractors, getStatuses, getAttributeFilters, getParsers } from "../../redux/store/common/actions";
import { importLibraryInterfaceTypes, importLibraryTransportTypes, searchLibrary } from "../../redux/store/library/actions";
import { getBlobData } from "../../typeEditor/redux/actions";

/**
 * The main component for Mimir
 * @returns a JSX Element containing all the modules and components.
 */
const Home = () => {
  const dispatch = useAppDispatch();
  const accountMenuOpen = useAppSelector(accountMenuSelector);
  const flowView = useAppSelector(flowViewSelector);
  const inspectorRef = useRef(null);

  useEffect(() => {
    dispatch(importLibraryInterfaceTypes());
    dispatch(importLibraryTransportTypes());
    dispatch(search(""));
    dispatch(searchLibrary(""));
    dispatch(getUser());
    dispatch(getContractors());
    dispatch(getParsers());
    dispatch(getStatuses());
    dispatch(getAttributeFilters());
    dispatch(getBlobData());
  }, [dispatch]);

  return (
    <>
      {accountMenuOpen && <AccountMenu />}
      <FlowModule inspectorRef={inspectorRef} flowView={flowView} />
      <InspectorModule inspectorRef={inspectorRef} />
      <LibraryModule />
      <TypeEditorComponent />
      <ErrorModule />
    </>
  );
};

export default Home;
