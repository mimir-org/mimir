using System;
using System.Collections.Generic;
using System.IO;
using AzureActiveDirectoryModule.Models;
using Mb.Models.Const;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;

namespace AzureActiveDirectoryModule
{
    public static class AzureActiveDirectoryModule
    {
        public static (SwaggerConfiguration swaggerConfiguration, AzureActiveDirectoryConfiguration activeDirectoryConfiguration) AddAzureActiveDirectoryModule(this IServiceCollection services, IConfiguration configuration)
        {
            // Active directory configurations
            var activeDirectorySection = configuration.GetSection(nameof(AzureActiveDirectoryConfiguration));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(
                    options => { activeDirectorySection.Bind(options); },
                    options => { activeDirectorySection.Bind(options); })
                .EnableTokenAcquisitionToCallDownstreamApi(options => activeDirectorySection.Bind(options))
                .AddDistributedTokenCaches();

            services.AddAuthorization(options =>
            {
                options.AddPolicy(Policies.Admin, policy => policy.RequireRole(Roles.MimirAdministrator));
                options.AddPolicy(Policies.Edit, policy => policy.RequireRole(Roles.MimirAdministrator, Roles.MimirContributor));
                options.AddPolicy(Policies.Read, policy => policy.RequireRole(Roles.MimirAdministrator, Roles.MimirContributor, Roles.MimirReader));
            });

            var activeDirectoryConfiguration = new AzureActiveDirectoryConfiguration();
            activeDirectorySection.Bind(activeDirectoryConfiguration);
            services.Configure<AzureActiveDirectoryConfiguration>(activeDirectorySection.Bind);
            services.AddSingleton(Options.Create(activeDirectoryConfiguration));

            // Swagger configurations
            var swaggerConfiguration = new SwaggerConfiguration
            {
                Title = "Mimir Services",
                Description = "Mimir Rest API",
                Contact = new SwaggerContact
                {
                    Name = "Mimir",
                    Email = "orgmimir@gmail.com"
                },
                Scopes = new List<Scope>
                {
                    new()
                    {
                        Name = $@"api://{activeDirectoryConfiguration.ClientId}/access_as_user",
                        Description = "User impersonation scope"
                    }
                }
            };

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
                    c.SwaggerDoc(description.GroupName, new OpenApiInfo { Title = swaggerConfiguration.Title, Version = description.ApiVersion.ToString(), Description = swaggerConfiguration.Description, Contact = new OpenApiContact { Name = swaggerConfiguration.Contact?.Name, Email = swaggerConfiguration.Contact?.Email } });
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

        public static IApplicationBuilder UseAzureActiveDirectoryModule(this IApplicationBuilder app, AzureActiveDirectoryConfiguration azureConfig, SwaggerConfiguration swaggerConfig)
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

                c.ConfigObject.AdditionalItems.Add("syntaxHighlight", false);
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