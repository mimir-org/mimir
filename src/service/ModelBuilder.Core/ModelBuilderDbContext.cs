using Mb.Core.Configurations;
using Mb.Models;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core
{
    public class ModelBuilderDbContext : DbContext
    {
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<Node> Nodes { get; set; }
        public virtual DbSet<Edge> Edges { get; set; }
        public virtual DbSet<Attribute> Attributes { get; set; }
        public virtual DbSet<Connector> Connectors { get; set; }
        public virtual DbSet<Rds> Rds { get; set; }
        public virtual DbSet<AttributeType> AttributeTypes { get; set; }
        public virtual DbSet<LibraryTypeComponent> LibraryTypeComponents { get; set; }

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
            modelBuilder.ApplyConfiguration(new RdsConfiguration());
            modelBuilder.ApplyConfiguration(new AttributeTypeConfiguration());
            modelBuilder.ApplyConfiguration(new LibraryTypeComponentConfiguration());

        }
    }
}
