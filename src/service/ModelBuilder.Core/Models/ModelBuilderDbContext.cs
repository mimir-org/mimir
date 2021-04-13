﻿using Mb.Core.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core.Models
{
    public class ModelBuilderDbContext : DbContext
    {
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<Node> Nodes { get; set; }
        public virtual DbSet<Edge> Edges { get; set; }
        public virtual DbSet<Attribute> Attributes { get; set; }
        public virtual DbSet<Connector> Connectors { get; set; }

        public ModelBuilderDbContext(DbContextOptions<ModelBuilderDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new ProjectConfiguration());
            modelBuilder.ApplyConfiguration(new NodeConfiguration());
            modelBuilder.ApplyConfiguration(new EdgeConfiguration());
            modelBuilder.ApplyConfiguration(new AttributeConfiguration());
            modelBuilder.ApplyConfiguration(new ConnectorConfiguration());

        }
    }
}
