using System;
using System.Collections.Generic;
using System.Linq;

namespace Mb.Models.Extensions
{
    public static class StringExtensions
    {
        public static ICollection<string> ConvertToArray(this string value)
        {
            return string.IsNullOrEmpty(value) ?
                new List<string>() :
                value.Split(",", StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList();
        }

        public static string ConvertToString(this ICollection<string> values)
        {
            if (values == null || !values.Any())
                return null;

            var returnValue = values.Aggregate(string.Empty, (current, value) => current + $"{value},");
            return returnValue.TrimEnd(',');
        }
    }
}
