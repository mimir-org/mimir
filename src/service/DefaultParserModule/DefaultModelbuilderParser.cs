using System.Text;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mb.Models.Modules;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace DefaultParserModule
{
    public class DefaultModelBuilderParser : IModelBuilderParser
    {
        public string GetName()
        {
            return "Default";
        }

        public Task<byte[]> SerializeProject(Project project)
        {
            var serializerSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            serializerSettings.Converters.Add(new StringEnumConverter());
            var result = JsonConvert.SerializeObject(project, serializerSettings);
            return Task.FromResult(Encoding.UTF8.GetBytes(result));
        }

        public Task<Project> DeserializeProject(byte[] data)
        {
            var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);
            var project = JsonConvert.DeserializeObject<Project>(valueAsString);
            return Task.FromResult(project);
        }
    }
}
