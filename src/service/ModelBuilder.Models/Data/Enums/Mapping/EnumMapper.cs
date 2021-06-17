using Mb.Models.Application;

namespace Mb.Models.Data.Enums.Mapping
{
    public class EnumMapper
    {
        public T CreateEnum<T>(CreateEnum item) where T : EnumBase, new()
        {
            var model = new T
            {
                Name = item.Name, Description = item.Description, SemanticReference = item.SemanticReference
            };

            return model;
        }
    }
}
