using Mimirorg.Common.Exceptions;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Mb.Models.Extensions
{
    public static class StringExtensions
    {
        public static string CreateMd5(this string key)
        {
            var sb = new StringBuilder();
            using var md5 = MD5.Create();
            var inputBytes = Encoding.ASCII.GetBytes(key);
            var hashBytes = md5.ComputeHash(inputBytes);

            foreach (var t in hashBytes)
            {
                sb.Append(t.ToString("X2"));
            }
            return sb.ToString();
        }

        public static string ResolveNameFromRoleClaim(this string role)
        {
            if (string.IsNullOrEmpty(role))
                return string.Empty;

            var name = role.Split('_', StringSplitOptions.RemoveEmptyEntries);
            if (name.Length != 2)
                throw new MimirorgInvalidOperationException("The role name contains fail format.");

            return name[^1];
        }

        public static bool IsValidIri(this string iri)
        {
            return Uri.IsWellFormedUriString(iri, UriKind.Absolute);
        }

        public static string ResolveKey(this string item)
        {
            if (string.IsNullOrWhiteSpace(item))
                return null;

            var key = item.Split('_').Last();

            if (!key.Equals(item))
                return key;

            var uri = new Uri(item);
            key = string.IsNullOrEmpty(uri.Fragment) ? uri.Segments.Last() : uri.Fragment[1..];

            if (key.ToUpper().StartsWith("ID"))
                key = key.Remove(0, 2);

            return key;
        }
    }
}