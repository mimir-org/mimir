using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data.TypeEditor.EnumTypes;
using Mb.Models.Exceptions;

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

        public static (string terminalCategoryId, string terminalTypeId) CreateCategoryIdAndTerminalTypeId(this string terminalName, string categoryName)
        {
            if (string.IsNullOrEmpty(categoryName) || string.IsNullOrEmpty(terminalName))
                throw new ModelBuilderNullReferenceException("Category and terminal can't be null");

            var category = new TerminalCategory
            {
                Name = categoryName
            };

            category.Id = category.Key.CreateMd5();
            var createTerminalType = new CreateTerminalType
            {
                Name = terminalName,
                TerminalCategoryId = category.Id
            };

            var terminalTypeId = createTerminalType.Key.CreateMd5();

            return (category.Id, terminalTypeId);
        }
    }
}
