using System;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Models.Configurations
{
    public class ModelBuilderDbContext : DbContext
    {
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<Node> Nodes { get; set; }
        public virtual DbSet<Edge> Edges { get; set; }
        public virtual DbSet<Attribute> Attributes { get; set; }
        public virtual DbSet<Connector> Connectors { get; set; }
        public virtual DbSet<Relation> Relations { get; set; }
        public virtual DbSet<Terminal> Terminals { get; set; }

        public ModelBuilderDbContext(DbContextOptions<ModelBuilderDbContext> options) : base(options)
        {
            // ReSharper disable once VirtualMemberCallInConstructor
            Database.SetCommandTimeout(TimeSpan.FromMinutes(10));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new ProjectConfiguration());
            modelBuilder.ApplyConfiguration(new NodeConfiguration());
            modelBuilder.ApplyConfiguration(new EdgeConfiguration());
            modelBuilder.ApplyConfiguration(new AttributeConfiguration());
            modelBuilder.ApplyConfiguration(new ConnectorConfiguration());
            modelBuilder.ApplyConfiguration(new RelationConfiguration());
            modelBuilder.ApplyConfiguration(new TerminalConfiguration());
            modelBuilder.ApplyConfiguration(new VersionConfiguration());
        }
    }
}