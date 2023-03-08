using System;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Models.Configurations
{
    public class ModelBuilderDbContext : DbContext
    {
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<AspectObject> Nodes { get; set; }
        public virtual DbSet<Connection> Connections { get; set; }
        public virtual DbSet<Attribute> Attributes { get; set; }
        public virtual DbSet<Connector> Connectors { get; set; }
        public virtual DbSet<ConnectorRelation> ConnectorRelations { get; set; }
        public virtual DbSet<ConnectorTerminal> ConnectorTerminals { get; set; }

        public ModelBuilderDbContext(DbContextOptions<ModelBuilderDbContext> options) : base(options)
        {
            // ReSharper disable once VirtualMemberCallInConstructor
            Database.SetCommandTimeout(TimeSpan.FromMinutes(10));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new ProjectConfiguration());
            modelBuilder.ApplyConfiguration(new AspectObjectConfiguration());
            modelBuilder.ApplyConfiguration(new ConnectionConfiguration());
            modelBuilder.ApplyConfiguration(new AttributeConfiguration());
            modelBuilder.ApplyConfiguration(new ConnectorConfiguration());
            modelBuilder.ApplyConfiguration(new VersionConfiguration());
        }
    }
}