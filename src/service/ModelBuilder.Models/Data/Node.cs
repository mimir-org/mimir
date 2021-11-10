using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    [Serializable]
    public class Node
    {
        [Required]
        public string Id { get; set; }

        public string Rds { get; set; }

        public string Contractor { get; set; }

        public string Description { get; set; }

        public string SemanticReference { get; set; }

        public string TagNumber { get; set; }

        [Required]
        public string Name { get; set; }

        public string Label { get; set; }

        [Required]
        public decimal PositionX { get; set; }

        [Required]
        public decimal PositionY { get; set; }

        [Required]
        public bool IsLocked { get; set; }

        public string IsLockedBy { get; set; }

        [Required]
        public decimal PositionBlockX { get; set; }

        [Required]
        public decimal PositionBlockY { get; set; }

        [Required]
        public int Level { get; set; }

        [Required]
        public int Order { get; set; }

        [Required]
        public string StatusId { get; set; }

        public BuildStatus Status { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime Updated { get; set; }

        public DateTime? Created { get; set; }

        public string CreatedBy { get; set; }

        public string LibraryTypeId { get; set; }

        [Required]
        public string Version { get; set; }

        public Aspect Aspect { get; set; }

        [Required]
        public bool IsRoot { get; set; }

        [Required]
        public string MasterProjectId { get; set; }

        public virtual Project MasterProject { get; set; }

        public string Symbol { get; set; }

        public string PurposeString { get; set; }

        [NotMapped]
        public virtual Purpose Purpose { get; set; }

        public virtual ICollection<Connector> Connectors { get; set; }

        public virtual ICollection<Attribute> Attributes { get; set; }
        
        public virtual ICollection<Composite> Composites { get; set; }

        [JsonIgnore]
        public virtual ICollection<Project> Projects { get; set; }

        [JsonIgnore]
        public virtual ICollection<Edge> FromEdges { get; set; }

        [JsonIgnore]
        public virtual ICollection<Edge> ToEdges { get; set; }

        // Required Only for location aspect
        public decimal? Length { get; set; }

        public decimal? Width { get; set; }

        public decimal? Height { get; set; }

        public decimal? Area => Length * Width;

        // Required only for product aspect
        public decimal? Cost { get; set; }

        public void IncrementMinorVersion()
        {
            Version = Version.IncrementMinorVersion();
        }

        public void IncrementMajorVersion()
        {
            Version = Version.IncrementMajorVersion();
        }

        public string Domain => Id.ResolveDomain();
    }
}
