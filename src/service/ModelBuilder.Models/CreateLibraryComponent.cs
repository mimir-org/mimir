using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models
{
    public class CreateLibraryComponent
    {
        public Aspect Aspect { get; set; }
        public string Id { get; set; }
        public ObjectType ObjectType { get; set; }
        public string TypeName { get; set; }
        public Status Status { get; set; }
        public Rds Rds { get; set; }
        public List<Terminal> Terminals { get; set; }


        
        
        // Object type
       
        
       
        
        // Attributes

    }
}
