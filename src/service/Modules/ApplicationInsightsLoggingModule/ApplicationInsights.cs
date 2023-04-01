namespace ApplicationInsightsLoggingModule;

public class ApplicationInsights
{
    public string ConnectionString { get; set; }
    public bool EnableAdaptiveSampling { get; set; }
    public bool EnableQuickPulseMetricStream { get; set; }
    public bool EnablePerformanceCounterCollectionModule { get; set; }
    public bool EnableHeartbeat { get; set; }
    public bool EnableAzureInstanceMetadataTelemetryModule { get; set; }
    public bool EnableDependencyTrackingTelemetryModule { get; set; }
    public bool EnableEventCounterCollectionModule { get; set; }
    public bool EnableDiagnosticsTelemetryModule { get; set; }
    public bool EnableRequestTrackingTelemetryModule { get; set; }
    public bool DeveloperMode { get; set; }
}