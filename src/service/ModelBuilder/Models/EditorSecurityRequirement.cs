using Microsoft.AspNetCore.Authorization;

namespace ModelBuilder.Models
{
    public class EditorSecurityRequirement : IAuthorizationRequirement
    {
        public bool MustBeAdmin { get; set; }
    }
}
