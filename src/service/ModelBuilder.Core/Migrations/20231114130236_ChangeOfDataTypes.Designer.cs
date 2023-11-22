﻿// <auto-generated />
using System;
using Mb.Models.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Mb.Core.Migrations
{
    [DbContext(typeof(ModelBuilderDbContext))]
    [Migration("20231114130236_ChangeOfDataTypes")]
    partial class ChangeOfDataTypes
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Mb.Models.Data.Attribute", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("Id");

                    b.Property<Guid?>("AttributePredicateId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("AttributePredicateId");

                    b.Property<string>("AttributeType")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("AttributeType");

                    b.Property<Guid?>("BlockId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("BlockId");

                    b.Property<Guid?>("ConnectorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<string>("Qualifiers")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Qualifiers");

                    b.Property<string>("Terminal")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TerminalId");

                    b.Property<string>("UnitSelected")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Units")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Units");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Value");

                    b.HasKey("Id");

                    b.HasIndex("ConnectorId");

                    b.ToTable("Attribute", (string)null);
                });

            modelBuilder.Entity("Mb.Models.Data.Block", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("Id");

                    b.Property<string>("Aspect")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Aspect");

                    b.Property<string>("BlockType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("BlockTypeIri");

                    b.Property<Guid>("BlockTypeIri")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2")
                        .HasColumnName("Created");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("CreatedBy");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Description");

                    b.Property<bool>("IsLocked")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false)
                        .HasColumnName("IsLocked");

                    b.Property<string>("IsLockedStatusBy")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("IsLockedStatusBy");

                    b.Property<DateTime?>("IsLockedStatusDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("IsLockedStatusDate");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<string>("Notation")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Notation");

                    b.Property<string>("PositionBlock")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("PositionBlock");

                    b.Property<string>("PositionTree")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("PositionTree");

                    b.Property<Guid>("Project")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("Project");

                    b.Property<string>("PurposeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("PurposeId");

                    b.Property<string>("SymbolId")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("SymbolId");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2")
                        .HasColumnName("Updated");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("UpdatedBy");

                    b.HasKey("Id");

                    b.HasIndex("Project");

                    b.ToTable("Block", null, t =>
                        {
                            t.Property("BlockTypeIri")
                                .HasColumnName("BlockTypeIri1");
                        });
                });

            modelBuilder.Entity("Mb.Models.Data.Connection", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("Id");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FromConnector")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("FromConnector");

                    b.Property<string>("Handles")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Handles");

                    b.Property<string>("MainProject")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("MainProject");

                    b.Property<Guid>("Project")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("Project");

                    b.Property<string>("ToConnector")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ToConnector");

                    b.HasKey("Id");

                    b.ToTable("Connection", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("Connection");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Mb.Models.Data.Connector", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("Id");

                    b.Property<Guid>("BlockId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Color");

                    b.Property<int>("Direction")
                        .HasColumnType("int");

                    b.Property<string>("Inside")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<string>("Outside")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("TerminalId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("TypeConnector")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Connector", (string)null);
                });

            modelBuilder.Entity("Mb.Models.Data.Project", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("Id");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2")
                        .HasColumnName("Created");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasMaxLength(63)
                        .HasColumnType("nvarchar(63)")
                        .HasColumnName("CreatedBy");

                    b.Property<string>("Description")
                        .HasMaxLength(511)
                        .HasColumnType("nvarchar(511)")
                        .HasColumnName("Description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(63)
                        .HasColumnType("nvarchar(63)")
                        .HasColumnName("Name");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2")
                        .HasColumnName("Updated");

                    b.Property<string>("UpdatedBy")
                        .HasMaxLength(63)
                        .HasColumnType("nvarchar(63)")
                        .HasColumnName("UpdatedBy");

                    b.Property<string>("Version")
                        .IsRequired()
                        .HasMaxLength(7)
                        .HasColumnType("nvarchar(7)")
                        .HasColumnName("Version");

                    b.HasKey("Id");

                    b.ToTable("Project", (string)null);
                });

            modelBuilder.Entity("Mb.Models.Data.Version", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("Id");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2")
                        .HasColumnName("Created");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("CreatedBy");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Data");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Type");

                    b.Property<Guid>("TypeId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("TypeId");

                    b.Property<string>("Ver")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Ver");

                    b.HasKey("Id");

                    b.ToTable("Version", (string)null);
                });

            modelBuilder.Entity("Mb.Models.Data.ConnectionRelationDm", b =>
                {
                    b.HasBaseType("Mb.Models.Data.Connection");

                    b.HasDiscriminator().HasValue("ConnectionRelationDm");
                });

            modelBuilder.Entity("Mb.Models.Data.ConnectionTerminalDm", b =>
                {
                    b.HasBaseType("Mb.Models.Data.Connection");

                    b.Property<string>("TerminalParentType")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TerminalParentType");

                    b.Property<string>("TerminalType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TerminalType");

                    b.HasDiscriminator().HasValue("ConnectionTerminalDm");
                });

            modelBuilder.Entity("Mb.Models.Data.ConnectionFulfilledByDm", b =>
                {
                    b.HasBaseType("Mb.Models.Data.ConnectionRelationDm");

                    b.HasDiscriminator().HasValue("ConnectionFulfilledByDm");
                });

            modelBuilder.Entity("Mb.Models.Data.ConnectionHasLocationDm", b =>
                {
                    b.HasBaseType("Mb.Models.Data.ConnectionRelationDm");

                    b.HasDiscriminator().HasValue("ConnectionHasLocationDm");
                });

            modelBuilder.Entity("Mb.Models.Data.ConnectionPartOfDm", b =>
                {
                    b.HasBaseType("Mb.Models.Data.ConnectionRelationDm");

                    b.HasDiscriminator().HasValue("ConnectionPartOfDm");
                });

            modelBuilder.Entity("Mb.Models.Data.Attribute", b =>
                {
                    b.HasOne("Mb.Models.Data.Connector", null)
                        .WithMany("Attributes")
                        .HasForeignKey("ConnectorId");
                });

            modelBuilder.Entity("Mb.Models.Data.Connector", b =>
                {
                    b.Navigation("Attributes");
                });
#pragma warning restore 612, 618
        }
    }
}
