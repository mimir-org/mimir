using System;

namespace RdfParserModule.Extensions
{
    public static class UriExtensions
    {
        public static string GetDomainTypeName(this Uri uri)
        {
            var split = uri.Host.Split('.', StringSplitOptions.RemoveEmptyEntries);
            if (split.Length < 2)
                throw new ArgumentException("Uri does not contain correct segments");

            return $"{split[^2].Trim()}.{split[^1].Trim()}";
        }
    }
}
