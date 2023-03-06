using ModelBuilder.Rdf.Properties;
using Newtonsoft.Json.Linq;

namespace JsonLdParser
{
    public static class JsonLdFrame
    {
        public static JObject GetFrame()
        {
            return new JObject()
            {
                ["@context"] = new JObject()
                {
                    ["@vocab"] = "http://ns.imfid.org/imf#",
                    ["imf"] = "http://ns.imfid.org/imf#",
                    ["lis"] = "http://standards.iso.org/iso/15926/part14/",
                    ["eqn"] = "https://rdf.equinor.com/",
                    ["mimir"] = "http://ns.imfid.org/mimir#",
                    ["commonlib"] = "https://commonlibrary.equinor.com/",
                    ["hasAspectModel"] = new JObject() { ["@reverse"] = Resources.IsAspectOf },
                    ["@version"] = "1.1"
                },
                ["@type"] = new JArray() { Resources.FSB, Resources.IntegratedObject, Resources.Project, "ConnectorTerminal", Resources.InputTerminal, Resources.OutputTerminal, "AspectObject" },
                [Resources.HasChild] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                [Resources.HasMasterProject] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                [Resources.HasInputTerminal] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                [Resources.HasOutputTerminal] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                ["imf:hasTerminal"] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                ["hasAspectModel"] = new JObject()
                {
                    ["@embed"] = "@always"
                },
                [Resources.HasParent] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                [Resources.IsAspectOf] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                [Resources.FulfilledBy] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                ["installedAs"] = new JObject()
                {
                    ["@embed"] = "@never"
                },
            };
        }
    }
}