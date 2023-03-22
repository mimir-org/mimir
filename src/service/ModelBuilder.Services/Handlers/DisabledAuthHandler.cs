using System;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Mb.Models.Const;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Mb.Services.Handlers;

public class DisabledAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public DisabledAuthHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock) : base(options, logger, encoder, clock)
    {
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, "demo@runir.net"),
            new Claim(ClaimTypes.GivenName, "Demo"),
            new Claim(ClaimTypes.Surname, "Test"),
            new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, Roles.MimirContributor),
            new Claim("name", "Demo Test")
        };
        var identity = new ClaimsIdentity(claims, "Demo");
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, "Demo");

        var result = AuthenticateResult.Success(ticket);
        return Task.FromResult(result);
    }
}