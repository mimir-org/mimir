// ReSharper disable StringLiteralTypo

using System.Text;

namespace AzureActiveDirectoryModule.Models
{
    public class AzureActiveDirectoryConfiguration
    {
        public string Instance { get; set; } = @"https://login.microsoftonline.com/";
        public string TenantId { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string CallbackPath { get; set; } = @"/signin-oidc";
        public string SignedOutCallbackPath { get; set; } = @"/signout-oidc";
        public bool Silent { get; set; } = false;

        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.AppendLine();
            sb.AppendLine("################### Azure Active Directory Configuration ####################");
            sb.AppendLine("Instance:              " + Instance);
            sb.AppendLine("TenantId:              " + TenantId);
            sb.AppendLine("ClientId:              " + ClientId);
            sb.AppendLine("CallbackPath:          " + CallbackPath);
            sb.AppendLine("SignedOutCallbackPath: " + SignedOutCallbackPath);
            sb.AppendLine("Silent: " + Silent);
            sb.AppendLine("#############################################################################");

            return sb.ToString();
        }
    }
}