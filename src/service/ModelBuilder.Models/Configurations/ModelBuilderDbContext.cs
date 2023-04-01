using System;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using AttributeDm = Mb.Models.Data.AttributeDm;

namespace Mb.Models.Configurations;

public class ModelBuilderDbContext : DbContext
{
    public virtual DbSet<ProjectDm> Projects { get; set; }
    public virtual DbSet<AspectObjectDm> AspectObjects { get; set; }
    public virtual DbSet<ConnectionDm> Connections { get; set; }
    public virtual DbSet<AttributeDm> Attributes { get; set; }
    public virtual DbSet<ConnectorDm> Connectors { get; set; }

    public ModelBuilderDbContext(DbContextOptions<ModelBuilderDbContext> options) : base(options)
    {
        // ReSharper disable once VirtualMemberCallInConstructor
        Database.SetCommandTimeout(TimeSpan.FromMinutes(10));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new ConnectionConfiguration());
        modelBuilder.ApplyConfiguration(new ConnectionTerminalConfiguration());
        modelBuilder.ApplyConfiguration(new ConnectionRelationConfiguration());
        modelBuilder.ApplyConfiguration(new ConnectionPartOfConfiguration());
        modelBuilder.ApplyConfiguration(new ConnectionFulfilledByConfiguration());
        modelBuilder.ApplyConfiguration(new ConnectionHasLocationConfiguration());

        modelBuilder.ApplyConfiguration(new ConnectorConfiguration());
        modelBuilder.ApplyConfiguration(new ConnectorTerminalConfiguration());
        modelBuilder.ApplyConfiguration(new ConnectorRelationConfiguration());
        modelBuilder.ApplyConfiguration(new ConnectorPartOfConfiguration());
        modelBuilder.ApplyConfiguration(new ConnectorFulfilledByConfiguration());
        modelBuilder.ApplyConfiguration(new ConnectorHasLocationConfiguration());

        modelBuilder.ApplyConfiguration(new ProjectConfiguration());
        modelBuilder.ApplyConfiguration(new AspectObjectConfiguration());
        modelBuilder.ApplyConfiguration(new AttributeConfiguration());
        modelBuilder.ApplyConfiguration(new VersionConfiguration());
    }
}