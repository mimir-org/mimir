﻿using System.Collections.Generic;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Data.TypeEditor.EnumTypes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class AttributeTypeConfiguration : IEntityTypeConfiguration<AttributeType>
    {
       
        public void Configure(EntityTypeBuilder<AttributeType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("AttributeType");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Entity).HasColumnName("Entity").IsRequired();
            builder.Property(p => p.Aspect).HasColumnName("Aspect").IsRequired().HasConversion<string>();
            builder.Property(p => p.SelectValuesString).HasColumnName("SelectValuesString").IsRequired(false);
            builder.Property(p => p.SelectType).HasColumnName("SelectType").IsRequired().HasConversion<string>();
            builder.Property(p => p.Discipline).HasColumnName("Discipline").IsRequired().HasConversion<string>();

            builder.HasOne(x => x.Condition).WithMany(y => y.AttributeTypes).HasForeignKey(x => x.ConditionId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Qualifier).WithMany(y => y.AttributeTypes).HasForeignKey(x => x.QualifierId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Source).WithMany(y => y.AttributeTypes).HasForeignKey(x => x.SourceId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Format).WithMany(y => y.AttributeTypes).HasForeignKey(x => x.FormatId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Format).WithMany(y => y.AttributeTypes).HasForeignKey(x => x.FormatId).OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(x => x.Units).WithMany(y => y.AttributeTypes).UsingEntity<Dictionary<string, object>>("AttributeType_Unit",
                x => x.HasOne<Unit>().WithMany().HasForeignKey("UnitId"),
                x => x.HasOne<AttributeType>().WithMany().HasForeignKey("AttributeTypeId"),
                x => x.ToTable("AttributeType_Unit")
            );

            builder.HasMany(x => x.NodeTypes).WithMany(y => y.AttributeTypes).UsingEntity<Dictionary<string, object>>("NodeType_AttributeType",
                x => x.HasOne<NodeType>().WithMany().HasForeignKey("NodeTypeId"),
                x => x.HasOne<AttributeType>().WithMany().HasForeignKey("AttributeTypeId"),
                x => x.ToTable("NodeType_AttributeType")
            );

            builder.HasMany(x => x.TransportTypes).WithMany(y => y.AttributeTypes).UsingEntity<Dictionary<string, object>>("TransportType_AttributeType",
                x => x.HasOne<TransportType>().WithMany().HasForeignKey("TransportTypeId"),
                x => x.HasOne<AttributeType>().WithMany().HasForeignKey("AttributeTypeId"),
                x => x.ToTable("TransportType_AttributeType")
            );

            builder.HasMany(x => x.CompositeTypes).WithMany(y => y.AttributeTypes).UsingEntity<Dictionary<string, object>>("CompositeType_AttributeType",
                x => x.HasOne<CompositeType>().WithMany().HasForeignKey("CompositeTypeId"),
                x => x.HasOne<AttributeType>().WithMany().HasForeignKey("AttributeTypeId"),
                x => x.ToTable("CompositeType_AttributeType")
            );
        }
    }
}
