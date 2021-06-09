using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Microsoft.EntityFrameworkCore;

namespace Mb.Models.Configurations
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
        public virtual DbSet<LibraryType> LibraryTypes { get; set; }
        public virtual DbSet<Contractor> Contractors { get; set; }
        public virtual DbSet<TerminalType> TerminalTypes { get; set; }
        public virtual DbSet<EnumBase> Enums { get; set; }
        public virtual DbSet<Unit> Units { get; set; }
        public virtual DbSet<AttributeCondition> AttributeConditions { get; set; }

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
            modelBuilder.ApplyConfiguration(new LibraryTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ContractorConfiguration());
            modelBuilder.ApplyConfiguration(new TerminalTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EnumBaseConfiguration());
        }
    }
}
