using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace Mb.Models.Data
{
    public class ProjectNodeItem
    {
        public string ProjectId { get; set; }
        public string NodeId { get; set; }

        public List<SqlParameter> CreateParameters()
        {
            var parameters = new List<SqlParameter>()
            {
                new (nameof(ProjectId), ProjectId),
                new (nameof(NodeId), NodeId)
            };

            return parameters;
        }
    }
}
