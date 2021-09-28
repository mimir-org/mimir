/* All static text for Mimir */

const TextResources = {
  // Aspects
  Aspect_Function: "Function",
  Aspect_Location: "Location",
  Aspect_Product: "Product",

  // Modules
  Module_Legend: "Legend",
  Module_Explorer: "Explorer",
  Module_Library: "Library",
  Module_Inspector: "Inspector",

  // Relations
  Relations_PartOf_Relationship: "Part of Relationship",
  Relation_PartOf: "Part of",
  Relations_HasLocation: "Has Location",
  Relations_HasFunction: "Has Function",
  Relations_FulfilledBy: "Fulfilled By",
  Relations_Transport: "Transport",

  // Log in
  Login_label: "Log in",
  Login_label_email: "SSO e-mail",

  // Top-menu
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
  Combined_view: "Connections",
  Split_view: "Split View",

  // InspectorModule
  Inspector_AdminInfo: "Admin info",
  Inspector_Object: "Object",
  Inspector_Parameters: "Parameters",
  Inspector_Relations: "Relations",
  Inspector_Terminals: "Terminals",
  Inspector_Inhereted: "Inhereted Requirements",
  Inspector_Comments: "Comments",
  Inspector_Changelog: "Changelog",

  Inspector_Relations_Name: "Relation name",
  Inspector_Relations_Updated_By: "Updated by",
  Inspector_Relations_Connected_To: "Connected to",
  Inspector_Relations_Project: "Project",
  Inspector_Relations_Updated_Date: "Updated Date",
  Inspector_Relations_Relation_Out: "Relation out",
  Inspector_Relations_Part_Location: "Part of Location",
  Inspector_Relations_Location: "Go to location",
  Inspector_Relations_Product: "Go to product",
  Inspector_Relations_Function: "Go to function",
  Inspector_Relations_Input_object_connetion: "Input object connection",
  Inspector_Relations_Output_object_connetion: "Output object connection",
  Inspector_Relations_Relationships: "Go To: Active Relations",
  Inspector_Relations_Active_Terminal_Types: "Active Terminal Types",
  Inspector_Relations_Terminal_Input: "Go To: Terminal Input Object Connection",
  Inspector_Relations_Terminal_Output:
    "Go To: Terminal Output Object Connection",
  Inspector_Relations_Transport: "Go To: Connected Transport",
  Inspector_Relations_All_Terminal_Types: "All available Terminal Types",
  Inspector_Relations_Connector_Attributes: "Connector attributes",

  Inspector_Admin_Id: "ID",
  Inspector_Admin_Semantic_Id: "Semantic ID",
  Inspector_Admin_RDS: "RDS",
  Inspector_Admin_Tag: "Tag Number",
  Inspector_Admin_Designation: "Reference Designation",
  Inspector_Admin_Service: "Service Description",
  Inspector_Admin_Change: "Change mode",
  Inspector_Admin_Version: "Version",
  Inspector_Admin_Kind: "Kind",
  Inspector_Admin_Status: "Status",
  Inspector_Admin_Project: "Project",
  Inspector_Admin_Description: "Description",
  Inspector_Admin_Long_Description: "Long Description",
  Inspector_Admin_Interface: "Interface",
  Inspector_Admin_Updated_By: "Updated by",
  Inspector_Admin_Contractor: "Contractor",
  Inspector_Admin_Updated_Date: "Last updated",
  Inspector_Admin_Created_Date: "Date created",
  Inspector_Admin_Local_Description: "Long Local Description",
  Inspector_Admin_Type: "Type name",
  Inspector_Admin_Width: "Width (m)",
  Inspector_Admin_Height: "Height (m)",
  Inspector_Admin_Length: "Length (m)",

  Inspector_Inherited_Pressure: "Saturation Pressure",
  Inspector_Inherited_Temp: "Saturation Temperature",
  Inspector_Inherited_Max_Gas: "Maximum gas processing capacity",
  Inspector_Inherited_Max_Oil: "Maximum oil processing capacity",
  Inspector_Inherited_Max_Water: "Maximum produced water capacity",
  Inspector_Inherited_Total_Liquid: "Total liquid capacity",
  Inspector_Inherited_Total_Injection: "Total injection water rate",

  Inspector_EdgeAdmin_Id: "ID",
  Inspector_EdgeAdmin_Relation: "Relation Type",
  Inspector_EdgeAdmin_Template: "Template",
  Inspector_EdgeAdmin_Source: "Source Node",
  Inspector_EdgeAdmin_Target: "Target Node",
  Inspector_EdgeAdmin_Project: "Master Project ID",

  Inspector_Delete_Node: "Delete",
  Inspector_Filter: "Filter",
  Inspector_Lock: "Lock",
  Inspector_Validate: "Validate",

  Inspector_Params_Clear_All: "Clear all Entities",
  Inspector_Params_Default: "Show Default Entities",
  Inspector_Params_Combinations: "Select combinations",

  // LibraryModule
  Library_SearchBox_Placeholder: "Search the Library",

  // TypeEditorModule
  TypeEditor: "Type Editor",
  TypeEditor_New_Type: "New Type",
  TypeEditor_Edit_Type: "Edit Type",
  TypeEditor_Aspect: "Aspect",
  TypeEditor_Object_Type: "Object Type",
  TypeEditor_Location_Type: "Location Type",
  TypeEditor_Purpose: "Purpose",
  TypeEditor_Type_Name: "Type name",
  TypeEditor_Symbol: "Symbol",
  TypeEditor_Properties_RDS: "Choose RDS String",
  TypeEditor_Properties_Terminals: "Select Terminal Types",
  TypeEditor_Properties_Add_Terminal: "Add",
  TypeEditor_Properties_Predefined_Location_Attributes:
    "Select Predefined Location Attributes",
  TypeEditor_Properties_Block_Attributes: "Select Block Attributes",
  TypeEditor_Properties_Location_Attributes: "Select Location Attributes",
  TypeEditor_Properties_Simple_Types: "Select Simple Types",
  TypeEditor_New_Type_Preview: "Type Preview:",
  TypeEditor_Preview_Info: "Click on preview objects to see inspector info",
  TypeEditor_Button_Add: "Add to Library",
  TypeEditor_Button_Edit: "Save Type Edit",
  TypeEditor_Type_Placeholder: "Write Type Name",
  TypeEditor_Aspect_Placeholder: "Select Aspect",
  TypeEditor_Object_Placeholder: "Not set",
  TypeEditor_Draft_Placeholder: "Draft",
  TypeEditor_Search: "Search or Select Terminal Media Type",
  TypeEditor_Error_Name: "Please add a name for the type.",
  TypeEditor_Error_RDS: "Please select RDS for the type.",
  TypeEditor_Error_Status: "Please select a status for the type",
  TypeEditor_Error_Attributes: "Please add one or more attributes.",
  TypeEditor_Error_Location_Attributes:
    "Please add one or more location attributes.",
  TypeEditor_Error_Terminals: "Please select one or more terminals.",
  TypeEditor_Error_Terminals_Block:
    "Please select one or more terminals. An Object Block must have at least one input terminal, and one output terminal.",
  TypeEditor_Error_TerminalsType:
    "You can only select two of each terminal, one must be input, the other must be output.",
  TypeEditor_Error_Terminals_Interface: "Please select a terminal type.",

  // AccountModule
  Account_Save_Label: "Save project to database",
  Account_Save_Label_File: "Export project file",
  Account_Export_Library_File: "Export project library",
  Account_Import_File: "Import project file",
  Account_Import_Library_File: "Import project library",
  Account_Logout_Label: "Log out",
  Account_Open_Label: "Open a project",
  Account_Create_Label: "Create a project",
  Account_Create_Button_Label: "Create project",
  Account_Name_Project_Label: "Name project",
  Account_Name_Project_Placeholder: "New project name...",
  Account_Confirm_Save: " Save this project before opening/starting another?",
  Account_Save_Button: "Yes",
  Account_NoSave_Button: "No",
  Account_Save_Label_File_Name: "File name",
  Account_Export_File_Label: "Export file",
  Account_Import_Browse: "Browse file",
  Account_Import_Label_File_Button: "Import project",
  Account_Export_File_Library_Label: "Export library",
  Account_Import_Library_Label: "Import library",
  Account_Save: "Save",
  Account_Save_File: "SaveFile",
  Account_Open: "Open",
  Account_Create: "Create",
  Account_Cancel: "Cancel",
  Account_Save_Library: "SaveLibrary",
  Account_Import_Project: "ImportProject",
  Account_Import_Library: "ImportLibrary",
  Account_Logout: "Logout",

  // Error
  Error_Tile: "Oops, something went wrong",
  Error_ExportProject: "Can not export a project that does not exist",
  Error_GetFileData: "Could not create nodes and edges from file",
  Error_SaveUpdateProject: "Could not create or update project",
  Error_ServerUnavailable: "The server is unavailable",
  Error_NoActiveAccount:
    "No active account. Verify a user has been signed in and setActiveAccount has been called",

  // BlockView
  BlockView_Select_Message:
    "Please select an additional object from the Explorer Module",
  ConnectMenu_Select_All: "Select all",
  ConnectMenu_Clear_All: "Clear all",

  // Type
  Type_BlockLocation: "BlockLocationNode",
  Type_BlockFunction: "BlockFunctionNode",
  Type_BlockParentNode: "BlockParentNode",

  // RDS
  RDS_Function: "=",
  RDS_Product: "-",
  RDS_Location: "++",
};

export default TextResources;
