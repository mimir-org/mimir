import { InspectorPanel } from "@mimirorg/component-library";
import { useState } from "react";
import { Block } from "lib";
import { AdminTab } from "./tabs/AdminTab";
import { AttributeTab } from "./tabs/AttributeTab";
import { TerminalTab } from "./tabs/TerminalTab";

/**
 * The mimir inspector module.
 * @returns a inspector component used to change and view aspect object data,
 * @param component props
 * and relations between the objects.
 */

interface InspectorModuleProps {
  selectedAspectObject: Block | null;
}

export const InspectorModule = ({ selectedAspectObject }: InspectorModuleProps) => {
  const [selectedTab, setSelectedTab] = useState<"admin" | "attribute" | "terminal">("admin");

  const onTabChange = (value: "admin" | "attribute" | "terminal") => {
    setSelectedTab(value);
  };

  return (
    <div>
      <InspectorPanel
        duration={0.3}
        bgColor="#FFFAA9"
        onDelete={() => null}
        onLock={() => null}
        onTabChange={onTabChange}
        spacing={{ pl: "45px", pr: "45px" }}
        tabColor="#FFDE7A"
        name={selectedAspectObject?.name ?? "Please select an aspect object"}
        icon="http://localhost:5001/symbol/1cd2b7cc-0b27-415a-ad7b-3f16ab7c741d.svg"
        selectedTab={selectedTab}
        isOpen={true}
        isLocked={false}
      >
        {selectedTab === "admin" && selectedAspectObject && <AdminTab block={selectedAspectObject} />}
        {selectedTab === "attribute" && <AttributeTab attributes={selectedAspectObject?.attributes ?? []} />}
        {selectedTab === "terminal" && <TerminalTab name={"Test name"} id={"12345"} description={"This is a description"} />}
      </InspectorPanel>
    </div>
  );
};

InspectorModule.displayName = "InspectorModule";
