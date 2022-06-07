using Mb.Models.Data;
using Mimirorg.Common.Exceptions;

namespace Mb.Models.Settings
{
    public class ApplicationSetting
    {
        public CollaborationPartner CollaborationPartner { get; set; }
        public string TypeLibraryRootUri { get; set; }
        public string TypeLibraryVersion { get; set; }
        public string TypeLibrarySecret { get; set; }

        public string ApiUrl(string relativePath)
        {
            if (relativePath == null)
                throw new MimirorgNullReferenceException("Relative path can't be null");

            if (string.IsNullOrWhiteSpace(TypeLibraryRootUri) || string.IsNullOrWhiteSpace(TypeLibraryVersion))
                throw new MimirorgConfigurationException("Type Library configuration is null or missing");

            return
                $@"{TypeLibraryRootUri.Trim().Trim('/')}/{TypeLibraryVersion.Trim().Trim('/')}/{relativePath.TrimStart('/')}";
        }
    }
}