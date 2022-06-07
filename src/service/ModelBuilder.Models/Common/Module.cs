using Mb.Models.Abstract;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Mimirorg.Common.Extensions;

namespace Mb.Models.Common
{
    public class Module
    {
        /// <summary>
        /// Description of the module
        /// </summary>
        public ModuleDescription ModuleDescription { get; set; }

        /// <summary>
        /// Module instance
        /// </summary>
        public IModuleInterface Instance { get; set; }

        /// <summary>
        /// Module type
        /// </summary>
        public ModuleType ModuleType { get; set; }

        /// <summary>
        /// ToString
        /// </summary>
        /// <returns>Object formatted as string</returns>
        public override string ToString()
        {
            if (ModuleDescription == null)
                return string.Empty;

            return $"{ModuleDescription.Id} - {ModuleDescription.Name} - {ModuleType.GetDisplayName()}";
        }
    }
}