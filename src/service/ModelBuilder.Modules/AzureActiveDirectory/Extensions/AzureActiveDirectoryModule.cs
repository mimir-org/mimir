using System;
using System.IO;
using Mb.Modules.AzureActiveDirectory.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;

namespace Mb.Modules.AzureActiveDirectory.Extensions
{
    public static class AzureActiveDirectoryModule
    {
        public static (SwaggerConfiguration swaggerConfiguration, AzureActiveDirectoryConfiguration activeDirectoryConfiguration) AddActiveDirectoryAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            // Active directory configurations
            var activeDirectorySection = configuration.GetSection(nameof(AzureActiveDirectoryConfiguration));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(
                    options => { activeDirectorySection.Bind(options); },
                    options => { activeDirectorySection.Bind(options); })
                .EnableTokenAcquisitionToCallDownstreamApi(options => activeDirectorySection.Bind(options))
                .AddDistributedTokenCaches();

            var activeDirectoryConfiguration = new AzureActiveDirectoryConfiguration();
            activeDirectorySection.Bind(activeDirectoryConfiguration);
            services.Configure<AzureActiveDirectoryConfiguration>(activeDirectorySection.Bind);

            // Swagger configurations
            var swaggerConfigurationSection = configuration.GetSection(nameof(SwaggerConfiguration));
            var swaggerConfiguration = new SwaggerConfiguration();
            swaggerConfigurationSection.Bind(swaggerConfiguration);
            services.Configure<SwaggerConfiguration>(swaggerConfigurationSection.Bind);

            services.AddApiVersioning(o =>
            {
                o.AssumeDefaultVersionWhenUnspecified = false;
                o.DefaultApiVersion = new ApiVersion(0, 1);
                o.ReportApiVersions = true;
            });

            services.AddVersionedApiExplorer(o =>
            {
                // ReSharper disable once StringLiteralTypo
                o.GroupNameFormat = "'v'VVV";
                o.SubstituteApiVersionInUrl = true;
            });

            services.AddSwaggerGen(c =>
            {
                var provider = services.BuildServiceProvider();
                var service = provider.GetRequiredService<IApiVersionDescriptionProvider>();

                foreach (var description in service.ApiVersionDescriptions)
                {
                    c.SwaggerDoc(description.GroupName, new OpenApiInfo { Title = swaggerConfiguration.Title, Version = description.ApiVersion.ToString(), Description = swaggerConfiguration.Description, Contact = new OpenApiContact{ Name = swaggerConfiguration.Contact?.Name, Email = swaggerConfiguration.Contact?.Email } });
                }

                var xmlPath = Path.Combine(AppContext.BaseDirectory, "swagger.xml");

                c.IncludeXmlComments(xmlPath, true);
                c.CustomSchemaIds(x => x.FullName);
                c.EnableAnnotations();

                c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri($"{activeDirectoryConfiguration.Instance}{activeDirectoryConfiguration.TenantId}/oauth2/v2.0/authorize"),
                            Scopes = swaggerConfiguration.ScopesDictionary
                        }
                    }
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    [new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "oauth2" }
                    }] = new string[] { }
                });
            });
            services.AddSwaggerGenNewtonsoftSupport();


            return (swaggerConfiguration, activeDirectoryConfiguration);
        }

        public static IApplicationBuilder UseActiveDirectoryAuthentication(this IApplicationBuilder app, AzureActiveDirectoryConfiguration azureConfig, SwaggerConfiguration swaggerConfig)
        {
            app.UseSwagger(c =>
            {
                c.RouteTemplate = "/swagger/{documentName}/swagger.json";
            });

            using var serviceScope = app.ApplicationServices.CreateScope();
            var service = serviceScope.ServiceProvider.GetRequiredService<IApiVersionDescriptionProvider>();
            
            app.UseSwaggerUI(c =>
            {
                foreach (var description in service.ApiVersionDescriptions)
                {
                    c.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
                }

                c.OAuthClientId(azureConfig.ClientId);
                c.OAuthAppName("Azure Active Directory");
                c.DisplayOperationId();
                c.DisplayRequestDuration();
                c.RoutePrefix = string.Empty;

            });

            app.UseAuthentication();
            app.UseAuthorization();

            return app;
        }
    }
}
