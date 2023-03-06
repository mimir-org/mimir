using Mb.Models.Application;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;

namespace Mb.Models.Converters
{
    public class ConnectorConverter : JsonConverter<ConnectorAm>
    {
        public override ConnectorAm ReadJson(JsonReader reader, Type objectType, ConnectorAm existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            var jObj = JObject.Load(reader);

            if (jObj.ContainsKey(FirstCharToLowerCase(nameof(RelationAm.RelationType))) || jObj.ContainsKey(nameof(RelationAm.RelationType)))
                return jObj.ToObject<RelationAm>();

            return jObj.ToObject<ConnectorTerminalAm>();
        }

        public override bool CanWrite => false;

        public override void WriteJson(JsonWriter writer, ConnectorAm value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        private string FirstCharToLowerCase(string str)
        {
            if (!string.IsNullOrEmpty(str) && char.IsUpper(str[0]))
                return str.Length == 1 ? char.ToLower(str[0]).ToString() : char.ToLower(str[0]) + str[1..];

            return str;
        }
    }
}