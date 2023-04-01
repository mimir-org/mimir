using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Mb.Models.Attributes;
using Mb.Models.Extensions;
using Microsoft.Extensions.DependencyInjection;

namespace Mb.Core.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddServicesWithAttributeOfType<T>(this IServiceCollection serviceCollection, List<Assembly> assembliesToBeScanned) where T : Attribute
    {
        if (assembliesToBeScanned == null || !assembliesToBeScanned.Any())
            return;

        var serviceLifetime = typeof(T).Name switch
        {
            nameof(SingletonAttribute) => ServiceLifetime.Singleton,
            nameof(TransientAttribute) => ServiceLifetime.Transient,
            nameof(ScopeAttribute) => ServiceLifetime.Scoped,
            _ => throw new ArgumentException($"The type {typeof(T).Name} is not a valid attribute type in this context.")
        };

        var serviceTypes = assembliesToBeScanned.SelectMany(assembly => assembly.GetTypes()).Where(type => type.IsDefined(typeof(T), false)).ToList();

        foreach (var serviceType in serviceTypes)
        {
            var implementations = serviceType.GetImplementations(assembliesToBeScanned);

            if (implementations.Any())
                serviceCollection.CreateServiceDescriptorsFromImplementationList(serviceType, implementations, serviceLifetime);
            else
                serviceCollection.CreateServiceDescriptorsFromServiceType(serviceType, serviceLifetime);
        }
    }

    public static void CreateServiceDescriptorsFromImplementationList(this IServiceCollection serviceCollection, Type serviceType, List<Type> implementations, ServiceLifetime serviceLifetime)
    {
        if (implementations == null || !implementations.Any())
            return;

        foreach (var implementation in implementations)
        {
            var isGenericTypeDefinition = implementation.IsGenericType && implementation.IsGenericTypeDefinition;
            var service = isGenericTypeDefinition
                          && serviceType.IsGenericType
                          && serviceType.IsGenericTypeDefinition == false
                          && serviceType.ContainsGenericParameters
                ? serviceType.GetGenericTypeDefinition()
                : serviceType;

            var isAlreadyRegistered = serviceCollection.Any(s => s.ServiceType == service && s.ImplementationType == implementation);

            if (!isAlreadyRegistered)
                serviceCollection.Add(new ServiceDescriptor(service, implementation, serviceLifetime));
        }
    }

    public static void CreateServiceDescriptorsFromServiceType(this IServiceCollection serviceCollection, Type serviceType, ServiceLifetime serviceLifetime)
    {
        if (!serviceType.IsClass)
            return;

        var isAlreadyRegistered = serviceCollection.Any(s => s.ServiceType == serviceType && s.ImplementationType == serviceType);

        if (!isAlreadyRegistered)
            serviceCollection.Add(new ServiceDescriptor(serviceType, serviceType, serviceLifetime));
    }
}