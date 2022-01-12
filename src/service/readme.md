# Mimir service


## Code style and formatting

The project contain a .editorconfig file, which is used for consistent code style and formatting among the team.

### dotnet-format

dotnet-format is a code formatter for dotnet that applies style preferences to a project or solution. Preferences will be read from an .editorconfig file, if present, otherwise a default set of preferences will be used. [Github repository](https://github.com/dotnet/format)

The tool can be installed via the dotnet cli:

    dotnet tool install -g dotnet-format --version "7.*" --add-source https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet7/nuget/v3/index.json

and uninstalled:

    dotnet tool uninstall -g dotnet-format

To format the project using dotnet-format, run the following command from the service folder:

    dotnet-format

The tool will pick up the .editorconfig and format all .cs files found in the subprojects.

### Format on save - Visual studio with Resharper

The ReSharper extension for visual studio (version 2020.2++) allows for configuring automatic code cleanup (including code formatting) on save. This enforces code style with minimal manual action needed from team members.

In order to configure cleanup on save:

1. Select Resharper Options:
   1. Can be done via keybinds (Alt + R, O) or navigating Extensions > Resharper > Options
   2. Can also be accessed via Tools > Options > Resharper > Options
2. Navigate Code Editing > Code Cleanup > General
3. Select option "Automatically run cleanup when saving a file"


### Format on save - Rider

By default, Rider runs code cleanup when doing an explicit save (Ctrl + Shift + S). To configure code cleanup only to do code formatting:

1. Press Ctrl+Alt+S to open the IDE settings and select Tools | Actions on Save.

2. Select Reformat and Cleanup Code, choose which code cleanup profile should be applied and whether to apply it to the whole file or only to the changed lines.
   1. Should be "Profile: Reformat Code" and "Whole file"

3. The next time you finish editing and save the file or all files , JetBrains Rider will clean up the affected files using the selected profile.

There currently is no option for running code cleanup or code formatting on regular save (Ctrl + S, https://youtrack.jetbrains.com/issue/RIDER-7960). This can however be easily fixed, by configuring a simple macro, running code format and save ([Jetbrains guide](https://www.jetbrains.com/help/rider/Using_Macros_in_the_Editor.html#bind)):

1. Record the macro
   1. Open any file in the editor.
   2. From the main menu, select Edit | Macros | Start Macro Recording. 
   3. Press Ctrl+Alt+Enter to reformat code (Code | Reformat Code). Then press Ctrl+Shift+S to save all changes (File | Save All). JetBrains Rider will show the performed actions in the status bar.
   4. Stop recording by clicking the Stop button or selecting Edit | Macros | Stop Macro Recording.
   5. In the Enter Macro Name dialog, specify the name for the new macro and click OK.
2. Bind the macro to Ctrl+Shift+S shortcut
   1. In the Settings/Preferences dialog (Ctrl+Alt+S) , select Keymap.
   2. Expand the Macros node and select the created Reformat and Save macro. 
   3. Right-click the macro and choose Add Keyboard Shortcut in the context menu.
   4. In the Enter Keyboard Shortcut dialog, press Ctrl+Shift+S to be used as the shortcut and click OK.
   5. JetBrains Rider will warn you that the shortcut is assigned to another action. Click Remove to remove the Ctrl+Shift+S shortcut for the File | Save All action. You can always reassign it later if necessary.
   6. Click OK to apply the changes.