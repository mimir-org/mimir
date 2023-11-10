using System;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Models.Configurations;

public class ModelBuilderDbContext : DbContext
{
    public virtual DbSet<Project> Projects { get; set; }
    public virtual DbSet<Block> Blocks { get; set; }
    public virtual DbSet<Connection> Connections { get; set; }
    public virtual DbSet<Attribute> Attributes { get; set; }
    public virtual DbSet<Connector> Connectors { get; set; }

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
        modelBuilder.ApplyConfiguration(new BlockConfiguration());
        modelBuilder.ApplyConfiguration(new AttributeConfiguration());
        modelBuilder.ApplyConfiguration(new VersionConfiguration());
    }
}