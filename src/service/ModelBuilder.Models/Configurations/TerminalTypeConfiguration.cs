﻿using System.Collections.Generic;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class TerminalTypeConfiguration : IEntityTypeConfiguration<TerminalType>
    {
        public void Configure(EntityTypeBuilder<TerminalType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("TerminalType");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);

            builder.HasOne(x => x.TerminalCategory).WithMany(y => y.TerminalTypes).HasForeignKey(x => x.TerminalCategoryId).OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Attributes).WithMany(y => y.TerminalTypes).UsingEntity<Dictionary<string, object>>("TerminalTypeAttributeType",
                x => x.HasOne<AttributeType>().WithMany().HasForeignKey("AttributeTypeId"),
                x => x.HasOne<TerminalType>().WithMany().HasForeignKey("TerminalTypeId"),
                x => x.ToTable("TerminalTypeAttributeType")
            );
        }
    }
}
