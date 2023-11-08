using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mb.Models.Client
{
    public class ApiResponse
    {
        public bool HasError { get; set; }
        public List<string> ErrorMessage { get; set; }

    }
}