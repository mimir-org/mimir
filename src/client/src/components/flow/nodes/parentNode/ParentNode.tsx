import { FC, memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AspectObject, ViewType } from "lib";
import { FlowNodeComponent, FlowConnector, FlowHandle } from "@mimirorg/component-library";
import { companySelector, useAppSelector } from "store";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";

const ParentNode: FC<NodeProps<AspectObject>> = ({ data }) => {
  const company = useAppSelector<MimirorgCompanyCm>(companySelector);

  const connectors = data.getTerminals();
  const flowConnectors = connectors.map((x) => {
    const handles = x.getFlowtHandles(data.aspect, ViewType.Block);
    const flowConnector: FlowConnector = {
      id: x.id,
      handles: handles.map((h) => {
        const handle: FlowHandle = {
          id: h.id,
          connectorId: x.id,
          position: h.position,
          handleType: h.handleType,
          side: h.side,
          hidden: false,
          visible: x.selected,
          className: h.className,
          color: x.getColor(),
        };
        return handle;
      }),
      hidden: false,
      visible: true,
      direction: x.direction,
    };
    return flowConnector;
  });

  // const flowHandle2 = data?.toFlowNodeHandle();
  // const handle = { ...flowHandle, color: "#777" };
  // const handle2 = { ...flowHandle2, color: "#000" };

  // const flowConnector: FlowConnector = {
  //   id: data.id,
  //   handles: [handle, handle2],
  //   hidden: false,
  //   direction: data.direction,
  // };

  // console.log(flowHandle.position);
  return (
    <FlowNodeComponent
      selected={data.selected}
      title={data.label ?? data.name}
      symbol={data.symbol}
      logo={company.logo}
      connectors={flowConnectors}
    />
    // <ParentNodeBox colorMain={"#ccc"} colorSelected={"#888"} selected={data.selected} hidden={data.hidden}>
    //   <FlowConnectorComponent connectors={[flowConnector]} />
    //   {/* <HandleBox
    //     key={data.id}
    //     id={`handle-${data.id}`}
    //     hidden={data.hidden}
    //     top={GetHandleTopPosition(data, false)}
    //     left={GetHandleLeftPosition(data, false)}
    //     isPartOf={false}
    //     onMouseEnter={null}
    //     onMouseLeave={null}
    //   >
    //     <TerminalIcon connector={data} color={data.getColor()} className={flowHandle.className} isElectroView={false} />
    //     <Handle type={flowHandle.handleType} position={flowHandle.position} id={flowHandle.id} className={flowHandle.className} />
    //   </HandleBox> */}
    // </ParentNodeBox>
  );
};

export default memo(ParentNode);
