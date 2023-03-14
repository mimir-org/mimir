using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mimirorg.Common.Attributes;
using Mimirorg.Common.Extensions;

namespace Mb.Models.Application
{
    public class ConnectionAm : IValidatableObject
    {
        [RequiredOne(nameof(Id))]
        public string Id { get; set; }

        public string Domain => Id.ResolveDomain();

        [RequiredOne(nameof(Project))]
        public string Project { get; set; }

        [RequiredOne(nameof(FromConnector))]
        public string FromConnector { get; set; }

        [RequiredOne(nameof(ToConnector))]
        public string ToConnector { get; set; }

        [RequiredOne(nameof(MainProject))]
        public string MainProject { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            return new List<ValidationResult>();
        }
    }
}