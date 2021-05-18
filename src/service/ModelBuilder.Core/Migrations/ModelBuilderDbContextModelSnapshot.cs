﻿// <auto-generated />
using System;
using Mb.Models.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Mb.Core.Migrations
{
    [DbContext(typeof(ModelBuilderDbContext))]
    partial class ModelBuilderDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Mb.Models.Data.Attribute", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<string>("Condition")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Condition");

                    b.Property<string>("ConnectorId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("ConnectorId");

                    b.Property<string>("Format")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Format");

                    b.Property<string>("Key")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Key");

                    b.Property<string>("NodeId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("NodeId");

                    b.Property<string>("Qualifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Qualifier");

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Source");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Unit");

                    b.Property<string>("Units")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Units");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Value");

                    b.HasKey("Id");

                    b.HasIndex("ConnectorId");

                    b.HasIndex("NodeId");

                    b.ToTable("Attribute");
                });

            modelBuilder.Entity("Mb.Models.Data.AttributeType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Aspect")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Aspect");

                    b.Property<string>("Condition")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Condition");

                    b.Property<string>("Entity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Entity");

                    b.Property<string>("Format")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Format");

                    b.Property<bool>("IsInterface")
                        .HasColumnType("bit")
                        .HasColumnName("IsInterface");

                    b.Property<bool>("IsTerminalType")
                        .HasColumnType("bit")
                        .HasColumnName("IsTerminalType");

                    b.Property<string>("Qualifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Qualifier");

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Source");

                    b.Property<string>("Units")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Units");

                    b.HasKey("Id");

                    b.ToTable("AttributeType");
                });

            modelBuilder.Entity("Mb.Models.Data.Connector", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<string>("NodeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("NodeId");

                    b.Property<string>("RelationType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("RelationType");

                    b.Property<string>("SemanticReference")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TerminalCategory")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TerminalCategory");

                    b.Property<string>("TerminalType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TerminalType");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Type");

                    b.HasKey("Id");

                    b.HasIndex("NodeId");

                    b.ToTable("Connector");
                });

            modelBuilder.Entity("Mb.Models.Data.Edge", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<string>("FromConnector")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("FromConnector");

                    b.Property<string>("FromNode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("FromNode");

                    b.Property<string>("ParentType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ParentType");

                    b.Property<string>("TargetType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TargetType");

                    b.Property<string>("ToConnector")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ToConnector");

                    b.Property<string>("ToNode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ToNode");

                    b.HasKey("Id");

                    b.ToTable("Edge");
                });

            modelBuilder.Entity("Mb.Models.Data.LibraryTypeComponent", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<string>("Aspect")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Aspect");

                    b.Property<string>("AttributeJson")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("AttributeJson");

                    b.Property<string>("ObjectType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ObjectType");

                    b.Property<string>("Rds")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Rds");

                    b.Property<string>("RdsCategory")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("RdsCategory");

                    b.Property<string>("SemanticRdsReference")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("SemanticRdsReference");

                    b.Property<string>("SemanticReference")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("SemanticReference");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Status");

                    b.Property<string>("TerminalJson")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TerminalJson");

                    b.Property<string>("TypeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TypeName");

                    b.Property<string>("Version")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Version");

                    b.HasKey("Id");

                    b.ToTable("LibraryTypeComponent");
                });

            modelBuilder.Entity("Mb.Models.Data.Node", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Description");

                    b.Property<int>("Height")
                        .HasColumnType("int")
                        .HasColumnName("Height");

                    b.Property<string>("Icon")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Icon");

                    b.Property<bool>("IsLocked")
                        .HasColumnType("bit")
                        .HasColumnName("IsLocked");

                    b.Property<bool>("IsSelected")
                        .HasColumnType("bit")
                        .HasColumnName("IsSelected");

                    b.Property<string>("Label")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Label");

                    b.Property<int>("Length")
                        .HasColumnType("int")
                        .HasColumnName("Length");

                    b.Property<int>("MaxTemp")
                        .HasColumnType("int")
                        .HasColumnName("MaxTemp");

                    b.Property<int>("MinTemp")
                        .HasColumnType("int")
                        .HasColumnName("MinTemp");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<int>("NoiceRestriction")
                        .HasColumnType("int")
                        .HasColumnName("NoiceRestriction");

                    b.Property<decimal>("PositionBlockX")
                        .HasColumnType("decimal(18,4)")
                        .HasColumnName("PositionBlockX");

                    b.Property<decimal>("PositionBlockY")
                        .HasColumnType("decimal(18,4)")
                        .HasColumnName("PositionBlockY");

                    b.Property<decimal>("PositionX")
                        .HasColumnType("decimal(18,4)")
                        .HasColumnName("PositionX");

                    b.Property<decimal>("PositionY")
                        .HasColumnType("decimal(18,4)")
                        .HasColumnName("PositionY");

                    b.Property<int>("RelativeToPlatformEast")
                        .HasColumnType("int")
                        .HasColumnName("RelativeToPlatformEast");

                    b.Property<int>("RelativeToPlatformNorth")
                        .HasColumnType("int")
                        .HasColumnName("RelativeToPlatformNorth");

                    b.Property<int>("RelativeToPlatformZeroPoint")
                        .HasColumnType("int")
                        .HasColumnName("RelativeToPlatformZeroPoint");

                    b.Property<string>("SemanticId")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("SemanticId");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Status");

                    b.Property<string>("TagNumber")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TagNumber");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Type");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("datetime2")
                        .HasColumnName("Updated");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("UpdatedBy");

                    b.Property<string>("Version")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Version");

                    b.Property<int>("Width")
                        .HasColumnType("int")
                        .HasColumnName("Width");

                    b.HasKey("Id");

                    b.ToTable("Node");
                });

            modelBuilder.Entity("Mb.Models.Data.Project", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<string>("ParentId")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ParentId");

                    b.Property<string>("ProjectOwner")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ProjectOwner");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("datetime2")
                        .HasColumnName("Updated");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("UpdatedBy");

                    b.Property<string>("Version")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Version");

                    b.HasKey("Id");

                    b.ToTable("Project");
                });

            modelBuilder.Entity("Mb.Models.Data.Rds", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Category");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Code");

                    b.Property<bool>("IsFunction")
                        .HasColumnType("bit")
                        .HasColumnName("IsFunction");

                    b.Property<bool>("IsLocation")
                        .HasColumnType("bit")
                        .HasColumnName("IsLocation");

                    b.Property<bool>("IsProduct")
                        .HasColumnType("bit")
                        .HasColumnName("IsProduct");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<string>("SemanticReference")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("SemanticReference");

                    b.HasKey("Id");

                    b.HasIndex("Code", "Category")
                        .IsUnique();

                    b.ToTable("Rds");
                });

            modelBuilder.Entity("ProjectEdge", b =>
                {
                    b.Property<string>("EdgeId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProjectId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("EdgeId", "ProjectId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectEdge");
                });

            modelBuilder.Entity("ProjectNode", b =>
                {
                    b.Property<string>("NodeId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProjectId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("NodeId", "ProjectId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectNode");
                });

            modelBuilder.Entity("Mb.Models.Data.Attribute", b =>
                {
                    b.HasOne("Mb.Models.Data.Connector", "Connector")
                        .WithMany("Attributes")
                        .HasForeignKey("ConnectorId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Mb.Models.Data.Node", "Node")
                        .WithMany("Attributes")
                        .HasForeignKey("NodeId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Connector");

                    b.Navigation("Node");
                });

            modelBuilder.Entity("Mb.Models.Data.Connector", b =>
                {
                    b.HasOne("Mb.Models.Data.Node", "Node")
                        .WithMany("Connectors")
                        .HasForeignKey("NodeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Node");
                });

            modelBuilder.Entity("ProjectEdge", b =>
                {
                    b.HasOne("Mb.Models.Data.Edge", null)
                        .WithMany()
                        .HasForeignKey("EdgeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Mb.Models.Data.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ProjectNode", b =>
                {
                    b.HasOne("Mb.Models.Data.Node", null)
                        .WithMany()
                        .HasForeignKey("NodeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Mb.Models.Data.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Mb.Models.Data.Connector", b =>
                {
                    b.Navigation("Attributes");
                });

            modelBuilder.Entity("Mb.Models.Data.Node", b =>
                {
                    b.Navigation("Attributes");

                    b.Navigation("Connectors");
                });
#pragma warning restore 612, 618
        }
    }
}
