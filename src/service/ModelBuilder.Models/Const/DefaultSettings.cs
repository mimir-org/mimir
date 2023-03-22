using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Mb.Models.Const;

public static class DefaultSettings
{
    public static JsonSerializerSettings SerializerSettings => GetDefaultSerializer();
    public static JsonSerializerSettings SerializerSettingsNoTypeNameHandling => GetDefaultSerializerWithoutTypeNameHandling();

    private static JsonSerializerSettings GetDefaultSerializer()
    {
        return new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            TypeNameHandling = TypeNameHandling.All
        };
    }

    private static JsonSerializerSettings GetDefaultSerializerWithoutTypeNameHandling()
    {
        return new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            TypeNameHandling = TypeNameHandling.None
        };
    }
}