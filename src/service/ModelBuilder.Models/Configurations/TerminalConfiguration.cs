﻿using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class TerminalConfiguration : IEntityTypeConfiguration<Terminal>
    {
        public void Configure(EntityTypeBuilder<Terminal> builder)
        {
            builder.Property(p => p.TerminalCategoryId).HasColumnName("TerminalCategoryId").IsRequired();
            builder.HasOne(x => x.TerminalCategory).WithMany(y => y.Terminals).HasForeignKey(x => x.TerminalCategoryId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
