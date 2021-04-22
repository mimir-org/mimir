﻿// <auto-generated />
using Mb.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Mb.Core.Migrations
{
    [DbContext(typeof(ModelBuilderDbContext))]
    [Migration("20210420063220_AttributeChanges")]
    partial class AttributeChanges
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Mb.Core.Models.Attribute", b =>
                {
                    b.Property<string>("Key")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Key");

                    b.Property<string>("NodeId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("NodeId");

                    b.Property<int>("InputType")
                        .HasColumnType("int")
                        .HasColumnName("InputType");

                    b.Property<int>("Type")
                        .HasColumnType("int")
                        .HasColumnName("Type");

                    b.Property<string>("Unit")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Unit");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Value");

                    b.HasKey("Key", "NodeId");

                    b.HasIndex("NodeId");

                    b.ToTable("Attribute");
                });

            modelBuilder.Entity("Mb.Core.Models.Connector", b =>
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

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Type");

                    b.HasKey("Id");

                    b.HasIndex("NodeId");

                    b.ToTable("Connector");
                });

            modelBuilder.Entity("Mb.Core.Models.Edge", b =>
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

            modelBuilder.Entity("Mb.Core.Models.Node", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Id");

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

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<decimal>("PositionX")
                        .HasColumnType("decimal(18,4)")
                        .HasColumnName("PositionX");

                    b.Property<decimal>("PositionY")
                        .HasColumnType("decimal(18,4)")
                        .HasColumnName("PositionY");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Type");

                    b.HasKey("Id");

                    b.ToTable("Node");
                });

            modelBuilder.Entity("Mb.Core.Models.Project", b =>
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

                    b.HasKey("Id");

                    b.ToTable("Project");
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

            modelBuilder.Entity("Mb.Core.Models.Attribute", b =>
                {
                    b.HasOne("Mb.Core.Models.Node", "Node")
                        .WithMany("Attributes")
                        .HasForeignKey("NodeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Node");
                });

            modelBuilder.Entity("Mb.Core.Models.Connector", b =>
                {
                    b.HasOne("Mb.Core.Models.Node", "Node")
                        .WithMany("Connectors")
                        .HasForeignKey("NodeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Node");
                });

            modelBuilder.Entity("ProjectEdge", b =>
                {
                    b.HasOne("Mb.Core.Models.Edge", null)
                        .WithMany()
                        .HasForeignKey("EdgeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Mb.Core.Models.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ProjectNode", b =>
                {
                    b.HasOne("Mb.Core.Models.Node", null)
                        .WithMany()
                        .HasForeignKey("NodeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Mb.Core.Models.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Mb.Core.Models.Node", b =>
                {
                    b.Navigation("Attributes");

                    b.Navigation("Connectors");
                });
#pragma warning restore 612, 618
        }
    }
}
