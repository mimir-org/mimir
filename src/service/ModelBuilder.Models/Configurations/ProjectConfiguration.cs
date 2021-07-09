using System.Collections.Generic;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Project");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.IsSubProject).HasColumnName("IsSubProject").IsRequired();
            builder.Property(p => p.Description).HasColumnName("Description").IsRequired(false);
            builder.Property(p => p.ProjectOwner).HasColumnName("ProjectOwner").IsRequired();
            builder.Property(p => p.UpdatedBy).HasColumnName("UpdatedBy").IsRequired();
            builder.Property(p => p.Updated).HasColumnName("Updated").IsRequired();
            builder.Property(p => p.Version).HasColumnName("Version").IsRequired();

            builder.HasMany(x => x.Edges).WithMany(y => y.Projects).UsingEntity<Dictionary<string, object>>("Project_Edge",
                x => x.HasOne<Edge>().WithMany().HasForeignKey("EdgeId"),
                x => x.HasOne<Project>().WithMany().HasForeignKey("ProjectId"),
                x => x.ToTable("Project_Edge")
                );

            builder.HasMany(x => x.Nodes).WithMany(y => y.Projects).UsingEntity<Dictionary<string, object>>("Project_Node",
                x => x.HasOne<Node>().WithMany().HasForeignKey("NodeId"),
                x => x.HasOne<Project>().WithMany().HasForeignKey("ProjectId"),
                x => x.ToTable("Project_Node")
                );
        }
    }
}
