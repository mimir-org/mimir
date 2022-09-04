using System.Text;
using Mimirorg.Common.Exceptions;

namespace Mb.Models.Settings
{
    public class ApplicationSetting
    {
        public string TypeLibraryRootUri { get; set; }
        public string TypeLibraryVersion { get; set; }
        public string TypeLibrarySecret { get; set; }
        public string TypeLibraryDomain { get; set; }

        public string ApiUrl(string relativePath)
        {
            if (relativePath == null)
                throw new MimirorgNullReferenceException("Relative path can't be null");

            if (string.IsNullOrWhiteSpace(TypeLibraryRootUri) || string.IsNullOrWhiteSpace(TypeLibraryVersion))
                throw new MimirorgConfigurationException("Type Library configuration is null or missing");

            return
                $@"{TypeLibraryRootUri.Trim().Trim('/')}/{TypeLibraryVersion.Trim().Trim('/')}/{relativePath.TrimStart('/')}";
        }

        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.AppendLine();
            sb.AppendLine("###################### Application settings #################################");
            sb.AppendLine($"{nameof(TypeLibraryRootUri)}:   {TypeLibraryRootUri}");
            sb.AppendLine($"{nameof(TypeLibraryVersion)}:   {TypeLibraryVersion}");
            sb.AppendLine($"{nameof(TypeLibrarySecret)}:    {TypeLibrarySecret}");
            sb.AppendLine($"{nameof(TypeLibraryDomain)}:    {TypeLibraryDomain}");
            sb.AppendLine("#############################################################################");
            return sb.ToString();
        }
    }
}