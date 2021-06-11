/* All static text in the app is placed here */

const textResources = {
  // Log in
  Login_label: "Log in",
  Login_label_email: "SSO e-mail",

  // Top-menu
  MainHeader_App_Name: "Model Builder - Prototype",
  MainHeader_Login_Heading: "Login",
  MainHeader_VisualFilter: "Visual Filter",

  // Project options
  Project_heading: "Projects",
  Project_new_project: "Create project",
  Project_open_project: "Open project",
  Project_recent_project: "Recent projects",
  Project_recent_name: "Project name",
  Project_recent_owner: "Project owner",
  Project_recent_edited: "Last edited",
  Project_recent_open: "Open project",

  // ExplorerModule
  Explorer_view: "Explorer",
  Combined_view: "Connections",
  Split_view: "Split View",

  // InspectorModule
  Inspector_Heading: "Inspector",
  Inspector_AdminInfo: "Admin info",
  Inspector_Object: "Object",
  Inspector_TechInfo: "Tech info",
  Inspector_Relations: "Terminals",
  Inspector_Inhereted: "Inhereted Requirements",
  Inspector_Comments: "Comments",
  Inspector_Changelog: "Changelog",

  Inspector_Relations_Name: "Relation name",
  Inspector_Relations_Has_Function: "Has function",
  Inspector_Relations_Updated_By: "Updated by",
  Inspector_Relations_Connected_To: "Connected to",
  Inspector_Relations_Project: "Project",
  Inspector_Relations_Updated_Date: "Updated Date",
  Inspector_Relations_Relation_Out: "Relation out",
  Inspector_Relations_Another_Field: "Another field",
  Inspector_Relations_Has_Location: "Has location",
  Inspector_Relations_Fulfilled_By: "Fulfilled by",
  Inspector_Relations_Location: "Go to location",
  Inspector_Relations_Product: "Go to product",

  Inspector_Admin_Id: "ID",
  Inspector_Admin_Semantic_Id: "Semantic ID",
  Inspector_Admin_Tag: "Tag Number",
  Inspector_Admin_Designation: "Reference Designation",
  Inspector_Admin_Service: "Service Description",
  Inspector_Admin_Change: "Change mode",
  Inspector_Admin_Version: "Version",
  Inspector_Admin_Kind: "Kind",
  Inspector_Admin_Status: "Status",
  Inspector_Admin_Project: "Project",
  Inspector_Admin_Long_Description: "Long Description",
  Inspector_Admin_Interface: "Interface",
  Inspector_Admin_Updated_By: "Updated by",
  Inspector_Admin_Contractor: "Contractor",
  Inspector_Admin_Updated_Date: "Updated Date",
  Inspector_Admin_Local_Description: "Long Local Description",

  Inspector_Inherited_Pressure: "Saturation Pressure",
  Inspector_Inherited_Temp: "Saturation Temperature",
  Inspector_Inherited_Max_Gas: "Maximum gas processing capacity",
  Inspector_Inherited_Max_Oil: "Maximum oil processing capacity",
  Inspector_Inherited_Max_Water: "Maximum produced water capacity",
  Inspector_Inherited_Total_Liquid: "Total liquid capacity",
  Inspector_Inherited_Total_Injection: "Total injection water rate",

  // LibraryModule
  Library_Heading: "Library",
  Library_Function: "Function",
  Library_Product: "Product",
  Library_Location: "Location",
  Library_SearchBox_Placeholder: "Search the Library",

  // TypeEditorModule
  TypeEditor: "Type Editor",
  TypeEditor_New_Type: "New Type",
  TypeEditor_Edit_Type: "Edit Type",
  TypeEditor_Aspect: "Aspect",
  TypeEditor_Object_Type: "Object Type",
  TypeEditor_Type_Name: "Type name",
  TypeEditor_Status: "Status",
  TypeEditor_Properties_Choose: "Choose",
  TypeEditor_Properties_RDS: "RDS",
  TypeEditor_Properties_Terminals: "Terminal Types",
  TypeEditor_Properties_Block_Attributes: "Object Block Attributes",
  TypeEditor_New_Type_Preview: "Type Preview Info",
  TypeEditor_Preview_Info: "Click on preview objects to see inspector info",
  TypeEditor_Button_Add: "Add to Library",
  TypeEditor_Button_Edit: "Save Type Edit",

  // AccountModule
  Account_Save_Label: "Save project to database",
  Account_Save_Label_File: "Save project to file",
  Account_Logout: "Log out",
  Account_Open_Label: "Open a project",
  Account_Create_Label: "Create a new project",
  Account_Create_Button_Label: "Create project",
  Account_Name_Project_Label: "Name project",
  Account_Name_Project_Placeholder: "New project name...",
  Account_Confirm_Save: " Save this project before opening/starting another?",
  Account_Save_Button: "Yes",
  Account_NoSave_Button: "No",
  Account_Cancel_Button: "Cancel",

  // ErrorModule
  Error_Tile: "Oops, Something Went Wrong",

  // LegendModule
  Legend_Heading: "Legend",

  // FilterModule
  Filter_Types: "Transport/Interfaces/Terminals",
  Filter_Sub_Types: "Sub-Types",
  Filter_Other: "Other",
  Filter_Designations: "Designations",
  Filter_Forces: "Forces",
  Filter_Information: "Information",
  Filter_Energy: "Energy [power]",
  Filter_Flow: "Material flow",
  Filter_Electric: "Electric",
  Filter_Thermal: "Thermal",
  Filter_Solar: "Solar",
  Filter_Dry: "Dry granulated",
  Filter_Mechanical: "Mechanical",
  Filter_Sound: "Sound",
  Filter_Wind: "Wind",
  Filter_Hydro: "Hydro",
  Filter_Fluid: "Fluid",
  Filter_Solid: "Solid pieces",
  Filter_Has_Location: "Has location",
  Filter_Fulfilled_By: "Fulfilled by",
  Filter_Explorer: "Explorer RDS",
  Filter_Show_Local: "Show local",
  Filter_Show_Path: "Show path",

  // BlockView
  BlockView_Select_Message:
    "Please select an aspect object from the same aspect OR a different aspect via the Explorer Module",

  // Relations
  Relations_PartOf: "Part of Relationship",
  Relations_HasLocation: "Has Location",
  Relations_FulfilledBy: "Fulfilled By",
};

export const VisualFilterResources = [
  "Transport/Interfaces/Terminals:",
  "Sub-Types:",
  "Other:",
  "Designations:",

  "Forces",
  "Information",
  "Energy [power]",
  "Material flow",

  "Energy [power]",
  "Electric",
  "Thermal",
  "Solar",
  "Material flow",
  "Dry granulated",
  "Mechanical",
  "Sound",
  "Wind",
  "Hydro power",
  "Fluid",
  "Solid pieces",

  "Has location",
  "Fulfilled by",
  "Has function",
  "Explorer RDS",

  "Show local",
  "Show path",
];

export default textResources;
