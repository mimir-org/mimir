﻿// <auto-generated />
using System;
using Mb.Models.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Mb.Core.Migrations
{
    [DbContext(typeof(ModelBuilderDbContext))]
    partial class ModelBuilderDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Mb.Models.Data.Attribute", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<string>("AttributeTypeId")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("AttributeTypeId");

                    b.Property<string>("AttributeTypeIri")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("AttributeTypeIri");

                    b.Property<int>("Discipline")
                        .HasColumnType("int")
                        .HasColumnName("Discipline");

                    b.Property<string>("Entity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Entity");

                    b.Property<string>("InterfaceId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("InterfaceId");

                    b.Property<string>("InterfaceIri")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("InterfaceIri");

                    b.Property<string>("Iri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Iri");

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

                    b.Property<string>("NodeId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("NodeId");

                    b.Property<string>("NodeIri")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NodeIri");

                    b.Property<string>("RangeSpecifying")
                        .HasMaxLength(127)
                        .HasColumnType("nvarchar(127)")
                        .HasColumnName("RangeSpecifying");

                    b.Property<string>("RegularitySpecified")
                        .HasMaxLength(127)
                        .HasColumnType("nvarchar(127)")
                        .HasColumnName("RegularitySpecified");

                    b.Property<int>("SelectType")
                        .HasColumnType("int")
                        .HasColumnName("SelectType");

                    b.Property<string>("SelectValuesString")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("SelectValuesString");

                    b.Property<string>("SelectedUnitId")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("SelectedUnitId");

                    b.Property<string>("SpecifiedProvenance")
                        .HasMaxLength(127)
                        .HasColumnType("nvarchar(127)")
                        .HasColumnName("SpecifiedProvenance");

                    b.Property<string>("SpecifiedScope")
                        .HasMaxLength(127)
                        .HasColumnType("nvarchar(127)")
                        .HasColumnName("SpecifiedScope");

                    b.Property<string>("TerminalId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("TerminalId");

                    b.Property<string>("TerminalIri")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TerminalIri");

                    b.Property<string>("TransportId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("TransportId");

                    b.Property<string>("TransportIri")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TransportIri");

                    b.Property<string>("TypeReferenceString")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TypeReferenceString");

                    b.Property<string>("UnitString")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("UnitString");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Value");

                    b.HasKey("Id");

                    b.HasIndex("InterfaceId");

                    b.HasIndex("NodeId");

                    b.HasIndex("TerminalId");

                    b.HasIndex("TransportId");

                    b.ToTable("Attribute", (string)null);
                });

            modelBuilder.Entity("Mb.Models.Data.Connector", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<int>("ConnectorVisibility")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValue(0)
                        .HasColumnName("ConnectorVisibility");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Iri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Iri");

                    b.Property<bool>("IsRequired")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false)
                        .HasColumnName("IsRequired");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<string>("NodeId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("NodeId");

                    b.Property<string>("NodeIri")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NodeIri");

                    b.Property<int>("Type")
                        .HasColumnType("int")
                        .HasColumnName("Type");

                    b.HasKey("Id");

                    b.HasIndex("NodeId");

                    b.ToTable("Connector", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("Connector");
                });

            modelBuilder.Entity("Mb.Models.Data.Edge", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<string>("FromConnectorId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("FromConnectorId");

                    b.Property<string>("FromConnectorIri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("FromConnectorIri");

                    b.Property<string>("FromNodeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("FromNodeId");

                    b.Property<string>("FromNodeIri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("FromNodeIri");

                    b.Property<string>("InterfaceId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("InterfaceId");

                    b.Property<string>("Iri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Iri");

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

                    b.Property<string>("MasterProjectId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("MasterProjectId");

                    b.Property<string>("MasterProjectIri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("MasterProjectIri");

                    b.Property<string>("ProjectId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("ProjectId");

                    b.Property<string>("ProjectIri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ProjectIri");

                    b.Property<string>("ToConnectorId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("ToConnectorId");

                    b.Property<string>("ToConnectorIri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ToConnectorIri");

                    b.Property<string>("ToNodeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("ToNodeId");

                    b.Property<string>("ToNodeIri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ToNodeIri");

                    b.Property<string>("TransportId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("TransportId");

                    b.HasKey("Id");

                    b.HasIndex("FromConnectorId");

                    b.HasIndex("FromNodeId");

                    b.HasIndex("InterfaceId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("ToConnectorId");

                    b.HasIndex("ToNodeId");

                    b.HasIndex("TransportId");

                    b.ToTable("Edge", (string)null);
                });

            modelBuilder.Entity("Mb.Models.Data.Interface", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<DateTime?>("Created")
                        .IsRequired()
                        .HasColumnType("datetime2")
                        .HasColumnName("Created");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("CreatedBy");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Description");

                    b.Property<string>("InputTerminalId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("InputTerminalId");

                    b.Property<string>("Iri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Iri");

                    b.Property<string>("Label")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Label");

                    b.Property<string>("LibraryTypeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("LibraryTypeId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<string>("OutputTerminalId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("OutputTerminalId");

                    b.Property<string>("Rds")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Rds");

                    b.Property<string>("TypeReferenceString")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TypeReferenceString");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2")
                        .HasColumnName("Updated");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("UpdatedBy");

                    b.Property<string>("Version")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("1.0")
                        .HasColumnName("Version");

                    b.HasKey("Id");

                    b.HasIndex("InputTerminalId");

                    b.HasIndex("OutputTerminalId");

                    b.ToTable("Interface", (string)null);
                });

            modelBuilder.Entity("Mb.Models.Data.Node", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<string>("Aspect")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Aspect");

                    b.Property<DateTime?>("Created")
                        .IsRequired()
                        .HasColumnType("datetime2")
                        .HasColumnName("Created");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("CreatedBy");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Description");

                    b.Property<int?>("Height")
                        .HasColumnType("int")
                        .HasColumnName("Height");

                    b.Property<string>("Iri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Iri");

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

                    b.Property<bool>("IsRoot")
                        .HasColumnType("bit")
                        .HasColumnName("IsRoot");

                    b.Property<string>("Label")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Label");

                    b.Property<int>("Level")
                        .HasColumnType("int")
                        .HasColumnName("Level");

                    b.Property<string>("LibraryTypeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("LibraryTypeId");

                    b.Property<string>("MasterProjectId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("MasterProjectId");

                    b.Property<string>("MasterProjectIri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("MasterProjectIri");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Name");

                    b.Property<int>("Order")
                        .HasColumnType("int")
                        .HasColumnName("Order");

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

                    b.Property<string>("ProjectId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("ProjectId");

                    b.Property<string>("ProjectIri")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("ProjectIri");

                    b.Property<string>("PurposeString")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("PurposeString");

                    b.Property<string>("Rds")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Rds");

                    b.Property<string>("Symbol")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Symbol");

                    b.Property<string>("TypeReferenceString")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TypeReferenceString");

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

                    b.Property<int?>("Width")
                        .HasColumnType("int")
                        .HasColumnName("Width");

                    b.HasKey("Id");

                    b.HasIndex("Name");

                    b.HasIndex("ProjectId");

                    b.HasIndex("ProjectIri");

                    b.ToTable("Node", (string)null);
                });

            modelBuilder.Entity("Mb.Models.Data.Project", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<string>("Description")
                        .HasMaxLength(511)
                        .HasColumnType("nvarchar(511)")
                        .HasColumnName("Description");

                    b.Property<string>("Iri")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Iri");

                    b.Property<bool>("IsSubProject")
                        .HasColumnType("bit")
                        .HasColumnName("IsSubProject");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(63)
                        .HasColumnType("nvarchar(63)")
                        .HasColumnName("Name");

                    b.Property<string>("ProjectOwner")
                        .IsRequired()
                        .HasMaxLength(63)
                        .HasColumnType("nvarchar(63)")
                        .HasColumnName("ProjectOwner");

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

            modelBuilder.Entity("Mb.Models.Data.Transport", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

                    b.Property<DateTime?>("Created")
                        .IsRequired()
                        .HasColumnType("datetime2")
                        .HasColumnName("Created");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("CreatedBy");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Description");

                    b.Property<string>("InputTerminalId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("InputTerminalId");

                    b.Property<string>("Iri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Iri");

                    b.Property<string>("Label")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Label");

                    b.Property<string>("LibraryTypeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("LibraryTypeId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<string>("OutputTerminalId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("OutputTerminalId");

                    b.Property<string>("Rds")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Rds");

                    b.Property<string>("TypeReferenceString")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TypeReferenceString");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2")
                        .HasColumnName("Updated");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("UpdatedBy");

                    b.Property<string>("Version")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("1.0")
                        .HasColumnName("Version");

                    b.HasKey("Id");

                    b.HasIndex("InputTerminalId");

                    b.HasIndex("OutputTerminalId");

                    b.ToTable("Transport", (string)null);
                });

            modelBuilder.Entity("Mb.Models.Data.Version", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

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

                    b.Property<string>("TypeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TypeId");

                    b.Property<string>("Ver")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Ver");

                    b.HasKey("Id");

                    b.ToTable("Version", (string)null);
                });

            modelBuilder.Entity("Mb.Models.Data.Relation", b =>
                {
                    b.HasBaseType("Mb.Models.Data.Connector");

                    b.Property<int>("RelationType")
                        .HasColumnType("int")
                        .HasColumnName("RelationType");

                    b.HasDiscriminator().HasValue("Relation");
                });

            modelBuilder.Entity("Mb.Models.Data.Terminal", b =>
                {
                    b.HasBaseType("Mb.Models.Data.Connector");

                    b.Property<string>("Color")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TerminalCategory")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TerminalCategory");

                    b.Property<string>("TerminalTypeId")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TerminalTypeId");

                    b.Property<string>("TerminalTypeIri")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TerminalTypeIri");

                    b.Property<string>("TypeReferenceString")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("TypeReferenceString");

                    b.HasDiscriminator().HasValue("Terminal");
                });

            modelBuilder.Entity("Mb.Models.Data.Attribute", b =>
                {
                    b.HasOne("Mb.Models.Data.Interface", "Interface")
                        .WithMany("Attributes")
                        .HasForeignKey("InterfaceId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Mb.Models.Data.Node", "Node")
                        .WithMany("Attributes")
                        .HasForeignKey("NodeId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Mb.Models.Data.Terminal", "Terminal")
                        .WithMany("Attributes")
                        .HasForeignKey("TerminalId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Mb.Models.Data.Transport", "Transport")
                        .WithMany("Attributes")
                        .HasForeignKey("TransportId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Interface");

                    b.Navigation("Node");

                    b.Navigation("Terminal");

                    b.Navigation("Transport");
                });

            modelBuilder.Entity("Mb.Models.Data.Connector", b =>
                {
                    b.HasOne("Mb.Models.Data.Node", "Node")
                        .WithMany("Connectors")
                        .HasForeignKey("NodeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Node");
                });

            modelBuilder.Entity("Mb.Models.Data.Edge", b =>
                {
                    b.HasOne("Mb.Models.Data.Connector", "FromConnector")
                        .WithMany("FromEdges")
                        .HasForeignKey("FromConnectorId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Mb.Models.Data.Node", "FromNode")
                        .WithMany("FromEdges")
                        .HasForeignKey("FromNodeId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Mb.Models.Data.Interface", "Interface")
                        .WithMany("Edges")
                        .HasForeignKey("InterfaceId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Mb.Models.Data.Project", "Project")
                        .WithMany("Edges")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Mb.Models.Data.Connector", "ToConnector")
                        .WithMany("ToEdges")
                        .HasForeignKey("ToConnectorId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Mb.Models.Data.Node", "ToNode")
                        .WithMany("ToEdges")
                        .HasForeignKey("ToNodeId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Mb.Models.Data.Transport", "Transport")
                        .WithMany("Edges")
                        .HasForeignKey("TransportId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("FromConnector");

                    b.Navigation("FromNode");

                    b.Navigation("Interface");

                    b.Navigation("Project");

                    b.Navigation("ToConnector");

                    b.Navigation("ToNode");

                    b.Navigation("Transport");
                });

            modelBuilder.Entity("Mb.Models.Data.Interface", b =>
                {
                    b.HasOne("Mb.Models.Data.Terminal", "InputTerminal")
                        .WithMany("InputInterfaces")
                        .HasForeignKey("InputTerminalId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Mb.Models.Data.Terminal", "OutputTerminal")
                        .WithMany("OutputInterfaces")
                        .HasForeignKey("OutputTerminalId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("InputTerminal");

                    b.Navigation("OutputTerminal");
                });

            modelBuilder.Entity("Mb.Models.Data.Node", b =>
                {
                    b.HasOne("Mb.Models.Data.Project", "Project")
                        .WithMany("Nodes")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("Mb.Models.Data.Transport", b =>
                {
                    b.HasOne("Mb.Models.Data.Terminal", "InputTerminal")
                        .WithMany("InputTransports")
                        .HasForeignKey("InputTerminalId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Mb.Models.Data.Terminal", "OutputTerminal")
                        .WithMany("OutputTransports")
                        .HasForeignKey("OutputTerminalId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("InputTerminal");

                    b.Navigation("OutputTerminal");
                });

            modelBuilder.Entity("Mb.Models.Data.Connector", b =>
                {
                    b.Navigation("FromEdges");

                    b.Navigation("ToEdges");
                });

            modelBuilder.Entity("Mb.Models.Data.Interface", b =>
                {
                    b.Navigation("Attributes");

                    b.Navigation("Edges");
                });

            modelBuilder.Entity("Mb.Models.Data.Node", b =>
                {
                    b.Navigation("Attributes");

                    b.Navigation("Connectors");

                    b.Navigation("FromEdges");

                    b.Navigation("ToEdges");
                });

            modelBuilder.Entity("Mb.Models.Data.Project", b =>
                {
                    b.Navigation("Edges");

                    b.Navigation("Nodes");
                });

            modelBuilder.Entity("Mb.Models.Data.Transport", b =>
                {
                    b.Navigation("Attributes");

                    b.Navigation("Edges");
                });

            modelBuilder.Entity("Mb.Models.Data.Terminal", b =>
                {
                    b.Navigation("Attributes");

                    b.Navigation("InputInterfaces");

                    b.Navigation("InputTransports");

                    b.Navigation("OutputInterfaces");

                    b.Navigation("OutputTransports");
                });
#pragma warning restore 612, 618
        }
    }
}
