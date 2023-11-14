using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mb.Models.Data
{
    public class Terminal
    {
        public Guid Id { get; set; }
        public Guid TerminalId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
