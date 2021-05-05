using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;

namespace Mb.Core.Configurations.Converters
{
    public class JsonValueConverter<T> : ValueConverter<T, string> where T : class, new()
    {
        public JsonValueConverter() : base(
            v => JsonConvert.SerializeObject(v),
            v => JsonConvert.DeserializeObject<T>(v) ?? new T()
            )
        {
        }
    }

    public class JsonValueComparer<T> : ValueComparer<T> where T : class, new()
    {
        public JsonValueComparer() : base(
            (l, r) => JsonConvert.SerializeObject(l) == JsonConvert.SerializeObject(r),
            v => v == null ? 0 : JsonConvert.SerializeObject(v).GetHashCode(),
            v => JsonConvert.DeserializeObject<T>(JsonConvert.SerializeObject(v))
            )
        {

        }
    }
}
