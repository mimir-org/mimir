using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace ApplicationInsightsLoggingModule;

public static class ApplicationInsightsLoggingModule
{
    public static IServiceCollection AddApplicationInsightsLoggingModule(this IServiceCollection services)
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory());

        builder.AddJsonFile("appsettings.json");
        builder.AddJsonFile($"appsettings.{environment}.json", true);
        builder.AddJsonFile("appsettings.local.json", true);
        builder.AddEnvironmentVariables();

        var config = builder.Build();

        var insightConfig = new ApplicationInsights();
        var insightConfiguration = config.GetSection("ApplicationInsights");
        insightConfiguration.Bind(insightConfig);

        var aiOptions = new Microsoft.ApplicationInsights.AspNetCore.Extensions.ApplicationInsightsServiceOptions
        {
            ConnectionString = insightConfig.ConnectionString,
            EnableAdaptiveSampling = insightConfig.EnableAdaptiveSampling,
            EnableQuickPulseMetricStream = insightConfig.EnableQuickPulseMetricStream,
            EnablePerformanceCounterCollectionModule = insightConfig.EnablePerformanceCounterCollectionModule,
            EnableHeartbeat = insightConfig.EnableHeartbeat,
            EnableAzureInstanceMetadataTelemetryModule = insightConfig.EnableAzureInstanceMetadataTelemetryModule,
            EnableDependencyTrackingTelemetryModule = insightConfig.EnableDependencyTrackingTelemetryModule,
            EnableEventCounterCollectionModule = insightConfig.EnableEventCounterCollectionModule,
            EnableDiagnosticsTelemetryModule = insightConfig.EnableDiagnosticsTelemetryModule,
            EnableRequestTrackingTelemetryModule = insightConfig.EnableRequestTrackingTelemetryModule,
            DeveloperMode = insightConfig.DeveloperMode
        };

        if (!string.IsNullOrEmpty(aiOptions.ConnectionString))
        {
            services.AddApplicationInsightsTelemetry(aiOptions);
        }

        services.AddSingleton(Options.Create(insightConfig));

        return services;
    }
}