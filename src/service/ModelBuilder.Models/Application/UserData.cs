using System.Collections.Generic;

namespace Mb.Models.Application
{
    public class UserData
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public ICollection<string> Roles { get; set; }
    }
}
