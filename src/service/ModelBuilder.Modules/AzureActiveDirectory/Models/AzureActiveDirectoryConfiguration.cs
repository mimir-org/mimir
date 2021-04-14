// ReSharper disable StringLiteralTypo

namespace Mb.Modules.AzureActiveDirectory.Models
{
    public class AzureActiveDirectoryConfiguration
    {
        public string Instance { get; set; } = @"https://login.microsoftonline.com/";
        public string TenantId { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string CallbackPath { get; set; } = @"/signin-oidc";
        public string SignedOutCallbackPath { get; set; } = @"/signout-oidc";
    }
}
