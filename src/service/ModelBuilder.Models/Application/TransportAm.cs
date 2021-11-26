﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class TransportAm
    {
        public string Id { get; set; }
        public string Version { get; set; }
        public string Rds { get; set; }

        [Required]
        public string Name { get; set; }

        public string Label { get; set; }
        public string Description { get; set; }

        //[Required]
        public string StatusId { get; set; }
        
        public string SemanticReference { get; set; }
        public string InputTerminalId { get; set; }
        public TerminalAm InputTerminal { get; set; }
        public string OutputTerminalId { get; set; }
        public TerminalAm OutputTerminal { get; set; }
        public ICollection<AttributeAm> Attributes { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }

        public string UpdatedBy { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Created { get; set; }
        public string CreatedBy { get; set; }
        public string LibraryTypeId { get; set; }
    }
}
