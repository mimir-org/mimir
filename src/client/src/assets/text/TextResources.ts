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
  Relations: "Relations",
  Relations_PartOf_Relationship: "Part of Relationship",
  Relation_PartOf: "Part of",
  Relations_HasLocation: "Has Location",
  Relations_HasFunction: "Has Function",
  Relations_FulfilledBy: "Fulfilled By",
  Relations_Transport: "Transport",

  // Log in
  Login_Label: "Log in",
  Login_Label_Email: "SSO e-mail",

  // Top-menu
  MainHeader_Login_Heading: "Login",
  MainHeader_VisualFilter: "Visual Filter",

  // InspectorModule
  Inspector_AdminInfo: "Admin",
  Inspector_Object: "Object",
  Inspector_Parameters: "Parameters",
  Inspector_Relations: "Relations",
  Inspector_Terminals: "Terminals",
  Inspector_SimpleTypes: "Simple Types",

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
  Inspector_Relations_Relationships: "Active Relations",
  Inspector_Relations_Active_Terminal_Types: "Active Terminal Types",
  Inspector_Relations_Terminal_Input: "Terminal Input Object Connections",
  Inspector_Relations_Terminal_Output: "Terminal Output Object Connections",
  Inspector_Relations_Transport: "Connected Transports",
  Inspector_Relations_Nodes: "Active Nodes",
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
  Inspector_Admin_Cost: "Cost: USD/NOK",
  Inspector_Admin_Kind: "Kind",
  Inspector_Admin_Status: "Status",
  Inspector_Admin_Project: "Project",
  Inspector_Admin_Description: "Description",
  Inspector_Admin_Long_Description: "Long Description",
  Inspector_Admin_Interface: "Interface",
  Inspector_Admin_Updated_By: "Updated by",
  Inspector_Admin_Collaboration_Partner: "Collaboration partner",
  Inspector_Admin_Updated_Date: "Last updated",
  Inspector_Admin_Created_Date: "Date created",
  Inspector_Admin_Local_Description: "Long Local Description",
  Inspector_Admin_Type: "Type name",

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
  Inspector_Open: "Open",
  Inspector_Validate: "Validate",

  Inspector_Params_Clear_All: "Clear all Entities",
  Inspector_Params_Default: "Show Default Entities",
  Inspector_Params_Combinations: "Select combinations",
  Inspector_Params_Combinations_Select_All: "Select all",

  Inspector_Params_Search: "Select Entity...",

  Inspector_Terminals_Search: "Search Terminal Type",
  Inspector_SimpleTypes_Search: "Search Simple Types",

  Inspector_Qualifier: "Qualifier",
  Inspector_Source: "Source",
  Inspector_Condition: "Condition",

  // LibraryModule
  Library_Templates: "Templates",
  Library_SubProjects: "Sub-Projects",
  Library_SearchBox_Placeholder_Library: "Search Library for types...",
  Library_SearchBox_Placeholder_Templates: "Search for Templates...",
  Library_SearchBox_Placeholder_Subprojects: "Search for Sub-Projects...",
  Library_SearchFilter_Collections: "Search Collections",
  Library_SearchFilter_Latest_Version: "Only latest version",
  Library_SearchFilter_Other: "Other search filter",
  Library_Manage_Collections: "Add collections to work with Types",
  Library_Select_Collections: "Select Collections to add to Library",
  Library_Manage_Collections_Button: "Manage Collections",
  Library_Manage_Collections_Update_Library: "Update Library",
  Library_Subprojects_Info: "Sub-Projects created in Project menu appear listed here.",
  Library_Subprojects_None: "There are currently no Sub-Projects for this Project.",
  Library_New_Type: "New Type",
  Library_Edit_Type: "Edit Type",
  Library_Delete_Type: "Delete Type",

  // ExplorerModule
  Explorer_Lock_Node: "Lock node",
  Explorer_Unlock_Node: "Unlock node",
  Explorer_Hide_Node: "Hide node",
  Explorer_Show_Node: "Show node",
  Explorer_Open_Group: "Open group",
  Explorer_Close_Group: "Close group",

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
  TypeEditor_Properties_RDS: "Choose or search RDS String...",
  TypeEditor_Properties_Terminals: "Select or search Terminal Types...",
  TypeEditor_Properties_Terminal_Type: "Search and choose Terminal Type...",
  TypeEditor_Properties_Add_Terminal: "Add",
  TypeEditor_Properties_Clear_All_Terminal: "Clear all",
  TypeEditor_Properties_Predefined_Location_Attributes: "Select or search Predefined Location Attributes...",
  TypeEditor_Properties_Block_Attributes: "Select or search Block Attributes...",
  TypeEditor_Properties_Location_Attributes: "Select or search Location Attributes...",
  TypeEditor_Properties_Simple_Types: "Select or search Simple Types...",
  TypeEditor_New_Type_Preview: "Type Preview:",
  TypeEditor_Preview_Info: "Click on preview objects to see inspector info",
  TypeEditor_Button_Add: "Add to Library",
  TypeEditor_Button_Edit: "Save Type Edit",
  TypeEditor_Button_Cancel_Add: "Cancel New Type",
  TypeEditor_Button_Cancel_Edit: "Cancel Edit",
  TypeEditor_Type_Placeholder: "Write type name",
  TypeEditor_Aspect_Placeholder: "Choose Aspect",
  TypeEditor_Object_Placeholder: "Select Object Type",
  TypeEditor_Location_Placeholder: "Select Location Type",
  TypeEditor_Purpose_Placeholder: "Select object purpose",
  TypeEditor_Symbol_Placeholder: "Select object symbol",
  TypeEditor_Search: "Search or Select Terminal Media Type",
  TypeEditor_Error_Name: "*Please add a name for the type.",
  TypeEditor_Error_Aspect: "*Please select an aspect type.",
  TypeEditor_Error_Object_Type: "*Please select an object type.",
  TypeEditor_Error_Purpose: "*Please select a purpose.",
  TypeEditor_Error_Symbol: "*Please select a symbol.",
  TypeEditor_Error_Location_Type: "*Please select a location type.",
  TypeEditor_Error_RDS: "*Please select RDS for the type.",
  TypeEditor_Error_Status: "*Please select a status for the type",
  TypeEditor_Error_Attributes: "*Please add one or more attributes.",
  TypeEditor_Error_Location_Attributes: "*Please add one or more location attributes.",
  TypeEditor_Error_Terminals: "*Please select one or more terminals.",
  TypeEditor_Error_TerminalsType: "*You can only select two of each terminal, one must be input, the other must be output.",
  TypeEditor_Error_Terminals_Interface: "*Please select a terminal type.",
  TypeEditor_Error_Simple_Types: "*Please select simple types.",

  // ProjectMenu
  Project: "Project",
  Project_Heading: "Projects",
  Project_New: "Create project",
  Project_Search_Placeholder: "Search Projects",
  Project_OpenProject: "Open project",
  Project_Recent: "Recent projects",
  Project_Recent_Owner: "Owner",
  Project_Recent_Version: "Version",
  Project_Recent_Edited: "Last edited",

  Project_Open_Label: "Open or start a new project",
  Project_Save_Label: "Save project",
  Project_Description_About: "About the project",
  Project_Description_Na: "No information currently available",
  Project_Description_Libraries: "Libraries",
  Project_Description_SubProj: "Sub-projects",
  Project_Description_Temps: "Templates",

  Project_Import: "Import project",
  Project_Import_LibraryTypes: "Import library types",
  Project_Import_Library: "Import library",
  Project_Import_File: "File",
  Project_Import_Select: "Please select a file",
  Project_Browse: "Browse",
  Project_Parser: "Select data type",

  Project_Export_File: "Export file",
  Project_Export: "Export project",
  Project_Export_Library: "Export library",
  Project_Export_LibraryTypes: "Export library types",

  Project_Commit_Project: "Commit project",
  Project_Commit_Collaboration_Partner: "Send to collaboration partner",
  Project_Commit_Parser: "Data type",
  Project_Commit: "Commit",

  Project_Logout: "Log out",
  Project_Start_Label: "Start a new project",
  Project_CreateProject: "Create project",
  Project_SubProject_Save: "Save selection as sub-project",
  Project_Name: "Project name",
  Project_Name_Placeholder: "New project name...",
  Project_Confirm_Save: " Save this project before opening/starting another?",
  Project_Save_Button: "Yes",
  Project_NoSave_Button: "No",
  Project_File_Name: "File name",

  Project_Save: "Save",
  Project_Open: "Open",
  Project_Create: "Create",
  Project_SubProject: "Save Sub-project",
  Project_Cancel: "Cancel",
  Project_Menu_Instruction: "Please select an option from the project menu to continue using Mímir",

  // Error
  Error_Tile: "Something went wrong",
  Error_ExportProject: "Can not export a project that does not exist",
  Error_GetFileData: "Could not create nodes and edges from file",
  Error_SaveUpdateProject: "Could not create or update project",
  Error_ServerUnavailable: "The server is unavailable",
  Error_NoActiveAccount: "No active account. Verify a user has been signed in and setActiveAccount has been called",
  Error_Forbidden: "Access denied",
  Error_Server: "Internal server error",

  // Type
  Type_BlockLocation: "BlockLocationNode",
  Type_BlockFunction: "BlockFunctionNode",
  Type_BlockProduct: "BlockProductNode",
  Type_BlockParentNode: "BlockParentNode",
  Type_BlockParentProductNode: "BlockParentProductNode",
  Type_OffPageNode: "BlockOffPageNode",

  // RDS
  RDS_Function: "=",
  RDS_Product: "-",
  RDS_Location: "+",

  // Visual Filter
  Filter_Heading: "Visual Filter",
  Filter_Show_All: "Show all",
  Filter_Terminals: "Terminals",
  Filter_MaterialFluid: "Material Fluid",
  Filter_EnergyElectrical: "Energy Electrical",
  Filter_Show_Terminals: "Show all terminals",
  Filter_Show_Active_Terminals: "Show all active terminals",
  Filter_Show_Inactive_Terminals: "Show all inactive terminals",
  Filter_Show_Transport: "Show all transport edges",
  Filter_Edge_Animation: "Transport animation",

  Filter_Show_Oil: "Show all oil transports",
  Filter_Show_HotWater: "Show all hot water transports",
  Filter_Show_Multiphase: "Show all multiphase transports",

  Filter_PartOf: "Part of relationship",
  Filter_PartOf_Function: "Show part of Function",
  Filter_PartOf_Location: "Show part of Location",
  Filter_PartOf_Product: "Show part of Product",

  Filter_Transports: "Transports",
  Filter_Relations: "Relations",
  Filter_Category: "Category",

  // User Menu
  UserMenu_Settings: "User Settings",
  UserMenu_Notifications: "Show all Notifications",
  UserMenu_DarkMode: "Turn on Dark mode",
  UserMenu_LightMode: "Turn on Light mode",
  UserMenu_LogOut: "Log out",
  UserMenu_User: "User",

  // Validation
  Validation_Terminals: "A connection can only be made between two terminals of the same type.",
  Validation_Aspect: "A relation connection can only be made between two nodes of the same Aspect.",
  Validation_BlockView: "Please selct a node before opening Block View.",
  Validation_BlockView_Project: "Please selct a project before opening Block View.",
  Validation_OffPage: "An off-page node can only be connected with a node of the same type.",
  Validation_Cancel: "Cancel",

  // Version
  Mimir_Version: "Version 1.0",
  Validation_Ok: "Ok",

  // Modal
  Modal_Close: "Close menu",
};

export default TextResources;
