﻿using System;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class InterfaceConfiguration : IEntityTypeConfiguration<Interface>
    {
        public void Configure(EntityTypeBuilder<Interface> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Interface");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Version).HasColumnName("Version").IsRequired().HasDefaultValue("1.0");
            builder.Property(p => p.Rds).HasColumnName("Rds").IsRequired(false);
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.Label).HasColumnName("Label").IsRequired(false);
            builder.Property(p => p.Description).HasColumnName("Description").IsRequired(false);
            builder.Property(p => p.StatusId).HasColumnName("StatusId").IsRequired().HasDefaultValue("23BE80E317DA30DBAAA862D672FD1E87");
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);
            builder.Property(p => p.OutputTerminalId).HasColumnName("OutputTerminalId").IsRequired();
            builder.Property(p => p.InputTerminalId).HasColumnName("InputTerminalId").IsRequired();
            builder.Property(p => p.UpdatedBy).HasColumnName("UpdatedBy").IsRequired().HasDefaultValue("Unknown");
            builder.Property(p => p.Updated).HasColumnName("Updated").IsRequired().HasDefaultValue(DateTime.MinValue.ToUniversalTime());
            builder.Property(p => p.CreatedBy).HasColumnName("CreatedBy").IsRequired().HasDefaultValue("Unknown");
            builder.Property(p => p.Created).HasColumnName("Created").IsRequired().HasDefaultValue(DateTime.MinValue.ToUniversalTime());
            builder.Property(p => p.LibraryTypeId).HasColumnName("LibraryTypeId").IsRequired(false);
            
            builder.HasOne(x => x.OutputTerminal).WithMany(y => y.OutputInterfaces).HasForeignKey(x => x.OutputTerminalId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.InputTerminal).WithMany(y => y.InputInterfaces).HasForeignKey(x => x.InputTerminalId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Status).WithMany(y => y.Interfaces).HasForeignKey(x => x.StatusId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
