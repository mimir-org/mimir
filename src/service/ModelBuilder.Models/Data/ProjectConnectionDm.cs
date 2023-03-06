using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace Mb.Models.Data
{
    public class ProjectConnectionDm
    {
        public string ProjectId { get; set; }
        public string ConnectionId { get; set; }

        public List<SqlParameter> CreateParameters()
        {
            var parameters = new List<SqlParameter>()
            {
                new (nameof(ProjectId), ProjectId),
                new (nameof(ConnectionId), ConnectionId)
            };

            return parameters;
        }
    }
}