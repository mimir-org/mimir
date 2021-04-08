using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ModelBuilder.Models;

namespace ModelBuilder
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public virtual void ConfigureServices(IServiceCollection services)
        {
            var azureAd = Configuration.GetSection("AzureAd");
            Console.WriteLine(azureAd);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(
                    options =>
                    {
                        Configuration.GetSection("AzureAD").Bind(options);
                        options.Events ??= new JwtBearerEvents();
                        options.Events.OnMessageReceived += context =>
                        {
                            var accessToken = context.HttpContext.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (path.StartsWithSegments("/cacheEventHub"))
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        };
                    },
                    
                    options =>
                    {
                        Configuration.GetSection("AzureAD").Bind(options);
                    })
                .EnableTokenAcquisitionToCallDownstreamApi(options => Configuration.GetSection("AzureAD").Bind(options))
                .AddDistributedTokenCaches();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod()
                        .AllowCredentials().SetIsOriginAllowedToAllowWildcardSubdomains();
                });
            });


            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ModelBuilder", Version = "v1", Description = "", Contact = new OpenApiContact { Name = "FAM", Email = "rliab@equinor.com" }});
                c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new System.Uri($"{azureAd.GetValue<string>("Instance")}{azureAd.GetValue<string>("TenantId")}/oauth2/v2.0/authorize"),
                            Scopes = new Dictionary<string, string>
                            {
                                { "api://2967244a-662f-4462-82bd-7f9bca0a3683/user_impersonation", "Sign in on your behalf" }
                            }
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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public virtual void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var azureAd = Configuration.GetSection("AzureAd");
            Console.WriteLine(azureAd);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHttpsRedirection();
            }

            app.UseCors("CorsPolicy");
            app.UseSwagger();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "ModelBuilder v1");
                    options.OAuthClientId(azureAd.GetValue<string>("ClientId"));
                    options.OAuthAppName("Swagger Api Calls");
                });

            
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
