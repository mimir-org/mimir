using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace ApplicationInsightsLoggingModule
{
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
                InstrumentationKey = insightConfig.InstrumentationKey,
                ConnectionString = insightConfig.ConnectionString,
                EndpointAddress = insightConfig.EndpointAddress,
                EnableAdaptiveSampling = insightConfig.EnableAdaptiveSampling,
                EnableQuickPulseMetricStream = insightConfig.EnablePerformanceCounterCollectionModule,
                DeveloperMode = insightConfig.DeveloperMode
            };

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_InstrumentationKey")))
            {
                aiOptions.InstrumentationKey = Environment.GetEnvironmentVariable("ApplicationInsights_InstrumentationKey");
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_EndpointAddress")))
            {
                aiOptions.EndpointAddress = Environment.GetEnvironmentVariable("ApplicationInsights_EndpointAddress");
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_ConnectionString")))
            {
                aiOptions.ConnectionString = Environment.GetEnvironmentVariable("ApplicationInsights_ConnectionString");
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_EnableAdaptiveSampling")))
            {
                if (bool.TryParse(Environment.GetEnvironmentVariable("ApplicationInsights_EnableAdaptiveSampling"), out var adaptiveSampling))
                    aiOptions.EnableAdaptiveSampling = adaptiveSampling;
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_EnableQuickPulseMetricStream")))
            {
                if (bool.TryParse(Environment.GetEnvironmentVariable("ApplicationInsights_EnableQuickPulseMetricStream"), out var quickPulseMetricStream))
                    aiOptions.EnableQuickPulseMetricStream = quickPulseMetricStream;
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_EnableHeartbeat")))
            {
                if (bool.TryParse(Environment.GetEnvironmentVariable("ApplicationInsights_EnableHeartbeat"), out var enableHeartbeat))
                    aiOptions.EnableHeartbeat = enableHeartbeat;
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_EnableAzureInstanceMetadataTelemetryModule")))
            {
                if (bool.TryParse(Environment.GetEnvironmentVariable("ApplicationInsights_EnableAzureInstanceMetadataTelemetryModule"), out var azureInstanceMetadataTelemetryModule))
                    aiOptions.EnableAzureInstanceMetadataTelemetryModule = azureInstanceMetadataTelemetryModule;
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_EnableDependencyTrackingTelemetryModule")))
            {
                if (bool.TryParse(Environment.GetEnvironmentVariable("ApplicationInsights_EnableDependencyTrackingTelemetryModule"), out var enableDependencyTrackingTelemetryModule))
                    aiOptions.EnableDependencyTrackingTelemetryModule = enableDependencyTrackingTelemetryModule;
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_EnableEventCounterCollectionModule")))
            {
                if (bool.TryParse(Environment.GetEnvironmentVariable("ApplicationInsights_EnableEventCounterCollectionModule"), out var enableEventCounterCollectionModule))
                    aiOptions.EnableEventCounterCollectionModule = enableEventCounterCollectionModule;
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_EnableDiagnosticsTelemetryModule")))
            {
                if (bool.TryParse(Environment.GetEnvironmentVariable("ApplicationInsights_EnableDiagnosticsTelemetryModule"), out var enableDiagnosticsTelemetryModule))
                    aiOptions.EnableDiagnosticsTelemetryModule = enableDiagnosticsTelemetryModule;
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_EnablePerformanceCounterCollectionModule")))
            {
                if (bool.TryParse(Environment.GetEnvironmentVariable("ApplicationInsights_EnablePerformanceCounterCollectionModule"), out var enablePerformanceCounterCollectionModule))
                    aiOptions.EnablePerformanceCounterCollectionModule = enablePerformanceCounterCollectionModule;
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_EnableRequestTrackingTelemetryModule")))
            {
                if (bool.TryParse(Environment.GetEnvironmentVariable("ApplicationInsights_EnableRequestTrackingTelemetryModule"), out var enableRequestTrackingTelemetryModule))
                    aiOptions.EnableRequestTrackingTelemetryModule = enableRequestTrackingTelemetryModule;
            }

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ApplicationInsights_DeveloperMode")))
            {
                if (bool.TryParse(Environment.GetEnvironmentVariable("ApplicationInsights_DeveloperMode"), out var enableDeveloperMode))
                    aiOptions.DeveloperMode = enableDeveloperMode;
            }

            if (!string.IsNullOrEmpty(aiOptions.InstrumentationKey))
            {
                services.AddApplicationInsightsTelemetry(aiOptions);
            }

            services.AddSingleton(Options.Create(insightConfig));

            return services;
        }
    }
}