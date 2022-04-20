using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                    ["lis"] = "http://standards.iso.org/iso/15926/part14/",
                    ["eqn"] = "https://rdf.equinor.com/",
                    ["mimir"] = "http://ns.imfid.org/mimir#",
                    ["commonlib"] = "https://commonlibrary.equinor.com/",
                    ["hasAspectModel"] = new JObject() { ["@reverse"] = "isAspectOf" },
                    ["@version"] = "1.1"
                },
                ["@type"] = new JArray() { "FunctionalSystemBlock", "Transport", "Interface", "IntegratedObject", "mimir:Project", "Terminal", "InTerminal", "OutTerminal", "AspectObject" },
                ["hasChild"] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                ["mimir:hasMasterProject"] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                ["hasTerminal"] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                ["hasAspectModel"] = new JObject()
                {
                    ["@embed"] = "@always"
                },
                ["hasParent"] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                ["isAspectOf"] = new JObject()
                {
                    ["@embed"] = "@never"
                },
                ["fulfilledBy"] = new JObject()
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