using Mb.Core.Extensions;
using Mb.Modules.AzureActiveDirectory.Extensions;
using Mb.Modules.AzureActiveDirectory.Models;
using Mb.Modules.MsSql.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace Mb.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private AzureActiveDirectoryConfiguration _activeDirectoryConfiguration;
        private SwaggerConfiguration _swaggerConfiguration;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public virtual void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(o =>
            {
                o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                o.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                o.SerializerSettings.Converters.Add(new StringEnumConverter());
            });


            // Add Cors policy
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.WithOrigins("http://localhost:3000", "https://dev-spine-modelbuilder.azurewebsites.net")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .SetIsOriginAllowedToAllowWildcardSubdomains();
                });
            });

            // Add routing
            services.AddRouting(o => o.LowercaseUrls = true);

            // Add Azure Active Directory Module and Swagger Module
            var (swaggerConfiguration, activeDirectoryConfiguration) = services.AddActiveDirectoryAuthentication(Configuration);
            _activeDirectoryConfiguration = activeDirectoryConfiguration;
            _swaggerConfiguration = swaggerConfiguration;

            services.AddMsSqlServerModule();
            services.AddModelBuilderModule(Configuration);
        }

        public virtual void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            if (!env.IsDevelopment())
                app.UseHttpsRedirection();
            

            app.UseCors("CorsPolicy");
            app.UseRouting();

            // Use Azure Active Directory Module and Swagger Module
            app.UseActiveDirectoryAuthentication(_activeDirectoryConfiguration, _swaggerConfiguration);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseModelBuilderModule();
        }
    }
}
