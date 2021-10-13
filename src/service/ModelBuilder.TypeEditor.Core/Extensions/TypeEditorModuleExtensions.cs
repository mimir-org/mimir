using Mb.TypeEditor.Core.Contracts;
using Mb.TypeEditor.Core.Services;
using Mb.TypeEditor.Data.Contracts;
using Mb.TypeEditor.Data.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Mb.TypeEditor.Core.Extensions
{
    public static class TypeEditorModuleExtensions
    {
        public static IServiceCollection AddTypeEditorModule(this IServiceCollection services, IConfiguration configuration)
        {
            // Dependency Injection
            services.AddScoped<IAttributeTypeRepository, AttributeTypeRepository>();
            services.AddScoped<ICompositeTypeRepository, CompositeTypeRepository>();
            services.AddScoped<IInterfaceTypeRepository, InterfaceTypeRepository>();
            services.AddScoped<ILibraryTypeRepository, LibraryTypeRepository>();
            services.AddScoped<INodeTypeRepository, NodeTypeRepository>();
            services.AddScoped<INodeTypeTerminalTypeRepository, NodeTypeTerminalTypeRepository>();
            services.AddScoped<ITerminalTypeRepository, TerminalTypeRepository>();
            services.AddScoped<ITransportTypeRepository, TransportTypeRepository>();
            services.AddScoped<ILibraryRepository, LibraryRepository>();

            services.AddScoped<ITerminalTypeService, TerminalTypeService>();
            services.AddScoped<ILibraryTypeService, LibraryTypeService>();
            services.AddScoped<ILibraryTypeFileService, LibraryTypeFileService>();


            return services;
        }
    }
}
